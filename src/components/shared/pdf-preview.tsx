"use client";

import { useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfPreviewProps = {
  file: string | File | Blob | null;
};

export function PdfPreview({ file }: PdfPreviewProps) {
  const resolvedFile = useMemo(() => file, [file]);

  if (!resolvedFile) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/30 bg-card p-8 text-center text-sm text-muted-foreground">
        Selecione um PDF para visualizar.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-primary/20 bg-card p-3">
      <Document file={resolvedFile} loading={<p className="p-4 text-sm">Carregando PDF...</p>}>
        <Page pageNumber={1} width={560} />
      </Document>
    </div>
  );
}
