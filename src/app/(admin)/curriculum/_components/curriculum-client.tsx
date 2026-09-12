"use client";

import { useState, useTransition, useEffect } from "react";
import { Plus, Edit2, Trash2, Layers, AlertCircle, BookOpen, Network, Filter } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useT, useLocale } from "@/shared/lib/i18n/client";
import { formatDate } from "@/shared/lib/format";
import {
  LiyonCard,
  DataTable,
  StatusPill,
  LiyonDialog,
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
  degreeLevel: string;
  departmentId?: string | null;
  department?: { id: string; name: string; code?: string | null } | null;
  totalCredits: number;
  description: string | null;
  imageUrl?: string | null;
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

export function CurriculumClient({ initialItems, departments, canManage }: Props) {
  const t = useT();
  const locale = useLocale();
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
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<CurriculumDto | null>(null);
  const [editingItem, setEditingItem] = useState<CurriculumDto | null>(null);

  const [formCode, setFormCode] = useState("");
  const [formName, setFormName] = useState("");
  const [formDegreeLevel, setFormDegreeLevel] = useState("ปริญญาตรี (4 ปี)");
  const [formDepartmentId, setFormDepartmentId] = useState<string>("");
  const [formTotalCredits, setFormTotalCredits] = useState<string | number>("130");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState<string>("true");

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormCode("");
    setFormName("");
    setFormDegreeLevel("ปริญญาตรี (4 ปี)");
    setFormDepartmentId(selectedDeptFilter !== "ALL" && selectedDeptFilter !== "NONE" ? selectedDeptFilter : "");
    setFormTotalCredits("130");
    setFormDescription("");
    setFormImageUrl("");
    setFormIsActive("true");
    setModalOpen(true);
  };

  const openEditDialog = (item: CurriculumDto) => {
    setEditingItem(item);
    setFormCode(item.code);
    setFormName(item.name);
    setFormDegreeLevel(item.degreeLevel);
    setFormDepartmentId(item.departmentId ?? item.department?.id ?? "");
    setFormTotalCredits(item.totalCredits);
    setFormDescription(item.description ?? "");
    setFormImageUrl(item.imageUrl ?? "");
    setFormIsActive(item.isActive ? "true" : "false");
    setModalOpen(true);
  };

  const refreshItems = async () => {
    const res = await getCurriculaAction();
    if (res.ok && res.data) {
      setItems(res.data as any);
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
        degreeLevel: formDegreeLevel.trim(),
        departmentId: formDepartmentId || null,
        totalCredits: Number(formTotalCredits),
        description: formDescription.trim() || undefined,
        imageUrl: formImageUrl.trim() || null,
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
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.department?.name && item.department.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept =
      selectedDeptFilter === "ALL"
        ? true
        : selectedDeptFilter === "NONE"
        ? !item.departmentId && !item.department
        : (item.departmentId === selectedDeptFilter || item.department?.id === selectedDeptFilter);

    return matchesSearch && matchesDept;
  });

  const columns: DataTableColumn<CurriculumDto>[] = [
    {
      key: "imageUrl",
      header: "ภาพปก/ไอคอน",
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
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 inline-block">
            <BookOpen className="w-5 h-5" />
          </div>
        ),
    },
    {
      key: "code",
      header: "รหัส",
      className: "nowrap font-mono text-xs font-semibold text-primary",
      render: (row) => (
        <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
          {row.code}
        </span>
      ),
    },
    {
      key: "name",
      header: "ชื่อหลักสูตร",
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-slate-100">{row.name}</div>
          {row.description && <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{row.description}</div>}
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
      key: "degreeLevel",
      header: "ระดับการศึกษา",
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
          {row.degreeLevel}
        </span>
      ),
    },
    {
      key: "totalCredits",
      header: "หน่วยกิตรวม",
      className: "nowrap text-center",
      render: (row) => <span className="text-xs font-medium">{row.totalCredits} นก.</span>,
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
            {t("curriculum.subtitle")}
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
              placeholder="ค้นหาชื่อ, รหัส หรือภาควิชา..."
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
          headHeading="รายการหลักสูตร"
          state={filteredItems.length === 0 ? "empty" : "data"}
          rows={filteredItems}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={
            canManage
              ? (row) => (
                  <>
                    <RowMenuItem onSelect={() => openEditDialog(row)} icon={<Edit2 className="h-4 w-4" />}>
                      แก้ไขข้อมูล
                    </RowMenuItem>
                    <RowMenuItem onSelect={() => setDeleteConfirmItem(row)} danger icon={<Trash2 className="h-4 w-4" />}>
                      ลบหลักสูตร
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
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

      {/* Add / Edit Dialog */}
      <LiyonDialog open={modalOpen} onOpenChange={setModalOpen}>
        <LiyonDialogHeader
          title={editingItem ? "แก้ไขหลักสูตร" : "เพิ่มหลักสูตรใหม่"}
          description="กรอกข้อมูลหลักสูตร สังกัดภาควิชา/ส่วนงาน จำนวนหน่วยกิต และภาพประกอบ"
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2">
            <ImageUpload
              value={formImageUrl}
              onChange={(url) => setFormImageUrl(url)}
              label="ภาพประกอบหลักสูตร / โลโก้สาขาวิชา"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  รหัสหลักสูตร <span className="text-destructive">*</span>
                </label>
                <input
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="เช่น B.Ed.01"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  ระดับการศึกษา <span className="text-destructive">*</span>
                </label>
                <select
                  value={formDegreeLevel}
                  onChange={(e) => setFormDegreeLevel(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="ปริญญาตรี (4 ปี)">ปริญญาตรี (4 ปี)</option>
                  <option value="ปริญญาโท (2 ปี)">ปริญญาโท (2 ปี)</option>
                  <option value="ปริญญาเอก (3 ปี)">ปริญญาเอก (3 ปี)</option>
                  <option value="ประกาศนียบัตร">ประกาศนียบัตร</option>
                  <option value="มัธยมศึกษาตอนปลาย">มัธยมศึกษาตอนปลาย</option>
                  <option value="มัธยมศึกษาตอนต้น">มัธยมศึกษาตอนต้น</option>
                </select>
              </div>
            </div>

            {/* Department Assignment */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                ภาควิชา / ส่วนงานที่สังกัด (Department)
              </label>
              <select
                value={formDepartmentId}
                onChange={(e) => setFormDepartmentId(e.target.value)}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">— ไม่ระบุ / เป็นหลักสูตรกลางของโรงเรียน —</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} {dept.code ? `(${dept.code})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  ชื่อหลักสูตร <span className="text-destructive">*</span>
                </label>
                <input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="เช่น แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  หน่วยกิตรวม <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  value={formTotalCredits}
                  onChange={(e) => setFormTotalCredits(e.target.value)}
                  placeholder="เช่น 132"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                คำอธิบายหลักสูตร / วัตถุประสงค์
              </label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="ระบุจุดเด่นหรือวัตถุประสงค์ของหลักสูตร..."
                rows={3}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                สถานะหลักสูตร
              </label>
              <select
                value={formIsActive}
                onChange={(e) => setFormIsActive(e.target.value)}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="true">เปิดรับสมัคร / กำลังเปิดสอน (Active)</option>
                <option value="false">ปิดรับสมัครชั่วคราว (Inactive)</option>
              </select>
            </div>
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)} disabled={isPending}>
            ยกเลิก
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* Delete Dialog */}
      <LiyonDialog open={!!deleteConfirmItem} onOpenChange={(open) => !open && setDeleteConfirmItem(null)}>
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
