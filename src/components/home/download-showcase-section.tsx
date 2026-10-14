"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  FileText,
  FileSpreadsheet,
  GraduationCap,
  Users,
  Scroll,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Eye,
  ArrowDownToLine,
  ExternalLink,
  Layers,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { PdfViewerModal } from "@/components/ui/pdf-viewer-modal";
import type { DownloadDocumentDto, DownloadCategory, FileType } from "@/features/download";
import { recordDownloadCountAction } from "@/features/download";
import {
  type ThemeColorKey,
  type BackgroundThemeKey,
  THEME_CONFIGS,
  BACKGROUND_THEMES,
} from "@/features/school/types";

interface DownloadShowcaseSectionProps {
  documents: DownloadDocumentDto[];
  themeColor?: ThemeColorKey;
  backgroundTheme?: BackgroundThemeKey;
}

export function DownloadShowcaseSection({
  documents,
  themeColor,
  backgroundTheme,
}: DownloadShowcaseSectionProps) {
  const [activeTab, setActiveTab] = useState<"POPULAR" | DownloadCategory>("POPULAR");
  const [items, setItems] = useState<DownloadDocumentDto[]>(documents);
  const [previewDoc, setPreviewDoc] = useState<DownloadDocumentDto | null>(null);
  const theme = THEME_CONFIGS[themeColor || "blue"] || THEME_CONFIGS.blue;
  const bgConfig = BACKGROUND_THEMES[backgroundTheme || "light"] || BACKGROUND_THEMES.light;
  const isDark = bgConfig.isDark;

  // Filter items based on activeTab
  const displayItems = activeTab === "POPULAR"
    ? [...items].sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0)).slice(0, 4)
    : items.filter((d) => d.category === activeTab).slice(0, 4);

  const handleDownload = (doc: DownloadDocumentDto) => {
    // Record download count
    recordDownloadCountAction(doc.id).then((res) => {
      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item.id === doc.id ? { ...item, downloadCount: res.count } : item)),
        );
      }
    });

    if (doc.fileUrl && (doc.fileUrl.startsWith("http://") || doc.fileUrl.startsWith("https://") || doc.fileUrl.startsWith("/uploads/"))) {
      const link = document.createElement("a");
      link.href = doc.fileUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = `${doc.code || "Doc"}_${doc.title}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`กำลังดาวน์โหลด: ${doc.title}`);
      return;
    }

    try {
      const content = `======================================================================
โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (SATIT MCU)
แบบฟอร์ม / เอกสารดาวน์โหลด: ${doc.title}
รหัสเอกสาร: ${doc.code || "-"}
ประเภทไฟล์: ${doc.fileType} (${doc.fileSize})
วันที่ปรับปรุงล่าสุด: ${doc.updatedAt}
======================================================================

คำอธิบาย:
${doc.description || "ไม่มีรายละเอียดเพิ่มเติม"}

ดาวน์โหลดจาก: ศูนย์บริการดาวน์โหลดแบบฟอร์มดิจิทัล โรงเรียนสาธิต มจร
======================================================================`;

      const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${doc.code || "Doc"}_${doc.title}.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`ดาวน์โหลดเอกสารสำเร็จ: ${doc.title}`);
    } catch {
      toast.info(`เปิดเอกสาร: ${doc.title}`);
    }
  };

  const getFormatBadge = (type: FileType) => {
    switch (type) {
      case "PDF":
        return (
          <span className="font-bold px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
            PDF
          </span>
        );
      case "DOCX":
        return (
          <span className="font-bold px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-sky-300 border border-blue-500/30">
            DOCX
          </span>
        );
      default:
        return (
          <span className="font-bold px-2 py-0.5 rounded text-[10px] bg-slate-500/20 text-slate-300 border border-slate-500/30">
            FILE
          </span>
        );
    }
  };

  return (
    <section
      id="services"
      className={`py-20 relative overflow-hidden transition-colors ${
        isDark
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-b from-slate-100/90 via-white to-slate-50 text-slate-900 border-y border-slate-200"
      }`}
    >
      {/* Background ambient lighting */}
      <div
        style={{ backgroundColor: theme.glowColor }}
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
      />
      <div
        style={{ backgroundColor: theme.glowColor }}
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            style={{
              backgroundColor: `${theme.hex}20`,
              borderColor: `${theme.hex}40`,
            }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-bold text-xs uppercase tracking-wider mb-3 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: theme.hex }} />
            <span>บริการสารสนเทศ & ศูนย์ดาวน์โหลด</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-black tracking-tight mb-4 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            ศูนย์เอกสารและบริการสารสนเทศ
          </h2>
          <p className={`text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            ศูนย์รวมระบบสารสนเทศเพื่อสนับสนุนการจัดการศึกษา งานทะเบียนและวัดผลสำหรับบุคลากร
            และบริการดาวน์โหลดแบบฟอร์มคำร้องดิจิทัลสำหรับนักเรียน ผู้ปกครอง และสาธารณชน
          </p>
        </div>

        {/* 2-Column Split: Left = Registration, Right = Download Center Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ═════════ LEFT: ระบบทะเบียนและวัดผล (4 Cols) ═════════ */}
          <div
            className={`lg:col-span-4 p-7 rounded-3xl border flex flex-col justify-between transition-all shadow-xl ${
              isDark
                ? "bg-gradient-to-b from-slate-800/90 to-slate-800/60 border-slate-700/80 hover:border-slate-600"
                : "bg-white border-slate-200/90 hover:border-slate-300 shadow-md"
            }`}
          >
            <div>
              <div
                style={{ color: theme.hex }}
                className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-3"
              >
                <FileText className="w-4 h-4" /> งานทะเบียนและวัดผล
              </div>
              <h3 className={`text-2xl font-black mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                ทะเบียนและวัดผล
              </h3>
              <p className={`text-sm leading-relaxed font-normal ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                ระบบสารสนเทศเพื่อการบันทึกผลการเรียน ตรวจสอบผลสัมฤทธิ์ทางการศึกษา และจัดการระเบียนประวัตินักเรียนออนไลน์ สำหรับอาจารย์ผู้สอนและบุคลากรทางการศึกษา
              </p>
            </div>

            <div className={`mt-8 pt-6 border-t ${isDark ? "border-slate-700/60" : "border-slate-100"}`}>
              <Link
                href="/satitmcuReg"
                style={{
                  backgroundColor: theme.hex,
                  boxShadow: `0 4px 16px ${theme.glowColor}`,
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-md hover:scale-[1.02]"
              >
                <span>ล็อกอินเข้าสู่ระบบทะเบียนและวัดผล</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ═════════ RIGHT: ศูนย์ดาวน์โหลดแบบฟอร์มดิจิทัล (8 Cols) ═════════ */}
          <div
            className={`lg:col-span-8 p-7 rounded-3xl border flex flex-col justify-between shadow-xl ${
              isDark
                ? "bg-slate-800/80 border-slate-700/80"
                : "bg-white border-slate-200/90 shadow-md"
            }`}
          >
            <div>
              {/* Header & Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div
                    style={{ color: theme.hex }}
                    className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1"
                  >
                    <Download className="w-4 h-4" /> ศูนย์ดาวน์โหลด • Download Center
                  </div>
                  <h3 className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                    แบบฟอร์มและเอกสารสำหรับดาวน์โหลด
                  </h3>
                </div>

                {/* Direct link to public download page */}
                <Link
                  href="/download"
                  style={{ color: theme.hex }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline transition-colors group self-start sm:self-auto"
                >
                  <span>เปิดศูนย์ดาวน์โหลดเต็มรูปแบบ</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Category Pills Switcher */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("POPULAR")}
                  style={activeTab === "POPULAR" ? { backgroundColor: theme.hex, color: "#fff" } : undefined}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "POPULAR"
                      ? "shadow-xs"
                      : isDark
                      ? "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  🔥 เอกสารยอดนิยม
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("ACADEMIC_SERVICES")}
                  style={activeTab === "ACADEMIC_SERVICES" ? { backgroundColor: theme.hex, color: "#fff" } : undefined}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "ACADEMIC_SERVICES"
                      ? "shadow-xs"
                      : isDark
                      ? "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  งานบริการการศึกษา
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("STUDENT_FORMS")}
                  style={activeTab === "STUDENT_FORMS" ? { backgroundColor: theme.hex, color: "#fff" } : undefined}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "STUDENT_FORMS"
                      ? "shadow-xs"
                      : isDark
                      ? "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  แบบฟอร์มนักเรียน
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("REGULATIONS")}
                  style={activeTab === "REGULATIONS" ? { backgroundColor: theme.hex, color: "#fff" } : undefined}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "REGULATIONS"
                      ? "shadow-xs"
                      : isDark
                      ? "bg-slate-700/60 text-slate-300 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  ประกาศข้อบังคับ
                </button>
              </div>

              {/* Document Items List */}
              <div className="space-y-3 mb-6">
                {displayItems.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                      isDark
                        ? "bg-slate-700/40 border-slate-600/40 hover:border-slate-500/80 text-white"
                        : "bg-slate-50 border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-xs text-slate-900"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                          isDark
                            ? "bg-slate-800 text-sky-400 border-slate-600/50"
                            : "bg-white border-slate-200 text-slate-700 shadow-2xs"
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {doc.code && (
                            <span
                              className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                                isDark ? "text-slate-400 bg-slate-800" : "text-slate-600 bg-slate-200/80"
                              }`}
                            >
                              {doc.code}
                            </span>
                          )}
                          {getFormatBadge(doc.fileType)}
                          <span className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            {doc.fileSize}
                          </span>
                        </div>
                        <h4
                          className={`text-sm font-bold transition-colors line-clamp-1 ${
                            isDark ? "text-white group-hover:text-sky-300" : "text-slate-900 group-hover:opacity-80"
                          }`}
                        >
                          {doc.title}
                        </h4>
                        <p
                          className={`text-xs line-clamp-1 mt-0.5 font-normal ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {doc.description || "ดาวน์โหลดแบบฟอร์มเพื่อนำไปยื่นต่อเจ้าหน้าที่"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => setPreviewDoc(doc)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                          isDark
                            ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                        title="ดูตัวอย่าง"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">ตัวอย่าง</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(doc)}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>ดาวน์โหลด</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Link to Full Download Page */}
            <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                รวมแบบฟอร์มทั้งหมด {documents.length} รายการ สำหรับนักเรียน ผู้ปกครอง และสาธารณชน
              </span>
              <Link
                href="/download"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 font-bold text-xs text-white transition-all shadow-md hover:shadow-indigo-500/20"
              >
                <span>ดูเอกสารและแบบฟอร์มทั้งหมดในศูนย์ดาวน์โหลด</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        open={!!previewDoc}
        onOpenChange={(open) => !open && setPreviewDoc(null)}
        pdfUrl={previewDoc?.fileUrl || "https://drive.google.com/file/d/1Xl1TatpbXwduozCxibCINfEihF9F_aEb/view?usp=sharing"}
        title={previewDoc?.title || "เอกสารดาวน์โหลด"}
        subtitle={`รหัสเอกสาร: ${previewDoc?.code || "-"} • ขนาด: ${previewDoc?.fileSize || "-"}`}
      />
    </section>
  );
}
