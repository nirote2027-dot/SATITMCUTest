"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Building2,
  Save,
  Loader2,
  Sparkles,
  Compass,
  History,
  Phone,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  Eye,
  MapPin,
  Sliders,
  Globe,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  LiyonDialogCloseButton,
} from "@/shared/components/liyon";
import { updateSchoolInfoAction } from "@/features/school/actions";
import {
  type SchoolInfoData,
  type GalleryItem,
  type WidgetDisplayHeight,
  extractEmbedUrl,
  getWidgetHeight,
} from "@/features/school/types";

const HEIGHT_OPTIONS: { label: string; value: WidgetDisplayHeight; heightText: string }[] = [
  { label: "กะทัดรัด", value: "compact", heightText: "350px" },
  { label: "มาตรฐาน", value: "medium", heightText: "450px" },
  { label: "สูง", value: "tall", heightText: "550px" },
  { label: "เต็มตา", value: "full", heightText: "650px" },
  { label: "กำหนดเอง", value: "custom", heightText: "px" },
];

const DEFAULT_MCU_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3944151152177!2d100.48978989999999!3d13.755072400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2990016d91d3d%3A0xe20caf578932a06d!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4Liq4Liy4LiY4Li04LiV4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lih4Lir4Liy4LiI4Li44Lis4Liy4Lil4LiH4LiB4Lij4LiT4Lij4Liy4LiK4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii!5e0!3m2!1sth!2sth!4v1791967187909!5m2!1sth!2sth";

interface Props {
  initialData: SchoolInfoData;
  canManage: boolean;
}

type TabType = "general" | "identity" | "history" | "contact" | "gallery";

export function SchoolInfoClient({ initialData, canManage }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [form, setForm] = useState<SchoolInfoData>(initialData);
  const [pending, startTransition] = useTransition();

  // Gallery item edit / create dialog
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryImageUrl, setGalleryImageUrl] = useState("");
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryDesc, setGalleryDesc] = useState("");

  // Mission list item input
  const [newMissionText, setNewMissionText] = useState("");

  const handleSave = () => {
    if (!canManage) {
      toast.error("คุณไม่มีสิทธิ์แก้ไขข้อมูลโรงเรียน");
      return;
    }
    if (!form.nameTh.trim()) {
      toast.error("กรุณาระบุชื่อโรงเรียนภาษาไทย");
      return;
    }

    startTransition(async () => {
      try {
        const res = await updateSchoolInfoAction(form as any);
        if (res.ok) {
          toast.success("บันทึกข้อมูลโรงเรียนเรียบร้อยแล้ว");
        } else {
          toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
      } catch (err: any) {
        toast.error(err?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    });
  };

  // Mission handling
  const addMission = () => {
    if (!newMissionText.trim()) return;
    const current = form.mission || [];
    setForm({ ...form, mission: [...current, newMissionText.trim()] });
    setNewMissionText("");
  };

  const removeMission = (index: number) => {
    const current = form.mission || [];
    setForm({ ...form, mission: current.filter((_, i) => i !== index) });
  };

  // Gallery handling
  const openAddGallery = () => {
    setEditingGalleryItem(null);
    setGalleryImageUrl("");
    setGalleryTitle("");
    setGalleryDesc("");
    setGalleryModalOpen(true);
  };

  const openEditGallery = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setGalleryImageUrl(item.url);
    setGalleryTitle(item.title || "");
    setGalleryDesc(item.description || "");
    setGalleryModalOpen(true);
  };

  const handleSaveGalleryItem = () => {
    if (!galleryImageUrl.trim()) {
      toast.error("กรุณาอัปโหลดรูปภาพหรือระบุ URL รูปภาพ");
      return;
    }

    const currentGallery = form.gallery || [];
    if (editingGalleryItem) {
      // Edit existing
      const updated = currentGallery.map((g) =>
        g.id === editingGalleryItem.id
          ? {
              ...g,
              url: galleryImageUrl.trim(),
              title: galleryTitle.trim(),
              description: galleryDesc.trim(),
            }
          : g
      );
      setForm({ ...form, gallery: updated });
      toast.success("อัปเดตข้อมูลรูปภาพในคลังแล้ว");
    } else {
      // Add new
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        url: galleryImageUrl.trim(),
        title: galleryTitle.trim(),
        description: galleryDesc.trim(),
        createdAt: new Date().toISOString(),
      };
      setForm({ ...form, gallery: [newItem, ...currentGallery] });
      toast.success("เพิ่มรูปภาพในคลังภาพเรียบร้อยแล้ว");
    }
    setGalleryModalOpen(false);
  };

  const handleDeleteGalleryItem = (id: string) => {
    const currentGallery = form.gallery || [];
    setForm({ ...form, gallery: currentGallery.filter((g) => g.id !== id) });
    toast.info("ลบรูปภาพออกจากคลังแล้ว (กดบันทึกเพื่อยืนยันการเปลี่ยนแปลง)");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                เกี่ยวกับโรงเรียน
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                ข้อมูลทั่วไปของสถานศึกษา
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              จัดการข้อมูลพื้นฐาน วิสัยทัศน์ พันธกิจ ประวัติ และคลังภาพบรรยากาศโรงเรียน
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ดูหน้าเว็บหลัก</span>
          </a>

          {canManage && (
            <Button
              type="button"
              onClick={handleSave}
              disabled={pending}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs cursor-pointer px-5"
            >
              {pending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>บันทึกการเปลี่ยนแปลง</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "general"
              ? "bg-blue-600 text-white font-bold shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>ข้อมูลพื้นฐาน & รูปภาพโรงเรียน</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("identity")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "identity"
              ? "bg-blue-600 text-white font-bold shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>ปรัชญา วิสัยทัศน์ & พันธกิจ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "history"
              ? "bg-blue-600 text-white font-bold shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <History className="w-4 h-4" />
          <span>ประวัติความเป็นมา</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "contact"
              ? "bg-blue-600 text-white font-bold shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>ข้อมูลติดต่อ & ที่ตั้ง</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("gallery")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "gallery"
              ? "bg-blue-600 text-white font-bold shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>คลังภาพบรรยากาศ ({form.gallery?.length || 0})</span>
        </button>
      </div>

      {/* Tab 1: General Info & Images */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Building2 className="w-4 h-4 text-blue-600" />
                ชื่อสถานศึกษา
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ชื่อโรงเรียน (ภาษาไทย) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.nameTh}
                  onChange={(e) => setForm({ ...form, nameTh: e.target.value })}
                  placeholder="เช่น โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ชื่อโรงเรียน (ภาษาอังกฤษ)
                </label>
                <input
                  type="text"
                  value={form.nameEn || ""}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                  placeholder="Demonstration School of Mahachulalongkornrajavidyalaya University"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ชื่อย่อ / อักษรย่อ (Short Name)
                </label>
                <input
                  type="text"
                  value={form.shortName || ""}
                  onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                  placeholder="สาธิต มจร / SATIT MCU"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Sparkles className="w-4 h-4 text-blue-600" />
                สีและสัญลักษณ์ประจำโรงเรียน
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  สีประจำโรงเรียน (School Colors)
                </label>
                <input
                  type="text"
                  value={form.schoolColors || ""}
                  onChange={(e) => setForm({ ...form, schoolColors: e.target.value })}
                  placeholder="น้ำเงิน - ส้ม"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ต้นไม้ / ดอกไม้ประจำโรงเรียน
                </label>
                <input
                  type="text"
                  value={form.treeFlower || ""}
                  onChange={(e) => setForm({ ...form, treeFlower: e.target.value })}
                  placeholder="ดอกบัวหลวง / ต้นอโศกอินเดีย"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Logos and Cover Image */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                ตราสัญลักษณ์โรงเรียน (Logo)
              </h3>
              <p className="text-xs text-slate-500">
                แสดงผลใน Navbar, หัวเอกสาร และตราสัญลักษณ์หลักของระบบ
              </p>
              <ImageUpload
                value={form.logoUrl}
                onChange={(url) => setForm({ ...form, logoUrl: url })}
                label="ตราสัญลักษณ์ (แนะนำ PNG พื้นหลังโปร่งใส)"
                aspect="contain"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                ภาพป้ายหน้าโรงเรียน / อาคารสถานที่
              </h3>
              <p className="text-xs text-slate-500">
                ภาพหลักสำหรับแสดงบรรยากาศโรงเรียนและส่วนหัวของเว็บไซต์
              </p>
              <ImageUpload
                value={form.coverImageUrl}
                onChange={(url) => setForm({ ...form, coverImageUrl: url })}
                label="ภาพป้ายหน้าโรงเรียน (แนะนำแนวนอน 16:9)"
                aspect="cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Identity, Vision & Mission */}
      {activeTab === "identity" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              ปรัชญา วิสัยทัศน์ และอัตลักษณ์สถานศึกษา
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              กำหนดแนวทางการดำเนินงาน คุณค่าเป้าหมาย และทิศทางการพัฒนาผู้เรียน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                คำขวัญโรงเรียน (School Motto)
              </label>
              <input
                type="text"
                value={form.motto || ""}
                onChange={(e) => setForm({ ...form, motto: e.target.value })}
                placeholder="ปญฺญา โลกสฺมิ ปชฺโชโต (ปัญญาเป็นแสงสว่างในโลก)"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ปรัชญาโรงเรียน (Philosophy)
              </label>
              <input
                type="text"
                value={form.philosophy || ""}
                onChange={(e) => setForm({ ...form, philosophy: e.target.value })}
                placeholder="คุณธรรมนำความรู้ มุ่งสู่ความเป็นเลิศ เชิดชูความเป็นไทย ใส่ใจสากล"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                อัตลักษณ์ (Identity)
              </label>
              <input
                type="text"
                value={form.identity || ""}
                onChange={(e) => setForm({ ...form, identity: e.target.value })}
                placeholder="คุณธรรมเด่น เน้นภาษา ก้าวหน้าเทคโนโลยี"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                เอกลักษณ์ (Uniqueness)
              </label>
              <input
                type="text"
                value={form.uniqueness || ""}
                onChange={(e) => setForm({ ...form, uniqueness: e.target.value })}
                placeholder="วิถีพุทธ วิถีเรียนรู้ คู่คุณธรรม"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              วิสัยทัศน์ (Vision)
            </label>
            <textarea
              rows={3}
              value={form.vision || ""}
              onChange={(e) => setForm({ ...form, vision: e.target.value })}
              placeholder="ระบุวิสัยทัศน์การจัดการศึกษาของโรงเรียน..."
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>

          {/* Mission list */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              พันธกิจของโรงเรียน (Mission)
            </label>
            <div className="space-y-2 mb-3">
              {(form.mission || []).map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800"
                >
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex-1 leading-relaxed">
                    {m}
                  </span>
                  {canManage && (
                    <button
                      type="button"
                      onClick={() => removeMission(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="ลบข้อพันธกิจนี้"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {canManage && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMissionText}
                  onChange={(e) => setNewMissionText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addMission();
                    }
                  }}
                  placeholder="พิมพ์ข้อความพันธกิจใหม่ แล้วกดปุ่มเพิ่ม..."
                  className="flex-1 text-sm px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addMission}
                  className="gap-1.5 text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>เพิ่มพันธกิจ</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: History & Background */}
      {activeTab === "history" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              ประวัติความเป็นมาและการก่อตั้ง
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              บันทึกเรื่องราว ประวัติความเป็นมา และพัฒนาการสำคัญของโรงเรียนสาธิต มจร
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              เนื้อหาประวัติความเป็นมา
            </label>
            <textarea
              rows={12}
              value={form.history || ""}
              onChange={(e) => setForm({ ...form, history: e.target.value })}
              placeholder="กรอกเนื้อหาประวัติความเป็นมาของโรงเรียนอย่างละเอียด..."
              className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
            />
          </div>
        </div>
      )}

      {/* Tab 4: Contact & Location */}
      {activeTab === "contact" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              ข้อมูลติดต่อและที่ตั้งสถานศึกษา
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ช่องทางการติดต่อสื่อสาร ที่อยู่ และลิงก์ช่องทางออนไลน์ของโรงเรียน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ที่อยู่สถานศึกษา (Address)
              </label>
              <textarea
                rows={2}
                value={form.address || ""}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="เลขที่ หมู่ ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                เบอร์โทรศัพท์ (Phone)
              </label>
              <input
                type="text"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="035-248-000"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                เบอร์โทรสาร (Fax)
              </label>
              <input
                type="text"
                value={form.fax || ""}
                onChange={(e) => setForm({ ...form, fax: e.target.value })}
                placeholder="035-248-001"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                อีเมลติดต่อ (Email)
              </label>
              <input
                type="email"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="satitmcu@mcu.ac.th"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                เว็บไซต์ (Website)
              </label>
              <input
                type="url"
                value={form.website || ""}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://satit.mcu.ac.th"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Facebook Fanpage
              </label>
              <input
                type="text"
                value={form.facebook || ""}
                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                placeholder="https://facebook.com/satitmcu"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Line Official Account
              </label>
              <input
                type="text"
                value={form.line || ""}
                onChange={(e) => setForm({ ...form, line: e.target.value })}
                placeholder="@satitmcu"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              FACEBOOK FANPAGE WIDGET CONFIGURATION
          ═══════════════════════════════════════════════════════ */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  การตั้งค่าแสดงผล Facebook Fanpage
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  เลือกขนาดการแสดงผล และกำหนดลิงก์ Facebook Fanpage เพื่อโชว์ในหน้าแรก (#about)
                </p>
              </div>

              <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={form.showFacebookWidget !== false}
                  onChange={(e) => setForm({ ...form, showFacebookWidget: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>แสดง Facebook Fanpage บนหน้าเว็บ</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ลิงก์ Facebook Fanpage URL
                </label>
                <input
                  type="text"
                  value={form.facebookPageUrl || form.facebook || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      facebookPageUrl: e.target.value,
                      facebook: e.target.value,
                    })
                  }
                  placeholder="https://www.facebook.com/satitmcu"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  ตัวอย่าง: https://www.facebook.com/satitmcu
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  เลือกขนาดความสูงที่จะแสดงโชว์ (Facebook Display Height)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {HEIGHT_OPTIONS.map((opt) => {
                    const isSelected =
                      (form.facebookDisplayHeight || "medium") === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() =>
                          setForm({ ...form, facebookDisplayHeight: opt.value })
                        }
                        className={`px-2 py-2 rounded-xl text-xs font-semibold text-center border transition-all flex flex-col items-center justify-center ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span
                          className={`text-[10px] mt-0.5 ${
                            isSelected ? "text-blue-100" : "text-slate-400"
                          }`}
                        >
                          {opt.heightText}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {form.facebookDisplayHeight === "custom" && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-slate-500">ระบุความสูง:</span>
                    <input
                      type="number"
                      min={200}
                      max={1200}
                      step={10}
                      value={form.facebookCustomHeight || 450}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          facebookCustomHeight: Number(e.target.value) || 450,
                        })
                      }
                      className="w-28 text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-500">พิกเซล (px)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Facebook Live Preview */}
            <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  ตัวอย่างการแสดงผล Facebook (ความสูง:{" "}
                  {getWidgetHeight(
                    form.facebookDisplayHeight,
                    form.facebookCustomHeight
                  )}
                  px)
                </span>
                {(form.facebookPageUrl || form.facebook) && (
                  <a
                    href={form.facebookPageUrl || form.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>เปิดดูเพจ</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {form.showFacebookWidget === false ? (
                <div className="py-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  คุณได้ปิดการแสดงผล Facebook Fanpage บนหน้าเว็บไซต์ไว้
                </div>
              ) : form.facebookPageUrl || form.facebook ? (
                <div
                  className="w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex justify-center items-center shadow-inner"
                  style={{
                    height: `${getWidgetHeight(
                      form.facebookDisplayHeight,
                      form.facebookCustomHeight
                    )}px`,
                  }}
                >
                  <iframe
                    src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                      form.facebookPageUrl || form.facebook || ""
                    )}&tabs=timeline&width=500&height=${getWidgetHeight(
                      form.facebookDisplayHeight,
                      form.facebookCustomHeight
                    )}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                    width="100%"
                    height="100%"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Facebook Fanpage Preview"
                    className="w-full h-full max-w-[500px]"
                  />
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  กรุณากรอกลิงก์ Facebook Fanpage เพื่อดูตัวอย่างการแสดงผล
                </div>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              GOOGLE MAPS WIDGET CONFIGURATION
          ═══════════════════════════════════════════════════════ */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  การตั้งค่า Google Map / แผนที่นำทาง
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  วางโค้ด iframe หรือลิงก์ Google Map embed และเลือกขนาดความสูงที่จะแสดงโชว์
                </p>
              </div>

              <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={form.showMapWidget !== false}
                  onChange={(e) => setForm({ ...form, showMapWidget: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>แสดง Google Map บนหน้าเว็บ</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    โค้ด Iframe หรือลิงก์ Embed แผนที่ Google Map
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        mapEmbedUrl: DEFAULT_MCU_MAP_EMBED,
                      })
                    }
                    className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    + วางโค้ดแผนที่โรงเรียนสาธิต มจร (เริ่มต้น)
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={form.mapEmbedUrl || ""}
                  onChange={(e) => {
                    const rawVal = e.target.value;
                    const extracted = extractEmbedUrl(rawVal);
                    setForm({ ...form, mapEmbedUrl: extracted });
                  }}
                  placeholder='วางโค้ด เช่น <iframe src="https://www.google.com/maps/embed?..." ...></iframe> หรือลิงก์ embed'
                  className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  รองรับทั้งโค้ดเต็ม &lt;iframe src=&quot;...&quot;&gt; และลิงก์ https://www.google.com/maps/embed?... ระบบดึง URL ให้อัตโนมัติ
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ลิงก์เปิดแอปนำทาง GPS (Google Maps URL)
                  </label>
                  <input
                    type="text"
                    value={form.mapUrl || ""}
                    onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
                    placeholder="https://maps.google.com/?cid=... หรือ https://goo.gl/maps/..."
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    ใช้สำหรับปุ่มคลิก &quot;เปิดแอปนำทาง (GPS)&quot; บนมือถือ/คอมพิวเตอร์
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    เลือกขนาดความสูงที่จะแสดงโชว์ (Map Display Height)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {HEIGHT_OPTIONS.map((opt) => {
                      const isSelected =
                        (form.mapDisplayHeight || "medium") === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() =>
                            setForm({ ...form, mapDisplayHeight: opt.value })
                          }
                          className={`px-2 py-2 rounded-xl text-xs font-semibold text-center border transition-all flex flex-col items-center justify-center ${
                            isSelected
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                              : "bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span
                            className={`text-[10px] mt-0.5 ${
                              isSelected ? "text-emerald-100" : "text-slate-400"
                            }`}
                          >
                            {opt.heightText}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {form.mapDisplayHeight === "custom" && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-slate-500">ระบุความสูง:</span>
                      <input
                        type="number"
                        min={200}
                        max={1200}
                        step={10}
                        value={form.mapCustomHeight || 450}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            mapCustomHeight: Number(e.target.value) || 450,
                          })
                        }
                        className="w-28 text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-slate-500">พิกเซล (px)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Google Map Live Preview */}
            <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  ตัวอย่างการแสดงผลแผนที่ (ความสูง:{" "}
                  {getWidgetHeight(
                    form.mapDisplayHeight,
                    form.mapCustomHeight
                  )}
                  px)
                </span>
                {form.mapUrl && (
                  <a
                    href={form.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>ทดสอบเปิดแอปนำทาง</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {form.showMapWidget === false ? (
                <div className="py-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  คุณได้ปิดการแสดงผล Google Map บนหน้าเว็บไซต์ไว้
                </div>
              ) : form.mapEmbedUrl ? (
                <div
                  className="w-full bg-slate-200 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner"
                  style={{
                    height: `${getWidgetHeight(
                      form.mapDisplayHeight,
                      form.mapCustomHeight
                    )}px`,
                  }}
                >
                  <iframe
                    src={extractEmbedUrl(form.mapEmbedUrl)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map Preview"
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  กรุณาวางโค้ด iframe หรือลิงก์ embed ของ Google Map เพื่อดูตัวอย่าง
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Photo Gallery (Add, Edit, Delete, Upload Images) */}
      {activeTab === "gallery" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                คลังภาพบรรยากาศและกิจกรรมโรงเรียน
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                อัปโหลดรูปภาพ ปรับแก้คำอธิบาย และจัดแสดงคลังภาพของโรงเรียน
              </p>
            </div>

            {canManage && (
              <Button
                type="button"
                onClick={openAddGallery}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มรูปภาพในคลัง</span>
              </Button>
            )}
          </div>

          {/* Gallery items list */}
          {(!form.gallery || form.gallery.length === 0) ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-base text-slate-800 dark:text-slate-200">
                ยังไม่มีรูปภาพในคลังภาพ
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                คุณสามารถเพิ่มภาพบรรยากาศ อาคารสถานที่ และกิจกรรมการเรียนรู้ของโรงเรียนได้ที่นี่
              </p>
              {canManage && (
                <Button type="button" onClick={openAddGallery} size="sm" className="gap-1.5 bg-blue-600 text-white">
                  <Plus className="w-4 h-4" />
                  <span>เพิ่มรูปภาพแรก</span>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {form.gallery.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-950/40 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.title || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {canManage && (
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => openEditGallery(item)}
                          className="p-1.5 rounded-lg bg-white/90 text-slate-700 hover:bg-white shadow-xs transition-colors"
                          title="แก้ไขข้อความ/ภาพ"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-700 shadow-xs transition-colors"
                          title="ลบรูปภาพนี้"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">
                        {item.title || "ไม่มีชื่อรูปภาพ"}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description || "ไม่มีคำอธิบายเพิ่มเติม"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gallery Modal (Add / Edit) */}
      <LiyonDialog open={galleryModalOpen} onOpenChange={setGalleryModalOpen}>
        <LiyonDialogHeader
          title={editingGalleryItem ? "แก้ไขรูปภาพในคลัง" : "เพิ่มรูปภาพใหม่ในคลังภาพ"}
          description="อัปโหลดรูปภาพกิจกรรม/บรรยากาศ พร้อมระบุชื่อและคำอธิบาย"
        />
        <LiyonDialogCloseButton label="ปิดหน้าต่าง" />
        <LiyonDialogBody className="space-y-4 py-2">
          <ImageUpload
            value={galleryImageUrl}
            onChange={setGalleryImageUrl}
            label="รูปภาพ (Image)"
            aspect="cover"
          />

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              ชื่อรูปภาพ / หัวข้อกิจกรรม
            </label>
            <input
              type="text"
              value={galleryTitle}
              onChange={(e) => setGalleryTitle(e.target.value)}
              placeholder="เช่น บรรยากาศการเรียนการสอนห้องปฏิบัติการวิทยาศาสตร์"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              คำอธิบายรายละเอียด
            </label>
            <textarea
              rows={3}
              value={galleryDesc}
              onChange={(e) => setGalleryDesc(e.target.value)}
              placeholder="ระบุคำอธิบายเกี่ยวกับภาพหรือกิจกรรม..."
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter className="flex items-center justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setGalleryModalOpen(false)}
            className="text-xs"
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            onClick={handleSaveGalleryItem}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
          >
            บันทึกรูปภาพ
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
