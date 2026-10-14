"use client";

import Link from "next/link";
import {
  GraduationCap,
  Newspaper,
  Users,
  BookOpen,
  FileText,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  LayoutDashboard,
  LogIn,
  ShieldCheck,
  Globe,
  Sparkles,
  Award,
  Compass,
  ExternalLink,
  Navigation,
  BarChart3,
  Eye,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { useLocale } from "@/shared/lib/i18n/client";
import {
  type FooterSettings,
  DEFAULT_FOOTER_SETTINGS,
  THEME_CONFIGS,
} from "@/features/school/types";

interface PublicFooterProps {
  logoUrl?: string | null;
  nameTh?: string | null;
  nameEn?: string | null;
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
  settings?: FooterSettings | null;
}

const ICON_MAP: Record<string, any> = {
  Newspaper,
  Users,
  BookOpen,
  FileText,
  Globe,
  Building2,
  Award,
  Sparkles,
  Compass,
  ExternalLink,
};

export function PublicFooter({
  logoUrl,
  nameTh,
  nameEn,
  user,
  settings,
}: PublicFooterProps) {
  const locale = useLocale();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerData = settings || DEFAULT_FOOTER_SETTINGS;
  const theme = THEME_CONFIGS[footerData.themeColor || "blue"] || THEME_CONFIGS.blue;

  const loggedIn = !!user;
  const primaryName = (locale === "en" ? nameEn : nameTh) || nameTh || nameEn || "SATIT MCU";
  const secondaryName =
    (locale === "en" ? nameTh : nameEn) ||
    nameEn ||
    nameTh ||
    "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย";

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/80 overflow-hidden font-sans">
      {/* ═══ Top Gradient Line & Ambient Glow (Themed) ═══ */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1.5px] pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${theme.hex}, transparent)`,
        }}
      />
      <div
        className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-32 blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: theme.hex }}
      />
      <div
        className="absolute top-0 right-1/4 translate-x-1/2 w-96 h-32 blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: theme.hex }}
      />

      {/* ═══ Main Footer Content ═══ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-900">
          {/* Col 1: Brand & Mission Statement (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white border border-white/20 shadow-md flex items-center justify-center overflow-hidden p-1 shrink-0 transition-transform group-hover:scale-105">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt={primaryName} className="w-full h-full object-contain" />
                ) : (
                  <div
                    className="w-full h-full rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: theme.hex }}
                  >
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base sm:text-lg tracking-tight leading-tight">
                    {primaryName}
                  </span>
                  {footerData.showSmartCampusBadge !== false && footerData.smartCampusBadge && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all"
                      style={{
                        backgroundColor: `${theme.hex}25`,
                        borderColor: `${theme.hex}60`,
                        color: "#ffffff",
                      }}
                    >
                      {footerData.smartCampusBadge}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 font-normal leading-tight mt-0.5">
                  {secondaryName}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {footerData.brandDescription ||
                "มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล บนพื้นฐานอัตลักษณ์ความเป็นไทยและคุณธรรมทางพระพุทธศาสนา ก้าวล้ำด้วยนวัตกรรมดิจิทัลเพื่อการเรียนรู้และการบริหารจัดการยุคใหม่"}
            </p>

            {/* Social Media Links (Facebook, YouTube, LINE) */}
            {footerData.socialLinks?.showSocials !== false && (
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">ช่องทางติดตามออนไลน์:</span>
                <div className="flex items-center gap-2.5">
                  {footerData.socialLinks?.facebookUrl && (
                    <a
                      href={footerData.socialLinks.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Facebook"
                      className="w-8 h-8 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  )}

                  {footerData.socialLinks?.youtubeUrl && (
                    <a
                      href={footerData.socialLinks.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="YouTube"
                      className="w-8 h-8 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}

                  {footerData.socialLinks?.lineUrl && (
                    <a
                      href={footerData.socialLinks.lineUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="LINE Official"
                      className="w-8 h-8 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Live System Status Pill */}
            {footerData.showSystemStatus !== false && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-[11px] font-medium text-emerald-300 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{footerData.systemStatusText || "ระบบบริการออนไลน์พร้อมใช้งาน (All Systems Operational)"}</span>
              </div>
            )}

            {/* Visitor Counter Widget (ระบบสถิติผู้เข้าชม) */}
            {footerData.visitorStats?.enabled !== false && (
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 max-w-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5" style={{ color: theme.hex }} />
                    <span>{footerData.visitorStats?.title || "สถิติผู้เข้าชมเว็บไซต์"}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <Activity className="w-3 h-3 animate-pulse" /> ออนไลน์
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800 text-center">
                  <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">วันนี้</span>
                    <span className="text-xs font-black text-white font-mono">
                      {(footerData.visitorStats?.todayCount || 128).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">รวมทั้งหมด</span>
                    <span className="text-xs font-black text-amber-300 font-mono">
                      {(footerData.visitorStats?.totalCount || 45670).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">ขณะนี้</span>
                    <span className="text-xs font-black text-emerald-400 font-mono">
                      {(footerData.visitorStats?.onlineCount || 14).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Col 2: Core Portal Modules (ระบบงานบริการหลัก - 3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: theme.hex }} />
              <span>{footerData.servicesTitle || "ระบบงานบริการหลัก"}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {(footerData.services || [])
                .filter((s) => s.isActive !== false)
                .map((item) => {
                  const IconComp = ICON_MAP[item.iconName || "Globe"] || Globe;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.url}
                        target={item.openInNewTab ? "_blank" : undefined}
                        rel={item.openInNewTab ? "noreferrer" : undefined}
                        className="flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all group"
                      >
                        <IconComp
                          className="w-3.5 h-3.5 shrink-0 transition-colors"
                          style={{ color: theme.hex }}
                        />
                        <span className="group-hover:text-white transition-colors">{item.label}</span>
                        {item.openInNewTab && (
                          <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400 ml-auto" />
                        )}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Col 3: Staff & Quick Links (สำหรับเจ้าหน้าที่ - 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: theme.hex }} />
              <span>{footerData.staffTitle || "สำหรับเจ้าหน้าที่"}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {loggedIn ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-1.5 font-medium hover:translate-x-1 transition-all"
                      style={{ color: theme.hex }}
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                      <span>แผงควบคุมหลังบ้าน</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/me"
                      className="text-slate-400 hover:text-white hover:translate-x-1 transition-all block"
                    >
                      ข้อมูลส่วนตัว (Profile)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="text-slate-400 hover:text-white hover:translate-x-1 transition-all block"
                    >
                      ตั้งค่าระบบ (Settings)
                    </Link>
                  </li>
                </>
              ) : null}

              {/* Dynamic Staff Links */}
              {(footerData.staffLinks || [])
                .filter((stf) => stf.isActive !== false)
                .map((item) => {
                  if (item.isButton && !loggedIn) {
                    return (
                      <li key={item.id} className="pt-1">
                        <Link
                          href={item.url || "/login"}
                          target={item.openInNewTab ? "_blank" : undefined}
                          rel={item.openInNewTab ? "noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-semibold text-xs shadow-md transition-all hover:scale-105"
                          style={{ backgroundColor: theme.hex }}
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  }

                  if (item.url && item.url !== "/login") {
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.url}
                          target={item.openInNewTab ? "_blank" : undefined}
                          rel={item.openInNewTab ? "noreferrer" : undefined}
                          className="text-slate-400 hover:text-white hover:translate-x-1 transition-all block"
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="block text-[10px] text-slate-500 mt-0.5">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.id}>
                      <span className="text-xs text-slate-500 block pt-0.5">
                        {item.label}
                      </span>
                      {item.badge && item.badge !== item.label && (
                        <span className="text-[10px] text-slate-600 block">
                          {item.badge}
                        </span>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Col 4: Campus Contact Info (ติดต่อ & สถานที่ตั้ง - 3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.hex }} />
              <span>{footerData.contact?.title || "ติดต่อ & สถานที่ตั้ง"}</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              {footerData.contact?.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{footerData.contact.address}</span>
                </div>
              )}
              {footerData.contact?.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{footerData.contact.phone}</span>
                </div>
              )}
              {footerData.contact?.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="hover:text-slate-300 transition-colors">
                    {footerData.contact.email}
                  </span>
                </div>
              )}
              {footerData.contact?.operatingHours && (
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{footerData.contact.operatingHours}</span>
                </div>
              )}
              {footerData.contact?.showMapLink !== false && footerData.contact?.mapUrl && (
                <div className="pt-1">
                  <a
                    href={footerData.contact.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all shadow-xs"
                  >
                    <Navigation className="w-3 h-3 text-emerald-400" />
                    <span>เปิดแอปนำทาง GPS</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 ml-0.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══ Bottom Bar: Copyright & Back to Top ═══ */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span>
              {footerData.copyrightText || "© 2026 SATIT MCU System. All rights reserved."}
            </span>
            {footerData.copyrightSubtext && (
              <>
                <span className="hidden sm:inline text-slate-700">•</span>
                <span>{footerData.copyrightSubtext}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-600">
              VibeCore Framework v2.0
            </span>
            {footerData.showBackToTop !== false && (
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all text-xs font-medium cursor-pointer"
                aria-label="Back to top"
              >
                <span>กลับขึ้นด้านบน</span>
                <ArrowUp className="w-3.5 h-3.5" style={{ color: theme.hex }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
