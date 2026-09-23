"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, FileDown, FileText, Plus, Printer, Trash2, Upload } from "lucide-react";
import QRCode from "qrcode";
import type { PackingListExtraction } from "@/lib/packing-list/types";
import styles from "./shipping-mark.module.css";

const qrTargetUrl = "https://prothaiinter.com";

type ShippingMarkData = {
  orderNo: string; prNo: string; customer: string; customerEnglish: string;
  packageNo: string; totalPackages: string; materialNo: string; product: string;
  quantity: string; quantityUnit: string; netWeight: string; grossWeight: string;
  brand: string; poNo: string; qcPassed: boolean;
};

const emptyData: ShippingMarkData = {
  orderNo: "", prNo: "", customer: "", customerEnglish: "",
  packageNo: "1", totalPackages: "1", materialNo: "", product: "", quantity: "",
  quantityUnit: "", netWeight: "", grossWeight: "", brand: "",
  poNo: "", qcPassed: true,
};

type TextField = Exclude<keyof ShippingMarkData, "qcPassed">;
type Mode = "manual" | "upload";
type PrintScope = "current" | "all";
const commonFields: TextField[] = ["orderNo", "prNo", "customer", "customerEnglish", "totalPackages", "brand", "poNo"];
const handlingMarks = [
  { label: "THIS SIDE UP", src: "/shipping-mark/this-side-up.png" },
  { label: "HANDLE WITH CARE", src: "/shipping-mark/handle-with-care.png" },
  { label: "KEEP DRY", src: "/shipping-mark/keep-dry.png" },
  { label: "DO NOT USE HOOKS", src: "/shipping-mark/do-not-use-hooks.png" },
];

function displayValue(value: string) { return value.trim() || "—"; }

function printTitle(data: ShippingMarkData, scope: PrintScope, draftCount: number) {
  const identifier = (data.poNo || data.customer || "UNTITLED")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 48) || "UNTITLED";
  const packageLabel = scope === "all" ? `${draftCount}PKG` : `${data.packageNo}of${data.totalPackages}`;
  return `Shipping_Mark_${identifier}_${packageLabel}`;
}

function createDrafts(extraction: PackingListExtraction): ShippingMarkData[] {
  const drafts: ShippingMarkData[] = [];
  let packageNo = 1;
  for (const item of extraction.items) {
    for (let index = 0; index < item.packageCount; index += 1) {
      drafts.push({
        orderNo: "", prNo: "", customer: extraction.customer, customerEnglish: "",
        packageNo: String(packageNo), totalPackages: String(extraction.totalPackages), materialNo: "",
        product: item.product, quantity: item.quantity, quantityUnit: item.unit,
        netWeight: "", grossWeight: "", brand: "", poNo: "", qcPassed: true,
      });
      packageNo += 1;
    }
  }
  return drafts;
}

export default function ShippingMarkGenerator() {
  const [mode, setMode] = useState<Mode>("manual");
  const [manualDrafts, setManualDrafts] = useState<ShippingMarkData[]>([emptyData]);
  const [uploadedDrafts, setUploadedDrafts] = useState<ShippingMarkData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [extraction, setExtraction] = useState<PackingListExtraction | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [qrSvg, setQrSvg] = useState("");
  const [printScope, setPrintScope] = useState<PrintScope>("current");
  const printTimer = useRef<number | null>(null);
  const drafts = mode === "manual" ? manualDrafts : uploadedDrafts.length > 0 ? uploadedDrafts : [emptyData];
  const data = drafts[currentIndex] ?? emptyData;

  useEffect(() => {
    let active = true;
    QRCode.toString(qrTargetUrl, { type: "svg", errorCorrectionLevel: "M", margin: 0, color: { dark: "#000000", light: "#ffffff" } })
      .then((svg) => { if (active) setQrSvg(svg); });
    return () => { active = false; };
  }, []);

  useEffect(() => () => { if (printTimer.current) window.clearTimeout(printTimer.current); }, []);

  const updateField = (field: TextField, value: string) => {
    const updateDrafts = mode === "manual" ? setManualDrafts : setUploadedDrafts;
    updateDrafts((current) => current.map((draft, index) => {
      if (commonFields.includes(field)) return { ...draft, [field]: value };
      return index === currentIndex ? { ...draft, [field]: value } : draft;
    }));
  };

  const addManualPage = () => {
    setManualDrafts((current) => {
      const totalPackages = String(current.length + 1);
      const common = current[0] ?? emptyData;
      const next = current.map((draft, index) => ({ ...draft, packageNo: String(index + 1), totalPackages }));
      next.push({
        ...emptyData,
        orderNo: common.orderNo,
        prNo: common.prNo,
        customer: common.customer,
        customerEnglish: common.customerEnglish,
        brand: common.brand,
        poNo: common.poNo,
        qcPassed: common.qcPassed,
        packageNo: totalPackages,
        totalPackages,
      });
      return next;
    });
    setCurrentIndex(manualDrafts.length);
  };

  const removeManualPage = () => {
    if (manualDrafts.length === 1) return;
    const nextLength = manualDrafts.length - 1;
    setManualDrafts((current) => current
      .filter((_, index) => index !== currentIndex)
      .map((draft, index) => ({ ...draft, packageNo: String(index + 1), totalPackages: String(nextLength) })));
    setCurrentIndex((index) => Math.min(index, nextLength - 1));
  };

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name); setUploadError(""); setExtraction(null); setIsExtracting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/tools/shipping-mark/extract", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "อ่านไฟล์ไม่สำเร็จ");
      const extracted = result as PackingListExtraction;
      const generated = createDrafts(extracted);
      if (generated.length !== extracted.totalPackages) throw new Error("จำนวนกล่องในรายการไม่ตรงกับยอดรวม กรุณาตรวจสอบ Packing List");
      setExtraction(extracted); setUploadedDrafts(generated); setCurrentIndex(0);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "ไม่สามารถอ่าน Packing List อัตโนมัติได้ กรุณาลองใหม่ เลือกไฟล์อื่น หรือใช้ Manual Entry");
    } finally { setIsExtracting(false); }
  };

  const printDocuments = (scope: PrintScope) => {
    setPrintScope(scope);
    const originalTitle = document.title;
    document.title = printTitle(data, scope, drafts.length);
    window.addEventListener("afterprint", () => { document.title = originalTitle; }, { once: true });
    printTimer.current = window.setTimeout(() => window.print(), 50);
  };
  const printDrafts = printScope === "all" ? drafts : [data];

  return (
    <main className={styles.workspace}>
      <header className={styles.toolbar}>
        <div><p className={styles.eyebrow}>ProThai Internal Tool</p><h1>Shipping Mark Generator</h1><p>ข้อมูลและไฟล์ที่อัปโหลดจะไม่ถูกบันทึก</p></div>
        <div className={styles.actions}>
          <button type="button" className={styles.secondaryButton} onClick={() => printDocuments("current")}><Printer size={18} aria-hidden="true" /> Print current</button>
          <button type="button" className={styles.primaryButton} onClick={() => printDocuments(drafts.length > 1 ? "all" : "current")}><FileDown size={18} aria-hidden="true" /> {drafts.length > 1 ? `Export all ${drafts.length}` : "Export PDF"}</button>
        </div>
      </header>

      <div className={styles.modeTabs} role="tablist" aria-label="Data entry method">
        <button type="button" role="tab" aria-selected={mode === "manual"} onClick={() => { setMode("manual"); setCurrentIndex(0); }}>Manual Entry</button>
        <button type="button" role="tab" aria-selected={mode === "upload"} onClick={() => { setMode("upload"); setCurrentIndex(0); }}>Upload Packing List</button>
      </div>

      {mode === "upload" && (
        <section className={styles.uploadPanel} aria-labelledby="upload-title">
          <div className={styles.uploadIntro}><FileText size={22} aria-hidden="true" /><div><h2 id="upload-title">Packing List PDF</h2><p>ระบบอ่านเฉพาะข้อมูลที่ระบุในเอกสาร และเว้นช่องที่ไม่พบไว้ให้ตรวจสอบ</p></div></div>
          <label className={styles.filePicker}><Upload size={18} aria-hidden="true" /><span>{isExtracting ? "กำลังอ่านไฟล์..." : fileName || "Choose PDF"}</span><input type="file" accept="application/pdf,.pdf" disabled={isExtracting} onChange={(event) => handleUpload(event.target.files?.[0])} /></label>
          {uploadError && <p className={styles.errorMessage} role="alert">{uploadError}</p>}
          {extraction && <ExtractionReview extraction={extraction} />}
        </section>
      )}

      {drafts.length > 1 && (
        <nav className={styles.pageSelector} aria-label="Shipping mark pages">
          <button type="button" title="Previous page" aria-label="Previous page" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => index - 1)}><ChevronLeft size={18} /></button>
          <div className={styles.pageButtons}>{drafts.map((draft, index) => <button key={`${draft.packageNo}-${index}`} type="button" aria-current={index === currentIndex ? "page" : undefined} onClick={() => setCurrentIndex(index)}>{draft.packageNo}</button>)}</div>
          <span>Page {currentIndex + 1} of {drafts.length}</span>
          <button type="button" title="Next page" aria-label="Next page" disabled={currentIndex === drafts.length - 1} onClick={() => setCurrentIndex((index) => index + 1)}><ChevronRight size={18} /></button>
        </nav>
      )}

      <div className={styles.editorLayout}>
        <section className={styles.formPanel} aria-labelledby="shipping-form-title">
          <div className={styles.panelHeading}><div><h2 id="shipping-form-title">Shipping details</h2><p>แก้ไขข้อมูลแล้วดูผลด้านขวาได้ทันที</p></div><span>{mode === "upload" && extraction ? `Package ${data.packageNo}/${data.totalPackages}` : `Manual ${data.packageNo}/${data.totalPackages}`}</span></div>
          <form className={styles.formGrid} onSubmit={(event) => event.preventDefault()}>
            <h3 className={styles.formSectionTitle}>Common fields</h3>
            <FormInput label="Order No." value={data.orderNo} onChange={(value) => updateField("orderNo", value)} />
            <FormInput label="PR No." value={data.prNo} onChange={(value) => updateField("prNo", value)} />
            <FormInput className={styles.fullField} label="Customer" value={data.customer} onChange={(value) => updateField("customer", value)} />
            <FormInput className={styles.fullField} label="Customer English Name (optional)" value={data.customerEnglish} onChange={(value) => updateField("customerEnglish", value)} />
            <FormInput label="Total Packages" type="number" min="1" value={data.totalPackages} readOnly={mode === "manual"} onChange={(value) => updateField("totalPackages", value)} />
            <FormInput label="Brand" value={data.brand} onChange={(value) => updateField("brand", value)} />
            <FormInput className={styles.fullField} label="PO No." value={data.poNo} onChange={(value) => updateField("poNo", value)} />
            <div className={styles.packageSectionHeading}>
              <h3 className={styles.formSectionTitle}>Package-specific fields</h3>
              {mode === "manual" && <div className={styles.pageActions}><button type="button" onClick={addManualPage}><Plus size={16} aria-hidden="true" /> เพิ่มหน้า</button><button type="button" className={styles.removePageButton} disabled={manualDrafts.length === 1} onClick={removeManualPage}><Trash2 size={16} aria-hidden="true" /> ลบหน้านี้</button></div>}
            </div>
            <FormInput label="Package No." type="number" min="1" value={data.packageNo} readOnly={mode === "manual"} onChange={(value) => updateField("packageNo", value)} />
            <FormInput label="Material No." value={data.materialNo} onChange={(value) => updateField("materialNo", value)} />
            <FormInput className={styles.fullField} label="Product" value={data.product} onChange={(value) => updateField("product", value)} />
            <FormInput label="Quantity" type="number" min="0" step="any" value={data.quantity} onChange={(value) => updateField("quantity", value)} />
            <FormInput label="Unit" value={data.quantityUnit} onChange={(value) => updateField("quantityUnit", value)} />
            <FormInput label="Net Weight (kg)" type="number" min="0" step="any" value={data.netWeight} onChange={(value) => updateField("netWeight", value)} />
            <FormInput label="Gross Weight (kg)" type="number" min="0" step="any" value={data.grossWeight} onChange={(value) => updateField("grossWeight", value)} />
            <label className={`${styles.checkboxField} ${styles.fullField}`}><input type="checkbox" checked={data.qcPassed} onChange={(event) => { const updateDrafts = mode === "manual" ? setManualDrafts : setUploadedDrafts; updateDrafts((current) => current.map((draft) => ({ ...draft, qcPassed: event.target.checked }))); }} /><span><strong>QC Passed</strong><small>แสดงข้อความ QC PASSED บนเอกสารทุกหน้า</small></span></label>
          </form>
        </section>

        <section className={styles.previewPanel} aria-labelledby="preview-title">
          <div className={styles.previewHeading}><div><h2 id="preview-title">A4 Preview</h2><p>210 × 297 mm · Portrait</p></div><span>Print ready</span></div>
          <div className={styles.paperStage}><ShippingMarkDocument data={data} qrSvg={qrSvg} /></div>
        </section>
      </div>

      <div className={styles.printDeck} aria-hidden="true">{printDrafts.map((draft, index) => <ShippingMarkDocument key={`${draft.packageNo}-${index}`} data={draft} qrSvg={qrSvg} printPage />)}</div>
    </main>
  );
}

function ExtractionReview({ extraction }: { extraction: PackingListExtraction }) {
  const reviewedItems = extraction.items.map((item, index) => {
    const start = extraction.items.slice(0, index).reduce((sum, previous) => sum + previous.packageCount, 1);
    return { item, start, end: start + item.packageCount - 1 };
  });
  return (
    <div className={styles.reviewPanel}>
      <div className={styles.reviewSummary}><div><span>Customer</span><strong>{extraction.customer}</strong></div><div><span>Attention</span><strong>{extraction.attention || "Not found"}</strong></div><div><span>Total packages</span><strong>{extraction.totalPackages}</strong></div></div>
      <div className={styles.itemReview}>{reviewedItems.map(({ item, start, end }) => <div key={item.itemNo}><strong>{item.itemNo}. {item.product}</strong><span>Packages {start}-{end} · {item.packageCount} package(s)</span><span>Source quantity: {item.quantitySource || "Not found"} {item.quantityStatus !== "found" && <em>Needs Review</em>}</span><span>Source gross weight: {item.sourceGrossWeight || "Not found"} kg · CBM: {item.cbm || "Not found"}</span></div>)}</div>
      {extraction.warnings.length > 0 && <div className={styles.warningBox}><strong>Review required</strong>{extraction.warnings.map((warning) => <span key={warning}>{warning}</span>)}</div>}
    </div>
  );
}

function FormInput({ label, value, onChange, className = "", type = "text", min, step, readOnly = false }: { label: string; value: string; onChange: (value: string) => void; className?: string; type?: "text" | "number"; min?: string; step?: string; readOnly?: boolean; }) {
  return <label className={`${styles.formField} ${className}`}><span>{label}</span><input type={type} min={min} step={step} value={value} readOnly={readOnly} aria-readonly={readOnly} onChange={(event) => onChange(event.target.value)} /></label>;
}

function ShippingMarkDocument({ data, qrSvg, printPage = false }: { data: ShippingMarkData; qrSvg: string; printPage?: boolean }) {
  const customerIsLong = data.customer.length + data.customerEnglish.length > 80;
  const poIsLong = data.poNo.length > 24;
  return (
    <article className={`${styles.shippingMark} ${printPage ? styles.printPage : ""}`}>
      <div className={styles.documentHeader}>SHIPPING MARK</div>
      <div className={styles.brandRow}><div className={styles.logoWrap}><Image src="/images/prothai-logo-v2.png" alt="ProThai Inter Supply & Solution Co., Ltd." width={1683} height={529} priority /></div><div className={styles.orderBlock}><DocumentPair label="Order No." value={data.orderNo} /><DocumentPair label="PR No." value={data.prNo} /></div></div>
      <div className={styles.infoTable}>
        <div className={`${styles.infoRow} ${styles.customerRow}`}><InfoLabel>Customer</InfoLabel><div className={`${styles.infoValue} ${customerIsLong ? styles.compactCustomer : ""}`}><strong>{displayValue(data.customer)}</strong>{data.customerEnglish.trim() && <span>{data.customerEnglish}</span>}</div></div>
        <div className={`${styles.infoRow} ${styles.packageRow}`}><InfoLabel>Package No.</InfoLabel><div className={`${styles.infoValue} ${styles.packageValue}`}>ลังที่ {displayValue(data.packageNo)}/{displayValue(data.totalPackages)}</div><div className={styles.totalPackage}><span>TOTAL PACKAGE</span><strong>{displayValue(data.packageNo)} / {displayValue(data.totalPackages)}</strong></div></div>
        <InfoRow label="Material No." value={data.materialNo} compact={data.materialNo.length > 30} /><InfoRow label="Product" value={data.product} emphasize compact={data.product.length > 55} /><InfoRow label="Quantity" value={[data.quantity, data.quantityUnit].filter(Boolean).join(" ")} />
        <div className={`${styles.infoRow} ${styles.weightRow}`}><InfoLabel>Net Weight</InfoLabel><div className={styles.infoValue}>{data.netWeight.trim() ? `${data.netWeight} Kgs` : "—"}</div><InfoLabel>Gross Weight</InfoLabel><div className={styles.infoValue}>{data.grossWeight.trim() ? `${data.grossWeight} Kgs` : "—"}</div></div>
        <InfoRow label="Brand" value={data.brand} />
      </div>
      <div className={styles.handlingGrid}>{handlingMarks.map(({ label, src }) => <div className={styles.handlingMark} key={label}><Image src={src} alt={label} width={553} height={553} unoptimized /></div>)}</div>
      <footer className={styles.documentFooter}><div className={styles.qrBlock}><div className={styles.qrCode} aria-label={`QR Code for ${qrTargetUrl}`} dangerouslySetInnerHTML={{ __html: qrSvg }} /></div><div className={styles.companyInfo}><strong>PROTHAI INTER SUPPLY &amp; SOLUTION CO.,LTD</strong><span>47/341 Kaitak Building, 5th Floor, Popular Road, Banmai, Pak Kret</span><span>Nonthaburi, 11120, Thailand</span><span>Tel: +66 (0)2-125-7096 · +66 (0)62-891-9962</span><span>Email: sales@prothaiinter.com · prothaiinter.com</span></div><div className={`${styles.footerStatus} ${poIsLong ? styles.compactPo : ""}`}><span>PO: {displayValue(data.poNo)}</span>{data.qcPassed && <strong>QC PASSED</strong>}</div></footer>
    </article>
  );
}

function DocumentPair({ label, value }: { label: string; value: string }) { return <div><span>{label}</span><b>:</b><strong>{displayValue(value)}</strong></div>; }
function InfoLabel({ children }: { children: React.ReactNode }) { return <div className={styles.infoLabel}>{children}</div>; }
function InfoRow({ label, value, emphasize = false, compact = false }: { label: string; value: string; emphasize?: boolean; compact?: boolean }) { return <div className={styles.infoRow}><InfoLabel>{label}</InfoLabel><div className={`${styles.infoValue} ${emphasize ? styles.emphasize : ""} ${compact ? styles.compactValue : ""}`}>{displayValue(value)}</div></div>; }
