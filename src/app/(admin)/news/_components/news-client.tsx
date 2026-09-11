"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Layers, AlertCircle, Newspaper, Image as ImageIcon } from "lucide-react";
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
import type { ArticleDto } from "@/features/news/server";
import {
  createArticleAction,
  updateArticleAction,
  deleteArticleAction,
  getArticlesAction,
} from "@/features/news/actions";

interface Props {
  initialItems: ArticleDto[];
  canManage: boolean;
}

export function NewsClient({ initialItems, canManage }: Props) {
  const t = useT();
  const locale = useLocale();
  const [items, setItems] = useState<ArticleDto[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  // Dialog states
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<ArticleDto | null>(null);
  const [editingItem, setEditingItem] = useState<ArticleDto | null>(null);
  
  // Form fields
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formStatus, setFormStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormContent("");
    setFormCoverImage("");
    setFormStatus("DRAFT");
    setModalOpen(true);
  };

  const openEditDialog = (item: ArticleDto) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormContent(item.content || "");
    setFormCoverImage(item.coverImage || "");
    setFormStatus(item.status as "DRAFT" | "PUBLISHED");
    setModalOpen(true);
  };

  const refreshItems = async () => {
    const res = await getArticlesAction();
    if (res.ok) {
      setItems(res.data);
    }
  };

  const handleSave = () => {
    if (!formTitle.trim()) {
      toast.error("กรุณาระบุหัวข้อข่าว");
      return;
    }

    startTransition(async () => {
      if (editingItem) {
        const res = await updateArticleAction({
          id: editingItem.id,
          title: formTitle.trim(),
          content: formContent.trim() || null,
          coverImage: formCoverImage.trim() || null,
          status: formStatus,
        });
        if (res.ok) {
          toast.success("บันทึกการแก้ไขข่าวเรียบร้อย");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถบันทึกข้อมูลได้");
        }
      } else {
        const res = await createArticleAction({
          title: formTitle.trim(),
          content: formContent.trim() || null,
          coverImage: formCoverImage.trim() || null,
          status: formStatus,
        });
        if (res.ok) {
          toast.success("สร้างข่าวสารใหม่เรียบร้อย");
          setModalOpen(false);
          await refreshItems();
        } else {
          toast.error("ไม่สามารถสร้างข่าวได้");
        }
      }
    });
  };

  const handleDelete = (item: ArticleDto) => {
    startTransition(async () => {
      const res = await deleteArticleAction(item.id);
      if (res.ok) {
        toast.success("ลบข่าวเรียบร้อย");
        setDeleteConfirmItem(null);
        await refreshItems();
      } else {
        toast.error("ไม่สามารถลบข่าวได้");
      }
    });
  };

  const columns: DataTableColumn<ArticleDto>[] = [
    {
      key: "coverImage",
      header: "รูปภาพหน้าปก",
      className: "w-20 text-center",
      render: (row) =>
        row.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={row.coverImage} alt={row.title} className="w-14 h-10 object-cover rounded-lg border border-slate-200 shadow-xs inline-block" />
        ) : (
          <div className="w-14 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 inline-block">
            <ImageIcon className="w-4 h-4" />
          </div>
        ),
    },
    {
      key: "title",
      header: "หัวข้อข่าว",
      render: (row) => (
        <div className="max-w-md">
          <div className="font-semibold text-slate-900">{row.title}</div>
          {row.content && <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{row.content}</div>}
        </div>
      ),
    },
    {
      key: "status",
      header: "สถานะ",
      className: "nowrap",
      render: (row) => (
        <StatusPill tone={row.status === "PUBLISHED" ? ("positive" as any) : "neutral"}>
          {row.status === "PUBLISHED" ? "เผยแพร่" : "ร่าง"}
        </StatusPill>
      ),
    },
    {
      key: "createdAt",
      header: "วันที่สร้าง",
      className: "nowrap text-muted-foreground text-xs",
      render: (row) => <span>{formatDate(new Date(row.createdAt), locale)}</span>,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-blue-600" /> ระบบจัดการข่าวสารประชาสัมพันธ์
          </h1>
          <p className="text-sm text-muted-foreground">เพิ่ม แก้ไข ลบ และแนบรูปภาพหน้าปกข่าวประชาสัมพันธ์ของคณะ</p>
        </div>
        {canManage && (
          <Button onClick={openCreateDialog} className="gap-2 bg-blue-700 hover:bg-blue-800 text-white">
            <Plus className="h-4 w-4" />
            เขียนข่าวประชาสัมพันธ์
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<ArticleDto>
          headHeading="รายการข่าวสาร"
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
                      ลบข่าวนี้
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
          empty={{
            icon: <Layers className="h-10 w-10 text-muted-foreground/50" />,
            title: "ยังไม่มีรายการข่าวสาร",
            description: "กดปุ่ม 'เขียนข่าวประชาสัมพันธ์' ด้านบนเพื่อเพิ่มข่าวแรก",
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
          title={editingItem ? "แก้ไขข่าวประชาสัมพันธ์" : "เพิ่มข่าวประชาสัมพันธ์ใหม่"}
          description="กรอกข้อมูลข่าวสารและแนบรูปภาพหน้าปก"
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">หัวข้อข่าว *</label>
              <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="ระบุหัวข้อข่าวสาร..."
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <ImageUpload
              value={formCoverImage}
              onChange={(url) => setFormCoverImage(url)}
              label="รูปภาพหน้าปกข่าว (Cover Image)"
            />

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">เนื้อหาข่าวโดยย่อ / รายละเอียด</label>
              <textarea
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="เขียนรายละเอียดเนื้อหาข่าว..."
                rows={4}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">สถานะการเผยแพร่</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as "DRAFT" | "PUBLISHED")}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="DRAFT">แบบร่าง (Draft) - ยังไม่แสดงหน้าบ้าน</option>
                <option value="PUBLISHED">เผยแพร่ทันที (Published) - แสดงบนหน้าแรก</option>
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
          title="ยืนยันการลบข่าวสาร"
          description="คุณแน่ใจหรือไม่ว่าต้องการลบข่าวสารนี้? เมื่อลบแล้วจะไม่สามารถกู้คืนได้"
        />
        <LiyonDialogBody>
          <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-sm font-medium">
            หัวข้อข่าว: {deleteConfirmItem?.title}
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
