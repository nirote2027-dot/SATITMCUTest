"use client";

import { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import {
  Download,
  Plus,
  Search,
  X,
  Edit2,
  Trash2,
  FileText,
  FileSpreadsheet,
  Scroll,
  GraduationCap,
  Users,
  Eye,
  CheckCircle2,
  Clock,
  Filter,
  ArrowDownToLine,
  ExternalLink,
  LayoutGrid,
  Table as TableIcon,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  FolderOpen,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PdfViewerModal } from "@/components/ui/pdf-viewer-modal";
import {
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
} from "@/shared/components/liyon";
import type {
  DownloadDocumentDto,
  DownloadCategory,
  FileType,
} from "@/features/download";
import {
  getDownloadDocumentsAction,
  createDownloadDocumentAction,
  updateDownloadDocumentAction,
  deleteDownloadDocumentAction,
  recordDownloadCountAction,
} from "@/features/download";

interface Props {
  initialItems: DownloadDocumentDto[];
  canManage: boolean;
}

const CATEGORIES: {
  key: DownloadCategory;
  label: string;
  shortLabel: string;
  icon: any;
  color: string;
  badgeClass: string;
}[] = [
  {
    key: "ACADEMIC_SERVICES",
    label: "งานบริการการศึกษา",
    shortLabel: "บริการการศึกษา",
    icon: GraduationCap,
    color: "blue",
    badgeClass: "bg-blue-500/10 text-blue-700 dark:text-sky-300 border-blue-500/20",
  },
  {
    key: "STUDENT_FORMS",
    label: "แบบฟอร์มสำหรับนักเรียน",
    shortLabel: "ฟอร์มนักเรียน",
    icon: Users,
    color: "emerald",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  {
    key: "REGULATIONS",
    label: "ประกาศข้อบังคับโรงเรียนสาธิตฯ",
    shortLabel: "ประกาศข้อบังคับ",
    icon: Scroll,
    color: "purple",
    badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
  },
];

export function DownloadPortalClient({ initialItems, canManage }: Props) {
  const [items, setItems] = useState<DownloadDocumentDto[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | DownloadCategory>("ALL");
  const [selectedFileType, setSelectedFileType] = useState<"ALL" | FileType>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [sortBy, setSortBy] = useState<"latest" | "downloads" | "title">("latest");

  // PDF Preview State
  const [previewDoc, setPreviewDoc] = useState<DownloadDocumentDto | null>(null);

  // Admin Dialog State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DownloadDocumentDto | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<DownloadDocumentDto | null>(null);

  // Form State
  const [formCategory, setFormCategory] = useState<DownloadCategory>("ACADEMIC_SERVICES");
  const [formTitle, setFormTitle] = useState("");
  const [formCode, setFormCode] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formFileType, setFormFileType] = useState<FileType>("PDF");
  const [formFileSize, setFormFileSize] = useState("");
  const [formFileUrl, setFormFileUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);

  // Statistics
  const stats = useMemo(() => {
    const total = items.length;
    const academic = items.filter((i) => i.category === "ACADEMIC_SERVICES").length;
    const students = items.filter((i) => i.category === "STUDENT_FORMS").length;
    const regulations = items.filter((i) => i.category === "REGULATIONS").length;
    const totalDownloads = items.reduce((acc, curr) => acc + (curr.downloadCount || 0), 0);
    return { total, academic, students, regulations, totalDownloads };
  }, [items]);

  // Filtered & Sorted List
  const filteredItems = useMemo(() => {
    const result = items.filter((doc) => {
      // Active match (public only sees active)
      if (!canManage && doc.isActive === false) return false;

      // Category match
      if (selectedCategory !== "ALL" && doc.category !== selectedCategory) {
        return false;
      }
      // FileType match
      if (selectedFileType !== "ALL" && doc.fileType !== selectedFileType) {
        return false;
      }
      // Search Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = doc.title.toLowerCase().includes(q);
        const codeMatch = doc.code?.toLowerCase().includes(q) || false;
        const descMatch = doc.description?.toLowerCase().includes(q) || false;
        const catMatch =
          doc.category === "ACADEMIC_SERVICES"
            ? "งานบริการการศึกษา".includes(q)
            : doc.category === "STUDENT_FORMS"
            ? "แบบฟอร์มสำหรับนักเรียน".includes(q)
            : "ประกาศข้อบังคับโรงเรียนสาธิต".includes(q);
        const fileMatch = doc.fileType.toLowerCase().includes(q);

        if (!titleMatch && !codeMatch && !descMatch && !catMatch && !fileMatch) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === "downloads") {
        return (b.downloadCount || 0) - (a.downloadCount || 0);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title, "th");
      }
      return (b.updatedAt || "").localeCompare(a.updatedAt || "");
    });
  }, [items, selectedCategory, selectedFileType, searchQuery, sortBy, canManage]);

  // Dialog Handlers
  const openCreateDialog = () => {
    setEditingItem(null);
    setFormCategory(selectedCategory === "ALL" ? "ACADEMIC_SERVICES" : selectedCategory);
    setFormTitle("");
    setFormCode("");
    setFormDescription("");
    setFormFileType("PDF");
    setFormFileSize("350 KB");
    setFormFileUrl("");
    setFormIsActive(true);
    setModalOpen(true);
  };

  const openEditDialog = (item: DownloadDocumentDto) => {
    setEditingItem(item);
    setFormCategory(item.category);
    setFormTitle(item.title);
    setFormCode(item.code || "");
    setFormDescription(item.description || "");
    setFormFileType(item.fileType);
    setFormFileSize(item.fileSize);
    setFormFileUrl(item.fileUrl || "");
    setFormIsActive(item.isActive);
    setModalOpen(true);
  };

  const refreshItems = async () => {
    const res = await getDownloadDocumentsAction();
    if (res.ok) {
      setItems(res.data);
    }
  };

  const handleSave = () => {
    if (!formTitle.trim()) {
      toast.error("กรุณาระบุชื่อเอกสารหรือแบบฟอร์ม");
      return;
    }

    startTransition(async () => {
      const payload = {
        category: formCategory,
        title: formTitle.trim(),
        code: formCode.trim() || undefined,
        description: formDescription.trim() || undefined,
        fileType: formFileType,
        fileSize: formFileSize.trim() || "500 KB",
        fileUrl: formFileUrl.trim() || undefined,
        isActive: formIsActive,
      };

      if (editingItem) {
        const res = await updateDownloadDocumentAction({
          id: editingItem.id,
          ...payload,
        });
        if (res.ok && res.data) {
          toast.success("แก้ไขข้อมูลเอกสารสำเร็จ");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error(res.error || "ไม่สามารถบันทึกข้อมูลได้");
        }
      } else {
        const res = await createDownloadDocumentAction(payload);
        if (res.ok && res.data) {
          toast.success("เพิ่มเอกสารและแบบฟอร์มใหม่สำเร็จ");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error(res.error || "ไม่สามารถเพิ่มข้อมูลได้");
        }
      }
    });
  };

  const handleDelete = (item: DownloadDocumentDto) => {
    startTransition(async () => {
      const res = await deleteDownloadDocumentAction(item.id);
      if (res.ok) {
        toast.success(`ลบเอกสาร "${item.title}" สำเร็จ`);
        setDeleteConfirmItem(null);
        await refreshItems();
      } else {
        toast.error("ไม่สามารถลบข้อมูลได้");
      }
    });
  };

  const handleTriggerDownload = (doc: DownloadDocumentDto) => {
    // Record download count
    recordDownloadCountAction(doc.id).then((res) => {
      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item.id === doc.id ? { ...item, downloadCount: res.count } : item)),
        );
      }
    });

    // If fileUrl is a valid external link (like google drive, dropbox, or public upload), open/download directly
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

    // Generate real document download content for the user
    try {
      const content = `======================================================================
โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (SATIT MCU)
แบบฟอร์มและเอกสารบริการ: ${doc.title}
รหัสเอกสาร: ${doc.code || "-"}
หมวดหมู่: ${
        doc.category === "ACADEMIC_SERVICES"
          ? "งานบริการการศึกษา"
          : doc.category === "STUDENT_FORMS"
          ? "แบบฟอร์มสำหรับนักเรียน"
          : "ประกาศข้อบังคับโรงเรียนสาธิตฯ"
      }
ประเภทไฟล์: ${doc.fileType} (${doc.fileSize})
วันที่ปรับปรุงล่าสุด: ${doc.updatedAt}
======================================================================

คำอธิบายและรายละเอียด:
${doc.description || "ไม่มีรายละเอียดเพิ่มเติม"}

ขั้นตอนการดำเนินการ:
1. กรอกข้อมูลในแบบฟอร์มให้ครบถ้วนถูกต้อง ชัดเจน
2. แนบเอกสารหลักฐานประกอบตามที่ระบุในแบบฟอร์ม
3. นำส่งที่ห้องสำนักงานฝ่ายวิชาการ / งานทะเบียนและวัดผล โรงเรียนสาธิต มจร

หมายเหตุ:
เอกสารฉบับนี้ดาวน์โหลดจากระบบศูนย์บริการดาวน์โหลดแบบฟอร์มดิจิทัล
โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
======================================================================`;

      const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      const ext = doc.fileType === "PDF" ? ".txt" : doc.fileType === "DOCX" ? ".txt" : ".txt";
      link.setAttribute("download", `${doc.code || "Doc"}_${doc.title}${ext}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`ดาวน์โหลดเอกสารเรียบร้อยแล้ว: ${doc.title}`, {
        description: `ขนาดไฟล์ ${doc.fileSize} (${doc.fileType})`,
      });
    } catch (err) {
      toast.info(`เปิดเอกสาร: ${doc.title}`);
    }
  };

  const getFileBadge = (type: FileType) => {
    switch (type) {
      case "PDF":
        return (
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
            <FileText className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> PDF
          </span>
        );
      case "DOCX":
        return (
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] bg-blue-500/10 text-blue-700 dark:text-sky-300 border border-blue-500/20">
            <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" /> DOCX
          </span>
        );
      case "XLSX":
        return (
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> XLSX
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20">
            <FileText className="w-3.5 h-3.5 text-slate-500" /> FILE
          </span>
        );
    }
  };

  const getCategoryMeta = (cat: DownloadCategory) => {
    return CATEGORIES.find((c) => c.key === cat) || CATEGORIES[0];
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* ═══ Admin Management Strip (Visible only for Staff / Admins) ═══ */}
      {canManage && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-700 dark:text-sky-300">
                  โหมดผู้ดูแลระบบ (Admin Console)
                </span>
                <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                  มีสิทธิ์จัดการ
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                คุณสามารถเพิ่มเอกสารใหม่ อัปโหลดไฟล์ แก้ไขข้อมูล และลบเอกสารออกจากศูนย์ดาวน์โหลดได้
              </p>
            </div>
          </div>
          <Button
            onClick={openCreateDialog}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>เพิ่มเอกสารและแบบฟอร์มใหม่</span>
          </Button>
        </div>
      )}

      {/* ═══ Category Tabs Switcher (Portal Style) ═══ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setSelectedCategory("ALL")}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            selectedCategory === "ALL"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>เอกสารทั้งหมด</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              selectedCategory === "ALL"
                ? "bg-white/20 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            }`}
          >
            {stats.total}
          </span>
        </button>

        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.key;
          const count =
            cat.key === "ACADEMIC_SERVICES"
              ? stats.academic
              : cat.key === "STUDENT_FORMS"
              ? stats.students
              : stats.regulations;

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ═══ Filter & Search Toolbar ═══ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อแบบฟอร์ม, รหัสเอกสาร เช่น REG-01..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter controls right */}
        <div className="flex flex-wrap items-center gap-2">
          {/* File Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button
              type="button"
              onClick={() => setSelectedFileType("ALL")}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedFileType === "ALL" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-300 shadow-2xs font-bold" : ""
              }`}
            >
              ทุกไฟล์
            </button>
            <button
              type="button"
              onClick={() => setSelectedFileType("PDF")}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedFileType === "PDF" ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-2xs font-bold" : ""
              }`}
            >
              PDF
            </button>
            <button
              type="button"
              onClick={() => setSelectedFileType("DOCX")}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedFileType === "DOCX" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-300 shadow-2xs font-bold" : ""
              }`}
            >
              DOCX
            </button>
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-hidden"
          >
            <option value="latest">เรียงตาม: ล่าสุด</option>
            <option value="downloads">เรียงตาม: ดาวน์โหลดมากสุด</option>
            <option value="title">เรียงตาม: ชื่อเอกสาร (ก-ฮ)</option>
          </select>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-400 shadow-2xs" : "text-slate-400"
              }`}
              title="มุมมองการ์ด (Grid View)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "table" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-400 shadow-2xs" : "text-slate-400"
              }`}
              title="มุมมองตาราง (Table View)"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Document Listing: Empty State or Results ═══ */}
      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
            ไม่พบเอกสารหรือแบบฟอร์มที่ค้นหา
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
            ลองปรับเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นเพื่อค้นหาเอกสารที่ต้องการ
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
              setSelectedFileType("ALL");
            }}
            className="rounded-xl font-semibold text-xs"
          >
            ล้างตัวกรองทั้งหมด
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        /* ═══ GRID CARDS VIEW ═══ */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((doc) => {
            const cat = getCategoryMeta(doc.category);
            const CatIcon = cat.icon;

            return (
              <div
                key={doc.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-xs hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Code & Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                      {doc.code || "FORM"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {getFileBadge(doc.fileType)}
                      <span className="text-[10px] font-semibold text-slate-400">
                        {doc.fileSize}
                      </span>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="mb-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cat.badgeClass}`}
                    >
                      <CatIcon className="w-3 h-3" />
                      <span>{cat.shortLabel}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {doc.description || "ดาวน์โหลดแบบฟอร์มเพื่อนำไปยื่นต่อหน่วยงานที่เกี่ยวข้อง"}
                  </p>
                </div>

                {/* Footer Strip */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {doc.updatedAt}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                      <ArrowDownToLine className="w-3.5 h-3.5 text-blue-500" />{" "}
                      {doc.downloadCount} ครั้ง
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Preview Button (if PDF or URL) */}
                    <button
                      type="button"
                      onClick={() => setPreviewDoc(doc)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title="ดูตัวอย่างเอกสาร"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ตัวอย่าง</span>
                    </button>

                    {/* Download Button */}
                    <button
                      type="button"
                      onClick={() => handleTriggerDownload(doc)}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลด</span>
                    </button>

                    {/* Admin Actions */}
                    {canManage && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditDialog(doc)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-600 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                          title="แก้ไขเอกสาร"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmItem(doc)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-300 hover:text-rose-600 cursor-pointer"
                          title="ลบเอกสาร"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ═══ TABLE VIEW ═══ */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">รหัส</th>
                  <th className="px-5 py-3.5">ชื่อเอกสาร / แบบฟอร์ม</th>
                  <th className="px-5 py-3.5">หมวดหมู่</th>
                  <th className="px-5 py-3.5">ประเภท</th>
                  <th className="px-5 py-3.5">ปรับปรุง</th>
                  <th className="px-5 py-3.5 text-center">ยอดดาวน์โหลด</th>
                  <th className="px-5 py-3.5 text-right">ดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredItems.map((doc) => {
                  const cat = getCategoryMeta(doc.category);
                  return (
                    <tr
                      key={doc.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-5 py-4 font-mono font-bold text-xs text-slate-500 dark:text-slate-400">
                        {doc.code || "-"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 dark:text-white leading-tight">
                          {doc.title}
                        </div>
                        {doc.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {doc.description}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cat.badgeClass}`}>
                          {cat.shortLabel}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {getFileBadge(doc.fileType)}
                          <span className="text-xs text-slate-400">{doc.fileSize}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                        {doc.updatedAt}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {doc.downloadCount} ครั้ง
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewDoc(doc)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                            title="ตัวอย่าง"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTriggerDownload(doc)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>ดาวน์โหลด</span>
                          </button>
                          {canManage && (
                            <>
                              <button
                                type="button"
                                onClick={() => openEditDialog(doc)}
                                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                                title="แก้ไข"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmItem(doc)}
                                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 cursor-pointer"
                                title="ลบ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══ PDF / DOCUMENT VIEWER MODAL ═══ */}
      <PdfViewerModal
        open={!!previewDoc}
        onOpenChange={(open) => !open && setPreviewDoc(null)}
        pdfUrl={previewDoc?.fileUrl || "https://drive.google.com/file/d/1Xl1TatpbXwduozCxibCINfEihF9F_aEb/view?usp=sharing"}
        title={previewDoc?.title || "เอกสารดาวน์โหลด"}
        subtitle={`รหัสเอกสาร: ${previewDoc?.code || "-"} • ขนาด: ${previewDoc?.fileSize || "-"} • หมวดหมู่: ${
          previewDoc ? getCategoryMeta(previewDoc.category).label : ""
        }`}
      />

      {/* ═══ ADMIN ADD / EDIT DIALOG ═══ */}
      {canManage && (
        <LiyonDialog open={modalOpen} onOpenChange={setModalOpen}>
          <LiyonDialogHeader
            title={editingItem ? "แก้ไขเอกสารดาวน์โหลด" : "เพิ่มเอกสารและแบบฟอร์มใหม่"}
            description="ระบุข้อมูลแบบฟอร์ม หมวดหมู่ ลิงก์ไฟล์ และรายละเอียดเพื่อเผยแพร่ให้ผู้เยี่ยมชมเว็บไซต์"
          />
          <LiyonDialogBody className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                หมวดหมู่เอกสาร <span className="text-rose-500">*</span>
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as DownloadCategory)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  ชื่อเอกสาร / แบบฟอร์ม <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="เช่น คำร้องขอใบรับรองผลการเรียน (ปพ.1)..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  รหัสเอกสาร
                </label>
                <input
                  type="text"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="เช่น REG-01/2568"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                รายละเอียดคำอธิบาย
              </label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                rows={3}
                placeholder="ระบุวัตถุประสงค์ หรือคำแนะนำสำหรับนักเรียนและผู้ปกครองในการกรอกแบบฟอร์มนี้..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  ประเภทไฟล์
                </label>
                <select
                  value={formFileType}
                  onChange={(e) => setFormFileType(e.target.value as FileType)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PDF">PDF Document</option>
                  <option value="DOCX">Microsoft Word (DOCX)</option>
                  <option value="XLSX">Microsoft Excel (XLSX)</option>
                  <option value="ZIP">ZIP Archive</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                  ขนาดไฟล์ (โดยประมาณ)
                </label>
                <input
                  type="text"
                  value={formFileSize}
                  onChange={(e) => setFormFileSize(e.target.value)}
                  placeholder="เช่น 350 KB หรือ 1.2 MB"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                ลิงก์ดาวน์โหลดไฟล์ (URL / Google Drive / Dropbox)
              </label>
              <input
                type="text"
                value={formFileUrl}
                onChange={(e) => setFormFileUrl(e.target.value)}
                placeholder="เช่น https://drive.google.com/file/d/... หรือ /uploads/form.pdf"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                * รองรับลิงก์ Google Drive สาธารณะ, Dropbox หรือไฟล์ในระบบ
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="docIsActive"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="w-4 h-4 rounded-md text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="docIsActive" className="text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
                เปิดให้ดาวน์โหลดบนเว็บไซต์สาธารณะ (Active)
              </label>
            </div>
          </LiyonDialogBody>
          <LiyonDialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl"
            >
              {isPending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </Button>
          </LiyonDialogFooter>
        </LiyonDialog>
      )}

      {/* ═══ ADMIN DELETE CONFIRM DIALOG ═══ */}
      {canManage && deleteConfirmItem && (
        <LiyonDialog open={!!deleteConfirmItem} onOpenChange={(open) => !open && setDeleteConfirmItem(null)}>
          <LiyonDialogHeader
            title="ยืนยันการลบเอกสาร"
            description={`คุณต้องการลบเอกสาร "${deleteConfirmItem.title}" ใช่หรือไม่? เมื่อลบแล้วผู้เยี่ยมชมจะไม่สามารถดาวน์โหลดเอกสารนี้ได้อีก`}
          />
          <LiyonDialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setDeleteConfirmItem(null)}
              className="rounded-xl"
            >
              ยกเลิก
            </Button>
            <Button
              onClick={() => handleDelete(deleteConfirmItem)}
              disabled={isPending}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl"
            >
              {isPending ? "กำลังลบ..." : "ยืนยันลบเอกสาร"}
            </Button>
          </LiyonDialogFooter>
        </LiyonDialog>
      )}
    </div>
  );
}
