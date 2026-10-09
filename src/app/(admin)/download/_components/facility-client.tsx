"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Layers, AlertCircle, Building2, Car, Image as ImageIcon, Download } from "lucide-react";
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
import type { FacilityDto } from "@/features/facility";
import {
  createFacilityAction,
  updateFacilityAction,
  deleteFacilityAction,
  getFacilitiesAction,
} from "@/features/facility/actions";

interface Props {
  initialItems: FacilityDto[];
  canManage: boolean;
}

export function FacilityClient({ initialItems, canManage }: Props) {
  const t = useT();
  const locale = useLocale();
  const [items, setItems] = useState<FacilityDto[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  // Dialog states
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<FacilityDto | null>(null);
  const [editingItem, setEditingItem] = useState<FacilityDto | null>(null);

  const [formType, setFormType] = useState<"ROOM" | "VEHICLE">("ROOM");
  const [formName, setFormName] = useState("");
  const [formCapacity, setFormCapacity] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formStatus, setFormStatus] = useState<"AVAILABLE" | "MAINTENANCE">("AVAILABLE");

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormType("ROOM");
    setFormName("");
    setFormCapacity("");
    setFormImageUrl("");
    setFormStatus("AVAILABLE");
    setModalOpen(true);
  };

  const openEditDialog = (item: FacilityDto) => {
    setEditingItem(item);
    setFormType(item.type);
    setFormName(item.name);
    setFormCapacity(item.capacity ? String(item.capacity) : "");
    setFormImageUrl(item.imageUrl ?? "");
    setFormStatus(item.status);
    setModalOpen(true);
  };

  const refreshItems = async () => {
    const res = await getFacilitiesAction();
    if (res.ok) {
      setItems(res.data);
    }
  };

  const handleSave = () => {
    if (!formName.trim()) {
      toast.error("กรุณาระบุชื่อห้องประชุมหรือยานพาหนะ");
      return;
    }
    const capacityNum = formCapacity ? parseInt(formCapacity, 10) : null;
    if (formCapacity && (isNaN(capacityNum as number) || (capacityNum as number) <= 0)) {
      toast.error("ความจุต้องเป็นตัวเลขมากกว่า 0");
      return;
    }

    startTransition(async () => {
      const payload = {
        type: formType,
        name: formName.trim(),
        capacity: capacityNum,
        imageUrl: formImageUrl.trim() || null,
        status: formStatus,
      };

      if (editingItem) {
        const res = await updateFacilityAction({
          id: editingItem.id,
          ...payload,
        });
        if (res.ok) {
          toast.success("แก้ไขข้อมูลเรียบร้อยแล้ว");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถบันทึกข้อมูลได้");
        }
      } else {
        const res = await createFacilityAction(payload);
        if (res.ok) {
          toast.success("เพิ่มทรัพยากรเรียบร้อยแล้ว");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถเพิ่มข้อมูลได้");
        }
      }
    });
  };

  const handleDelete = (item: FacilityDto) => {
    startTransition(async () => {
      const res = await deleteFacilityAction(item.id);
      if (res.ok) {
        toast.success("ลบข้อมูลเรียบร้อยแล้ว");
        setDeleteConfirmItem(null);
        await refreshItems();
      } else {
        toast.error("ไม่สามารถลบข้อมูลได้");
      }
    });
  };

  const columns: DataTableColumn<FacilityDto>[] = [
    {
      key: "imageUrl",
      header: "รูปถ่ายสถานที่/รถ",
      className: "w-20 text-center",
      render: (row) =>
        row.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.imageUrl}
            alt={row.name}
            className="w-12 h-10 object-cover rounded-lg border border-slate-200 shadow-xs inline-block"
          />
        ) : (
          <div className="w-12 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 inline-block">
            {row.type === "VEHICLE" ? <Car className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
          </div>
        ),
    },
    {
      key: "type",
      header: "ประเภท",
      className: "nowrap text-xs",
      render: (row) => (
        <span className="inline-flex items-center gap-1 font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
          {row.type === "VEHICLE" ? (
            <>
              <Car className="w-3.5 h-3.5 text-indigo-600" /> ยานพาหนะ
            </>
          ) : (
            <>
              <Building2 className="w-3.5 h-3.5 text-blue-600" /> ห้องประชุม/สถานที่
            </>
          )}
        </span>
      ),
    },
    {
      key: "name",
      header: "ชื่อห้องประชุม / ยานพาหนะ",
      render: (row) => <span className="font-semibold text-slate-900">{row.name}</span>,
    },
    {
      key: "capacity",
      header: "ความจุ / จำนวนที่นั่ง",
      className: "nowrap text-center",
      render: (row) => <span>{row.capacity ? `${row.capacity} คน/ที่นั่ง` : "-"}</span>,
    },
    {
      key: "status",
      header: "สถานะ",
      className: "nowrap",
      render: (row) => (
        <StatusPill tone={row.status === "AVAILABLE" ? ("positive" as any) : "neutral"}>
          {row.status === "AVAILABLE" ? "พร้อมใช้งาน" : "ปิดปรับปรุง"}
        </StatusPill>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Download className="w-6 h-6 text-blue-600" /> ศูนย์ดาวน์โหลด (Downloads)
          </h1>
          <p className="text-sm text-muted-foreground">จัดการเอกสาร แบบฟอร์มคำร้อง และไฟล์ดาวน์โหลดสำหรับบุคลากรและนักเรียน</p>
        </div>
        {canManage && (
          <Button onClick={openCreateDialog} className="gap-2 bg-blue-700 hover:bg-blue-800 text-white">
            <Plus className="h-4 w-4" />
            เพิ่มรายการดาวน์โหลด
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<FacilityDto>
          headHeading="รายการเอกสารและแบบฟอร์มสำหรับดาวน์โหลด"
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
            icon: <Layers className="h-10 w-10 text-muted-foreground/50" />,
            title: "ยังไม่มีรายการทรัพยากร",
            description: "กดปุ่ม 'เพิ่มห้อง / ยานพาหนะ' เพื่อบันทึกข้อมูล",
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
          title={editingItem ? "แก้ไขข้อมูลทรัพยากร" : "เพิ่มห้องประชุม / ยานพาหนะ"}
          description="กรอกรายละเอียดความจุ และแนบรูปถ่ายสถานที่หรือรถยนต์"
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2">
            <ImageUpload
              value={formImageUrl}
              onChange={(url) => setFormImageUrl(url)}
              label="รูปถ่ายห้องประชุม / รูปยานพาหนะ"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">ประเภททรัพยากร *</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as "ROOM" | "VEHICLE")}
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ROOM">ห้องประชุม / ห้องปฏิบัติการ (Room)</option>
                  <option value="VEHICLE">ยานพาหนะ / รถตู้ / รถบัส (Vehicle)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">ความจุ (คน / ที่นั่ง)</label>
                <input
                  type="number"
                  value={formCapacity}
                  onChange={(e) => setFormCapacity(e.target.value)}
                  placeholder="เช่น 50"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">ชื่อห้องประชุม / ยานพาหนะ *</label>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="เช่น ห้องประชุมสุจิตโต (ชั้น 4) หรือ รถตู้ปรับอากาศ 01"
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">สถานะความพร้อมใช้งาน</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as "AVAILABLE" | "MAINTENANCE")}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="AVAILABLE">พร้อมให้บริการ (Available)</option>
                <option value="MAINTENANCE">ปิดปรับปรุง / ไม่พร้อมใช้งาน (Maintenance)</option>
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
          title="ยืนยันการลบทรัพยากร"
          description="คุณต้องการลบข้อมูลห้องประชุมหรือยานพาหนะนี้ใช่หรือไม่?"
        />
        <LiyonDialogBody>
          <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-sm font-medium">
            {deleteConfirmItem?.name} ({deleteConfirmItem?.type === "VEHICLE" ? "ยานพาหนะ" : "ห้องประชุม"})
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
