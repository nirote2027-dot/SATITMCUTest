"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Award,
  Sparkles,
  BookOpen,
  Compass,
  History,
  Phone,
  Mail,
  Quote,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ImageIcon,
  Users,
  MapPin,
  Globe,
  Share2,
  Navigation,
} from "lucide-react";
import {
  type SchoolInfoData,
  type ExecutiveDto,
  type ThemeColorKey,
  THEME_CONFIGS,
  extractEmbedUrl,
  getWidgetHeight,
} from "@/features/school/types";

interface AboutSchoolSectionProps {
  schoolInfo: SchoolInfoData;
  executives: ExecutiveDto[];
  canManage?: boolean;
  themeColor?: ThemeColorKey;
}

export function AboutSchoolSection({
  schoolInfo,
  executives,
  canManage,
  themeColor,
}: AboutSchoolSectionProps) {
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const activeExecutives = executives.filter((e) => e.isActive !== false);
  const theme = THEME_CONFIGS[themeColor || "blue"] || THEME_CONFIGS.blue;

  return (
    <div className="w-full space-y-24">
      {/* ═══════════════════════════════════════════════════════
          SECTION: ข้อมูลทั่วไป (About School & Identity)
      ═══════════════════════════════════════════════════════ */}
      <section id="about" className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div
              style={{
                backgroundColor: `${theme.hex}14`,
                color: theme.hex,
                borderColor: `${theme.hex}30`,
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-xs uppercase tracking-wider mb-3"
            >
              <Building2 className="w-3.5 h-3.5" /> เกี่ยวกับโรงเรียน • About School
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              ข้อมูลทั่วไปและอัตลักษณ์สถานศึกษา
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {schoolInfo.nameTh} ({schoolInfo.shortName || "SATIT MCU"})
            </p>
          </div>
          {canManage && (
            <Link
              href="/school/info"
              style={{
                backgroundColor: `${theme.hex}10`,
                color: theme.hex,
                borderColor: `${theme.hex}25`,
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border font-semibold text-xs hover:opacity-90 transition-colors mt-4 sm:mt-0 shadow-xs"
            >
              <Building2 className="w-4 h-4" />
              <span>จัดการข้อมูลทั่วไป (Admin)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════
            PAIR 1: ประวัติความเป็นมา & Facebook Fanpage (ข้างกัน ต่อจาก ข่าวสารล่าสุด)
        ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: ประวัติความเป็นมาสถานศึกษา (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center shadow-xs">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 dark:text-sky-400">
                      ความเป็นมาสถานศึกษา
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      ประวัติความเป็นมา
                    </h3>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-900">
                  {schoolInfo.shortName || "SATIT MCU"}
                </span>
              </div>

              <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-3 font-normal whitespace-pre-line">
                {schoolInfo.history ||
                  "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย จัดตั้งขึ้นเพื่อเป็นสถานศึกษาต้นแบบในการบูรณาการการศึกษาขั้นพื้นฐานเข้ากับคุณธรรม จริยธรรม และวิถีชาวพุทธ สร้างเยาวชนที่มีศักยภาพสูง มีความเป็นผู้นำ และมีจิตสาธารณะ"}
              </div>
            </div>

            {/* Contact quick strip */}
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="truncate">{schoolInfo.phone || "035-248-000"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="truncate">{schoolInfo.email || "satitmcu@mcu.ac.th"}</span>
              </div>
            </div>
          </div>

          {/* Right: การติดตามข้อมูลข่าวสารผ่านทาง Facebook Fanpage (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                      โซเชียลมีเดียสถานศึกษา
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      Facebook Fanpage
                    </h3>
                  </div>
                </div>

                <a
                  href={schoolInfo.facebookPageUrl || schoolInfo.facebook || "https://www.facebook.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-colors shadow-xs"
                >
                  <span>เปิดใน Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Facebook iframe embed container */}
              <div
                className="w-full bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5 flex justify-center items-center shadow-inner"
                style={{
                  height: `${getWidgetHeight(
                    schoolInfo.facebookDisplayHeight,
                    schoolInfo.facebookCustomHeight
                  )}px`,
                  minHeight: "380px",
                }}
              >
                <iframe
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                    schoolInfo.facebookPageUrl || schoolInfo.facebook || "https://www.facebook.com/satitmcu"
                  )}&tabs=timeline&width=500&height=${getWidgetHeight(
                    schoolInfo.facebookDisplayHeight,
                    schoolInfo.facebookCustomHeight
                  )}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                  width="100%"
                  height="100%"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Fanpage Widget"
                  className="w-full h-full max-w-[500px]"
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
              <span>กด Like & Follow เพื่ออัปเดตกิจกรรมโรงเรียน</span>
              <a
                href={schoolInfo.facebookPageUrl || schoolInfo.facebook || "https://www.facebook.com"}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                ติดตามเพจ →
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            PAIR 2: ภูมิทัศน์และสภาพแวดล้อม & แผนที่ตั้งและการเดินทาง (ข้างกัน)
        ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Left: ภูมิทัศน์และสภาพแวดล้อมเพื่อการเรียนรู้ (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">
                      CAMPUS ATMOSPHERE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      ภูมิทัศน์และสภาพแวดล้อมเพื่อการเรียนรู้
                    </h3>
                  </div>
                </div>
                {canManage && (
                  <Link
                    href="/school/info"
                    className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>คลังภาพ</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {/* Featured Cover Image */}
              <div
                onClick={() => schoolInfo.coverImageUrl && setSelectedGalleryImg(schoolInfo.coverImageUrl)}
                className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm h-56 sm:h-64 bg-slate-900 group cursor-pointer"
              >
                {schoolInfo.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={schoolInfo.coverImageUrl}
                    alt={schoolInfo.nameTh}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-gradient-to-br from-slate-800 to-slate-950 p-6 text-center">
                    <Building2 className="w-12 h-12 text-blue-400 mb-2" />
                    <span className="text-sm font-semibold text-white">{schoolInfo.nameTh}</span>
                    <span className="text-xs text-slate-400 mt-1">บรรยากาศอาคารเรียนและสถานศึกษา</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 mb-1 inline-block">
                      ภาพบรรยากาศหลัก
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                      สภาพแวดล้อมร่มรื่น เอื้อต่อการเรียนรู้และการพัฒนาศักยภาพผู้เรียน
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Mini Grid */}
              {schoolInfo.gallery && schoolInfo.gallery.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {schoolInfo.gallery.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedGalleryImg(item.url)}
                      className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 h-20 bg-slate-100 dark:bg-slate-800 cursor-pointer group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.title || "บรรยากาศโรงเรียน"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-medium p-1.5 text-center">
                        <span className="line-clamp-2">{item.title || "ดูภาพขนาดใหญ่"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500 flex items-center justify-between">
              <span>คลิกที่รูปภาพเพื่อเปิดดูภาพขนาดใหญ่</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {schoolInfo.gallery?.length || 0} ภาพในคลัง
              </span>
            </div>
          </div>

          {/* Right: แผนที่ตั้งและการเดินทาง (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                      LOCATION & NAVIGATION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      แผนที่ตั้งและการเดินทาง
                    </h3>
                  </div>
                </div>

                {(schoolInfo.mapUrl || schoolInfo.mapEmbedUrl) && (
                  <a
                    href={schoolInfo.mapUrl || extractEmbedUrl(schoolInfo.mapEmbedUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors shrink-0 shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>เปิดแอปนำทาง GPS</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}
              </div>

              {/* Google Map iframe embed container */}
              <div
                className="w-full bg-slate-100 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-inner"
                style={{
                  height: `${getWidgetHeight(
                    schoolInfo.mapDisplayHeight,
                    schoolInfo.mapCustomHeight
                  )}px`,
                  minHeight: "380px",
                }}
              >
                <iframe
                  src={extractEmbedUrl(schoolInfo.mapEmbedUrl)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map Location"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
              <span className="truncate">
                📍 {schoolInfo.address || "โรงเรียนสาธิต มจร ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา"}
              </span>
              {schoolInfo.phone && (
                <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">
                  📞 สอบถามเส้นทาง: {schoolInfo.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION: อัตลักษณ์และเสาหลักการศึกษา (4 Core Pillars)
        ═══════════════════════════════════════════════════════ */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> อัตลักษณ์และเสาหลักการศึกษา • Core Pillars
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            ปรัชญา วิสัยทัศน์ และอัตลักษณ์สถานศึกษา
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Motto & Colors */}
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.hex} 0%, #1e1b4b 100%)`,
            }}
            className="p-6 rounded-2xl text-white shadow-xl flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider block mb-1">
                ปรัชญา & คำขวัญสถานศึกษา
              </span>
              <h3 className="text-lg font-black leading-snug mb-3">
                &ldquo;{schoolInfo.motto || "ปญฺญา โลกสฺมิ ปชฺโชโต"}&rdquo;
              </h3>
              <p className="text-xs text-white/90 leading-relaxed font-normal">
                {schoolInfo.philosophy || "คุณธรรมนำความรู้ มุ่งสู่ความเป็นเลิศ เชิดชูความเป็นไทย ใส่ใจสากล"}
              </p>
            </div>
            {schoolInfo.schoolColors && (
              <div className="mt-6 pt-4 border-t border-white/15 text-[11px] text-white/80 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span>สีประจำโรงเรียน: {schoolInfo.schoolColors}</span>
              </div>
            )}
          </div>

          {/* Card 2: Vision */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                วิสัยทัศน์ (Vision)
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                มุ่งสู่มาตรฐานสากลบนวิถีพุทธ
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-5">
                {schoolInfo.vision || "มุ่งมั่นจัดการศึกษาขั้นพื้นฐานตามมาตรฐานสากล พัฒนาผู้เรียนให้มีคุณธรรม จริยธรรม และทักษะศตวรรษที่ 21"}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-400 font-medium">
              พัฒนาปัญญา • ศตวรรษที่ 21
            </div>
          </div>

          {/* Card 3: Identity & Uniqueness */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                เอกลักษณ์ & อัตลักษณ์
              </span>
              <div className="space-y-3 mt-2">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block">เอกลักษณ์:</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {schoolInfo.uniqueness || "วิถีพุทธ วิถีเรียนรู้ คู่คุณธรรม"}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block">อัตลักษณ์:</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {schoolInfo.identity || "คุณธรรมเด่น เน้นภาษา ก้าวหน้าเทคโนโลยี"}
                  </p>
                </div>
              </div>
            </div>
            {schoolInfo.treeFlower && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                สัญลักษณ์: {schoolInfo.treeFlower}
              </div>
            )}
          </div>

          {/* Card 4: Missions Highlight */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                พันธกิจหลัก (Missions)
              </span>
              <ul className="space-y-2 mt-2">
                {(schoolInfo.mission || []).slice(0, 3).map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span className="line-clamp-2">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
              <span>{schoolInfo.mission?.length || 5} พันธกิจการศึกษา</span>
              <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                มุ่งมั่นพัฒนา
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION: คณะผู้บริหาร (Executive Board)
      ═══════════════════════════════════════════════════════ */}
      <section id="executives" className="pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div
              style={{
                backgroundColor: `${theme.hex}14`,
                color: theme.hex,
                borderColor: `${theme.hex}30`,
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-xs uppercase tracking-wider mb-3"
            >
              <Award className="w-3.5 h-3.5" /> คณะผู้บริหาร • Executive Board
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              ทำเนียบคณะกรรมการและผู้บริหารสถานศึกษา
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              ผู้บริหารและคณะกรรมการสถานศึกษาขั้นพื้นฐาน โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
            </p>
          </div>
          {canManage && (
            <Link
              href="/school/executives"
              style={{
                backgroundColor: `${theme.hex}10`,
                color: theme.hex,
                borderColor: `${theme.hex}25`,
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border font-semibold text-xs hover:opacity-90 transition-colors mt-4 sm:mt-0 shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>จัดการข้อมูลผู้บริหาร (Admin)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Executives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeExecutives.map((exec, idx) => {
            const fullName = `${exec.prefix || ""}${exec.firstName} ${exec.lastName}`.trim();
            const isTopLeader = idx === 0 || idx === 1;

            return (
              <div
                key={exec.id}
                style={
                  isTopLeader
                    ? {
                        borderColor: `${theme.hex}40`,
                        boxShadow: `0 4px 20px ${theme.glowColor}`,
                      }
                    : undefined
                }
                className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 group ${
                  isTopLeader
                    ? "shadow-md ring-1"
                    : "border-slate-200 dark:border-white/10 shadow-xs"
                }`}
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-gradient-to-tr from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800 border border-slate-200/80 dark:border-white/10 flex items-center justify-center">
                    {exec.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={exec.imageUrl}
                        alt={fullName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <Users className="w-16 h-16 opacity-75 mb-2" style={{ color: theme.hex }} />
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">รูปภาพประจำตัว</span>
                      </div>
                    )}
                    {isTopLeader && (
                      <span
                        style={{ backgroundColor: theme.hex }}
                        className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-xs"
                      >
                        ผู้บริหารระดับสูง
                      </span>
                    )}
                  </div>

                  {/* Name and Rank */}
                  <div className="text-center mb-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight mb-1">
                      {fullName}
                    </h3>
                    {exec.academicRank && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {exec.academicRank}
                      </p>
                    )}
                    <div
                      style={{
                        backgroundColor: `${theme.hex}14`,
                        color: theme.hex,
                        borderColor: `${theme.hex}30`,
                      }}
                      className="mt-2 inline-flex items-center px-3 py-1 rounded-full border font-bold text-xs"
                    >
                      {exec.position}
                    </div>
                    {exec.department && (
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                        {exec.department}
                      </p>
                    )}
                  </div>

                  {/* Message Quote */}
                  {exec.message && (
                    <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300 italic relative leading-relaxed">
                      <Quote className="w-3.5 h-3.5 text-blue-500/40 dark:text-sky-400/30 mb-1 inline-block mr-1" />
                      &ldquo;{exec.message}&rdquo;
                    </div>
                  )}
                </div>

                {/* Contact Footer */}
                {(exec.phone || exec.email) && (
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    {exec.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-blue-500 shrink-0" />
                        <span className="truncate">{exec.phone}</span>
                      </div>
                    )}
                    {exec.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-indigo-500 shrink-0" />
                        <span className="truncate">{exec.email}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal for Gallery item */}
      {selectedGalleryImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden bg-slate-950 p-2 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedGalleryImg}
              alt="ภาพบรรยากาศ"
              className="max-h-[80vh] w-auto mx-auto object-contain rounded-xl"
            />
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center text-sm font-bold hover:bg-black/90 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
