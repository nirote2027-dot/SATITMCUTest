"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Layers, AlertCircle, BookOpen, Image as ImageIcon } from "lucide-react";
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
  totalCredits: number;
  description: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: Date | string;
};

interface Props {
  initialItems: CurriculumDto[];
  canManage: boolean;
}

export function CurriculumClient({ initialItems, canManage }: Props) {
  const t = useT();
  const locale = useLocale();
  const [items, setItems] = useState<CurriculumDto[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  // Dialog states
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<CurriculumDto | null>(null);
  const [editingItem, setEditingItem] = useState<CurriculumDto | null>(null);

  const [formCode, setFormCode] = useState("");
  const [formName, setFormName] = useState("");
  const [formDegreeLevel, setFormDegreeLevel] = useState("ปริญญาตรี (4 ปี)");
  const [formTotalCredits, setFormTotalCredits] = useState<string | number>("130");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState<string>("true");

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormCode("");
    setFormName("");
    setFormDegreeLevel("ปริญญาตรี (4 ปี)");
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

  const columns: DataTableColumn<CurriculumDto>[] = [
    {
      key: "imageUrl",
      header: "ภาพปก/ไอคอน",
      className: "w-20 text-center",
      render: (row) =>
        row.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.imageUrl}
            alt={row.name}
            className="w-12 h-12 object-cover rounded-xl border border-slate-200 shadow-xs inline-block"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 inline-block">
            <BookOpen className="w-5 h-5" />
          </div>
        ),
    },
    {
      key: "code",
      header: "รหัสหลักสูตร",
      className: "nowrap font-mono text-xs text-muted-foreground",
      render: (row) => <span>{row.code}</span>,
    },
    {
      key: "name",
      header: "ชื่อหลักสูตร",
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-900">{row.name}</div>
          {row.description && <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{row.description}</div>}
        </div>
      ),
    },
    {
      key: "degreeLevel",
      header: "ระดับการศึกษา",
      render: (row) => (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
          {row.degreeLevel}
        </span>
      ),
    },
    {
      key: "totalCredits",
      header: "หน่วยกิตรวม",
      className: "nowrap text-center",
      render: (row) => <span>{row.totalCredits} นก.</span>,
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
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" /> ระบบจัดการหลักสูตร (Curriculum Management)
          </h1>
          <p className="text-sm text-muted-foreground">เพิ่ม แก้ไข ลบ โครงสร้างหลักสูตรและรายวิชาของคณะ</p>
        </div>
        {canManage && (
          <Button onClick={openCreateDialog} className="gap-2 bg-blue-700 hover:bg-blue-800 text-white">
            <Plus className="h-4 w-4" />
            เพิ่มหลักสูตรใหม่
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<CurriculumDto>
          headHeading="รายการหลักสูตร"
          state={items.length === 0 ? "empty" : "data"}
          rows={items}
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
            title: "ยังไม่มีรายการหลักสูตร",
            description: "กดปุ่ม 'เพิ่มหลักสูตรใหม่' เพื่อสร้างหลักสูตร",
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
          description="กรอกข้อมูลหลักสูตร จำนวนหน่วยกิต และภาพประกอบ"
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
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">รหัสหลักสูตร *</label>
                <input
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="เช่น B.Ed.01"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">ระดับการศึกษา *</label>
                <select
                  value={formDegreeLevel}
                  onChange={(e) => setFormDegreeLevel(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ปริญญาตรี (4 ปี)">ปริญญาตรี (4 ปี)</option>
                  <option value="ปริญญาโท (2 ปี)">ปริญญาโท (2 ปี)</option>
                  <option value="ปริญญาเอก (3 ปี)">ปริญญาเอก (3 ปี)</option>
                  <option value="ประกาศนียบัตร">ประกาศนียบัตร</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">ชื่อหลักสูตร *</label>
                <input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="เช่น หลักสูตรครุศาสตรบัณฑิต"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">หน่วยกิตรวม *</label>
                <input
                  type="number"
                  value={formTotalCredits}
                  onChange={(e) => setFormTotalCredits(e.target.value)}
                  placeholder="เช่น 132"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">คำอธิบายหลักสูตร / วัตถุประสงค์</label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="ระบุจุดเด่นหรือวัตถุประสงค์ของหลักสูตร..."
                rows={3}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">สถานะหลักสูตร</label>
              <select
                value={formIsActive}
                onChange={(e) => setFormIsActive(e.target.value)}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
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
          <Button onClick={handleSave} disabled={isPending} className="bg-blue-700 hover:bg-blue-800 text-white">
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
          <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-sm font-medium">
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
