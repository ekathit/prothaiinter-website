export type PdfTextToken = {
  text: string;
  x: number;
  y: number;
  page: number;
};

export type QuantityStatus = "found" | "needs-review" | "not-found";

export type PackingListItem = {
  itemNo: string;
  product: string;
  quantity: string;
  unit: string;
  quantitySource: string;
  quantityStatus: QuantityStatus;
  sourceGrossWeight: string;
  cbm: string;
  packageCount: number;
};

export type PackingListExtraction = {
  customer: string;
  attention: string;
  poNo: string;
  referenceNo: string;
  totalPackages: number;
  items: PackingListItem[];
  warnings: string[];
};
