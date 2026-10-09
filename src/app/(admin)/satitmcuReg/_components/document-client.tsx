"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Layers, AlertCircle, FileText, Download, ExternalLink } from "lucide-react";
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
import { FileUpload } from "@/components/ui/file-upload";
import type { DocumentDto } from "@/features/document";
import {
  createDocumentAction,
  updateDocumentAction,
  deleteDocumentAction,
  getDocumentsAction,
} from "@/features/document/actions";

interface Props {
  initialItems: DocumentDto[];
  canManage: boolean;
}

export function DocumentClient({ initialItems, canManage }: Props) {
  const t = useT();
  const locale = useLocale();
  const [items, setItems] = useState<DocumentDto[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  // Dialog states
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<DocumentDto | null>(null);
  const [editingItem, setEditingItem] = useState<DocumentDto | null>(null);

  const [formDocNo, setFormDocNo] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDocType, setFormDocType] = useState("คำร้องทั่วไป");
  const [formFileUrl, setFormFileUrl] = useState("");
  const [formStatus, setFormStatus] = useState<"DRAFT" | "PENDING" | "APPROVED" | "REJECTED">("DRAFT");

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormDocNo(`DOC-${new Date().getFullYear()}-${String(items.length + 1).padStart(3, "0")}`);
    setFormTitle("");
    setFormDocType("คำร้องทั่วไป");
    setFormFileUrl("");
    setFormStatus("DRAFT");
    setModalOpen(true);
  };

  const openEditDialog = (item: DocumentDto) => {
    setEditingItem(item);
    setFormDocNo(item.docNo);
    setFormTitle(item.title);
    setFormDocType(item.docType);
    setFormFileUrl(item.fileUrl ?? "");
    setFormStatus(item.status as any);
    setModalOpen(true);
  };

  const refreshItems = async () => {
    const res = await getDocumentsAction();
    if (res.ok) {
      setItems(res.data);
    }
  };

  const handleSave = () => {
    if (!formTitle.trim() || !formDocNo.trim() || !formDocType.trim()) {
      toast.error("กรุณากรอกเลขที่เอกสารและชื่อเรื่องให้ครบถ้วน");
      return;
    }

    startTransition(async () => {
      const payload = {
        docNo: formDocNo.trim(),
        title: formTitle.trim(),
        docType: formDocType.trim(),
        fileUrl: formFileUrl.trim() || undefined,
        status: formStatus,
      };

      if (editingItem) {
        const res = await updateDocumentAction({
          id: editingItem.id,
          ...payload,
        });
        if (res.ok) {
          toast.success("แก้ไขเอกสารเรียบร้อยแล้ว");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถบันทึกเอกสารได้");
        }
      } else {
        const res = await createDocumentAction(payload);
        if (res.ok) {
          toast.success("สร้างเอกสารคำร้องเรียบร้อยแล้ว");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถสร้างเอกสารได้ (อาจมีเลขที่เอกสารซ้ำ)");
        }
      }
    });
  };

  const handleDelete = (item: DocumentDto) => {
    startTransition(async () => {
      const res = await deleteDocumentAction(item.id);
      if (res.ok) {
        toast.success("ลบเอกสารเรียบร้อยแล้ว");
        setDeleteConfirmItem(null);
        await refreshItems();
      } else {
        toast.error("ไม่สามารถลบเอกสารได้");
      }
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <StatusPill tone="ok">อนุมัติแล้ว</StatusPill>;
      case "REJECTED":
        return <StatusPill tone="bad">ไม่อนุมัติ / ตีกลับ</StatusPill>;
      case "PENDING":
        return <StatusPill tone="warn">รอการพิจารณา</StatusPill>;
      case "DRAFT":
      default:
        return <StatusPill tone="off">แบบร่าง</StatusPill>;
    }
  };

  const columns: DataTableColumn<DocumentDto>[] = [
    {
      key: "docNo",
      header: "เลขที่เอกสาร",
      className: "nowrap font-mono text-xs font-semibold text-blue-700",
      render: (row) => <span>{row.docNo}</span>,
    },
    {
      key: "title",
      header: "ชื่อเอกสาร / เรื่อง",
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.title}</span>
          <span className="text-xs text-slate-500">{row.docType}</span>
        </div>
      ),
    },
    {
      key: "fileUrl",
      header: "ไฟล์แนบ",
      className: "nowrap text-center",
      render: (row) =>
        row.fileUrl ? (
          <a
            href={row.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
          >
            <Download className="w-3.5 h-3.5" /> ดาวน์โหลด
          </a>
        ) : (
          <span className="text-xs text-slate-400">-</span>
        ),
    },
    {
      key: "status",
      header: "สถานะการอนุมัติ",
      className: "nowrap",
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "createdAt",
      header: "วันที่ยื่น",
      className: "nowrap text-muted-foreground text-xs",
      render: (row) => <span>{formatDate(new Date(row.createdAt), locale)}</span>,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" /> ทะเบียนและวัดผล สำหรับบุคลากร
          </h1>
          <p className="text-sm text-muted-foreground">ระบบงานทะเบียน บันทึกผลการเรียน และบริการเอกสารทางการศึกษาสำหรับบุคลากร</p>
        </div>
        {canManage && (
          <Button onClick={openCreateDialog} className="gap-2 bg-blue-700 hover:bg-blue-800 text-white">
            <Plus className="h-4 w-4" />
            ยื่นคำร้อง / เพิ่มรายการ
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<DocumentDto>
          headHeading="รายการเอกสารและคำร้องทะเบียนวัดผล"
          state={items.length === 0 ? "empty" : "data"}
          rows={items}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={
            canManage
              ? (row) => (
                  <>
                    <RowMenuItem onSelect={() => openEditDialog(row)} icon={<Edit2 className="h-4 w-4" />}>
                      แก้ไข / เปลี่ยนสถานะ
                    </RowMenuItem>
                    <RowMenuItem onSelect={() => setDeleteConfirmItem(row)} danger icon={<Trash2 className="h-4 w-4" />}>
                      ลบเอกสาร
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
          empty={{
            icon: <Layers className="h-10 w-10 text-muted-foreground/50" />,
            title: "ยังไม่มีรายการเอกสารคำร้อง",
            description: "กดปุ่ม 'ยื่นคำร้อง / สร้างเอกสาร' เพื่อเริ่มต้น",
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
          title={editingItem ? "แก้ไขเอกสาร / ปรับสถานะ" : "ยื่นคำร้อง / สร้างเอกสารใหม่"}
          description="กรอกข้อมูลคำร้อง ระบุประเภท และแนบไฟล์เอกสาร"
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">เลขที่เอกสาร *</label>
                <input
                  value={formDocNo}
                  onChange={(e) => setFormDocNo(e.target.value)}
                  placeholder="เช่น DOC-2569-001"
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">ประเภทเอกสาร *</label>
                <select
                  value={formDocType}
                  onChange={(e) => setFormDocType(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  <option value="คำร้องทั่วไป">คำร้องทั่วไป</option>
                  <option value="คำร้องขอหนังสือรับรอง">คำร้องขอหนังสือรับรอง</option>
                  <option value="คำร้องขอเทียบโอนรายวิชา">คำร้องขอเทียบโอนรายวิชา</option>
                  <option value="เอกสารขออนุมัติโครงการ">เอกสารขออนุมัติโครงการ / งบประมาณ</option>
                  <option value="แบบฟอร์มการลา">แบบฟอร์มการลาอาจารย์/เจ้าหน้าที่</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">ชื่อเรื่อง / รายละเอียดเอกสาร *</label>
              <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="ระบุชื่อเรื่องคำร้อง..."
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <FileUpload
              value={formFileUrl}
              onChange={(url) => setFormFileUrl(url)}
              label="แนบไฟล์เอกสารประกอบ (PDF, DOCX, ZIP)"
            />

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">สถานะการอนุมัติ</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as any)}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="DRAFT">แบบร่าง (Draft)</option>
                <option value="PENDING">รอการอนุมัติ (Pending Review)</option>
                <option value="APPROVED">อนุมัติแล้ว (Approved)</option>
                <option value="REJECTED">ไม่อนุมัติ / ตีกลับแก้ไข (Rejected)</option>
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
          title="ยืนยันการลบเอกสาร"
          description="คุณต้องการลบเอกสารคำร้องนี้ใช่หรือไม่?"
        />
        <LiyonDialogBody>
          <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-sm font-medium">
            {deleteConfirmItem?.docNo}: {deleteConfirmItem?.title}
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
