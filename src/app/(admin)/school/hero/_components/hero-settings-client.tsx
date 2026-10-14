"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Layers,
  Sparkles,
  Save,
  Loader2,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Eye,
  Sliders,
  PlaySquare,
  Box,
  Image as ImageIcon,
  CheckCircle2,
  Tv,
  Film,
  Compass,
  ArrowRight,
  MonitorPlay,
  RotateCw,
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
import { updateHeroSettingsAction } from "@/features/school/hero-actions";
import {
  type HeroSettings,
  type HeroSlideItem,
  type HeroDisplayMode,
  DEFAULT_HERO_SETTINGS,
} from "@/features/school/hero-types";

interface Props {
  initialData: HeroSettings;
  canManage: boolean;
}

type TabType = "content" | "mode" | "slides";

export function HeroSettingsClient({ initialData, canManage }: Props) {
  const [data, setData] = useState<HeroSettings>(initialData);
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<TabType>("content");

  // Slide Modal state
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);

  const handleSave = () => {
    if (!canManage) {
      toast.error("คุณไม่มีสิทธิ์ในการบันทึกข้อมูล");
      return;
    }

    startTransition(async () => {
      try {
        const res = await updateHeroSettingsAction(data);
        if (res.ok) {
          toast.success("บันทึกการตั้งค่า Hero Section เรียบร้อยแล้ว");
        } else {
          toast.error("ไม่สามารถบันทึกข้อมูลได้");
        }
      } catch (err: any) {
        toast.error(err?.message || "เกิดข้อผิดพลาดในการบันทึก");
      }
    });
  };

  // Slide CRUD handlers
  const openAddSlideModal = () => {
    setEditingSlide({
      id: `slide-${Date.now()}`,
      title: "",
      subtitle: "",
      imageUrl: "",
      buttonText: "",
      buttonUrl: "",
      displayOrder: (data.slides.length || 0) + 1,
      isActive: true,
    });
    setIsSlideModalOpen(true);
  };

  const openEditSlideModal = (slide: HeroSlideItem) => {
    setEditingSlide({ ...slide });
    setIsSlideModalOpen(true);
  };

  const handleSaveSlideModal = () => {
    if (!editingSlide) return;
    if (!editingSlide.imageUrl.trim()) {
      toast.error("กรุณาระบุ URL หรืออัปโหลดรูปภาพสไลด์");
      return;
    }

    const exists = data.slides.some((s) => s.id === editingSlide.id);
    let updated: HeroSlideItem[];
    if (exists) {
      updated = data.slides.map((s) => (s.id === editingSlide.id ? editingSlide : s));
    } else {
      updated = [...data.slides, editingSlide];
    }

    setData((prev) => ({ ...prev, slides: updated }));
    setIsSlideModalOpen(false);
    setEditingSlide(null);
    toast.success("อัปเดตสไลด์เรียบร้อย (อย่าลืมกดบันทึกการตั้งค่าหลัก)");
  };

  const handleDeleteSlide = (id: string) => {
    if (!confirm("คุณต้องการลบสไลด์นี้ใช่หรือไม่?")) return;
    setData((prev) => ({
      ...prev,
      slides: prev.slides.filter((s) => s.id !== id),
    }));
    toast.success("ลบสไลด์เรียบร้อย");
  };

  const handleToggleSlideActive = (id: string) => {
    setData((prev) => ({
      ...prev,
      slides: prev.slides.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)),
    }));
  };

  const handleMoveSlide = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.slides.length) return;

    const newSlides = [...data.slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;

    // reassign displayOrder
    const reordered = newSlides.map((s, idx) => ({ ...s, displayOrder: idx + 1 }));
    setData((prev) => ({ ...prev, slides: reordered }));
  };

  const handleResetToDefault = () => {
    if (!confirm("ต้องการคืนค่าเริ่มต้นทั้งหมดของ Hero Section ใช่หรือไม่?")) return;
    setData(DEFAULT_HERO_SETTINGS);
    toast.info("คืนค่าเริ่มต้นเรียบร้อย (กรุณากดบันทึกการตั้งค่าเพื่อยืนยัน)");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* ═══ Top Header Bar ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              ส่วนหัวเว็บไซต์ & สไลด์ 3D (Hero Section)
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20">
                Interactive 3D / Slideshow
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              ปรับเพิ่มข้อความ แก้ไข ลบ แต่งเติม 3D เหรียญหมุนวน และภาพสไลด์แบนเนอร์แบบเคลื่อนไหว
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Eye className="w-4 h-4 text-sky-500" />
            <span>ดูหน้าแรก</span>
            <ExternalLink className="w-3 h-3 text-muted-foreground" />
          </Link>

          <Button
            onClick={handleSave}
            disabled={isPending || !canManage}
            className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold shadow-sm"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>บันทึกการตั้งค่า</span>
          </Button>
        </div>
      </div>

      {/* ═══ Navigation Tabs ═══ */}
      <div className="flex border-b border-border bg-card rounded-xl p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "content"
              ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>1. ข้อความพาดหัว & ปุ่มกด (Content)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("mode")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "mode"
              ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <Box className="w-4 h-4" />
          <span>2. โหมดการแสดงผล & 3D (Mode & 3D)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("slides")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "slides"
              ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <Film className="w-4 h-4" />
          <span>3. จัดการภาพสไลด์แบนเนอร์ ({data.slides?.length || 0})</span>
        </button>
      </div>

      {/* ═══ TAB 1: ข้อความพาดหัว & ปุ่มกด ═══ */}
      {activeTab === "content" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Box 1: Headlines */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  ข้อความพาดหัวหลัก (Headlines & Badge)
                </h2>
                <span className="text-xs text-muted-foreground">
                  เปิด/ปิด แต่ละหัวข้อได้อย่างอิสระ
                </span>
              </div>

              <div className="space-y-4">
                {/* 1. Eyebrow Badge */}
                <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      ข้อความป้ายกำกับด้านบน (Eyebrow Badge)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={data.showEyebrowBadge}
                        onChange={(e) => setData({ ...data, showEyebrowBadge: e.target.checked })}
                        className="rounded border-border text-amber-500 focus:ring-amber-500 w-4 h-4"
                      />
                      <span className={data.showEyebrowBadge ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"}>
                        {data.showEyebrowBadge ? "เปิดแสดงผล" : "ปิดซ่อน"}
                      </span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data.eyebrowBadge}
                    onChange={(e) => setData({ ...data, eyebrowBadge: e.target.value })}
                    placeholder="เช่น SMART FACULTY WEB PLATFORM • SATIT MCU"
                    disabled={!data.showEyebrowBadge}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-background focus:ring-2 focus:ring-amber-500 focus:outline-none disabled:opacity-40"
                  />
                </div>

                {/* 2. Headline Part 1 */}
                <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      ข้อความพาดหัวบรรทัดที่ 1 (Headline Part 1)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={data.showHeadlinePart1}
                        onChange={(e) => setData({ ...data, showHeadlinePart1: e.target.checked })}
                        className="rounded border-border text-amber-500 focus:ring-amber-500 w-4 h-4"
                      />
                      <span className={data.showHeadlinePart1 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"}>
                        {data.showHeadlinePart1 ? "เปิดแสดงผล" : "ปิดซ่อน"}
                      </span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data.headlinePart1}
                    onChange={(e) => setData({ ...data, headlinePart1: e.target.value })}
                    placeholder="เช่น พัฒนาปัญญา สร้างสรรค์วิชาการ"
                    disabled={!data.showHeadlinePart1}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-background focus:ring-2 focus:ring-amber-500 focus:outline-none font-semibold disabled:opacity-40"
                  />
                </div>

                {/* 3. Headline Part 2 */}
                <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      ข้อความพาดหัวบรรทัดที่ 2 (Headline Part 2 - ไฮไลต์สีทอง)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={data.showHeadlinePart2}
                        onChange={(e) => setData({ ...data, showHeadlinePart2: e.target.checked })}
                        className="rounded border-border text-amber-500 focus:ring-amber-500 w-4 h-4"
                      />
                      <span className={data.showHeadlinePart2 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"}>
                        {data.showHeadlinePart2 ? "เปิดแสดงผล" : "ปิดซ่อน"}
                      </span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data.headlinePart2}
                    onChange={(e) => setData({ ...data, headlinePart2: e.target.value })}
                    placeholder="เช่น สู่นวัตกรรมการศึกษาและบริหารจัดการที่ทันสมัย"
                    disabled={!data.showHeadlinePart2}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-background focus:ring-2 focus:ring-amber-500 focus:outline-none text-amber-600 dark:text-amber-400 font-semibold disabled:opacity-40"
                  />
                </div>

                {/* 4. Description Paragraph */}
                <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      คำอธิบายรายละเอียด (Description Paragraph)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={data.showDescription}
                        onChange={(e) => setData({ ...data, showDescription: e.target.checked })}
                        className="rounded border-border text-amber-500 focus:ring-amber-500 w-4 h-4"
                      />
                      <span className={data.showDescription ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted-foreground"}>
                        {data.showDescription ? "เปิดแสดงผล" : "ปิดซ่อน"}
                      </span>
                    </label>
                  </div>
                  <textarea
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    placeholder="ระบุคำอธิบายสั้นๆ เกี่ยวกับพันธกิจหรือบทบาทของโรงเรียน..."
                    disabled={!data.showDescription}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-background focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed disabled:opacity-40"
                  />
                </div>

                {/* 5. Slide Brightness / Overlay Filter */}
                <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-500" />
                        ความสว่างของภาพสไลด์ (Slide Brightness / Clear View)
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        เมื่อปิดข้อความพาดหัว แนะนำเลือก &ldquo;สว่างสดใส&rdquo; เพื่อให้ภาพสไลด์คมชัด สว่าง สวยเต็มตา
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { label: "สว่างสดใส (Bright)", value: "bright", desc: "ภาพสว่าง คมชัด ไม่มืด" },
                      { label: "สมดุล (Normal)", value: "normal", desc: "มืดปานกลาง อ่านง่าย" },
                      { label: "ฟิล์มมืด (Cinematic)", value: "cinematic", desc: "สไตล์ฟิล์มเข้มลึก" },
                    ].map((b) => (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => setData({ ...data, slideBrightness: b.value as any })}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          data.slideBrightness === b.value
                            ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-xs"
                            : "border-border bg-background hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="text-xs">{b.label}</div>
                        <div className={`text-[10px] mt-0.5 ${data.slideBrightness === b.value ? "text-slate-900" : "text-muted-foreground"}`}>
                          {b.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Buttons */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-500" />
                ปุ่มแอ็กชันนำทาง (Call to Action Buttons)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Primary Button */}
                <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">ปุ่มหลัก (Primary Button)</span>
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.showPrimaryButton}
                        onChange={(e) => setData({ ...data, showPrimaryButton: e.target.checked })}
                        className="rounded border-border text-amber-500 focus:ring-amber-500"
                      />
                      <span>เปิดแสดงผล</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">ข้อความบนปุ่ม</label>
                    <input
                      type="text"
                      value={data.primaryButtonText}
                      onChange={(e) => setData({ ...data, primaryButtonText: e.target.value })}
                      placeholder="เช่น สำรวจหลักสูตรการศึกษา"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">ลิงค์ปลายทาง (URL / Anchor)</label>
                    <input
                      type="text"
                      value={data.primaryButtonUrl}
                      onChange={(e) => setData({ ...data, primaryButtonUrl: e.target.value })}
                      placeholder="เช่น #curriculum หรือ /courses"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background font-mono"
                    />
                  </div>
                </div>

                {/* Secondary Button */}
                <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">ปุ่มรอง (Secondary Button)</span>
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.showSecondaryButton}
                        onChange={(e) => setData({ ...data, showSecondaryButton: e.target.checked })}
                        className="rounded border-border text-amber-500 focus:ring-amber-500"
                      />
                      <span>เปิดแสดงผล</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">ข้อความบนปุ่ม</label>
                    <input
                      type="text"
                      value={data.secondaryButtonText}
                      onChange={(e) => setData({ ...data, secondaryButtonText: e.target.value })}
                      placeholder="เช่น ข่าวประชาสัมพันธ์"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">ลิงค์ปลายทาง (URL / Anchor)</label>
                    <input
                      type="text"
                      value={data.secondaryButtonUrl}
                      onChange={(e) => setData({ ...data, secondaryButtonUrl: e.target.value })}
                      placeholder="เช่น #news หรือ /news"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tips & Preview */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                คำแนะนำการตั้งค่าข้อความ
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ส่วนหัวเว็บไซต์ (Hero Section) เป็นจุดดึงดูดสายตาจุดแรกของครู นักเรียน และผู้ปกครอง ควรใช้ข้อความที่กระชับ สื่อถึงอัตลักษณ์และวิสัยทัศน์ของโรงเรียนสาธิต มจร อย่างชัดเจน
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetToDefault}
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCw className="w-3.5 h-3.5 mr-1.5" />
                  คืนค่าเริ่มต้นตามมาตรฐาน
                </Button>
              </div>
            </div>

            {/* Quick Live Preview Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-white space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-wider font-mono text-amber-400 font-bold uppercase bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  ตัวอย่างข้อความสด
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {data.slideBrightness === "bright" ? "✨ โหมดสว่างสดใส" : data.slideBrightness === "normal" ? "⚖️ โหมดสมดุล" : "🎬 โหมดฟิล์มมืด"}
                </span>
              </div>

              {(!data.showEyebrowBadge && !data.showHeadlinePart1 && !data.showHeadlinePart2 && !data.showDescription && !data.showPrimaryButton && !data.showSecondaryButton) ? (
                <div className="py-6 px-3 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/50 space-y-1.5">
                  <Eye className="w-5 h-5 text-amber-400 mx-auto" />
                  <div className="text-xs font-bold text-amber-300">
                    ปิดซ่อนข้อความทั้งหมดแล้ว
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    หน้าแรกจะแสดงเฉพาะภาพสไลด์แบนเนอร์แบบเด่นชัด สว่างเต็มตา สวยงาม
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {data.showEyebrowBadge && data.eyebrowBadge && (
                    <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">
                      {data.eyebrowBadge}
                    </div>
                  )}

                  {data.showHeadlinePart1 && data.headlinePart1 && (
                    <div className="text-base font-extrabold text-white leading-tight">
                      {data.headlinePart1}
                    </div>
                  )}

                  {data.showHeadlinePart2 && data.headlinePart2 && (
                    <div className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 leading-tight">
                      {data.headlinePart2}
                    </div>
                  )}

                  {data.showDescription && data.description && (
                    <div className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {data.description}
                    </div>
                  )}

                  {(data.showPrimaryButton || data.showSecondaryButton) && (
                    <div className="flex gap-2 pt-2">
                      {data.showPrimaryButton && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                          {data.primaryButtonText}
                        </span>
                      )}
                      {data.showSecondaryButton && (
                        <span className="px-2.5 py-1 rounded-full border border-white/20 text-white font-medium text-[10px]">
                          {data.secondaryButtonText}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: โหมดการแสดงผล & 3D ═══ */}
      {activeTab === "mode" && (
        <div className="space-y-6">
          {/* Mode Selector */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <MonitorPlay className="w-4 h-4 text-amber-500" />
                เลือกรูปแบบการนำเสนอหน้าแรก (Hero Presentation Mode)
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                กำหนดว่าต้องการให้หน้าแรกแสดงผลแอนิเมชัน 3D เหรียญทองคำ ภาพสไลด์ หรือวิดีโอพื้นหลัง
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* Option 1: Hybrid */}
              <div
                onClick={() => setData({ ...data, displayMode: "hybrid" })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.displayMode === "hybrid"
                    ? "border-amber-500 bg-amber-500/10 shadow-md ring-1 ring-amber-500"
                    : "border-border bg-card hover:border-muted-foreground/30 hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  {data.displayMode === "hybrid" && (
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div className="font-bold text-sm text-foreground">ไฮบริด 3D + สไลด์ (Hybrid)</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  แสดงภาพสไลด์แบนเนอร์เคลื่อนไหว ซ้อนทับด้วยเหรียญ 3D หมุนวน (สวยงามและล้ำสมัยที่สุด)
                </div>
                <div className="mt-3">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                    แนะนำสูงสุด
                  </span>
                </div>
              </div>

              {/* Option 2: Slideshow */}
              <div
                onClick={() => setData({ ...data, displayMode: "slideshow" })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.displayMode === "slideshow"
                    ? "border-amber-500 bg-amber-500/10 shadow-md ring-1 ring-amber-500"
                    : "border-border bg-card hover:border-muted-foreground/30 hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-500 flex items-center justify-center">
                    <Film className="w-5 h-5" />
                  </div>
                  {data.displayMode === "slideshow" && (
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div className="font-bold text-sm text-foreground">ภาพสไลด์แบนเนอร์ (Slideshow)</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  สไลด์ภาพความละเอียดสูงแบบ Interactive พร้อมซูม Ken Burns และปุ่มกดเปลี่ยนภาพ
                </div>
              </div>

              {/* Option 3: 3D Only */}
              <div
                onClick={() => setData({ ...data, displayMode: "3d" })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.displayMode === "3d"
                    ? "border-amber-500 bg-amber-500/10 shadow-md ring-1 ring-amber-500"
                    : "border-border bg-card hover:border-muted-foreground/30 hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
                    <Box className="w-5 h-5" />
                  </div>
                  {data.displayMode === "3d" && (
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div className="font-bold text-sm text-foreground">แอนิเมชัน 3D (3D Coins)</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  เหรียญตราสัญลักษณ์หมุนวนตามรางสามมิติ WebGL พร้อมวิดีโอลูป Cinematic
                </div>
              </div>

              {/* Option 4: Video Loop */}
              <div
                onClick={() => setData({ ...data, displayMode: "video" })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  data.displayMode === "video"
                    ? "border-amber-500 bg-amber-500/10 shadow-md ring-1 ring-amber-500"
                    : "border-border bg-card hover:border-muted-foreground/30 hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                    <Tv className="w-5 h-5" />
                  </div>
                  {data.displayMode === "video" && (
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div className="font-bold text-sm text-foreground">วิดีโอลูป (Video Loop)</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  พื้นหลังวิดีโอลูป Cinematic สะอาดตา เหมาะกับเน้นข้อความและการนำเสนอเรียบหรู
                </div>
              </div>
            </div>
          </div>

          {/* 3D & Particle Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 3D Controls */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-500" />
                ปรับแต่งแอนิเมชัน 3D (3D Scene Customization)
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/20">
                  <div>
                    <div className="text-sm font-semibold text-foreground">แสดงเหรียญ 3D หมุนวน (3D Coins)</div>
                    <div className="text-xs text-muted-foreground">เหรียญโลโก้โรงเรียนหมุนวนตามรางโค้งสามมิติ</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.show3DCoins}
                    onChange={(e) => setData({ ...data, show3DCoins: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded border-border focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/20">
                  <div>
                    <div className="text-sm font-semibold text-foreground">แสดงละอองดาวระยิบระยับ (Stardust Particles)</div>
                    <div className="text-xs text-muted-foreground">อนุภาคแสงสีทองและฟ้าลอยละล่องเพิ่มมิติความลึก</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.showParticles}
                    onChange={(e) => setData({ ...data, showParticles: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded border-border focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">
                    ความเร็วการเคลื่อนที่ของเหรียญ 3D (Speed Multiplier)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "0.5x ช้าเนียน", value: 0.5 },
                      { label: "1.0x ปกติ", value: 1.0 },
                      { label: "1.5x กระฉับกระเฉง", value: 1.5 },
                      { label: "2.0x เร็ว", value: 2.0 },
                    ].map((sp) => (
                      <button
                        key={sp.value}
                        type="button"
                        onClick={() => setData({ ...data, coinSpeed: sp.value })}
                        className={`py-2 px-1 text-xs rounded-lg font-medium border text-center transition-all ${
                          data.coinSpeed === sp.value
                            ? "bg-amber-500 text-slate-950 font-bold border-amber-500"
                            : "border-border hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Background Settings */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-500" />
                วิดีโอพื้นหลัง (Cinematic Background Video)
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/20">
                  <div>
                    <div className="text-sm font-semibold text-foreground">เปิดใช้วิดีโอพื้นหลัง (Show Video Loop)</div>
                    <div className="text-xs text-muted-foreground">เล่นวิดีโอ Cinematic แบบไร้เสียง วนซ้ำอัตโนมัติ</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={data.showVideoBg}
                    onChange={(e) => setData({ ...data, showVideoBg: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded border-border focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                    URL ของไฟล์วิดีโอ (MP4 Video Direct Link)
                  </label>
                  <input
                    type="text"
                    value={data.videoBgUrl || ""}
                    onChange={(e) => setData({ ...data, videoBgUrl: e.target.value })}
                    placeholder="https://.../video.mp4"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-border bg-background font-mono"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    แนะนำให้ใช้ไฟล์ MP4 ที่ความละเอียด 1080p หรือ 720p อัตราส่วน 16:9 เพื่อประสิทธิภาพที่ดี
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 3: จัดการภาพสไลด์แบนเนอร์ (Interactive Slides) ═══ */}
      {activeTab === "slides" && (
        <div className="space-y-6">
          {/* Slides Settings (Interval & Animation) */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-500" />
                  การตั้งค่าการเลื่อนภาพสไลด์ (Carousel Options)
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ปรับความเร็วการเปลี่ยนภาพและแอนิเมชันเอฟเฟกต์
                </p>
              </div>

              <Button
                onClick={openAddSlideModal}
                className="gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shrink-0 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มภาพสไลด์ใหม่</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  ความเร็วในการเปลี่ยนสไลด์อัตโนมัติ (วินาที)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 7, 10].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setData({ ...data, slideInterval: sec })}
                      className={`py-2 text-xs rounded-lg font-medium border text-center transition-all ${
                        data.slideInterval === sec
                          ? "bg-amber-500 text-slate-950 font-bold border-amber-500"
                          : "border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {sec} วินาที
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  รูปแบบเอฟเฟกต์การแสดงผล (Slide Animation)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Ken Burns ซูมลึก", value: "kenburns" },
                    { label: "Smooth Fade จาง", value: "fade" },
                    { label: "Slide เลื่อน", value: "slide" },
                  ].map((anim) => (
                    <button
                      key={anim.value}
                      type="button"
                      onClick={() => setData({ ...data, slideAnimation: anim.value as any })}
                      className={`py-2 text-xs rounded-lg font-medium border text-center transition-all ${
                        data.slideAnimation === anim.value
                          ? "bg-amber-500 text-slate-950 font-bold border-amber-500"
                          : "border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {anim.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slides List */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground">
              รายการภาพสไลด์ ({data.slides?.length || 0} ภาพ)
            </h3>

            {(!data.slides || data.slides.length === 0) ? (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium text-foreground">ยังไม่มีภาพสไลด์ในระบบ</p>
                <p className="text-xs text-muted-foreground mt-1">กดปุ่มด้านล่างเพื่อเพิ่มภาพสไลด์แรกของคุณ</p>
                <Button
                  onClick={openAddSlideModal}
                  size="sm"
                  className="mt-4 gap-2 bg-amber-500 text-slate-950 font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>เพิ่มภาพสไลด์</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {data.slides.map((slide, index) => (
                  <div
                    key={slide.id || index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Image Thumbnail */}
                      <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-900 border border-border shrink-0 relative group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slide.imageUrl}
                          alt={slide.title || "Slide"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                            #{index + 1}
                          </span>
                          <h4 className="text-sm font-bold text-foreground line-clamp-1">
                            {slide.title || "สไลด์ไม่มีชื่อ"}
                          </h4>
                          {!slide.isActive && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border">
                              ปิดการแสดงผล
                            </span>
                          )}
                        </div>
                        {slide.subtitle && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {slide.subtitle}
                          </p>
                        )}
                        {slide.buttonText && (
                          <div className="text-[11px] text-sky-600 dark:text-sky-400 mt-1 flex items-center gap-1 font-mono">
                            <span>ปุ่ม: {slide.buttonText}</span>
                            <span>→ {slide.buttonUrl}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      {/* Reorder Buttons */}
                      <button
                        type="button"
                        onClick={() => handleMoveSlide(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg border border-border hover:bg-background text-muted-foreground disabled:opacity-30 transition-colors"
                        title="เลื่อนขึ้น"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveSlide(index, "down")}
                        disabled={index === data.slides.length - 1}
                        className="p-1.5 rounded-lg border border-border hover:bg-background text-muted-foreground disabled:opacity-30 transition-colors"
                        title="เลื่อนลง"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Active toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleSlideActive(slide.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          slide.isActive
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {slide.isActive ? "แสดงผล" : "ซ่อน"}
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => openEditSlideModal(slide)}
                        className="p-1.5 rounded-lg border border-border hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                        title="แก้ไขสไลด์"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="p-1.5 rounded-lg border border-rose-500/20 hover:bg-rose-500/10 text-rose-500 transition-colors"
                        title="ลบสไลด์"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ DIALOG: เพิ่ม / แก้ไข ภาพสไลด์ ═══ */}
      <LiyonDialog open={isSlideModalOpen} onOpenChange={setIsSlideModalOpen}>
        <LiyonDialogHeader
          title={editingSlide?.title ? "แก้ไขข้อมูลภาพสไลด์" : "เพิ่มภาพสไลด์แบนเนอร์ใหม่"}
          description="อัปโหลดหรือระบุ URL รูปภาพ พร้อมข้อความและปุ่มลิงค์ปลายทาง"
        />
        <LiyonDialogCloseButton label="ปิดหน้าต่าง" />

        <LiyonDialogBody className="space-y-4 py-2">
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {/* Image Upload / URL */}
              <div>
                <ImageUpload
                  value={editingSlide?.imageUrl}
                  onChange={(url) => setEditingSlide((prev) => (prev ? { ...prev, imageUrl: url } : null))}
                  label="รูปภาพสไลด์ (แนะนำขนาด 1920x1080 หรือ 1600x900 แนวนอน)"
                  placeholder="อัปโหลดภาพ หรือวาง URL จาก Facebook / Unsplash / Web"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  หัวข้อสไลด์ (Title - ตัวเลือก)
                </label>
                <input
                  type="text"
                  value={editingSlide?.title || ""}
                  onChange={(e) =>
                    setEditingSlide((prev) => (prev ? { ...prev, title: e.target.value } : null))
                  }
                  placeholder="เช่น ยินดีต้อนรับสู่ โรงเรียนสาธิต มจร"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  คำบรรยายสไลด์ (Subtitle - ตัวเลือก)
                </label>
                <textarea
                  rows={2}
                  value={editingSlide?.subtitle || ""}
                  onChange={(e) =>
                    setEditingSlide((prev) => (prev ? { ...prev, subtitle: e.target.value } : null))
                  }
                  placeholder="เช่น มุ่งมั่นพัฒนาวิชาการ ปลูกฝังคุณธรรม ก้าวทันเทคโนโลยีดิจิทัลสู่สากล"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background"
                />
              </div>

              {/* Button Text & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    ข้อความปุ่มกดบนสไลด์ (ถ้ามี)
                  </label>
                  <input
                    type="text"
                    value={editingSlide?.buttonText || ""}
                    onChange={(e) =>
                      setEditingSlide((prev) => (prev ? { ...prev, buttonText: e.target.value } : null))
                    }
                    placeholder="เช่น ดูรายละเอียดเพิ่มเติม"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    ลิงค์ปลายทางของปุ่ม (URL)
                  </label>
                  <input
                    type="text"
                    value={editingSlide?.buttonUrl || ""}
                    onChange={(e) =>
                      setEditingSlide((prev) => (prev ? { ...prev, buttonUrl: e.target.value } : null))
                    }
                    placeholder="เช่น #about หรือ https://..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-background font-mono"
                  />
                </div>
              </div>

              {/* Active Switch */}
              <div className="pt-2 flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                <span className="text-xs font-medium text-foreground">เปิดใช้งานสไลด์นี้ทันที</span>
                <input
                  type="checkbox"
                  checked={editingSlide?.isActive ?? true}
                  onChange={(e) =>
                    setEditingSlide((prev) => (prev ? { ...prev, isActive: e.target.checked } : null))
                  }
                  className="w-4 h-4 text-amber-500 rounded border-border focus:ring-amber-500"
                />
              </div>
            </div>
          </LiyonDialogBody>

          <LiyonDialogFooter>
            <div className="flex items-center justify-end gap-2.5 p-4 border-t border-border bg-muted/10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSlideModalOpen(false)}
              >
                ยกเลิก
              </Button>
              <Button
                size="sm"
                onClick={handleSaveSlideModal}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                ตกลง / นำไปใช้
              </Button>
            </div>
          </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
