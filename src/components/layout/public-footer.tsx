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
  ChevronRight,
} from "lucide-react";

import { useLocale } from "@/shared/lib/i18n/client";

interface PublicFooterProps {
  logoUrl?: string | null;
  nameTh?: string | null;
  nameEn?: string | null;
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export function PublicFooter({ logoUrl, nameTh, nameEn, user }: PublicFooterProps) {
  const locale = useLocale();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loggedIn = !!user;
  const primaryName = (locale === "en" ? nameEn : nameTh) || nameTh || nameEn || "SATIT MCU";
  const secondaryName = (locale === "en" ? nameTh : nameEn) || nameEn || nameTh || "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย";

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/80 overflow-hidden font-sans">
      {/* ═══ Top Gradient Line & Ambient Glow ═══ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-32 bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-96 h-32 bg-indigo-600/10 blur-3xl pointer-events-none" />

      {/* ═══ Main Footer Content ═══ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand & Mission Statement (5 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white border border-white/20 shadow-md flex items-center justify-center overflow-hidden p-1 shrink-0 transition-transform group-hover:scale-105">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoUrl} alt={primaryName} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base sm:text-lg tracking-tight leading-tight">
                    {primaryName}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30">
                    Smart Campus
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-normal leading-tight mt-0.5">
                  {secondaryName}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล บนพื้นฐานอัตลักษณ์ความเป็นไทยและคุณธรรมทางพระพุทธศาสนา ก้าวล้ำด้วยนวัตกรรมดิจิทัลเพื่อการเรียนรู้และการบริหารจัดการยุคใหม่
            </p>

            {/* Live System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-[11px] font-medium text-emerald-300 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>ระบบบริการออนไลน์พร้อมใช้งาน (All Systems Operational)</span>
            </div>
          </div>

          {/* Col 2: Core Portal Modules (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              ระบบงานบริการหลัก
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="#news"
                  className="flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all"
                >
                  <Newspaper className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>ข่าวสารประชาสัมพันธ์</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#personnel"
                  className="flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all"
                >
                  <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>ทำเนียบคณาจารย์และบุคลากร</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#curriculum"
                  className="flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>โครงสร้างหลักสูตรการศึกษา</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#document"
                  className="flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>คำร้องและเอกสารดาวน์โหลด</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#facility"
                  className="flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>จองห้องประชุมและยานพาหนะ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Staff & Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              สำหรับเจ้าหน้าที่
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {loggedIn ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-medium hover:translate-x-1 transition-all"
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
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-sky-300 hover:bg-blue-600 hover:text-white transition-all text-xs font-medium"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>เข้าสู่ระบบเจ้าหน้าที่</span>
                  </Link>
                </li>
              )}
              <li>
                <span className="text-xs text-slate-500 block pt-1">
                  ศูนย์เทคโนโลยีและสารสนเทศ
                </span>
              </li>
              <li>
                <span className="text-xs text-slate-500 block">
                  รองรับการยืนยันตัวตน SSO
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact Info (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              ติดต่อ & สถานที่ตั้ง
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย 79 หมู่ 1 ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา 13170
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>โทรศัพท์: 035-248-000 ต่อ 8888</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="hover:text-slate-300 transition-colors">
                  อีเมล: contact@satit.mcu.ac.th
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>เวลาทำการ: จันทร์ - ศุกร์ 08:30 - 16:30 น.</span>
              </div>
            </div>
          </div>

        </div>

        {/* ═══ Bottom Bar: Copyright & Back to Top ═══ */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span>© 2026 SATIT MCU System. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-600">
              VibeCore Framework v2.0
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all text-xs font-medium cursor-pointer"
              aria-label="Back to top"
            >
              <span>กลับขึ้นด้านบน</span>
              <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
