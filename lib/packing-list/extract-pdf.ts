import { getDocument, VerbosityLevel } from "pdfjs-dist/legacy/build/pdf.mjs";
import type { PdfTextToken } from "./types";

export async function extractPdfTokens(buffer: ArrayBuffer): Promise<PdfTextToken[]> {
  const loadingTask = getDocument({
    data: new Uint8Array(buffer),
    verbosity: VerbosityLevel.ERRORS,
  });
  const document = await loadingTask.promise;
  const tokens: PdfTextToken[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();

    for (const item of content.items) {
      if (!("str" in item) || !item.str.trim()) continue;
      tokens.push({
        text: item.str.trim(),
        x: item.transform[4],
        y: item.transform[5],
        page: pageNumber,
      });
    }
  }

  await loadingTask.destroy();
  return tokens;
}
