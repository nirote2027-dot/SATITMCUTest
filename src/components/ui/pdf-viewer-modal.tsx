"use client";

import { useState } from "react";
import { FileText, ExternalLink, Download, X, Maximize2, Minimize2, BookOpen, AlertCircle } from "lucide-react";

interface PdfViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfUrl?: string | null;
  title?: string;
  subtitle?: string;
}

export function PdfViewerModal({
  open,
  onOpenChange,
  pdfUrl,
  title = "เอกสารหลักสูตรสถานศึกษา (PDF)",
  subtitle = "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
}: PdfViewerModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!open || !pdfUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 transition-all duration-200 overflow-hidden ${
          isFullscreen
            ? "w-full h-full fixed inset-0 rounded-none z-50"
            : "w-full max-w-5xl h-[92vh] max-h-[920px]"
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200/60 dark:border-red-900">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider">
                  PDF VIEWER
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
                  {title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
              title="เปิดดูในแท็บใหม่"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              <span className="hidden sm:inline">เปิดแท็บใหม่</span>
            </a>

            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900 transition-colors"
              title="ดาวน์โหลดไฟล์ PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ดาวน์โหลด</span>
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden sm:inline-flex p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
              title={isFullscreen ? "ย่อหน้าจอ" : "เต็มจอ"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Reader Area */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative overflow-hidden flex flex-col">
          {hasError ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900">
              <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                เบราว์เซอร์ไม่สามารถแสดงตัวอย่าง PDF ในหน้าต่างนี้ได้โดยตรง
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
                เนื่องจากการตั้งค่าความปลอดภัยหรือโปรแกรมอ่าน PDF ภายในเบราว์เซอร์ของท่าน
                ท่านสามารถกดปุ่มด้านล่างเพื่อเปิดอ่านในแท็บใหม่หรือดาวน์โหลดไฟล์ได้ทันที
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>เปิดอ่านในแท็บใหม่</span>
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>ดาวน์โหลดไฟล์ PDF</span>
                </a>
              </div>
            </div>
          ) : (
            <object
              data={pdfUrl}
              type="application/pdf"
              className="w-full h-full border-0 flex-1 min-h-0"
              onError={() => setHasError(true)}
            >
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0 flex-1"
                title={title}
                onError={() => setHasError(true)}
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    เบราว์เซอร์ไม่รองรับการแสดงตัวอย่าง PDF ในหน้านี้
                  </p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>คลิกเพื่อเปิดอ่านไฟล์ PDF ในแท็บใหม่</span>
                  </a>
                </div>
              </iframe>
            </object>
          )}

          {/* Helper toolbar at bottom */}
          <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2 shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              เอกสารหลักสูตรฉบับสมบูรณ์ โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
            </span>
            <div className="flex items-center gap-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
              >
                เปิดอ่านผ่านหน้าต่างเต็ม <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
