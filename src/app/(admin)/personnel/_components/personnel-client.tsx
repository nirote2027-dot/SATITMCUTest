"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Users, AlertCircle, User, Image as ImageIcon } from "lucide-react";
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
import type { EmployeeDto } from "@/features/personnel/_internal/services";
import {
  createEmployeeAction,
  updateEmployeeAction,
  deleteEmployeeAction,
  getEmployeesAction,
} from "@/features/personnel/actions";

interface Props {
  initialItems: EmployeeDto[];
  canManage: boolean;
}

export function PersonnelClient({ initialItems, canManage }: Props) {
  const t = useT();
  const locale = useLocale();
  const [items, setItems] = useState<EmployeeDto[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<EmployeeDto | null>(null);
  const [editingItem, setEditingItem] = useState<EmployeeDto | null>(null);

  const [formCode, setFormCode] = useState("");
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formPosition, setFormPosition] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState<"TRUE" | "FALSE">("TRUE");

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormCode("");
    setFormFirstName("");
    setFormLastName("");
    setFormPosition("");
    setFormImageUrl("");
    setFormIsActive("TRUE");
    setModalOpen(true);
  };

  const openEditDialog = (item: EmployeeDto) => {
    setEditingItem(item);
    setFormCode(item.employeeCode);
    setFormFirstName(item.firstName);
    setFormLastName(item.lastName);
    setFormPosition(item.position ?? "");
    setFormImageUrl(item.imageUrl ?? "");
    setFormIsActive(item.isActive ? "TRUE" : "FALSE");
    setModalOpen(true);
  };

  const refreshItems = async () => {
    const res = await getEmployeesAction();
    if (res.ok) {
      setItems(res.data);
    }
  };

  const handleSave = () => {
    if (!formCode.trim() || !formFirstName.trim() || !formLastName.trim()) {
      toast.error("กรุณากรอกรหัสพนักงาน ชื่อ และนามสกุล");
      return;
    }

    startTransition(async () => {
      const payload = {
        employeeCode: formCode.trim(),
        firstName: formFirstName.trim(),
        lastName: formLastName.trim(),
        position: formPosition.trim() || undefined,
        imageUrl: formImageUrl.trim() || null,
        isActive: formIsActive === "TRUE",
      };

      if (editingItem) {
        const res = await updateEmployeeAction({ id: editingItem.id, ...payload });
        if (res.ok) {
          toast.success("แก้ไขข้อมูลบุคลากรเรียบร้อยแล้ว");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถบันทึกข้อมูลได้");
        }
      } else {
        const res = await createEmployeeAction(payload);
        if (res.ok) {
          toast.success("เพิ่มข้อมูลบุคลากรเรียบร้อยแล้ว");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถเพิ่มบุคลากรได้ (อาจมีรหัสซ้ำ)");
        }
      }
    });
  };

  const handleDelete = (item: EmployeeDto) => {
    startTransition(async () => {
      const res = await deleteEmployeeAction(item.id);
      if (res.ok) {
        toast.success("ลบข้อมูลบุคลากรเรียบร้อยแล้ว");
        setDeleteConfirmItem(null);
        await refreshItems();
      } else {
        toast.error("ไม่สามารถลบข้อมูลได้");
      }
    });
  };

  const columns: DataTableColumn<EmployeeDto>[] = [
    {
      key: "imageUrl",
      header: "รูปถ่าย",
      className: "w-16 text-center",
      render: (row) =>
        row.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.imageUrl}
            alt={row.firstName}
            className="w-10 h-10 object-cover rounded-full border border-slate-200 shadow-xs inline-block"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold inline-block text-xs">
            {row.firstName ? row.firstName.charAt(0) : <User className="w-4 h-4" />}
          </div>
        ),
    },
    {
      key: "employeeCode",
      header: "รหัสบุคลากร",
      className: "nowrap font-mono text-xs text-muted-foreground",
      render: (row) => <span>{row.employeeCode}</span>,
    },
    {
      key: "name",
      header: "ชื่อ - นามสกุล",
      render: (row) => (
        <span className="font-semibold text-slate-900">
          {row.firstName} {row.lastName}
        </span>
      ),
    },
    {
      key: "position",
      header: "ตำแหน่ง",
      render: (row) => <span>{row.position ?? "-"}</span>,
    },
    {
      key: "isActive",
      header: "สถานะ",
      className: "nowrap",
      render: (row) => (
        <StatusPill tone={row.isActive ? ("positive" as any) : "neutral"}>
          {row.isActive ? "ปฏิบัติงาน" : "พ้นสภาพ/ระงับ"}
        </StatusPill>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" /> ระบบจัดการบุคลากร (Personnel Management)
          </h1>
          <p className="text-sm text-muted-foreground">จัดการข้อมูลอาจารย์ เจ้าหน้าที่ แนบรูปถ่าย และกำหนดตำแหน่ง</p>
        </div>
        {canManage && (
          <Button onClick={openCreateDialog} className="gap-2 bg-blue-700 hover:bg-blue-800 text-white">
            <Plus className="h-4 w-4" />
            เพิ่มบุคลากรใหม่
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<EmployeeDto>
          headHeading="รายชื่อบุคลากร"
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
                      ลบข้อมูล
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
          empty={{
            icon: <Users className="h-10 w-10 text-muted-foreground/50" />,
            title: "ไม่พบข้อมูลบุคลากร",
            description: "กดปุ่ม 'เพิ่มบุคลากรใหม่' เพื่อบันทึกข้อมูล",
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
          title={editingItem ? "แก้ไขข้อมูลบุคลากร" : "เพิ่มข้อมูลบุคลากรใหม่"}
          description="กรอกข้อมูลส่วนบุคคล ตำแหน่ง และแนบรูปถ่าย"
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2">
            <ImageUpload
              value={formImageUrl}
              onChange={(url) => setFormImageUrl(url)}
              label="รูปถ่ายบุคลากร / รูปโปรไฟล์"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">รหัสบุคลากร *</label>
                <input
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="เช่น EMP-001"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">ตำแหน่ง / หน้าที่</label>
                <input
                  value={formPosition}
                  onChange={(e) => setFormPosition(e.target.value)}
                  placeholder="เช่น อาจารย์ประจำภาควิชา"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">ชื่อ *</label>
                <input
                  value={formFirstName}
                  onChange={(e) => setFormFirstName(e.target.value)}
                  placeholder="ชื่อจริง"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">นามสกุล *</label>
                <input
                  value={formLastName}
                  onChange={(e) => setFormLastName(e.target.value)}
                  placeholder="นามสกุล"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">สถานะการทำงาน</label>
              <select
                value={formIsActive}
                onChange={(e) => setFormIsActive(e.target.value as "TRUE" | "FALSE")}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="TRUE">ปฏิบัติงานปกติ (Active)</option>
                <option value="FALSE">พ้นสภาพ / พักงาน (Inactive)</option>
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
          title="ยืนยันการลบข้อมูลบุคลากร"
          description="คุณต้องการลบข้อมูลบุคลากรนี้ใช่หรือไม่?"
        />
        <LiyonDialogBody>
          <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-sm font-medium">
            {deleteConfirmItem?.firstName} {deleteConfirmItem?.lastName} ({deleteConfirmItem?.employeeCode})
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
