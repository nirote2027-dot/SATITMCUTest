"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Users, AlertCircle, User, Image as ImageIcon, ArrowUp, ArrowDown } from "lucide-react";
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
import type { EmployeeDto } from "@/features/personnel";
import {
  createEmployeeAction,
  updateEmployeeAction,
  reorderEmployeesAction,
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

  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formPosition, setFormPosition] = useState("");
  const [formDisplayOrder, setFormDisplayOrder] = useState(1);
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState<"TRUE" | "FALSE">("TRUE");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formLineId, setFormLineId] = useState("");
  const [formAddress, setFormAddress] = useState("");

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormFirstName("");
    setFormLastName("");
    setFormPosition("");
    setFormDisplayOrder(items.length + 1);
    setFormImageUrl("");
    setFormIsActive("TRUE");
    setFormPhone("");
    setFormEmail("");
    setFormLineId("");
    setFormAddress("");
    setModalOpen(true);
  };

  const openEditDialog = (item: EmployeeDto) => {
    setEditingItem(item);
    setFormFirstName(item.firstName);
    setFormLastName(item.lastName);
    setFormPosition(item.position ?? "");
    setFormDisplayOrder(item.displayOrder || items.indexOf(item) + 1);
    setFormImageUrl(item.imageUrl ?? "");
    setFormIsActive(item.isActive ? "TRUE" : "FALSE");
    setFormPhone(item.contactInfo?.phone ?? "");
    setFormEmail(item.contactInfo?.email ?? "");
    setFormLineId(item.contactInfo?.lineId ?? "");
    setFormAddress(item.contactInfo?.address ?? "");
    setModalOpen(true);
  };

  const refreshItems = async () => {
    const res = await getEmployeesAction();
    if (res.ok) {
      setItems(res.data);
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (!canManage) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);

    const orderedIds = newItems.map((x) => x.id);
    setItems(newItems.map((item, idx) => ({ ...item, displayOrder: idx + 1 })));

    startTransition(async () => {
      try {
        const res = await reorderEmployeesAction(orderedIds);
        if (res.ok && res.data) {
          setItems(res.data);
          toast.success("จัดเรียงลำดับบุคลากรเรียบร้อยแล้ว");
        } else {
          toast.error("ไม่สามารถบันทึกลำดับได้");
          await refreshItems();
        }
      } catch {
        toast.error("ไม่สามารถบันทึกลำดับได้");
        await refreshItems();
      }
    });
  };

  const handleSave = () => {
    if (!formFirstName.trim() || !formLastName.trim()) {
      toast.error("กรุณากรอกชื่อ และนามสกุล");
      return;
    }

    startTransition(async () => {
      const payload = {
        employeeCode: editingItem ? editingItem.employeeCode : undefined,
        firstName: formFirstName.trim(),
        lastName: formLastName.trim(),
        position: formPosition.trim() || undefined,
        displayOrder: Number(formDisplayOrder),
        imageUrl: formImageUrl.trim() || null,
        isActive: formIsActive === "TRUE",
        contactInfo: {
          phone: formPhone.trim() || null,
          email: formEmail.trim() || null,
          lineId: formLineId.trim() || null,
          address: formAddress.trim() || null,
        },
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
          toast.error("ไม่สามารถเพิ่มบุคลากรได้");
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
      key: "displayOrder",
      header: "ลำดับ",
      className: "w-20 text-center",
      render: (row) => {
        const index = items.findIndex((x) => x.id === row.id);
        return (
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200 shadow-2xs">
              {row.displayOrder || index + 1}
            </span>
            {canManage && (
              <div className="flex flex-col">
                <button
                  type="button"
                  disabled={index === 0 || isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMove(index, "up");
                  }}
                  className="p-0.5 text-slate-400 hover:text-blue-600 disabled:opacity-20 disabled:pointer-events-none transition-colors"
                  title="เลื่อนขึ้น"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1 || isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMove(index, "down");
                  }}
                  className="p-0.5 text-slate-400 hover:text-blue-600 disabled:opacity-20 disabled:pointer-events-none transition-colors"
                  title="เลื่อนลง"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        );
      },
    },
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
      key: "contact",
      header: "ข้อมูลติดต่อ",
      render: (row) => {
        const info = row.contactInfo;
        if (!info || (!info.phone && !info.email && !info.lineId && !info.address)) {
          return <span className="text-slate-400 text-xs">-</span>;
        }
        return (
          <div className="text-xs space-y-0.5 text-slate-600">
            {info.phone && <div>📞 {info.phone}</div>}
            {info.email && <div>✉️ {info.email}</div>}
            {info.lineId && <div>💬 LINE: {info.lineId}</div>}
          </div>
        );
      },
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
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              เกี่ยวกับโรงเรียน
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" /> ทำเนียบครูและบุคลากร (Teachers & Personnel)
          </h1>
          <p className="text-sm text-muted-foreground">จัดการข้อมูลครูผู้สอน เจ้าหน้าที่ แนบรูปถ่าย กำหนดกลุ่มสาระ และข้อมูลติดต่อ</p>
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
          description="กรอกข้อมูลส่วนบุคคล ตำแหน่ง ลำดับการแสดงผล และแนบรูปถ่าย"
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2">
            <ImageUpload
              value={formImageUrl}
              onChange={(url) => setFormImageUrl(url)}
              label="รูปถ่ายบุคลากร / รูปโปรไฟล์"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">ตำแหน่ง / หน้าที่ (Position)</label>
                <input
                  value={formPosition}
                  onChange={(e) => setFormPosition(e.target.value)}
                  placeholder="เช่น ผู้อำนวยการ, รองผู้อำนวยการ, อาจารย์ผู้สอน"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">ลำดับการแสดงผล (Sort Order)</label>
                <input
                  type="number"
                  min={1}
                  value={formDisplayOrder}
                  onChange={(e) => setFormDisplayOrder(Math.max(1, parseInt(e.target.value) || 1))}
                  placeholder="เช่น 1, 2, 3..."
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

            {/* Contact Info Section */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 block mb-2.5">ข้อมูลการติดต่อและที่อยู่ (Contact Information)</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">เบอร์โทรศัพท์</label>
                  <input
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="เช่น 081-234-5678"
                    className="w-full text-sm px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">อีเมล</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-sm px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">LINE ID</label>
                  <input
                    value={formLineId}
                    onChange={(e) => setFormLineId(e.target.value)}
                    placeholder="เช่น @lineid หรือ user123"
                    className="w-full text-sm px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium text-slate-600 block mb-1">ที่อยู่ (Address)</label>
                <textarea
                  rows={2}
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  placeholder="ที่อยู่สำหรับติดต่อ / ที่อยู่ตามทะเบียนบ้าน"
                  className="w-full text-sm px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
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
            {deleteConfirmItem?.firstName} {deleteConfirmItem?.lastName}
            {deleteConfirmItem?.position ? ` (${deleteConfirmItem.position})` : ""}
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
