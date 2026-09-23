import { NextResponse } from "next/server";
import { extractPdfTokens } from "@/lib/packing-list/extract-pdf";
import { parsePackingList } from "@/lib/packing-list/parse-packing-list";

export const runtime = "nodejs";

const maxFileSize = 10 * 1024 * 1024;
const maxPackageCount = 500;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "กรุณาเลือกไฟล์ Packing List PDF" }, { status: 400 });
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "รองรับเฉพาะไฟล์ PDF เท่านั้น" }, { status: 400 });
    }
    if (file.size > maxFileSize) {
      return NextResponse.json({ error: "ไฟล์ PDF ต้องมีขนาดไม่เกิน 10 MB" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const signature = new TextDecoder("ascii").decode(buffer.slice(0, 5));
    if (signature !== "%PDF-") {
      return NextResponse.json({ error: "ไฟล์ที่เลือกไม่ใช่เอกสาร PDF ที่ถูกต้อง" }, { status: 400 });
    }

    const tokens = await extractPdfTokens(buffer);
    const documentText = tokens.map((token) => token.text).join(" ");
    const hasPackingListStructure = /PACKING\s+LIST/i.test(documentText)
      && tokens.some((token) => /^Products?$/i.test(token.text))
      && tokens.some((token) => /^PACKAGES?$/i.test(token.text))
      && tokens.some((token) => /TOTAL:.*PACKAGES/i.test(token.text));

    if (!hasPackingListStructure) {
      return NextResponse.json(
        { error: "ไม่สามารถอ่าน Packing List อัตโนมัติได้ กรุณาลองใหม่ เลือกไฟล์อื่น หรือใช้ Manual Entry" },
        { status: 422 },
      );
    }

    const extraction = parsePackingList(tokens);
    const allocatedPackages = extraction.items.reduce((sum, item) => sum + item.packageCount, 0);

    if (
      !extraction.customer
      || extraction.items.length === 0
      || extraction.totalPackages < 1
      || extraction.totalPackages > maxPackageCount
      || allocatedPackages !== extraction.totalPackages
    ) {
      return NextResponse.json(
        { error: "ไม่สามารถอ่าน Packing List อัตโนมัติได้ กรุณาลองใหม่ เลือกไฟล์อื่น หรือใช้ Manual Entry" },
        { status: 422 },
      );
    }

    return NextResponse.json(extraction);
  } catch {
    return NextResponse.json(
      { error: "ไม่สามารถอ่าน Packing List อัตโนมัติได้ กรุณาลองใหม่ เลือกไฟล์อื่น หรือใช้ Manual Entry" },
      { status: 500 },
    );
  }
}
