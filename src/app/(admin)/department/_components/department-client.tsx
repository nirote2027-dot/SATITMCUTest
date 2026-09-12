"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Network, AlertCircle, BookOpen, Users, Layers } from "lucide-react";
import Link from "next/link";
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
import {
  getDepartmentsAction,
  createDepartmentAction,
  updateDepartmentAction,
  deleteDepartmentAction,
} from "@/features/department/actions";
import type { DepartmentListItemDto } from "@/features/department";

interface Props {
  initialItems: DepartmentListItemDto[];
  canManage: boolean;
}

export function DepartmentClient({ initialItems, canManage }: Props) {
  const t = useT();
  const locale = useLocale();
  const [items, setItems] = useState<DepartmentListItemDto[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [parentFilter, setParentFilter] = useState<string>("ALL");

  // Dialog states
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<DepartmentListItemDto | null>(null);
  const [editingItem, setEditingItem] = useState<DepartmentListItemDto | null>(null);

  const [formCode, setFormCode] = useState("");
  const [formName, setFormName] = useState("");
  const [formParentId, setFormParentId] = useState<string>("");
  const [formDescription, setFormDescription] = useState("");

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormCode("");
    setFormName("");
    setFormParentId("");
    setFormDescription("");
    setModalOpen(true);
  };

  const openEditDialog = (item: DepartmentListItemDto) => {
    setEditingItem(item);
    setFormCode(item.code ?? "");
    setFormName(item.name);
    setFormParentId(item.parentId ?? "");
    setFormDescription(item.description ?? "");
    setModalOpen(true);
  };

  const refreshItems = async () => {
    const res = await getDepartmentsAction();
    if (res.ok && res.data) {
      setItems(res.data);
    }
  };

  const handleSave = () => {
    if (!formName.trim()) {
      toast.error("กรุณากรอกชื่อภาควิชาหรือส่วนงาน");
      return;
    }

    startTransition(async () => {
      if (editingItem) {
        const res = await updateDepartmentAction({
          id: editingItem.id,
          code: formCode.trim() || null,
          name: formName.trim(),
          parentId: formParentId || null,
          description: formDescription.trim() || null,
        });

        if (res.ok) {
          toast.success("บันทึกการแก้ไขข้อมูลภาควิชาเรียบร้อย");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error(res.error || "เกิดข้อผิดพลาดในการแก้ไข");
        }
      } else {
        const res = await createDepartmentAction({
          code: formCode.trim() || null,
          name: formName.trim(),
          parentId: formParentId || null,
          description: formDescription.trim() || null,
        });

        if (res.ok) {
          toast.success("สร้างภาควิชา/ส่วนงานใหม่เรียบร้อย");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error(res.error || "เกิดข้อผิดพลาดในการสร้าง");
        }
      }
    });
  };

  const handleDelete = () => {
    if (!deleteConfirmItem) return;

    startTransition(async () => {
      const res = await deleteDepartmentAction(deleteConfirmItem.id);
      if (res.ok) {
        toast.success("ลบภาควิชา/ส่วนงานเรียบร้อย");
        setDeleteConfirmItem(null);
        await refreshItems();
      } else {
        toast.error(res.error || "ไม่สามารถลบได้เนื่องจากมีข้อมูลผูกอยู่");
      }
    });
  };

  // Filtered items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesParent =
      parentFilter === "ALL"
        ? true
        : parentFilter === "NONE"
        ? !item.parentId
        : item.parentId === parentFilter;

    return matchesSearch && matchesParent;
  });

  // Columns definition
  const columns: DataTableColumn<DepartmentListItemDto>[] = [
    {
      key: "code",
      header: "รหัส",
      className: "nowrap",
      render: (row: DepartmentListItemDto) => (
        <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
          {row.code || "-"}
        </span>
      ),
    },
    {
      key: "name",
      header: "ชื่อภาควิชา / ส่วนงาน",
      render: (row: DepartmentListItemDto) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{row.name}</span>
            {row.parentId && (
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-muted-foreground">
                ย่อย
              </span>
            )}
          </div>
          {row.description && (
            <span className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {row.description}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "parent",
      header: "สังกัดส่วนงานหลัก",
      render: (row: DepartmentListItemDto) => (
        <span className="text-xs text-muted-foreground">
          {row.parent ? row.parent.name : "— (ส่วนงานหลัก)"}
        </span>
      ),
    },
    {
      key: "curriculums",
      header: "หลักสูตรในสังกัด",
      className: "nowrap",
      render: (row: DepartmentListItemDto) => (
        <Link
          href={`/curriculum?dept=${row.id}`}
          className="inline-flex items-center gap-1.5 group text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          <span>{row._count.curriculums} หลักสูตร</span>
        </Link>
      ),
    },
    {
      key: "employees",
      header: "บุคลากร",
      className: "nowrap",
      render: (row: DepartmentListItemDto) => (
        <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>{row._count.employees} ท่าน</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "วันที่สร้าง",
      className: "nowrap",
      render: (row: DepartmentListItemDto) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(row.createdAt, locale)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Network className="w-6 h-6 text-primary" />
            {t("department.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("department.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/curriculum">
            <Button variant="outline" size="sm" className="gap-2">
              <BookOpen className="w-4 h-4" />
              ดูรายการหลักสูตร
            </Button>
          </Link>
          {canManage && (
            <Button onClick={openCreateDialog} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              เพิ่มภาควิชา/ส่วนงาน
            </Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <LiyonCard className="p-4 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">ภาควิชาและส่วนงานทั้งหมด</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{items.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
          </div>
        </LiyonCard>

        <LiyonCard className="p-4 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">หลักสูตรที่จัดเก็บในภาควิชา</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">
                {items.reduce((acc, curr) => acc + curr._count.curriculums, 0)}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </LiyonCard>

        <LiyonCard className="p-4 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent border-amber-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">บุคลากรที่สังกัด</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">
                {items.reduce((acc, curr) => acc + curr._count.employees, 0)}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </LiyonCard>
      </div>

      {/* Main Content Card */}
      <LiyonCard className="p-0 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-border/40 flex flex-col sm:flex-row gap-3 justify-between items-center bg-muted/20">
          <div className="flex flex-1 w-full sm:w-auto gap-3">
            <input
              type="text"
              placeholder="ค้นหาชื่อหรือรหัสภาควิชา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 w-full max-w-sm"
            />
            <select
              value={parentFilter}
              onChange={(e) => setParentFilter(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="ALL">ทุกลำดับส่วนงาน</option>
              <option value="NONE">เฉพาะส่วนงานหลัก (ไม่มีแม่)</option>
              {items
                .filter((i) => !i.parentId)
                .map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    ภายใต้: {parent.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            แสดง {filteredItems.length} จากทั้งหมด {items.length} รายการ
          </div>
        </div>

        {/* DataTable */}
        <DataTable<DepartmentListItemDto>
          headHeading="รายการภาควิชาและส่วนงาน"
          state={filteredItems.length === 0 ? "empty" : "data"}
          rows={filteredItems}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={
            canManage
              ? (row) => (
                  <>
                    <RowMenuItem
                      icon={<Edit2 className="w-4 h-4" />}
                      onSelect={() => openEditDialog(row)}
                    >
                      แก้ไขข้อมูล
                    </RowMenuItem>
                    <RowMenuItem
                      icon={<Trash2 className="w-4 h-4 text-destructive" />}
                      danger
                      onSelect={() => setDeleteConfirmItem(row)}
                    >
                      ลบภาควิชา
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
          empty={{
            icon: <Layers className="h-10 w-10 text-muted-foreground/50" />,
            title: "ยังไม่มีข้อมูลภาควิชาหรือส่วนงาน",
            description: "กดปุ่ม 'เพิ่มภาควิชา/ส่วนงาน' เพื่อสร้างภาควิชาแรก",
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
          }}
        />
      </LiyonCard>

      {/* Create / Edit Dialog */}
      <LiyonDialog open={modalOpen} onOpenChange={setModalOpen}>
        <LiyonDialogHeader
          title={editingItem ? "แก้ไขข้อมูลภาควิชา/ส่วนงาน" : "เพิ่มภาควิชา/ส่วนงานใหม่"}
          description="กรอกข้อมูลภาควิชาเพื่อจัดเก็บและจัดกลุ่มหลักสูตรหรือบุคลากรในสังกัด"
        />
        <LiyonDialogBody className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                รหัสส่วนงาน (Code)
              </label>
              <input
                type="text"
                placeholder="เช่น SCI, THAI"
                value={formCode}
                onChange={(e) => setFormCode(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                ชื่อภาควิชา / ส่วนงาน <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="เช่น ภาควิชาวิทยาศาสตร์และเทคโนโลยี"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
              สังกัดส่วนงานหลัก (Parent Department)
            </label>
            <select
              value={formParentId}
              onChange={(e) => setFormParentId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">— ไม่มี (เป็นส่วนงานระดับบนสุด) —</option>
              {items
                .filter((d) => !editingItem || d.id !== editingItem.id)
                .map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} {d.code ? `(${d.code})` : ""}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
              รายละเอียด / หน้าที่รับผิดชอบ
            </label>
            <textarea
              rows={3}
              placeholder="ระบุคำอธิบายหรือขอบเขตงานของภาควิชา/ส่วนงาน..."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
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

      {/* Delete Confirmation Dialog */}
      <LiyonDialog open={!!deleteConfirmItem} onOpenChange={(open) => !open && setDeleteConfirmItem(null)}>
        <LiyonDialogHeader
          title="ยืนยันการลบภาควิชา/ส่วนงาน"
          description="การกระทำนี้ไม่สามารถย้อนกลับได้ โปรดตรวจสอบความปลอดภัยก่อนลบ"
        />
        <LiyonDialogBody className="space-y-3 py-4">
          <p className="text-sm text-foreground">
            คุณแน่ใจหรือไม่ว่าต้องการลบภาควิชา{" "}
            <strong className="text-destructive font-semibold">
              &quot;{deleteConfirmItem?.name}&quot;
            </strong>
            ?
          </p>

          {deleteConfirmItem && deleteConfirmItem._count.curriculums > 0 && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <strong>คำเตือน:</strong> มีหลักสูตรผูกกับภาควิชานี้จำนวน{" "}
                {deleteConfirmItem._count.curriculums} หลักสูตร
                หากลบภาควิชา หลักสูตรเหล่านั้นจะกลายเป็นหลักสูตรที่ไม่ได้ระบุภาควิชา
              </div>
            </div>
          )}

          {deleteConfirmItem && deleteConfirmItem._count.children > 0 && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <strong>ไม่สามารถลบได้:</strong> ภาควิชานี้มีส่วนงานย่อยในสังกัดจำนวน{" "}
                {deleteConfirmItem._count.children} ส่วนงาน โปรดย้ายหรือลบส่วนงานย่อยออกก่อน
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
            onClick={handleDelete}
            disabled={isPending || (deleteConfirmItem ? deleteConfirmItem._count.children > 0 : false)}
          >
            {isPending ? "กำลังลบ..." : "ยืนยันการลบ"}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
