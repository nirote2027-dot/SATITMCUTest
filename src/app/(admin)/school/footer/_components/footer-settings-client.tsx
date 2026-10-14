"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Palette,
  Save,
  Loader2,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Globe,
  Building2,
  Eye,
  CheckCircle2,
  Layers,
  Link2,
  Compass,
  BookOpen,
  Users,
  Newspaper,
  FileText,
  Award,
  ArrowRight,
  LogIn,
  GraduationCap,
  Sun,
  Moon,
  Laptop,
  BarChart3,
  Activity,
  Share2,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  LiyonDialogCloseButton,
} from "@/shared/components/liyon";
import { updateFooterSettingsAction } from "@/features/school/footer-actions";
import {
  type FooterSettings,
  type FooterServiceLink,
  type FooterStaffLink,
  type ThemeColorKey,
  type BackgroundThemeKey,
  THEME_CONFIGS,
  BACKGROUND_THEMES,
} from "@/features/school/types";

interface Props {
  initialData: FooterSettings;
  canManage: boolean;
}

type TabType = "theme" | "services" | "staff" | "contact" | "branding" | "preview";

const AVAILABLE_ICONS = [
  { name: "Newspaper", label: "ข่าวสาร", icon: Newspaper },
  { name: "Users", label: "บุคลากร", icon: Users },
  { name: "BookOpen", label: "หลักสูตร", icon: BookOpen },
  { name: "FileText", label: "เอกสาร/บริการ", icon: FileText },
  { name: "Globe", label: "เว็บไซต์", icon: Globe },
  { name: "Building2", label: "โรงเรียน", icon: Building2 },
  { name: "Award", label: "เกียรติยศ", icon: Award },
  { name: "Sparkles", label: "ไฮไลต์", icon: Sparkles },
  { name: "Compass", label: "นำทาง", icon: Compass },
  { name: "ExternalLink", label: "ลิงก์ภายนอก", icon: ExternalLink },
];

function getIconComponent(name?: string) {
  const found = AVAILABLE_ICONS.find((i) => i.name === name);
  return found ? found.icon : Globe;
}

export function FooterSettingsClient({ initialData, canManage }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("theme");
  const [form, setForm] = useState<FooterSettings>(initialData);
  const [pending, startTransition] = useTransition();

  // ─── Modal State: Service Link ───
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceLabel, setServiceLabel] = useState("");
  const [serviceUrl, setServiceUrl] = useState("");
  const [serviceIcon, setServiceIcon] = useState("Globe");
  const [serviceNewTab, setServiceNewTab] = useState(false);
  const [serviceActive, setServiceActive] = useState(true);

  // ─── Modal State: Staff Link ───
  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffLabel, setStaffLabel] = useState("");
  const [staffUrl, setStaffUrl] = useState("");
  const [staffIsButton, setStaffIsButton] = useState(false);
  const [staffBadge, setStaffBadge] = useState("");
  const [staffActive, setStaffActive] = useState(true);

  // Save handler
  const handleSave = () => {
    if (!canManage) {
      toast.error("คุณไม่มีสิทธิ์แก้ไขการตั้งค่าส่วนท้ายเว็บ");
      return;
    }

    startTransition(async () => {
      try {
        const res = await updateFooterSettingsAction(form);
        if (res.ok) {
          toast.success("บันทึกการตั้งค่าส่วนท้ายเว็บและธีมสีเรียบร้อยแล้ว");
        } else {
          toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
      } catch (err: any) {
        toast.error(err?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    });
  };

  // ─── Service CRUD Helpers ───
  const openAddService = () => {
    setEditingServiceId(null);
    setServiceLabel("");
    setServiceUrl("");
    setServiceIcon("Newspaper");
    setServiceNewTab(false);
    setServiceActive(true);
    setServiceModalOpen(true);
  };

  const openEditService = (item: FooterServiceLink) => {
    setEditingServiceId(item.id);
    setServiceLabel(item.label);
    setServiceUrl(item.url);
    setServiceIcon(item.iconName || "Globe");
    setServiceNewTab(item.openInNewTab || false);
    setServiceActive(item.isActive !== false);
    setServiceModalOpen(true);
  };

  const saveServiceModal = () => {
    if (!serviceLabel.trim() || !serviceUrl.trim()) {
      toast.error("กรุณาระบุชื่อลิงก์และ URL");
      return;
    }

    const currentServices = [...(form.services || [])];
    if (editingServiceId) {
      const idx = currentServices.findIndex((s) => s.id === editingServiceId);
      if (idx !== -1) {
        currentServices[idx] = {
          ...currentServices[idx],
          label: serviceLabel.trim(),
          url: serviceUrl.trim(),
          iconName: serviceIcon,
          openInNewTab: serviceNewTab,
          isActive: serviceActive,
        };
      }
    } else {
      currentServices.push({
        id: `srv-${Date.now()}`,
        label: serviceLabel.trim(),
        url: serviceUrl.trim(),
        iconName: serviceIcon,
        openInNewTab: serviceNewTab,
        isActive: serviceActive,
        displayOrder: currentServices.length + 1,
      });
    }

    setForm({ ...form, services: currentServices });
    setServiceModalOpen(false);
    toast.success(editingServiceId ? "แก้ไขลิงก์สำเร็จ" : "เพิ่มลิงก์บริการสำเร็จ");
  };

  const deleteService = (id: string) => {
    if (!confirm("คุณแน่ใจว่าต้องการลบลิงก์บริการนี้?")) return;
    setForm({
      ...form,
      services: (form.services || []).filter((s) => s.id !== id),
    });
    toast.success("ลบลิงก์บริการเรียบร้อย");
  };

  const moveService = (index: number, direction: "up" | "down") => {
    const list = [...(form.services || [])];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    list.forEach((item, idx) => {
      item.displayOrder = idx + 1;
    });
    setForm({ ...form, services: list });
  };

  // ─── Staff CRUD Helpers ───
  const openAddStaff = () => {
    setEditingStaffId(null);
    setStaffLabel("");
    setStaffUrl("");
    setStaffIsButton(false);
    setStaffBadge("");
    setStaffActive(true);
    setStaffModalOpen(true);
  };

  const openEditStaff = (item: FooterStaffLink) => {
    setEditingStaffId(item.id);
    setStaffLabel(item.label);
    setStaffUrl(item.url);
    setStaffIsButton(Boolean(item.isButton));
    setStaffBadge(item.badge || "");
    setStaffActive(item.isActive !== false);
    setStaffModalOpen(true);
  };

  const saveStaffModal = () => {
    if (!staffLabel.trim()) {
      toast.error("กรุณาระบุข้อความรายการ");
      return;
    }

    const currentStaff = [...(form.staffLinks || [])];
    if (editingStaffId) {
      const idx = currentStaff.findIndex((s) => s.id === editingStaffId);
      if (idx !== -1) {
        currentStaff[idx] = {
          ...currentStaff[idx],
          label: staffLabel.trim(),
          url: staffUrl.trim(),
          isButton: staffIsButton,
          badge: staffBadge.trim(),
          isActive: staffActive,
        };
      }
    } else {
      currentStaff.push({
        id: `stf-${Date.now()}`,
        label: staffLabel.trim(),
        url: staffUrl.trim(),
        isButton: staffIsButton,
        badge: staffBadge.trim(),
        isActive: staffActive,
        displayOrder: currentStaff.length + 1,
      });
    }

    setForm({ ...form, staffLinks: currentStaff });
    setStaffModalOpen(false);
    toast.success(editingStaffId ? "แก้ไขรายการสำเร็จ" : "เพิ่มรายการสำเร็จ");
  };

  const deleteStaff = (id: string) => {
    if (!confirm("คุณแน่ใจว่าต้องการลบรายการนี้?")) return;
    setForm({
      ...form,
      staffLinks: (form.staffLinks || []).filter((s) => s.id !== id),
    });
    toast.success("ลบรายการเรียบร้อย");
  };

  const moveStaff = (index: number, direction: "up" | "down") => {
    const list = [...(form.staffLinks || [])];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    list.forEach((item, idx) => {
      item.displayOrder = idx + 1;
    });
    setForm({ ...form, staffLinks: list });
  };

  const currentTheme = THEME_CONFIGS[form.themeColor || "blue"] || THEME_CONFIGS.blue;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20 font-sans">
      {/* ═══ Header Bar ═══ */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Footer & Theme Customizer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            ปรับแต่งส่วนท้ายเว็บ & ธีมสี (Footer & Theme)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
            จัดการระบบงานบริการหลัก สำหรับเจ้าหน้าที่ ติดต่อ & สถานที่ตั้ง และเลือกสีธีมที่เชื่อมโยงระบบทั้งฝั่ง Admin และ Portal
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>ดูหน้าเว็บจริง</span>
          </Link>

          {canManage && (
            <Button
              type="button"
              onClick={handleSave}
              disabled={pending}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{pending ? "กำลังบันทึก..." : "บันทึกการตั้งค่าทั้งหมด"}</span>
            </Button>
          )}
        </div>
      </div>

      {/* ═══ Tabs Navigation ═══ */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab("theme")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "theme"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>1. ธีมสีระบบ (Theme Color)</span>
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/60 ml-0.5"
            style={{ backgroundColor: currentTheme.hex }}
          />
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "services"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>2. ระบบงานบริการหลัก ({form.services?.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("staff")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "staff"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>3. สำหรับเจ้าหน้าที่ ({form.staffLinks?.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "contact"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>4. ติดต่อ & สถานที่ตั้ง</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("branding")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "branding"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>5. ข้อความ & ลิขสิทธิ์</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === "preview"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>6. ดูตัวอย่างสด (Live Preview)</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════
          TAB 1: THEME COLOR SELECTION
      ═══════════════════════════════════════════════════════ */}
      {activeTab === "theme" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>รูปแบบและโทนสีพื้นหลังเว็บไซต์ (Website Background Style)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              ปรับเปลี่ยนโทนสีพื้นหลังหลักของเว็บไซต์ Public Portal (<code className="text-blue-600 font-mono">http://localhost:3010/</code>) ให้เป็นโหมดสว่างสบายตา พาสเทลละมุน หรือโหมดมืดล้ำสมัยตามที่คุณต้องการ
            </p>
          </div>

          {/* Background Theme Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.keys(BACKGROUND_THEMES) as BackgroundThemeKey[]).map((bgKey) => {
              const bgCfg = BACKGROUND_THEMES[bgKey];
              const isSelected = (form.backgroundTheme || "light") === bgKey;

              return (
                <div
                  key={bgKey}
                  onClick={() => setForm({ ...form, backgroundTheme: bgKey })}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-md ring-2 ring-blue-500/20 scale-[1.01]"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950"
                  }`}
                >
                  <div>
                    {/* Visual Preview Box */}
                    <div
                      className="w-full h-16 rounded-xl mb-3 border border-black/10 flex items-center justify-center p-2 relative overflow-hidden shadow-xs"
                      style={{
                        background:
                          bgKey === "warm"
                            ? `linear-gradient(135deg, #ffffff 0%, ${currentTheme.hex}15 100%)`
                            : bgKey === "slate"
                            ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
                            : bgKey === "dark"
                            ? "linear-gradient(135deg, #020617 0%, #0b0f19 100%)"
                            : "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs ${
                            bgCfg.isDark ? "bg-white/10 text-white" : "bg-white text-slate-800 border border-slate-200"
                          }`}
                        >
                          Preview
                        </span>
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: currentTheme.hex }}
                        />
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 bg-blue-600 text-white p-0.5 rounded-full shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        {bgCfg.nameTh}
                      </h4>
                    </div>

                    <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-2">
                      {bgCfg.badge}
                    </span>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {bgCfg.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-400">
                      {bgCfg.isDark ? "Dark Appearance" : "Light Appearance"}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                        เลือกแล้ว
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pt-4 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-600" />
              <span>เลือกสี Accent Theme ของระบบ (สอดคล้องทั้ง Admin & Portal)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              เมื่อเปลี่ยนสีธีมที่นี่ ระบบจะบันทึกค่า <code className="text-blue-600 font-mono">palette</code> และอัปเดตสี Accent ของทั้ง Admin Shell (ขอบไอคอน แถบไฮไลต์ แถบเมนูซ้ายมือ) และฝั่ง Public Portal (แถบเรืองแสง Footer, ปุ่มหลัก, ป้าย Smart Campus) ให้เป็นโทนสีเดียวกันโดยอัตโนมัติ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(THEME_CONFIGS) as ThemeColorKey[]).map((themeKey) => {
              const cfg = THEME_CONFIGS[themeKey];
              const isSelected = (form.themeColor || "blue") === themeKey;

              return (
                <div
                  key={themeKey}
                  onClick={() => setForm({ ...form, themeColor: themeKey })}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 shadow-md ring-2 ring-blue-500/20 scale-[1.01]"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-xl shadow-xs border border-black/10 flex items-center justify-center text-white"
                          style={{ backgroundColor: cfg.hex }}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                            {cfg.nameTh}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {cfg.hex}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                          ใช้งานอยู่
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {cfg.description}
                    </p>
                  </div>

                  {/* Visual theme mini swatch bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">ตัวอย่างแสง/ปุ่ม:</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
                        Badge
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white shadow-xs"
                        style={{ backgroundColor: cfg.hex }}
                      >
                        Button
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Theme Preview Card */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                ตัวอย่างการเรนเดอร์ธีมสีปัจจุบัน ({currentTheme.nameTh})
              </span>
              <span
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${currentTheme.hex}33`, color: "#ffffff" }}
              >
                Hex: {currentTheme.hex}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">แสงเรืองหัว Footer</span>
                <div
                  className="h-1 rounded-full w-full"
                  style={{
                    background: `linear-gradient(to right, transparent, ${currentTheme.hex}, transparent)`,
                  }}
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">ปุ่มล็อกอินเจ้าหน้าที่</span>
                  <span className="text-xs font-bold text-white">Action Button</span>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-md flex items-center gap-1.5 cursor-default"
                  style={{ backgroundColor: currentTheme.hex }}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>เข้าสู่ระบบ</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">ป้ายสถานะ Smart Campus</span>
                  <span className="text-xs font-bold text-white">Status Badge</span>
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full border"
                  style={{
                    backgroundColor: `${currentTheme.hex}25`,
                    borderColor: `${currentTheme.hex}60`,
                    color: "#ffffff",
                  }}
                >
                  Smart Campus
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          TAB 2: MAIN SERVICES (ระบบงานบริการหลัก)
      ═══════════════════════════════════════════════════════ */}
      {activeTab === "services" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>คอลัมน์: ระบบงานบริการหลัก</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                เพิ่ม แก้ไข ลบ และจัดเรียงรายการลิงก์บริการหลักในส่วนท้ายเว็บไซต์
              </p>
            </div>

            {canManage && (
              <Button
                type="button"
                onClick={openAddService}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มลิงก์บริการ</span>
              </Button>
            )}
          </div>

          <div className="max-w-md">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              หัวข้อคอลัมน์ (Column Header)
            </label>
            <input
              type="text"
              value={form.servicesTitle || ""}
              onChange={(e) => setForm({ ...form, servicesTitle: e.target.value })}
              placeholder="ระบบงานบริการหลัก"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* List of service links */}
          <div className="space-y-3">
            {(form.services || []).length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                ยังไม่มีรายการลิงก์บริการ กรุณากดปุ่ม &quot;เพิ่มลิงก์บริการ&quot;
              </div>
            ) : (
              (form.services || []).map((srv, idx) => {
                const IconComp = getIconComponent(srv.iconName);
                return (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveService(idx, "up")}
                          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === (form.services?.length || 0) - 1}
                          onClick={() => moveService(idx, "down")}
                          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4 text-blue-600" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {srv.label}
                          </span>
                          {!srv.isActive && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                              ซ่อนอยู่
                            </span>
                          )}
                          {srv.openInNewTab && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                              หน้าต่างใหม่
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-mono truncate block mt-0.5">
                          {srv.url}
                        </span>
                      </div>
                    </div>

                    {canManage && (
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => openEditService(srv)}
                          className="gap-1 text-xs"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>แก้ไข</span>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => deleteService(srv.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          TAB 3: STAFF LINKS (สำหรับเจ้าหน้าที่)
      ═══════════════════════════════════════════════════════ */}
      {activeTab === "staff" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <span>คอลัมน์: สำหรับเจ้าหน้าที่</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                กำหนดปุ่มเข้าสู่ระบบ ลิงก์แดชบอร์ด และข้อความหน่วยงานกำกับดูแล
              </p>
            </div>

            {canManage && (
              <Button
                type="button"
                onClick={openAddStaff}
                className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มรายการเจ้าหน้าที่</span>
              </Button>
            )}
          </div>

          <div className="max-w-md">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              หัวข้อคอลัมน์ (Column Header)
            </label>
            <input
              type="text"
              value={form.staffTitle || ""}
              onChange={(e) => setForm({ ...form, staffTitle: e.target.value })}
              placeholder="สำหรับเจ้าหน้าที่"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* List of staff links */}
          <div className="space-y-3">
            {(form.staffLinks || []).length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                ยังไม่มีรายการ กรุณากดปุ่ม &quot;เพิ่มรายการเจ้าหน้าที่&quot;
              </div>
            ) : (
              (form.staffLinks || []).map((stf, idx) => {
                return (
                  <div
                    key={stf.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveStaff(idx, "up")}
                          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === (form.staffLinks?.length || 0) - 1}
                          onClick={() => moveStaff(idx, "down")}
                          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {stf.label}
                          </span>
                          {stf.isButton && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                              ปุ่มกด Action
                            </span>
                          )}
                          {stf.badge && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {stf.badge}
                            </span>
                          )}
                          {!stf.isActive && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                              ซ่อนอยู่
                            </span>
                          )}
                        </div>
                        {stf.url && (
                          <span className="text-xs text-slate-400 font-mono truncate block mt-0.5">
                            {stf.url}
                          </span>
                        )}
                      </div>
                    </div>

                    {canManage && (
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => openEditStaff(stf)}
                          className="gap-1 text-xs"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span>แก้ไข</span>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => deleteStaff(stf.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          TAB 4: CONTACT & LOCATION (ติดต่อ & สถานที่ตั้ง)
      ═══════════════════════════════════════════════════════ */}
      {activeTab === "contact" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>คอลัมน์: ติดต่อ & สถานที่ตั้ง</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ปรับปรุงที่อยู่ เบอร์โทรศัพท์ อีเมล เวลาทำการ และลิงก์แผนที่นำทางที่แสดงใน Footer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                หัวข้อคอลัมน์ (Column Title)
              </label>
              <input
                type="text"
                value={form.contact?.title || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, title: e.target.value },
                  })
                }
                placeholder="ติดต่อ & สถานที่ตั้ง"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ที่อยู่สถานศึกษา (Address)
              </label>
              <textarea
                rows={2}
                value={form.contact?.address || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, address: e.target.value },
                  })
                }
                placeholder="เลขที่ หมู่ ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                เบอร์โทรศัพท์ (Phone)
              </label>
              <input
                type="text"
                value={form.contact?.phone || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, phone: e.target.value },
                  })
                }
                placeholder="โทรศัพท์: 035-248-000 ต่อ 8888"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                อีเมลติดต่อ (Email)
              </label>
              <input
                type="email"
                value={form.contact?.email || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, email: e.target.value },
                  })
                }
                placeholder="อีเมล: contact@satit.mcu.ac.th"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                เวลาทำการ (Operating Hours)
              </label>
              <input
                type="text"
                value={form.contact?.operatingHours || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, operatingHours: e.target.value },
                  })
                }
                placeholder="เวลาทำการ: จันทร์ - ศุกร์ 08:30 - 16:30 น."
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ลิงก์แผนที่นำทาง GPS (Google Maps URL)
              </label>
              <input
                type="text"
                value={form.contact?.mapUrl || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, mapUrl: e.target.value },
                  })
                }
                placeholder="https://maps.app.goo.gl/..."
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          TAB 5: BRANDING & COPYRIGHT (ข้อความส่วนล่าง)
      ═══════════════════════════════════════════════════════ */}
      {activeTab === "branding" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>ข้อความสถานศึกษา สถานะระบบ และลิขสิทธิ์</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              กำหนดข้อความบรรยายพันธกิจใต้โลโก้ ป้ายสถานะระบบออนไลน์ และข้อความลิขสิทธิ์ส่วนล่างสุด
            </p>
          </div>

          <div className="space-y-6">
            {/* 1. Smart Campus Badge Setting */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span>ป้ายสถานะ Smart Campus ข้างชื่อโรงเรียน</span>
                </span>
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.showSmartCampusBadge !== false}
                    onChange={(e) => setForm({ ...form, showSmartCampusBadge: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>เปิดแสดงป้าย (Show Badge)</span>
                </label>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                ป้ายกำกับพิเศษข้างชื่อโรงเรียนใน Footer หากไม่ต้องการให้แสดงสามารถปิดได้ หรือเปลี่ยนข้อความเป็นคำอื่นตามต้องการ
              </p>
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="text"
                  value={form.smartCampusBadge ?? "Smart Campus"}
                  onChange={(e) => setForm({ ...form, smartCampusBadge: e.target.value })}
                  placeholder="เช่น Smart Campus, สาธิต มจร, ดิจิทัลเพื่อการเรียนรู้"
                  disabled={form.showSmartCampusBadge === false}
                  className="flex-1 text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                {form.showSmartCampusBadge !== false && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, smartCampusBadge: "", showSmartCampusBadge: false })}
                    className="px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900 transition-colors cursor-pointer shrink-0"
                  >
                    ลบป้ายออก (ไม่แสดง)
                  </button>
                )}
              </div>
            </div>

            {/* 2. Social Media Links (Facebook, YouTube, Line) */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span>ไอคอนโซเชียลมีเดียใน Footer (Facebook, YouTube, LINE)</span>
                </span>
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.socialLinks?.showSocials !== false}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socialLinks: {
                          ...(form.socialLinks || { showSocials: true }),
                          showSocials: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>เปิดแสดงไอคอนโซเชียล</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* Facebook Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                    <span>ลิงก์ Facebook Fanpage</span>
                  </label>
                  <input
                    type="text"
                    value={form.socialLinks?.facebookUrl || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socialLinks: {
                          ...(form.socialLinks || { showSocials: true }),
                          facebookUrl: e.target.value,
                        },
                      })
                    }
                    placeholder="https://facebook.com/..."
                    className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* YouTube Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                    <span>ลิงก์ YouTube Channel</span>
                  </label>
                  <input
                    type="text"
                    value={form.socialLinks?.youtubeUrl || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socialLinks: {
                          ...(form.socialLinks || { showSocials: true }),
                          youtubeUrl: e.target.value,
                        },
                      })
                    }
                    placeholder="https://youtube.com/@..."
                    className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* LINE Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span>ลิงก์ LINE Official Account</span>
                  </label>
                  <input
                    type="text"
                    value={form.socialLinks?.lineUrl || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        socialLinks: {
                          ...(form.socialLinks || { showSocials: true }),
                          lineUrl: e.target.value,
                        },
                      })
                    }
                    placeholder="https://line.me/R/ti/p/@..."
                    className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. Visitor Stats Widget Settings */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>ระบบสถิติผู้เข้าชมเว็บไซต์ (Visitor Counter Widget)</span>
                </span>
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <input
                      type="checkbox"
                      checked={form.visitorStats?.autoTracking !== false}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          visitorStats: {
                            todayCount: form.visitorStats?.todayCount || 128,
                            totalCount: form.visitorStats?.totalCount || 45670,
                            onlineCount: form.visitorStats?.onlineCount || 14,
                            title: form.visitorStats?.title || "สถิติผู้เข้าชมเว็บไซต์",
                            enabled: form.visitorStats?.enabled !== false,
                            autoTracking: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span>⚡ โหมด Auto-Tracker (นับยอดจริงลงฐานข้อมูลอัตโนมัติ)</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <input
                      type="checkbox"
                      checked={form.visitorStats?.enabled !== false}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          visitorStats: {
                            todayCount: form.visitorStats?.todayCount || 128,
                            totalCount: form.visitorStats?.totalCount || 45670,
                            onlineCount: form.visitorStats?.onlineCount || 14,
                            title: form.visitorStats?.title || "สถิติผู้เข้าชมเว็บไซต์",
                            autoTracking: form.visitorStats?.autoTracking !== false,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span>เปิดแสดงกล่องสถิติ</span>
                  </label>
                </div>
              </div>

              {form.visitorStats?.autoTracking !== false && (
                <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                  <Activity className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-bold">ระบบ Auto-Tracker กำลังทำงาน:</span> ทุกครั้งที่มีผู้เข้าชมเปิดหน้าเว็บไซต์ระบบจะบันทึกสถิติลงฐานข้อมูลจริงโดยอัตโนมัติ (+1 ยอดรวม, +1 ยอดวันนี้ และรีเซ็ตยอดวันนี้เมื่อขึ้นวันใหม่) โดยคุณสามารถแก้ไขตัวเลขด้านล่างนี้เพื่อตั้งเป็น <strong>ยอดสะสมตั้งต้น (Baseline)</strong> ได้ตลอดเวลา
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ชื่อหัวข้อกล่องสถิติ
                  </label>
                  <input
                    type="text"
                    value={form.visitorStats?.title || "สถิติผู้เข้าชมเว็บไซต์"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        visitorStats: {
                          todayCount: form.visitorStats?.todayCount || 128,
                          totalCount: form.visitorStats?.totalCount || 45670,
                          onlineCount: form.visitorStats?.onlineCount || 14,
                          enabled: form.visitorStats?.enabled !== false,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ผู้เข้าชมวันนี้ (Today)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.visitorStats?.todayCount ?? 128}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        visitorStats: {
                          title: form.visitorStats?.title || "สถิติผู้เข้าชมเว็บไซต์",
                          totalCount: form.visitorStats?.totalCount || 45670,
                          onlineCount: form.visitorStats?.onlineCount || 14,
                          enabled: form.visitorStats?.enabled !== false,
                          todayCount: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ผู้เข้าชมรวมทั้งหมด (Total)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.visitorStats?.totalCount ?? 45670}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        visitorStats: {
                          title: form.visitorStats?.title || "สถิติผู้เข้าชมเว็บไซต์",
                          todayCount: form.visitorStats?.todayCount || 128,
                          onlineCount: form.visitorStats?.onlineCount || 14,
                          enabled: form.visitorStats?.enabled !== false,
                          totalCount: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    กำลังออนไลน์ขณะนี้ (Online)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.visitorStats?.onlineCount ?? 14}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        visitorStats: {
                          title: form.visitorStats?.title || "สถิติผู้เข้าชมเว็บไซต์",
                          todayCount: form.visitorStats?.todayCount || 128,
                          totalCount: form.visitorStats?.totalCount || 45670,
                          enabled: form.visitorStats?.enabled !== false,
                          onlineCount: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* 4. Brand Description */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ข้อความบรรยายใต้โลโก้โรงเรียน (Brand Description)
              </label>
              <textarea
                rows={3}
                value={form.brandDescription || ""}
                onChange={(e) => setForm({ ...form, brandDescription: e.target.value })}
                placeholder="มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล..."
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 5. System Status and Copyright */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ข้อความป้ายสถานะระบบ (System Status Text)
                </label>
                <input
                  type="text"
                  value={form.systemStatusText || ""}
                  onChange={(e) => setForm({ ...form, systemStatusText: e.target.value })}
                  placeholder="ระบบบริการออนไลน์พร้อมใช้งาน (All Systems Operational)"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.showSystemStatus !== false}
                    onChange={(e) => setForm({ ...form, showSystemStatus: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>แสดงป้ายสถานะระบบออนไลน์สีเขียว (Status Pill)</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ข้อความลิขสิทธิ์หลัก (Copyright Text)
                </label>
                <input
                  type="text"
                  value={form.copyrightText || ""}
                  onChange={(e) => setForm({ ...form, copyrightText: e.target.value })}
                  placeholder="© 2026 SATIT MCU System. All rights reserved."
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ข้อความลิขสิทธิ์รอง (Copyright Subtext)
                </label>
                <input
                  type="text"
                  value={form.copyrightSubtext || ""}
                  onChange={(e) => setForm({ ...form, copyrightSubtext: e.target.value })}
                  placeholder="โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={form.showBackToTop !== false}
                  onChange={(e) => setForm({ ...form, showBackToTop: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>แสดงปุ่ม &quot;กลับขึ้นด้านบน (Back to Top)&quot;</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          TAB 6: LIVE PREVIEW OF FOOTER
      ═══════════════════════════════════════════════════════ */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>ตัวอย่างการแสดงผล Footer จริง (โหมด ธีม: {currentTheme.nameTh})</span>
            </span>
            <span className="text-slate-400">
              ค่าที่แสดงจะปรับเปลี่ยนทันทีตามที่คุณปรับแต่งในแท็บด้านบน
            </span>
          </div>

          {/* Render Footer Mock */}
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/80 overflow-hidden font-sans">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[2px] pointer-events-none"
                style={{
                  background: `linear-gradient(to right, transparent, ${currentTheme.hex}, transparent)`,
                }}
              />

              <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
                  {/* Col 1 */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shrink-0">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-base">SATIT MCU</span>
                          {form.showSmartCampusBadge !== false && form.smartCampusBadge && (
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                              style={{
                                backgroundColor: `${currentTheme.hex}25`,
                                borderColor: `${currentTheme.hex}60`,
                                color: "#ffffff",
                              }}
                            >
                              {form.smartCampusBadge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">
                          โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                      {form.brandDescription ||
                        "มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล..."}
                    </p>

                    {/* Social Media Links Preview */}
                    {form.socialLinks?.showSocials !== false && (
                      <div className="pt-1">
                        <span className="text-[10px] font-semibold text-slate-400 block mb-1.5">
                          ช่องทางติดตามออนไลน์:
                        </span>
                        <div className="flex items-center gap-2">
                          {form.socialLinks?.facebookUrl && (
                            <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shadow-xs">
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                            </span>
                          )}
                          {form.socialLinks?.youtubeUrl && (
                            <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center shadow-xs">
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                              </svg>
                            </span>
                          )}
                          {form.socialLinks?.lineUrl && (
                            <span className="w-7 h-7 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-xs">
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {form.showSystemStatus !== false && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-[11px] font-medium text-emerald-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{form.systemStatusText || "All Systems Operational"}</span>
                      </div>
                    )}

                    {/* Visitor Stats Preview */}
                    {form.visitorStats?.enabled !== false && (
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 max-w-xs space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <BarChart3 className="w-3 h-3" style={{ color: currentTheme.hex }} />
                            <span>{form.visitorStats?.title || "สถิติผู้เข้าชมเว็บไซต์"}</span>
                          </span>
                          <span className="text-[10px] text-emerald-400">ออนไลน์</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-slate-800 text-center">
                          <div className="p-1 rounded-lg bg-slate-950/60">
                            <span className="text-[9px] text-slate-400 block">วันนี้</span>
                            <span className="text-xs font-bold text-white font-mono">
                              {(form.visitorStats?.todayCount || 128).toLocaleString()}
                            </span>
                          </div>
                          <div className="p-1 rounded-lg bg-slate-950/60">
                            <span className="text-[9px] text-slate-400 block">ทั้งหมด</span>
                            <span className="text-xs font-bold text-amber-300 font-mono">
                              {(form.visitorStats?.totalCount || 45670).toLocaleString()}
                            </span>
                          </div>
                          <div className="p-1 rounded-lg bg-slate-950/60">
                            <span className="text-[9px] text-slate-400 block">ขณะนี้</span>
                            <span className="text-xs font-bold text-emerald-400 font-mono">
                              {(form.visitorStats?.onlineCount || 14).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Col 2 */}
                  <div className="lg:col-span-3 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <Sparkles
                        className="w-3.5 h-3.5"
                        style={{ color: currentTheme.hex }}
                      />
                      <span>{form.servicesTitle || "ระบบงานบริการหลัก"}</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs">
                      {(form.services || [])
                        .filter((s) => s.isActive !== false)
                        .map((s) => {
                          const IconComp = getIconComponent(s.iconName);
                          return (
                            <li key={s.id} className="flex items-center gap-2">
                              <IconComp
                                className="w-3.5 h-3.5 shrink-0"
                                style={{ color: currentTheme.hex }}
                              />
                              <span className="text-slate-400 hover:text-white transition-colors">
                                {s.label}
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>

                  {/* Col 3 */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <ShieldCheck
                        className="w-3.5 h-3.5"
                        style={{ color: currentTheme.hex }}
                      />
                      <span>{form.staffTitle || "สำหรับเจ้าหน้าที่"}</span>
                    </h4>
                    <ul className="space-y-2.5 text-xs">
                      {(form.staffLinks || [])
                        .filter((stf) => stf.isActive !== false)
                        .map((stf) => (
                          <li key={stf.id}>
                            {stf.isButton ? (
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-bold text-xs shadow-md"
                                style={{ backgroundColor: currentTheme.hex }}
                              >
                                <LogIn className="w-3.5 h-3.5" />
                                <span>{stf.label}</span>
                              </span>
                            ) : (
                              <span className="text-slate-400 hover:text-white block">
                                {stf.label}
                                {stf.badge && (
                                  <span className="block text-[10px] text-slate-500 mt-0.5">
                                    {stf.badge}
                                  </span>
                                )}
                              </span>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Col 4 */}
                  <div className="lg:col-span-3 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <MapPin
                        className="w-3.5 h-3.5"
                        style={{ color: currentTheme.hex }}
                      />
                      <span>{form.contact?.title || "ติดต่อ & สถานที่ตั้ง"}</span>
                    </h4>
                    <div className="space-y-2 text-xs text-slate-400">
                      <p className="leading-relaxed">{form.contact?.address}</p>
                      {form.contact?.phone && <p>{form.contact.phone}</p>}
                      {form.contact?.email && <p>{form.contact.email}</p>}
                      {form.contact?.operatingHours && (
                        <p>{form.contact.operatingHours}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>{form.copyrightText}</span>
                    <span>•</span>
                    <span>{form.copyrightSubtext}</span>
                  </div>
                  {form.showBackToTop !== false && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 text-slate-400 text-xs">
                      <span>กลับขึ้นด้านบน</span>
                      <ArrowUp
                        className="w-3 h-3"
                        style={{ color: currentTheme.hex }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          MODAL: ADD / EDIT SERVICE LINK
      ═══════════════════════════════════════════════════════ */}
      <LiyonDialog
        wide
        open={serviceModalOpen}
        onOpenChange={setServiceModalOpen}
        className="max-w-xl w-full"
      >
        <LiyonDialogCloseButton label="ปิด" />
        <LiyonDialogHeader
          title={editingServiceId ? "แก้ไขลิงก์บริการ" : "เพิ่มลิงก์บริการหลัก"}
          description="กำหนดข้อความ ลิงก์ปลายทาง ไอคอนแสดงผล และคุณสมบัติการเปิดหน้าต่าง"
        />

        <LiyonDialogBody className="space-y-4 px-6 py-4 overflow-y-auto max-h-[calc(85vh-140px)]">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              ชื่อลิงก์บริการ (Label) *
            </label>
            <input
              type="text"
              value={serviceLabel}
              onChange={(e) => setServiceLabel(e.target.value)}
              placeholder="เช่น ข่าวสารประชาสัมพันธ์ หรือ สมัครเรียนออนไลน์"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              ลิงก์ URL ปลายทาง *
            </label>
            <input
              type="text"
              value={serviceUrl}
              onChange={(e) => setServiceUrl(e.target.value)}
              placeholder="เช่น #news, /curriculum, /download, https://..."
              className="w-full text-sm font-mono px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 self-center mr-1">ทางลัด:</span>
              {["#news", "#personnel", "#curriculum", "#services", "/download", "/curriculum"].map((shortcut) => (
                <button
                  type="button"
                  key={shortcut}
                  onClick={() => setServiceUrl(shortcut)}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {shortcut}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              เลือกไอคอนแสดงผล
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {AVAILABLE_ICONS.map((item) => {
                const Icon = item.icon;
                const isSelected = serviceIcon === item.name;
                return (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => setServiceIcon(item.name)}
                    className={`p-2 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-600 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-0.5" />
                    <span className="text-[10px] truncate max-w-full">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={serviceNewTab}
                onChange={(e) => setServiceNewTab(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>เปิดในแท็บใหม่ (target=&quot;_blank&quot;)</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={serviceActive}
                onChange={(e) => setServiceActive(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>เปิดแสดงผล</span>
            </label>
          </div>
        </LiyonDialogBody>

        <LiyonDialogFooter className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setServiceModalOpen(false)}
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={saveServiceModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4"
          >
            บันทึกรายการ
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* ═══════════════════════════════════════════════════════
          MODAL: ADD / EDIT STAFF LINK
      ═══════════════════════════════════════════════════════ */}
      <LiyonDialog
        wide
        open={staffModalOpen}
        onOpenChange={setStaffModalOpen}
        className="max-w-xl w-full"
      >
        <LiyonDialogCloseButton label="ปิด" />
        <LiyonDialogHeader
          title={editingStaffId ? "แก้ไขรายการสำหรับเจ้าหน้าที่" : "เพิ่มรายการเจ้าหน้าที่"}
          description="กำหนดข้อความ ลิงก์ และสไตล์การแสดงผลของรายการในส่วนเจ้าหน้าที่"
        />

        <LiyonDialogBody className="space-y-4 px-6 py-4 overflow-y-auto max-h-[calc(85vh-140px)]">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              ข้อความรายการ (Label) *
            </label>
            <input
              type="text"
              value={staffLabel}
              onChange={(e) => setStaffLabel(e.target.value)}
              placeholder="เช่น เข้าสู่ระบบเจ้าหน้าที่ หรือ ข้อมูลส่วนตัว"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              ลิงก์ URL ปลายทาง (เว้นว่างได้หากเป็นเพียงข้อความชี้แจง)
            </label>
            <input
              type="text"
              value={staffUrl}
              onChange={(e) => setStaffUrl(e.target.value)}
              placeholder="เช่น /login, /dashboard, /me, /settings"
              className="w-full text-sm font-mono px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              ข้อความย่อย / ป้ายกำกับ (Subtitle / Badge)
            </label>
            <input
              type="text"
              value={staffBadge}
              onChange={(e) => setStaffBadge(e.target.value)}
              placeholder="เช่น ศูนย์เทคโนโลยีและสารสนเทศ หรือ รองรับ SSO"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={staffIsButton}
                onChange={(e) => setStaffIsButton(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>สไตล์เป็นปุ่มกดเด่น (Action Button)</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={staffActive}
                onChange={(e) => setStaffActive(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>เปิดแสดงผล</span>
            </label>
          </div>
        </LiyonDialogBody>

        <LiyonDialogFooter className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setStaffModalOpen(false)}
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={saveStaffModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4"
          >
            บันทึกรายการ
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
