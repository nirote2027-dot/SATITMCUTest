"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Layers, AlertCircle, Newspaper, Image as ImageIcon, Sparkles, Loader2, Globe } from "lucide-react";
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
import { TinyEditor } from "@/components/ui/tiny-editor";
import type { ArticleDto } from "@/features/news/server";
import {
  createArticleAction,
  updateArticleAction,
  deleteArticleAction,
  getArticlesAction,
  generateEnglishNewsAction,
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
  const [activeTab, setActiveTab] = useState<"th" | "en">("th");
  const [isTranslating, setIsTranslating] = useState(false);

  // Form fields
  const [formTitle, setFormTitle] = useState("");
  const [formTitleEn, setFormTitleEn] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formContentEn, setFormContentEn] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formStatus, setFormStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

  const openCreateDialog = () => {
    setEditingItem(null);
    setActiveTab("th");
    setFormTitle("");
    setFormTitleEn("");
    setFormContent("");
    setFormContentEn("");
    setFormCoverImage("");
    setFormStatus("DRAFT");
    setModalOpen(true);
  };

  const openEditDialog = (item: ArticleDto) => {
    setEditingItem(item);
    setActiveTab("th");
    setFormTitle(item.title);
    setFormTitleEn(item.titleEn || "");
    setFormContent(item.content || "");
    setFormContentEn(item.contentEn || "");
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

  const handleGenerateEnglish = async () => {
    if (!formTitle.trim()) {
      toast.error("กรุณาระบุหัวข้อข่าวภาษาไทยก่อนให้ Gemini AI แปล");
      return;
    }

    setIsTranslating(true);
    try {
      const res = await generateEnglishNewsAction({
        titleTh: formTitle.trim(),
        contentTh: formContent.trim() || undefined,
      });

      if (res.ok) {
        setFormTitleEn(res.data.titleEn);
        if (res.data.contentEn) {
          setFormContentEn(res.data.contentEn);
        }
        setActiveTab("en");
        toast.success("✨ Gemini AI แปลและสร้างเนื้อหาภาษาอังกฤษสำเร็จเรียบร้อย!");
      } else {
        toast.error(res.error.message || "ไม่สามารถเชื่อมต่อ Gemini API ได้");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการแปล");
    } finally {
      setIsTranslating(false);
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
          titleEn: formTitleEn.trim() || null,
          content: formContent.trim() || null,
          contentEn: formContentEn.trim() || null,
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
          titleEn: formTitleEn.trim() || null,
          content: formContent.trim() || null,
          contentEn: formContentEn.trim() || null,
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
      header: "หัวข้อข่าวสาร (TH / EN)",
      render: (row) => (
        <div className="max-w-md space-y-1">
          <div className="font-semibold text-slate-900 leading-snug">{row.title}</div>
          {row.titleEn && (
            <div className="text-xs text-indigo-600 font-medium flex items-center gap-1.5">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold tracking-wide">
                EN
              </span>
              <span className="italic">{row.titleEn}</span>
            </div>
          )}
          {row.content && (
            <div className="text-xs text-slate-500 line-clamp-1">
              {row.content.replace(/<[^>]*>/g, "").trim()}
            </div>
          )}
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
          <p className="text-sm text-muted-foreground">
            เพิ่ม แก้ไข ลบ และแปลข่าวสาร 2 ภาษา (ไทย - อังกฤษ) พร้อมระบบ AI อัจฉริยะ และเครื่องมือจัดรูปแบบข้อความ Tiny Editor
          </p>
        </div>
        {canManage && (
          <Button onClick={openCreateDialog} className="gap-2 bg-blue-700 hover:bg-blue-800 text-white shadow-xs">
            <Plus className="h-4 w-4" />
            เขียนข่าวประชาสัมพันธ์
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<ArticleDto>
          headHeading="รายการข่าวสารทั้งหมด"
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
      <LiyonDialog open={modalOpen} onOpenChange={setModalOpen} wide>
        <LiyonDialogHeader
          title={editingItem ? "แก้ไขข่าวประชาสัมพันธ์ (2 ภาษา)" : "เพิ่มข่าวประชาสัมพันธ์ใหม่ (2 ภาษา)"}
          description="กรอกข้อมูลและจัดรูปแบบด้วย Tiny Editor แล้วกดปุ่มแปลภาษาด้วย Google Gemini AI สู่ภาษาอังกฤษโดยอัตโนมัติ"
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2">
            {/* AI Assistant Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    ผู้ช่วยแปลภาษา AI (Google Gemini)
                  </div>
                  <div className="text-[11px] text-slate-600">
                    แปลหัวข้อและเนื้อหาจากภาษาไทยเป็นภาษาอังกฤษสละสลวยอัตโนมัติ พร้อมคงรูปแบบข้อความ
                  </div>
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={handleGenerateEnglish}
                disabled={isTranslating || !formTitle.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs gap-1.5 h-8 px-3 shrink-0 shadow-xs"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    กำลังแปลด้วย Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    ✨ แปลเป็นภาษาอังกฤษด้วย Gemini AI
                  </>
                )}
              </Button>
            </div>

            {/* Language Switch Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab("th")}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "th"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>🇹🇭 ภาษาไทย (Thai - ต้นฉบับ)</span>
                {formTitle.trim() && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "en"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>🇬🇧 English (ภาษาอังกฤษ)</span>
                {formTitleEn.trim() && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
              </button>
            </div>

            {/* Tab 1: Thai Content */}
            {activeTab === "th" && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    หัวข้อข่าวภาษาไทย <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="ระบุหัวข้อข่าวสารภาษาไทย..."
                    className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center justify-between">
                    <span>เนื้อหาข่าวสารภาษาไทย (Tiny Editor) <span className="text-red-500">*</span></span>
                    <span className="text-[11px] text-blue-600 font-normal">จัดรูปแบบตัวอักษร, หัวข้อ, ตาราง, ลิงก์</span>
                  </label>
                  <TinyEditor
                    value={formContent}
                    onChange={setFormContent}
                    placeholder="พิมพ์หรือจัดรูปแบบเนื้อหาข่าวภาษาไทยที่นี่..."
                    height={280}
                  />
                </div>
              </div>
            )}

            {/* Tab 2: English Content */}
            {activeTab === "en" && (
              <div className="space-y-4 animate-in fade-in-50 duration-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center justify-between">
                    <span>News Headline (English)</span>
                    <span className="text-[11px] text-slate-400 font-normal">Translated or custom</span>
                  </label>
                  <input
                    value={formTitleEn}
                    onChange={(e) => setFormTitleEn(e.target.value)}
                    placeholder="Enter English news headline or generate using Gemini..."
                    className="w-full text-sm px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center justify-between">
                    <span>News Content & Body (English - Tiny Editor)</span>
                    <span className="text-[11px] text-indigo-600 font-normal">Translated or custom rich text</span>
                  </label>
                  <TinyEditor
                    value={formContentEn}
                    onChange={setFormContentEn}
                    placeholder="Enter or format English news content here..."
                    height={280}
                  />
                </div>
              </div>
            )}

            {/* General Settings: Cover & Status */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <ImageUpload
                value={formCoverImage}
                onChange={(url) => setFormCoverImage(url)}
                label="รูปภาพหน้าปกข่าว (Cover Image)"
              />

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
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)} disabled={isPending || isTranslating}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending || isTranslating}
            className="bg-blue-700 hover:bg-blue-800 text-white"
          >
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

