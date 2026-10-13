"use client";

import { useState, useTransition, useMemo } from "react";
import {
  Download,
  Plus,
  Search,
  X,
  Edit2,
  Trash2,
  FileText,
  FileCheck,
  FileSpreadsheet,
  Scroll,
  GraduationCap,
  Users,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowDownToLine,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import {
  LiyonCard,
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  StatusPill,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
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
    badgeClass: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    key: "STUDENT_FORMS",
    label: "แบบฟอร์มสำหรับนักเรียน",
    shortLabel: "ฟอร์มนักเรียน",
    icon: Users,
    color: "emerald",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    key: "REGULATIONS",
    label: "ประกาศข้อบังคับโรงเรียนสาธิตฯ",
    shortLabel: "ประกาศข้อบังคับ",
    icon: Scroll,
    color: "purple",
    badgeClass: "bg-purple-50 text-purple-800 border-purple-200",
  },
];

export function DownloadClient({ initialItems, canManage }: Props) {
  const [items, setItems] = useState<DownloadDocumentDto[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | DownloadCategory>("ALL");
  const [selectedFileType, setSelectedFileType] = useState<"ALL" | FileType>("ALL");

  // Dialog State
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

  // Filtered List
  const filteredItems = useMemo(() => {
    return items.filter((doc) => {
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
  }, [items, selectedCategory, selectedFileType, searchQuery]);

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

    // Generate real dummy file download for the user
    try {
      const content = `======================================================================
โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
แบบฟอร์ม / เอกสารดาวน์โหลด: ${doc.title}
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

รายละเอียด:
${doc.description || "ไม่มีรายละเอียดเพิ่มเติม"}

หมายเหตุ:
เอกสารฉบับนี้ดาวน์โหลดจากระบบศูนย์บริการดาวน์โหลดแบบฟอร์มและเอกสาร
โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (SATIT MCU)
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

      toast.success(`กำลังดาวน์โหลด: ${doc.title}`, {
        description: `ขนาดไฟล์ ${doc.fileSize} (${doc.fileType})`,
      });
    } catch (err) {
      toast.info(`เปิดไฟล์: ${doc.title}`);
    }
  };

  const getFileBadge = (type: FileType) => {
    switch (type) {
      case "PDF":
        return (
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] bg-rose-50 text-rose-700 border border-rose-200">
            <FileText className="w-3.5 h-3.5 text-rose-600" /> PDF
          </span>
        );
      case "DOCX":
        return (
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] bg-blue-50 text-blue-700 border border-blue-200">
            <FileText className="w-3.5 h-3.5 text-blue-600" /> DOCX
          </span>
        );
      case "XLSX":
        return (
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> XLSX
          </span>
        );
      case "ZIP":
        return (
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] bg-amber-50 text-amber-700 border border-amber-200">
            <Layers className="w-3.5 h-3.5 text-amber-600" /> ZIP
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 border border-slate-200">
            <FileText className="w-3.5 h-3.5 text-slate-500" /> FILE
          </span>
        );
    }
  };

  const getCategoryMeta = (cat: DownloadCategory) => {
    return CATEGORIES.find((c) => c.key === cat) || CATEGORIES[0];
  };

  return (
    <div className="space-y-6 p-6">
      {/* ═══ Header Section ═══ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <Download className="w-3.5 h-3.5" /> ศูนย์ดาวน์โหลด (Downloads & Forms Center)
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            รายการเอกสารและแบบฟอร์มสำหรับดาวน์โหลด
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย • บริการเอกสารงานทะเบียน คำร้องนักเรียน และข้อบังคับโรงเรียน
          </p>
        </div>

        {canManage && (
          <Button
            onClick={openCreateDialog}
            className="gap-2 bg-blue-700 hover:bg-blue-800 text-white shadow-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            <Plus className="h-4 w-4" />
            เพิ่มรายการดาวน์โหลด
          </Button>
        )}
      </div>

      {/* ═══ Top Summary Statistics Cards ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => setSelectedCategory("ALL")}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            selectedCategory === "ALL"
              ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20"
              : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-80">เอกสารทั้งหมด</span>
            <Layers className="w-4 h-4 opacity-70" />
          </div>
          <div className="mt-2 text-2xl font-black font-mono">{stats.total}</div>
          <span className="text-[11px] opacity-70">ทุกหมวดหมู่ ({stats.totalDownloads} ดาวน์โหลด)</span>
        </div>

        <div
          onClick={() => setSelectedCategory("ACADEMIC_SERVICES")}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            selectedCategory === "ACADEMIC_SERVICES"
              ? "bg-blue-700 text-white border-blue-700 shadow-md ring-2 ring-blue-700/20"
              : "bg-white text-slate-800 border-slate-200 hover:border-blue-300 shadow-2xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-90">งานบริการการศึกษา</span>
            <GraduationCap className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-blue-600">{stats.academic}</div>
          <span className="text-[11px] opacity-70">คำร้อง ปพ.1, ปพ.7, ซ่อมเสริม</span>
        </div>

        <div
          onClick={() => setSelectedCategory("STUDENT_FORMS")}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            selectedCategory === "STUDENT_FORMS"
              ? "bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-700/20"
              : "bg-white text-slate-800 border-slate-200 hover:border-emerald-300 shadow-2xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-90">แบบฟอร์มสำหรับนักเรียน</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-emerald-600">{stats.students}</div>
          <span className="text-[11px] opacity-70">ใบลาเรียน, จิตอาสา, ชุมนุม</span>
        </div>

        <div
          onClick={() => setSelectedCategory("REGULATIONS")}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            selectedCategory === "REGULATIONS"
              ? "bg-purple-700 text-white border-purple-700 shadow-md ring-2 ring-purple-700/20"
              : "bg-white text-slate-800 border-slate-200 hover:border-purple-300 shadow-2xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-90">ประกาศข้อบังคับโรงเรียน</span>
            <Scroll className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-purple-600">{stats.regulations}</div>
          <span className="text-[11px] opacity-70">ระเบียบวินัย, เกณฑ์ประเมิน</span>
        </div>
      </div>

      {/* ═══ Filter Bar & Search Box ═══ */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              selectedCategory === "ALL"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Layers className="w-4 h-4" />
            ทั้งหมด ({items.length})
          </button>

          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count = items.filter((i) => i.category === cat.key).length;
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? cat.key === "ACADEMIC_SERVICES"
                      ? "bg-blue-700 text-white shadow-xs"
                      : cat.key === "STUDENT_FORMS"
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "bg-purple-700 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input & File Type Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* ช่องค้นหาเอกสารหรือแบบฟอร์มที่ต้องการ */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเอกสารหรือแบบฟอร์มที่ต้องการ... (พิมพ์ชื่อเอกสาร, รหัสแบบฟอร์ม, หรือคำอธิบาย)"
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                title="ล้างข้อความค้นหา"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* File Type Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> ชนิดไฟล์:
            </span>
            <select
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value as any)}
              className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="ALL">ทุกชนิดไฟล์</option>
              <option value="PDF">PDF (.pdf)</option>
              <option value="DOCX">Word (.docx)</option>
              <option value="XLSX">Excel (.xlsx)</option>
              <option value="ZIP">ZIP (.zip)</option>
            </select>
          </div>
        </div>

        {/* Filter results status indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div>
            แสดงผลลัพธ์{" "}
            <span className="font-bold text-slate-800">{filteredItems.length}</span> จาก{" "}
            <span className="font-bold text-slate-800">{items.length}</span> รายการ
            {searchQuery && (
              <span className="ml-1.5 text-blue-700 font-medium">
                (กรองด้วยคำค้นหา: &ldquo;{searchQuery}&rdquo;)
              </span>
            )}
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-blue-600 hover:underline font-semibold"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          )}
        </div>
      </div>

      {/* ═══ Document Table View ═══ */}
      <LiyonCard>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 min-w-[280px]">ชื่อเอกสาร / แบบฟอร์ม</th>
                <th className="py-3 px-4 w-44">หมวดหมู่</th>
                <th className="py-3 px-3 w-28 text-center">ชนิด / ขนาด</th>
                <th className="py-3 px-3 w-32 text-center">ปรับปรุงล่าสุด</th>
                <th className="py-3 px-3 w-24 text-center">ดาวน์โหลด</th>
                <th className="py-3 px-4 w-32 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Layers className="w-10 h-10 text-slate-300 stroke-1" />
                      <p className="text-sm font-semibold text-slate-600">
                        ไม่พบเอกสารหรือแบบฟอร์มที่ค้นหา
                      </p>
                      <p className="text-xs text-slate-400">
                        ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((doc, idx) => {
                  const catMeta = getCategoryMeta(doc.category);
                  const CatIcon = catMeta.icon;

                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Index */}
                      <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-400">
                        {idx + 1}
                      </td>

                      {/* Document Title & Description */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {doc.code && (
                              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                                {doc.code}
                              </span>
                            )}
                            <span className="font-bold text-slate-900 text-xs sm:text-sm hover:text-blue-700 transition-colors">
                              {doc.title}
                            </span>
                          </div>
                          {doc.description && (
                            <p className="text-xs text-slate-500 line-clamp-2">{doc.description}</p>
                          )}
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${catMeta.badgeClass}`}
                        >
                          <CatIcon className="w-3.5 h-3.5" />
                          <span>{catMeta.label}</span>
                        </span>
                      </td>

                      {/* File Type & Size */}
                      <td className="py-3.5 px-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getFileBadge(doc.fileType)}
                          <span className="text-[11px] font-mono text-slate-500">{doc.fileSize}</span>
                        </div>
                      </td>

                      {/* Updated Date */}
                      <td className="py-3.5 px-3 text-center text-xs text-slate-600 font-medium">
                        <div className="flex items-center justify-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{doc.updatedAt}</span>
                        </div>
                      </td>

                      {/* Download Stats */}
                      <td className="py-3.5 px-3 text-center">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {doc.downloadCount || 0} ครั้ง
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Download Button */}
                          <button
                            type="button"
                            onClick={() => handleTriggerDownload(doc)}
                            className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                            title="ดาวน์โหลดเอกสารนี้"
                          >
                            <ArrowDownToLine className="w-3.5 h-3.5" />
                            <span>ดาวน์โหลด</span>
                          </button>

                          {/* Edit / Delete Buttons for Managers */}
                          {canManage && (
                            <>
                              <button
                                type="button"
                                onClick={() => openEditDialog(doc)}
                                className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors"
                                title="แก้ไขข้อมูลแบบฟอร์ม"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmItem(doc)}
                                className="p-1.5 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors"
                                title="ลบแบบฟอร์มนี้"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </LiyonCard>

      {/* ═══════════════════════════════════════════════════════════════════════
          POPUP MODAL: ADD / EDIT DOWNLOAD DOCUMENT
      ═══════════════════════════════════════════════════════════════════════ */}
      <LiyonDialog open={modalOpen} onOpenChange={setModalOpen}>
        <LiyonDialogHeader
          title={editingItem ? "แก้ไขรายการเอกสารและแบบฟอร์ม" : "เพิ่มรายการดาวน์โหลดใหม่"}
          description="กรอกข้อมูลเอกสาร แบบฟอร์มคำร้อง และกำหนดหมวดหมู่ให้ถูกต้อง"
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2">
            {/* หมวดหมู่เอกสาร */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                หมวดหมู่เอกสารและแบบฟอร์ม *
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as DownloadCategory)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="ACADEMIC_SERVICES">🎓 งานบริการการศึกษา</option>
                <option value="STUDENT_FORMS">📝 แบบฟอร์มสำหรับนักเรียน</option>
                <option value="REGULATIONS">📜 ประกาศข้อบังคับโรงเรียนสาธิตฯ</option>
              </select>
            </div>

            {/* รหัสเอกสาร & ชนิดไฟล์ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  รหัสแบบฟอร์ม / เอกสาร
                </label>
                <input
                  type="text"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="เช่น REG-01/2568 หรือ STD-02"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  ชนิดไฟล์เอกสาร *
                </label>
                <select
                  value={formFileType}
                  onChange={(e) => setFormFileType(e.target.value as FileType)}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="PDF">เอกสาร PDF (.pdf)</option>
                  <option value="DOCX">Microsoft Word (.docx)</option>
                  <option value="XLSX">Microsoft Excel (.xlsx)</option>
                  <option value="ZIP">ไฟล์บีบอัด (.zip)</option>
                  <option value="OTHER">อื่นๆ / ไฟล์แนบ</option>
                </select>
              </div>
            </div>

            {/* ชื่อเอกสาร / แบบฟอร์ม */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                ชื่อเอกสาร / แบบฟอร์มคำร้อง *
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="เช่น คำร้องขอใบรับรองผลการเรียน (ปพ.1) หรือ แบบฟอร์มขอลาเรียน"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                required
              />
            </div>

            {/* คำอธิบายสังเขป */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                คำอธิบาย / รายละเอียดสังเขป
              </label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="เช่น สำหรับนักเรียนที่ประสงค์ขอหนังสือรับรองเพื่อศึกษาต่อ หรือข้อปฏิบัติในการยื่นคำร้อง"
                rows={2}
                className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-700"
              />
            </div>

            {/* ขนาดไฟล์ & แหล่งที่มาไฟล์ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">ขนาดไฟล์</label>
                <input
                  type="text"
                  value={formFileSize}
                  onChange={(e) => setFormFileSize(e.target.value)}
                  placeholder="เช่น 350 KB หรือ 1.4 MB"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  ลิงก์ไฟล์ดาวน์โหลด (URL / Path)
                </label>
                <input
                  type="text"
                  value={formFileUrl}
                  onChange={(e) => setFormFileUrl(e.target.value)}
                  placeholder="เช่น /downloads/doc-form.pdf หรือ Google Drive link"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono text-slate-600"
                />
              </div>
            </div>

            {/* สถานะการแสดงผล */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="docIsActive"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <label htmlFor="docIsActive" className="text-xs font-bold text-slate-700 cursor-pointer">
                เปิดให้ดาวน์โหลดทันที (เผยแพร่ต่อสาธารณะ)
              </label>
            </div>
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)} disabled={isPending}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold"
          >
            {isPending ? "กำลังบันทึก..." : editingItem ? "บันทึกการแก้ไข" : "เพิ่มรายการดาวน์โหลด"}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* ═══════════════════════════════════════════════════════════════════════
          POPUP MODAL: DELETE CONFIRMATION
      ═══════════════════════════════════════════════════════════════════════ */}
      <LiyonDialog
        open={!!deleteConfirmItem}
        onOpenChange={(open) => !open && setDeleteConfirmItem(null)}
      >
        <LiyonDialogHeader
          title="ยืนยันการลบเอกสารดาวน์โหลด"
          description="คุณต้องการลบแบบฟอร์ม/เอกสารนี้ออกจากระบบใช่หรือไม่?"
        />
        <LiyonDialogBody>
          {deleteConfirmItem && (
            <div className="p-4 bg-rose-50 text-rose-900 rounded-xl border border-rose-200 text-xs sm:text-sm space-y-1">
              <div className="font-bold">{deleteConfirmItem.title}</div>
              <div className="text-xs text-rose-700 font-mono">
                รหัส: {deleteConfirmItem.code || "-"} • หมวดหมู่:{" "}
                {getCategoryMeta(deleteConfirmItem.category).label}
              </div>
            </div>
          )}
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button
            variant="outline"
            onClick={() => setDeleteConfirmItem(null)}
            disabled={isPending}
          >
            ยกเลิก
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteConfirmItem && handleDelete(deleteConfirmItem)}
            disabled={isPending}
            className="font-semibold"
          >
            {isPending ? "กำลังลบ..." : "ยืนยันการลบ"}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
