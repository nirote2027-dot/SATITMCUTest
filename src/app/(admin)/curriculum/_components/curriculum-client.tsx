"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  AlertCircle,
  BookOpen,
  Network,
  Filter,
  FileText,
  UploadCloud,
  ExternalLink,
  Eye,
  Award,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  HelpCircle,
  Download,
  Upload,
  FileCode,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useT } from "@/shared/lib/i18n/client";
import {
  LiyonCard,
  DataTable,
  StatusPill,
  LiyonDialog,
  LiyonDialogCloseButton,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  RowMenuItem,
  type DataTableColumn,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  createCurriculumAction,
  updateCurriculumAction,
  deleteCurriculumAction,
  getCurriculaAction,
} from "@/features/curriculum/actions";

type CurriculumDto = {
  id: string;
  code: string;
  name: string;
  nameEn?: string | null;
  degreeLevel: string;
  degreeNameTh?: string | null;
  degreeNameEn?: string | null;
  curriculumYear?: string | null;
  durationYears?: number | null;
  departmentId?: string | null;
  department?: { id: string; name: string; code?: string | null } | null;
  totalCredits: number;
  geCredits?: number | null;
  majorCredits?: number | null;
  electiveCredits?: number | null;
  description: string | null;
  philosophy?: string | null;
  objectives?: string | null;
  careerProspects?: string | null;
  imageUrl?: string | null;
  pdfUrl?: string | null;
  isActive: boolean;
  createdAt: Date | string;
};

interface DepartmentOption {
  id: string;
  name: string;
  code?: string | null;
}

interface Props {
  initialItems: CurriculumDto[];
  departments: DepartmentOption[];
  canManage: boolean;
}

type ModalTab = "general" | "credits" | "highlights" | "media";

export function CurriculumClient({ initialItems, departments, canManage }: Props) {
  const t = useT();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<CurriculumDto[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>("ALL");

  useEffect(() => {
    const deptParam = searchParams.get("dept");
    if (deptParam) {
      setSelectedDeptFilter(deptParam);
    }
  }, [searchParams]);

  // Dialog states
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>("general");
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<CurriculumDto | null>(null);
  const [editingItem, setEditingItem] = useState<CurriculumDto | null>(null);
  const [viewingItem, setViewingItem] = useState<CurriculumDto | null>(null);

  // Form states - Tab 1: ข้อมูลทั่วไป
  const [formCode, setFormCode] = useState("");
  const [formName, setFormName] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formDegreeLevel, setFormDegreeLevel] = useState("มัธยมศึกษาตอนต้น (ม.1 - ม.3)");
  const [formDegreeNameTh, setFormDegreeNameTh] = useState("");
  const [formDegreeNameEn, setFormDegreeNameEn] = useState("");
  const [formCurriculumYear, setFormCurriculumYear] = useState("2551 (ปรับปรุง 2560)");
  const [formDepartmentId, setFormDepartmentId] = useState<string>("");

  // Form states - Tab 2: หน่วยกิตและระยะเวลา
  const [formDurationYears, setFormDurationYears] = useState<string | number>("3");
  const [formTotalCredits, setFormTotalCredits] = useState<string | number>("88");
  const [formGeCredits, setFormGeCredits] = useState<string | number>("66");
  const [formMajorCredits, setFormMajorCredits] = useState<string | number>("16");
  const [formElectiveCredits, setFormElectiveCredits] = useState<string | number>("6");

  // Form states - Tab 3: จุดเด่นและอาชีพ
  const [formPhilosophy, setFormPhilosophy] = useState("");
  const [formObjectives, setFormObjectives] = useState("");
  const [formCareerProspects, setFormCareerProspects] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // Form states - Tab 4: สื่อและเอกสารหลักสูตร
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formPdfUrl, setFormPdfUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState<string>("true");
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const handleExportJson = () => {
    const curriculumData = {
      code: formCode,
      name: formName,
      nameEn: formNameEn,
      degreeLevel: formDegreeLevel,
      degreeNameTh: formDegreeNameTh,
      degreeNameEn: formDegreeNameEn,
      curriculumYear: formCurriculumYear,
      departmentId: formDepartmentId || null,
      durationYears: Number(formDurationYears) || 4,
      totalCredits: Number(formTotalCredits) || 0,
      geCredits: formGeCredits !== "" ? Number(formGeCredits) : null,
      majorCredits: formMajorCredits !== "" ? Number(formMajorCredits) : null,
      electiveCredits: formElectiveCredits !== "" ? Number(formElectiveCredits) : null,
      philosophy: formPhilosophy,
      objectives: formObjectives,
      careerProspects: formCareerProspects,
      description: formDescription,
      imageUrl: formImageUrl,
      pdfUrl: formPdfUrl,
      isActive: formIsActive === "true",
      exportedAt: new Date().toISOString(),
    };

    const jsonString = JSON.stringify(curriculumData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeCode = (formCode || "curriculum").replace(/[^a-zA-Z0-9_-]/g, "_");
    link.href = url;
    link.setAttribute("download", `curriculum_${safeCode}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("ส่งออกข้อมูลหลักสูตรเป็น JSON เรียบร้อยแล้ว");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const data = JSON.parse(text);

        if (typeof data !== "object" || data === null) {
          throw new Error("รูปแบบไฟล์ JSON ไม่ถูกต้อง");
        }

        if (data.code !== undefined) setFormCode(String(data.code));
        if (data.name !== undefined) setFormName(String(data.name));
        if (data.nameEn !== undefined) setFormNameEn(String(data.nameEn ?? ""));
        if (data.degreeLevel !== undefined) setFormDegreeLevel(String(data.degreeLevel));
        if (data.degreeNameTh !== undefined) setFormDegreeNameTh(String(data.degreeNameTh ?? ""));
        if (data.degreeNameEn !== undefined) setFormDegreeNameEn(String(data.degreeNameEn ?? ""));
        if (data.curriculumYear !== undefined) setFormCurriculumYear(String(data.curriculumYear ?? ""));
        if (data.departmentId !== undefined) setFormDepartmentId(String(data.departmentId ?? ""));
        if (data.durationYears !== undefined) setFormDurationYears(data.durationYears ?? 4);
        if (data.totalCredits !== undefined) setFormTotalCredits(data.totalCredits ?? 0);
        if (data.geCredits !== undefined) setFormGeCredits(data.geCredits ?? "");
        if (data.majorCredits !== undefined) setFormMajorCredits(data.majorCredits ?? "");
        if (data.electiveCredits !== undefined) setFormElectiveCredits(data.electiveCredits ?? "");
        if (data.philosophy !== undefined) setFormPhilosophy(String(data.philosophy ?? ""));
        if (data.objectives !== undefined) setFormObjectives(String(data.objectives ?? ""));
        if (data.careerProspects !== undefined) setFormCareerProspects(String(data.careerProspects ?? ""));
        if (data.description !== undefined) setFormDescription(String(data.description ?? ""));
        if (data.imageUrl !== undefined) setFormImageUrl(String(data.imageUrl ?? ""));
        if (data.pdfUrl !== undefined) setFormPdfUrl(String(data.pdfUrl ?? ""));
        if (data.isActive !== undefined) setFormIsActive(data.isActive ? "true" : "false");

        toast.success("นำเข้าข้อมูลหลักสูตรจาก JSON เรียบร้อยแล้ว");
      } catch (err: any) {
        toast.error("ไม่สามารถอ่านไฟล์ JSON ได้: " + (err?.message || "รูปแบบไม่ถูกต้อง"));
      } finally {
        if (jsonInputRef.current) jsonInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const applyTemplate = (type: "JUNIOR" | "SENIOR_SCI" | "SENIOR_LANG") => {
    if (type === "JUNIOR") {
      setFormDegreeLevel("มัธยมศึกษาตอนต้น (ม.1 - ม.3)");
      setFormDurationYears("3");
      setFormTotalCredits("88");
      setFormGeCredits("66");
      setFormMajorCredits("16");
      setFormElectiveCredits("6");
      setFormCurriculumYear("2551 (ปรับปรุง 2560)");
      if (!formName) setFormName("หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนต้น (ม.1 - ม.3)");
      if (!formDegreeNameTh) setFormDegreeNameTh("ประกาศนียบัตรมัธยมศึกษาตอนต้น (ม.3)");
      if (!formDegreeNameEn) setFormDegreeNameEn("Certificate of Lower Secondary Education");
      toast.success("ใช้แม่แบบโครงสร้าง ม.ต้น (ม.1-3) รวม 88 นก. เรียบร้อยแล้ว");
    } else if (type === "SENIOR_SCI") {
      setFormDegreeLevel("มัธยมศึกษาตอนปลาย (ม.4 - ม.6)");
      setFormDurationYears("3");
      setFormTotalCredits("84");
      setFormGeCredits("41");
      setFormMajorCredits("37");
      setFormElectiveCredits("6");
      setFormCurriculumYear("2551 (ปรับปรุง 2560)");
      if (!formName) setFormName("หลักสูตรมัธยมศึกษาตอนปลาย แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์ (ม.4 - ม.6)");
      if (!formDegreeNameTh) setFormDegreeNameTh("ประกาศนียบัตรมัธยมศึกษาตอนปลาย (ม.6)");
      if (!formDegreeNameEn) setFormDegreeNameEn("Certificate of Senior Secondary Education");
      toast.success("ใช้แม่แบบโครงสร้าง ม.ปลาย แผนวิทย์-คณิต รวม 84 นก. เรียบร้อยแล้ว");
    } else if (type === "SENIOR_LANG") {
      setFormDegreeLevel("มัธยมศึกษาตอนปลาย (ม.4 - ม.6)");
      setFormDurationYears("3");
      setFormTotalCredits("82");
      setFormGeCredits("41");
      setFormMajorCredits("35");
      setFormElectiveCredits("6");
      setFormCurriculumYear("2551 (ปรับปรุง 2560)");
      if (!formName) setFormName("หลักสูตรมัธยมศึกษาตอนปลาย แผนการเรียนภาษา-สังคมศึกษาและพุทธศาสน์ศึกษา (ม.4 - ม.6)");
      if (!formDegreeNameTh) setFormDegreeNameTh("ประกาศนียบัตรมัธยมศึกษาตอนปลาย (ม.6)");
      if (!formDegreeNameEn) setFormDegreeNameEn("Certificate of Senior Secondary Education");
      toast.success("ใช้แม่แบบโครงสร้าง ม.ปลาย แผนศิลป์-ภาษา/พุทธศาสตร์ รวม 82 นก. เรียบร้อยแล้ว");
    }
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setActiveTab("general");
    setFormCode("");
    setFormName("");
    setFormNameEn("");
    setFormDegreeLevel("มัธยมศึกษาตอนต้น (ม.1 - ม.3)");
    setFormDegreeNameTh("ประกาศนียบัตรมัธยมศึกษาตอนต้น (ม.3)");
    setFormDegreeNameEn("Certificate of Lower Secondary Education");
    setFormCurriculumYear("2551 (ปรับปรุง 2560)");
    setFormDepartmentId(selectedDeptFilter !== "ALL" && selectedDeptFilter !== "NONE" ? selectedDeptFilter : "");
    setFormDurationYears("3");
    setFormTotalCredits("88");
    setFormGeCredits("66");
    setFormMajorCredits("16");
    setFormElectiveCredits("6");
    setFormPhilosophy("");
    setFormObjectives("");
    setFormCareerProspects("");
    setFormDescription("");
    setFormImageUrl("");
    setFormPdfUrl("");
    setFormIsActive("true");
    setModalOpen(true);
  };

  const openEditDialog = (item: CurriculumDto) => {
    setEditingItem(item);
    setActiveTab("general");
    setFormCode(item.code);
    setFormName(item.name);
    setFormNameEn(item.nameEn ?? "");
    setFormDegreeLevel(item.degreeLevel);
    setFormDegreeNameTh(item.degreeNameTh ?? "");
    setFormDegreeNameEn(item.degreeNameEn ?? "");
    setFormCurriculumYear(item.curriculumYear ?? "2567");
    setFormDepartmentId(item.departmentId ?? item.department?.id ?? "");
    setFormDurationYears(item.durationYears ?? 4);
    setFormTotalCredits(item.totalCredits);
    setFormGeCredits(item.geCredits ?? "");
    setFormMajorCredits(item.majorCredits ?? "");
    setFormElectiveCredits(item.electiveCredits ?? "");
    setFormPhilosophy(item.philosophy ?? "");
    setFormObjectives(item.objectives ?? "");
    setFormCareerProspects(item.careerProspects ?? "");
    setFormDescription(item.description ?? "");
    setFormImageUrl(item.imageUrl ?? "");
    setFormPdfUrl(item.pdfUrl ?? "");
    setFormIsActive(item.isActive ? "true" : "false");
    setModalOpen(true);
  };

  const refreshItems = async () => {
    const res = await getCurriculaAction();
    if (res.ok && res.data) {
      setItems(res.data as any);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("กรุณาเลือกไฟล์เอกสาร PDF เท่านั้น");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("ขนาดไฟล์เกินกำหนด (สูงสุด 10MB)");
      return;
    }

    setIsUploadingPdf(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.ok) {
        setFormPdfUrl(json.url);
        toast.success("อัปโหลดเอกสารหลักสูตรสำเร็จ");
      } else {
        toast.error(json.error || "ไม่สามารถอัปโหลดไฟล์ได้");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาดในการอัปโหลดไฟล์");
    } finally {
      setIsUploadingPdf(false);
      if (pdfInputRef.current) pdfInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!formCode.trim() || !formName.trim() || !formDegreeLevel.trim() || formTotalCredits === "") {
      toast.error("กรุณากรอกรหัส ชื่อหลักสูตร และจำนวนหน่วยกิตให้ครบถ้วน");
      return;
    }

    startTransition(async () => {
      const payload = {
        code: formCode.trim(),
        name: formName.trim(),
        nameEn: formNameEn.trim() || null,
        degreeLevel: formDegreeLevel.trim(),
        degreeNameTh: formDegreeNameTh.trim() || null,
        degreeNameEn: formDegreeNameEn.trim() || null,
        curriculumYear: formCurriculumYear.trim() || null,
        durationYears: formDurationYears ? Number(formDurationYears) : 4,
        departmentId: formDepartmentId || null,
        totalCredits: Number(formTotalCredits),
        geCredits: formGeCredits ? Number(formGeCredits) : null,
        majorCredits: formMajorCredits ? Number(formMajorCredits) : null,
        electiveCredits: formElectiveCredits ? Number(formElectiveCredits) : null,
        description: formDescription.trim() || null,
        philosophy: formPhilosophy.trim() || null,
        objectives: formObjectives.trim() || null,
        careerProspects: formCareerProspects.trim() || null,
        imageUrl: formImageUrl.trim() || null,
        pdfUrl: formPdfUrl.trim() || null,
        isActive: formIsActive === "true",
      };

      if (editingItem) {
        const res = await updateCurriculumAction({
          id: editingItem.id,
          ...payload,
        });
        if (res.ok) {
          toast.success("แก้ไขหลักสูตรเรียบร้อยแล้ว");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถแก้ไขหลักสูตรได้");
        }
      } else {
        const res = await createCurriculumAction(payload as any);
        if (res.ok) {
          toast.success("เพิ่มหลักสูตรใหม่เรียบร้อยแล้ว");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถเพิ่มหลักสูตรได้ (อาจมีรหัสซ้ำ)");
        }
      }
    });
  };

  const handleDelete = (item: CurriculumDto) => {
    startTransition(async () => {
      const res = await deleteCurriculumAction(item.id);
      if (res.ok) {
        toast.success("ลบหลักสูตรเรียบร้อยแล้ว");
        setDeleteConfirmItem(null);
        await refreshItems();
      } else {
        toast.error("ไม่สามารถลบหลักสูตรได้");
      }
    });
  };

  // Filtered items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.nameEn && item.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.department?.name && item.department.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept =
      selectedDeptFilter === "ALL"
        ? true
        : selectedDeptFilter === "NONE"
        ? !item.departmentId && !item.department
        : item.departmentId === selectedDeptFilter || item.department?.id === selectedDeptFilter;

    return matchesSearch && matchesDept;
  });

  const columns: DataTableColumn<CurriculumDto>[] = [
    {
      key: "imageUrl",
      header: "ภาพปก",
      className: "w-16 text-center",
      render: (row) =>
        row.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.imageUrl}
            alt={row.name}
            className="w-11 h-11 object-cover rounded-xl border border-slate-200 shadow-xs inline-block"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 inline-block">
            <BookOpen className="w-5 h-5" />
          </div>
        ),
    },
    {
      key: "code",
      header: "รหัส/ปี",
      className: "nowrap font-mono text-xs font-semibold text-primary",
      render: (row) => (
        <div className="space-y-1">
          <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 block w-fit">
            {row.code}
          </span>
          {row.curriculumYear && (
            <span className="text-[10px] text-muted-foreground block font-sans">
              หลักสูตร พ.ศ. {row.curriculumYear}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "name",
      header: "ชื่อหลักสูตร / ปริญญา",
      render: (row) => (
        <div className="max-w-md">
          <div className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">{row.name}</div>
          {row.nameEn && (
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium italic mt-0.5">
              {row.nameEn}
            </div>
          )}
          {row.degreeNameTh && (
            <div className="text-[11px] text-primary/80 mt-1 flex items-center gap-1 font-sans">
              <GraduationCap className="w-3 h-3 flex-shrink-0" />
              <span>{row.degreeNameTh}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "department",
      header: "ภาควิชา / ส่วนงาน",
      render: (row) =>
        row.department ? (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1">
            <Network className="w-3 h-3 text-primary" />
            {row.department.name}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground italic">—</span>
        ),
    },
    {
      key: "totalCredits",
      header: "โครงสร้างหน่วยกิต",
      className: "nowrap text-center",
      render: (row) => (
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
            {row.totalCredits} นก. ({row.durationYears ?? 4} ปี)
          </span>
          {(row.geCredits || row.majorCredits || row.electiveCredits) && (
            <div className="text-[10px] text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded border border-border/40 inline-block font-mono">
              {row.geCredits ?? 0}/{row.majorCredits ?? 0}/{row.electiveCredits ?? 0}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "pdfUrl",
      header: "เอกสารหลักสูตร",
      className: "nowrap text-center",
      render: (row) =>
        row.pdfUrl ? (
          <a
            href={row.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900 hover:bg-red-100 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>เอกสารหลักสูตร</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        ) : (
          <span className="text-[11px] text-muted-foreground/60 italic">—</span>
        ),
    },
    {
      key: "isActive",
      header: "สถานะ",
      className: "nowrap",
      render: (row) => (
        <StatusPill tone={row.isActive ? ("positive" as any) : "neutral"}>
          {row.isActive ? "เปิดสอน" : "ปิดรับสมัคร"}
        </StatusPill>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            {t("curriculum.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            บริหารจัดการข้อมูลหลักสูตร โครงสร้างหน่วยกิต และเอกสารหลักสูตร เพื่อเผยแพร่สู่สาธารณะ
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/department">
            <Button variant="outline" size="sm" className="gap-2">
              <Network className="w-4 h-4 text-primary" />
              จัดการภาควิชา/ส่วนงาน
            </Button>
          </Link>
          {canManage && (
            <Button onClick={openCreateDialog} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              เพิ่มหลักสูตรใหม่
            </Button>
          )}
        </div>
      </div>

      <LiyonCard className="p-0 overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-border/40 flex flex-col sm:flex-row gap-3 justify-between items-center bg-muted/20">
          <div className="flex flex-1 w-full sm:w-auto gap-3 items-center">
            <input
              type="text"
              placeholder="ค้นหาชื่อไทย, English, รหัส หรือภาควิชา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 w-full max-w-sm"
            />
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="ALL">ทุกภาควิชา / ส่วนงาน ({items.length})</option>
                <option value="NONE">
                  ยังไม่ระบุภาควิชา ({items.filter((i) => !i.departmentId && !i.department).length})
                </option>
                {departments.map((dept) => {
                  const count = items.filter(
                    (i) => i.departmentId === dept.id || i.department?.id === dept.id
                  ).length;
                  return (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} ({count})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            แสดง {filteredItems.length} จากทั้งหมด {items.length} หลักสูตร
          </div>
        </div>

        <DataTable<CurriculumDto>
          headHeading="สารบบหลักสูตร (Curriculum Database)"
          state={filteredItems.length === 0 ? "empty" : "data"}
          rows={filteredItems}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={(row) => (
            <>
              <RowMenuItem onSelect={() => setViewingItem(row)} icon={<Eye className="h-4 w-4" />}>
                ดูรายละเอียดหลักสูตร
              </RowMenuItem>
              {canManage && (
                <>
                  <RowMenuItem onSelect={() => openEditDialog(row)} icon={<Edit2 className="h-4 w-4" />}>
                    แก้ไขข้อมูล
                  </RowMenuItem>
                  <RowMenuItem onSelect={() => setDeleteConfirmItem(row)} danger icon={<Trash2 className="h-4 w-4" />}>
                    ลบหลักสูตร
                  </RowMenuItem>
                </>
              )}
            </>
          )}
          empty={{
            icon: <Layers className="h-10 w-10 text-muted-foreground/50" />,
            title: "ไม่พบข้อมูลหลักสูตรที่ตรงกับเงื่อนไข",
            description: "ลองเปลี่ยนคำค้นหา หรือกดปุ่ม 'เพิ่มหลักสูตรใหม่'",
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
          }}
        />
      </LiyonCard>

      {/* Add / Edit Dialog with 4 Tabs */}
      <LiyonDialog open={modalOpen} onOpenChange={setModalOpen} wide>
        <LiyonDialogCloseButton label="ปิดหน้าต่าง" />
        <LiyonDialogHeader
          title={editingItem ? "แก้ไขหลักสูตรสถานศึกษา" : "เพิ่มหลักสูตรสถานศึกษาใหม่"}
          description="กรอกข้อมูลหลักสูตรสำหรับบันทึกในฐานข้อมูลและเผยแพร่ผ่าน Portal"
        />
        <LiyonDialogBody className="max-h-[70vh] sm:max-h-[75vh] overflow-y-auto overscroll-contain pr-1">
          <div className="space-y-4 py-1">
            {/* Tab Navigation and JSON Import/Export */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/60 pb-1 gap-2">
              <div className="flex gap-2 overflow-x-auto text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("general")}
                  className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "general"
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  1. ข้อมูลทั่วไป
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("credits")}
                  className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "credits"
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  2. หน่วยกิตและระยะเวลา
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("highlights")}
                  className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "highlights"
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  3. ปรัชญาและอาชีพ
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("media")}
                  className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "media"
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  4. เอกสารและสื่อ
                </button>
              </div>

              {/* JSON Import/Export Actions */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto mb-1">
                <input
                  ref={jsonInputRef}
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportJson}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => jsonInputRef.current?.click()}
                  className="h-7 text-[11px] px-2 gap-1"
                  title="นำเข้าข้อมูลจากไฟล์ JSON มากรอกลงในฟอร์มนี้"
                >
                  <Upload className="w-3 h-3 text-primary" />
                  <span>Import JSON</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExportJson}
                  className="h-7 text-[11px] px-2 gap-1"
                  title="ดาวน์โหลดข้อมูลหลักสูตรนี้ออกไปเป็นไฟล์ JSON"
                >
                  <Download className="w-3 h-3 text-primary" />
                  <span>Export JSON</span>
                </Button>
              </div>
            </div>

            {/* Quick Template Preset Bar */}
            <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                แม่แบบโครงสร้างเวลาเรียนตามเกณฑ์แกนกลาง:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => applyTemplate("JUNIOR")}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 text-[11px] text-blue-800 dark:text-blue-200 font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  ม.ต้น (ม.1-3) 88 นก.
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate("SENIOR_SCI")}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 text-[11px] text-blue-800 dark:text-blue-200 font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  ม.ปลาย วิทย์-คณิต 84 นก.
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate("SENIOR_LANG")}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 text-[11px] text-blue-800 dark:text-blue-200 font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  ม.ปลาย ศิลป์-ภาษา 82 นก.
                </button>
              </div>
            </div>

            {/* TAB 1: General Info */}
            {activeTab === "general" && (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      รหัสหลักสูตร <span className="text-destructive">*</span>
                    </label>
                    <input
                      value={formCode}
                      onChange={(e) => setFormCode(e.target.value)}
                      placeholder="เช่น CURR-JHS-2568 หรือ CURR-SHS-SCI"
                      className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      ระดับการศึกษา <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={formDegreeLevel}
                      onChange={(e) => setFormDegreeLevel(e.target.value)}
                      className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="มัธยมศึกษาตอนต้น (ม.1 - ม.3)">มัธยมศึกษาตอนต้น (ม.1 - ม.3)</option>
                      <option value="มัธยมศึกษาตอนปลาย (ม.4 - ม.6)">มัธยมศึกษาตอนปลาย (ม.4 - ม.6)</option>
                      <option value="มัธยมศึกษาตอนต้น">มัธยมศึกษาตอนต้น</option>
                      <option value="มัธยมศึกษาตอนปลาย">มัธยมศึกษาตอนปลาย</option>
                      <option value="ปริญญาตรี (4 ปี)">ปริญญาตรี (4 ปี)</option>
                      <option value="ปริญญาโท (2 ปี)">ปริญญาโท (2 ปี)</option>
                      <option value="ประกาศนียบัตรวิชาชีพ (ปวช.)">ประกาศนียบัตรวิชาชีพ (ปวช.)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      ปีหลักสูตร (พ.ศ.)
                    </label>
                    <input
                      value={formCurriculumYear}
                      onChange={(e) => setFormCurriculumYear(e.target.value)}
                      placeholder="เช่น 2567"
                      className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    ภาควิชา / ส่วนงานที่สังกัด (Department)
                  </label>
                  <select
                    value={formDepartmentId}
                    onChange={(e) => setFormDepartmentId(e.target.value)}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">— ไม่ระบุ / เป็นหลักสูตรกลางของสถาบัน —</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name} {dept.code ? `(${dept.code})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      ชื่อหลักสูตร (ภาษาไทย) <span className="text-destructive">*</span>
                    </label>
                    <input
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="เช่น หลักสูตรพุทธศาสตรบัณฑิต สาขาวิชาพระพุทธศาสนา"
                      className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      ชื่อหลักสูตร (English)
                    </label>
                    <input
                      value={formNameEn}
                      onChange={(e) => setFormNameEn(e.target.value)}
                      placeholder="e.g. Bachelor of Arts Program in Buddhism"
                      className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      ชื่อปริญญา (ภาษาไทย)
                    </label>
                    <input
                      value={formDegreeNameTh}
                      onChange={(e) => setFormDegreeNameTh(e.target.value)}
                      placeholder="เช่น พุทธศาสตรบัณฑิต (พระพุทธศาสนา)"
                      className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      ชื่อปริญญา (English)
                    </label>
                    <input
                      value={formDegreeNameEn}
                      onChange={(e) => setFormDegreeNameEn(e.target.value)}
                      placeholder="e.g. Bachelor of Arts (Buddhism)"
                      className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Credits & Structure */}
            {activeTab === "credits" && (
              <div className="space-y-4 pt-1">
                <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300">
                  <span className="font-semibold">โครงสร้างเวลาเรียนตามหลักสูตรแกนกลางฯ:</span>{" "}
                  มัธยมศึกษาตอนต้น เวลาเรียนพื้นฐาน 66 นก. (รวม 3 ปี 2,640 ชม.) / มัธยมศึกษาตอนปลาย เวลาเรียนพื้นฐาน 41 นก. (1,640 ชม.) และวิชาเพิ่มเติมตามแผนการเรียน
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      ระยะเวลาศึกษาตามแผน (ปี)
                    </label>
                    <input
                      type="number"
                      value={formDurationYears}
                      onChange={(e) => setFormDurationYears(e.target.value)}
                      placeholder="เช่น 3"
                      className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      จำนวนหน่วยกิตรวมตลอดหลักสูตร <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="number"
                      value={formTotalCredits}
                      onChange={(e) => setFormTotalCredits(e.target.value)}
                      placeholder="เช่น 88 (ม.ต้น) หรือ 84 (ม.ปลาย)"
                      className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold text-primary"
                      required
                    />
                  </div>
                </div>

                <div className="border border-border/70 rounded-xl p-3.5 bg-muted/10 space-y-3">
                  <div className="text-xs font-bold text-foreground">โครงสร้างหมวดวิชา (Credit Breakdown)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1">
                        1. รายวิชาพื้นฐาน (8 กลุ่มสาระ)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formGeCredits}
                          onChange={(e) => setFormGeCredits(e.target.value)}
                          placeholder="เช่น 66 (ม.ต้น) หรือ 41 (ม.ปลาย)"
                          className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 pr-10"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">นก.</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1">
                        2. รายวิชาเพิ่มเติม / ตามแผนการเรียน
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formMajorCredits}
                          onChange={(e) => setFormMajorCredits(e.target.value)}
                          placeholder="เช่น 16 (ม.ต้น) หรือ 37 (ม.ปลาย)"
                          className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 pr-10"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">นก.</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1">
                        3. วิชาเลือกเสรี / กิจกรรมพัฒนาผู้เรียน
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formElectiveCredits}
                          onChange={(e) => setFormElectiveCredits(e.target.value)}
                          placeholder="เช่น 6"
                          className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 pr-10"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">นก.</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculated sum indicator */}
                  {(() => {
                    const ge = Number(formGeCredits) || 0;
                    const major = Number(formMajorCredits) || 0;
                    const elective = Number(formElectiveCredits) || 0;
                    const total = Number(formTotalCredits) || 0;
                    const sum = ge + major + elective;
                    const isMatched = sum === total && total > 0;

                    return (
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-border/40">
                        <span className="text-muted-foreground">
                          ผลรวมหน่วยกิตหมวดวิชา: <strong className="text-foreground">{sum}</strong> นก.
                        </span>
                        {isMatched ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> ตรงกับหน่วยกิตรวม
                          </span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400">
                            (รวมย่อย {sum} นก. / หน่วยกิตรวมระบุไว้ {total} นก.)
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* TAB 3: Philosophy, Objectives & Careers */}
            {activeTab === "highlights" && (
              <div className="space-y-3.5 pt-1">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    ปรัชญาและความสำคัญของหลักสูตร (หมวดที่ 2)
                  </label>
                  <textarea
                    value={formPhilosophy}
                    onChange={(e) => setFormPhilosophy(e.target.value)}
                    placeholder="ระบุปรัชญา วิสัยทัศน์ หรือความสำคัญในการผลิตบัณฑิต..."
                    rows={2}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    วัตถุประสงค์ของหลักสูตร
                  </label>
                  <textarea
                    value={formObjectives}
                    onChange={(e) => setFormObjectives(e.target.value)}
                    placeholder="เช่น 1. เพื่อผลิตบัณฑิตที่มีคุณธรรม จริยธรรม 2. มีความรู้เชี่ยวชาญในวิชาชีพ..."
                    rows={2}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    อาชีพที่สามารถประกอบได้หลังสำเร็จการศึกษา (Career Prospects)
                  </label>
                  <textarea
                    value={formCareerProspects}
                    onChange={(e) => setFormCareerProspects(e.target.value)}
                    placeholder="เช่น ครู/อาจารย์สอนวิชาพระพุทธศาสนา, นักวิชาการศาสนา, เจ้าหน้าที่องค์กรการกุศล หรือธุรกิจส่วนตัว..."
                    rows={2}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    คำอธิบายย่อ (สำหรับแสดงหน้า Portal)
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="สรุปจุดเด่นหรือเนื้อหาสำคัญสั้นๆ..."
                    rows={2}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Media, PDF & Status */}
            {activeTab === "media" && (
              <div className="space-y-4 pt-1">
                <ImageUpload
                  value={formImageUrl}
                  onChange={(url) => setFormImageUrl(url)}
                  label="ภาพประกอบหลักสูตร / โลโก้สาขาวิชา"
                />

                {/* PDF Upload */}
                <div className="border border-border/70 rounded-xl p-4 bg-muted/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-foreground block">
                        ไฟล์เล่มหลักสูตรสถานศึกษา (PDF)
                      </label>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        แนบไฟล์ PDF เพื่อให้นักเรียน ผู้ปกครอง บุคลากร และประชาชนสามารถดาวน์โหลดอ่านได้
                      </p>
                    </div>
                    {formPdfUrl && (
                      <a
                        href={formPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        เปิดดูไฟล์ปัจจุบัน
                      </a>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      ref={pdfInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                      id="pdf-upload-input"
                    />
                    <label htmlFor="pdf-upload-input" className="w-full sm:w-auto">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isUploadingPdf}
                        className="w-full sm:w-auto gap-2 cursor-pointer"
                        asChild
                      >
                        <span>
                          <UploadCloud className="w-4 h-4 text-primary" />
                          {isUploadingPdf ? "กำลังอัปโหลด..." : "เลือกไฟล์ PDF เพื่ออัปโหลด"}
                        </span>
                      </Button>
                    </label>

                    <div className="flex-1 w-full">
                      <input
                        value={formPdfUrl}
                        onChange={(e) => setFormPdfUrl(e.target.value)}
                        placeholder="หรือระบุ URL ไฟล์ PDF เช่น /uploads/tqf2.pdf"
                        className="w-full text-xs px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    สถานะการเปิดรับสมัคร / เปิดสอน
                  </label>
                  <select
                    value={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.value)}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="true">เปิดรับสมัคร / กำลังเปิดสอน (Active)</option>
                    <option value="false">ปิดรับสมัครชั่วคราว (Inactive)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-muted-foreground">
              {activeTab === "general" && "ขั้นตอน 1/4: ข้อมูลพื้นฐาน"}
              {activeTab === "credits" && "ขั้นตอน 2/4: โครงสร้างหลักสูตร"}
              {activeTab === "highlights" && "ขั้นตอน 3/4: จุดเด่นและอาชีพ"}
              {activeTab === "media" && "ขั้นตอน 4/4: เอกสารและสื่อ"}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)} disabled={isPending}>
                ยกเลิก
              </Button>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
              </Button>
            </div>
          </div>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* TQF 2 Quick View Dossier Dialog */}
      <LiyonDialog open={!!viewingItem} onOpenChange={(open) => !open && setViewingItem(null)} wide>
        <LiyonDialogCloseButton label="ปิดหน้าต่าง" />
        <LiyonDialogHeader
          title="รายละเอียดเอกสารหลักสูตรสถานศึกษา"
          description={`รหัส ${viewingItem?.code} • ${viewingItem?.degreeLevel} • ปีหลักสูตร ${viewingItem?.curriculumYear || "2551 (ปรับปรุง 2560)"}`}
        />
        <LiyonDialogBody className="max-h-[70vh] sm:max-h-[75vh] overflow-y-auto overscroll-contain pr-1">
          {viewingItem && (
            <div className="space-y-4 py-2">
              {/* Header card with Cover and Title */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/20 border border-border/60">
                {viewingItem.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={viewingItem.imageUrl}
                    alt={viewingItem.name}
                    className="w-16 h-16 object-cover rounded-xl border border-border shadow-xs flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <BookOpen className="w-8 h-8" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {viewingItem.code}
                    </span>
                    {viewingItem.department && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {viewingItem.department.name}
                      </span>
                    )}
                    <StatusPill tone={viewingItem.isActive ? ("positive" as any) : "neutral"}>
                      {viewingItem.isActive ? "เปิดสอน" : "ปิดรับสมัคร"}
                    </StatusPill>
                  </div>
                  <h3 className="text-base font-bold text-foreground mt-1">{viewingItem.name}</h3>
                  {viewingItem.nameEn && (
                    <p className="text-xs text-muted-foreground italic font-medium">{viewingItem.nameEn}</p>
                  )}
                  {viewingItem.degreeNameTh && (
                    <p className="text-xs text-primary font-medium mt-1">
                      ปริญญา: {viewingItem.degreeNameTh} {viewingItem.degreeNameEn ? `(${viewingItem.degreeNameEn})` : ""}
                    </p>
                  )}
                </div>
              </div>

              {/* Credit Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-background border border-border text-center">
                  <span className="text-[11px] text-muted-foreground block">หน่วยกิตรวม</span>
                  <span className="text-lg font-bold text-primary">{viewingItem.totalCredits} นก.</span>
                  <span className="text-[10px] text-muted-foreground block">{viewingItem.durationYears ?? 4} ปี</span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border text-center">
                  <span className="text-[11px] text-muted-foreground block">ศึกษาทั่วไป (GE)</span>
                  <span className="text-lg font-bold text-foreground">{viewingItem.geCredits ?? "—"}</span>
                  <span className="text-[10px] text-muted-foreground block">หน่วยกิต</span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border text-center">
                  <span className="text-[11px] text-muted-foreground block">วิชาเฉพาะ/เอก</span>
                  <span className="text-lg font-bold text-foreground">{viewingItem.majorCredits ?? "—"}</span>
                  <span className="text-[10px] text-muted-foreground block">หน่วยกิต</span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border text-center">
                  <span className="text-[11px] text-muted-foreground block">วิชาเลือกเสรี</span>
                  <span className="text-lg font-bold text-foreground">{viewingItem.electiveCredits ?? "—"}</span>
                  <span className="text-[10px] text-muted-foreground block">หน่วยกิต</span>
                </div>
              </div>

              {/* Philosophy & Objectives */}
              {viewingItem.philosophy && (
                <div className="p-3.5 rounded-xl border border-border/70 bg-muted/10 space-y-1">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-primary" />
                    ปรัชญาและความสำคัญของหลักสูตร
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                    {viewingItem.philosophy}
                  </p>
                </div>
              )}

              {viewingItem.objectives && (
                <div className="p-3.5 rounded-xl border border-border/70 bg-muted/10 space-y-1">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-primary" />
                    วัตถุประสงค์ของหลักสูตร
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-5 whitespace-pre-line">
                    {viewingItem.objectives}
                  </p>
                </div>
              )}

              {viewingItem.careerProspects && (
                <div className="p-3.5 rounded-xl border border-border/70 bg-muted/10 space-y-1">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                    อาชีพที่สามารถประกอบได้หลังสำเร็จการศึกษา
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                    {viewingItem.careerProspects}
                  </p>
                </div>
              )}

              {/* PDF Banner */}
              {viewingItem.pdfUrl ? (
                <div className="p-4 rounded-xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-red-950 dark:text-red-200">
                        เอกสารหลักสูตรฉบับสมบูรณ์
                      </div>
                      <div className="text-[11px] text-red-700 dark:text-red-400">
                        พร้อมให้เปิดอ่านหรือดาวน์โหลดในรูปแบบ PDF
                      </div>
                    </div>
                  </div>
                  <a
                    href={viewingItem.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>ดาวน์โหลด PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="text-center py-2 text-xs text-muted-foreground italic">
                  ยังไม่ได้แนบไฟล์เอกสารหลักสูตร (PDF)
                </div>
              )}
            </div>
          )}
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setViewingItem(null)}>
            ปิด
          </Button>
          {canManage && viewingItem && (
            <Button
              onClick={() => {
                const item = viewingItem;
                setViewingItem(null);
                openEditDialog(item);
              }}
              className="gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              แก้ไขข้อมูล
            </Button>
          )}
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* Delete Dialog */}
      <LiyonDialog open={!!deleteConfirmItem} onOpenChange={(open) => !open && setDeleteConfirmItem(null)} danger>
        <LiyonDialogCloseButton label="ปิดหน้าต่าง" />
        <LiyonDialogHeader
          title="ยืนยันการลบหลักสูตร"
          description="คุณต้องการลบหลักสูตรนี้ใช่หรือไม่?"
        />
        <LiyonDialogBody>
          <div className="p-3 bg-red-500/10 text-destructive rounded-xl border border-red-500/20 text-sm font-medium">
            {deleteConfirmItem?.name} ({deleteConfirmItem?.code})
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setDeleteConfirmItem(null)} disabled={isPending}>
            ยกเลิก
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteConfirmItem && handleDelete(deleteConfirmItem)}
            disabled={isPending}
          >
            {isPending ? "กำลังลบ..." : "ยืนยันการลบ"}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
