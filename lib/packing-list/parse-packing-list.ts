import type { PackingListExtraction, PackingListItem, PdfTextToken } from "./types";

const rowTolerance = 2.5;

function sameRow(tokens: PdfTextToken[], target: PdfTextToken) {
  return tokens
    .filter((token) => token.page === target.page && Math.abs(token.y - target.y) <= rowTolerance)
    .sort((a, b) => a.x - b.x);
}

function tokenAfterLabel(tokens: PdfTextToken[], label: RegExp) {
  const labelToken = tokens.find((token) => label.test(token.text));
  if (!labelToken) return "";
  return sameRow(tokens, labelToken)
    .filter((token) => token.x > labelToken.x + 8)
    .map((token) => token.text)
    .join(" ")
    .trim();
}

function parseQuantity(source: string) {
  const normalized = source.replace(/\s+/g, " ").trim();
  const simple = normalized.match(/^(\d+(?:\.\d+)?)\s+([A-Za-z]+)$/);

  if (simple) {
    return { quantity: simple[1], unit: simple[2], quantityStatus: "found" as const };
  }

  return {
    quantity: "",
    unit: "",
    quantityStatus: normalized ? ("needs-review" as const) : ("not-found" as const),
  };
}

function parseItemRow(row: PdfTextToken[]): PackingListItem | null {
  const first = row[0];
  if (!first || first.x >= 100 || !/^\d+$/.test(first.text)) return null;

  const product = row.filter((token) => token.x >= 100 && token.x < 270).map((token) => token.text).join(" ").trim();
  const quantitySource = row.filter((token) => token.x >= 270 && token.x < 385).map((token) => token.text).join(" ").trim();
  const sourceGrossWeight = row.find((token) => token.x >= 385 && token.x < 440)?.text ?? "";
  const cbm = row.find((token) => token.x >= 440 && token.x < 490)?.text ?? "";
  const packageCount = Number.parseInt(row.find((token) => token.x >= 490)?.text ?? "", 10);
  const quantity = parseQuantity(quantitySource);

  if (!product || !Number.isFinite(packageCount) || packageCount < 1) return null;

  return {
    itemNo: first.text,
    product,
    quantitySource,
    sourceGrossWeight,
    cbm,
    packageCount,
    ...quantity,
  };
}

export function parsePackingList(tokens: PdfTextToken[]): PackingListExtraction {
  const sorted = [...tokens].sort((a, b) => a.page - b.page || b.y - a.y || a.x - b.x);
  const rowAnchors = sorted.filter((token) => token.x < 100 && /^\d+$/.test(token.text));
  const items = rowAnchors.map((anchor) => parseItemRow(sameRow(sorted, anchor))).filter((item): item is PackingListItem => Boolean(item));
  const totalLine = sorted.find((token) => /TOTAL:.*PACKAGES/i.test(token.text));
  const totalMatch = totalLine?.text.match(/\((\d+)\)\s*PACKAGES/i);
  const summedPackages = items.reduce((sum, item) => sum + item.packageCount, 0);
  const totalPackages = totalMatch ? Number.parseInt(totalMatch[1], 10) : summedPackages;
  const warnings: string[] = [];

  for (const item of items) {
    if (item.quantityStatus !== "found") {
      warnings.push(`Item ${item.itemNo}: quantity \"${item.quantitySource || "not found"}\" needs review.`);
    }
    if (item.sourceGrossWeight) {
      warnings.push(`Item ${item.itemNo}: source gross weight ${item.sourceGrossWeight} kg was not allocated to individual packages.`);
    }
  }
  if (totalMatch && summedPackages !== totalPackages) {
    warnings.push(`Item package counts total ${summedPackages}, but the document total is ${totalPackages}.`);
  }
  warnings.push(
    "Order No.: Not found",
    "PR No.: Not found",
    "Material No.: Not found",
    "Net Weight: Not found",
    "Brand: Not found",
    "PO No.: Not found",
  );

  return {
    customer: tokenAfterLabel(sorted, /^To:?$/i),
    attention: tokenAfterLabel(sorted, /^Att:?$/i),
    totalPackages,
    items,
    warnings,
  };
}
