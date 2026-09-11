import Link from "next/link";
import { auth } from "@/features/identity/server";
import { prisma } from "@/shared/lib/infra/prisma";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { Hero3DCoinScene } from "@/components/home/hero-3d-coin-scene";
import {
  GraduationCap,
  Newspaper,
  Users,
  FileText,
  Building2,
  Calendar,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Car,
  Sparkles,
  CheckCircle2,
  Layers,
  LogIn,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth().catch(() => null);

  // Fetch real data from DB if available
  const [articles, employees, curricula, facilities, tenant] = await Promise.all([
    prisma.article.findMany({ take: 6, orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.employee.findMany({ take: 8, orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.curriculum.findMany({ take: 6, orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.facility.findMany({ take: 6, orderBy: { createdAt: "desc" } }).catch(() => []),
    (session?.tenantId
      ? prisma.tenant.findUnique({ where: { id: session.tenantId } })
      : prisma.tenant.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" } })
    ).catch(() => null),
  ]);

  // Default fallback data if DB is empty
  const displayArticles = articles.length > 0 ? articles : [
    {
      id: "1",
      title: "ประกาศรับสมัครนักศึกษาใหม่ ประจำปีการศึกษา 2569",
      content: "เปิดรับสมัครนิสิตนักศึกษาใหม่ ระดับปริญญาตรีและบัณฑิตศึกษา ทุนการศึกษาและโควตาพิเศษมากมาย",
      coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
      createdAt: new Date(),
      status: "PUBLISHED",
    },
    {
      id: "2",
      title: "ขอเชิญร่วมงานประชุมวิชาการระดับชาติ ประจำปี 2569",
      content: "ร่วมนำเสนอผลงานวิจัย นวัตกรรม และแลกเปลี่ยนองค์ความรู้กับผู้เชี่ยวชาญระดับแนวหน้า",
      coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
      createdAt: new Date(),
      status: "PUBLISHED",
    },
    {
      id: "3",
      title: "คณะเปิดตัวห้องปฏิบัติการเทคโนโลยีและปัญญาประดิษฐ์แห่งใหม่",
      content: "พร้อมให้บริการแก่อาจารย์ นักศึกษา และบุคลากร เพื่อส่งเสริมการเรียนรู้และการวิจัยยุคดิจิทัล",
      coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
      createdAt: new Date(),
      status: "PUBLISHED",
    },
  ];

  const displayCurricula = curricula.length > 0 ? curricula : [
    {
      id: "1",
      code: "B.Ed.01",
      name: "หลักสูตรครุศาสตรบัณฑิต (การศึกษาปฐมวัย)",
      degreeLevel: "ปริญญาตรี (4 ปี)",
      totalCredits: 132,
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80",
      description: "มุ่งเน้นการผลิตครูมืออาชีพ มีคุณธรรม จริยธรรม และทักษะการจัดการเรียนรู้ศตวรรษที่ 21",
    },
    {
      id: "2",
      code: "B.A.02",
      name: "หลักสูตรศิลปศาสตรบัณฑิต (การบริหารการศึกษา)",
      degreeLevel: "ปริญญาตรี (4 ปี)",
      totalCredits: 128,
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
      description: "พัฒนาผู้นำทางวิชาการและผู้บริหารสถานศึกษาที่มีวิสัยทัศน์ก้าวหน้า",
    },
    {
      id: "3",
      code: "M.Ed.01",
      name: "หลักสูตรครุศาสตรมหาบัณฑิต (นวัตกรรมการเรียนรู้)",
      degreeLevel: "ปริญญาโท (2 ปี)",
      totalCredits: 36,
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
      description: "วิจัยและพัฒนานวัตกรรมการศึกษายุคปัญญาประดิษฐ์เพื่อการพัฒนาที่ยั่งยืน",
    },
  ];

  const displayEmployees = employees.length > 0 ? employees : [
    {
      id: "1",
      firstName: "ศ.ดร.สมชาย",
      lastName: "ปัญญาวงศ์",
      position: "คณบดี / อาจารย์ประจำคณะ",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      department: "สำนักงานคณบดี",
    },
    {
      id: "2",
      firstName: "รศ.ดร.นภาพร",
      lastName: "เกียรติสกุล",
      position: "รองคณบดีฝ่ายวิชาการและวิจัย",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
      department: "ภาควิชาหลักสูตรและการสอน",
    },
    {
      id: "3",
      firstName: "ผศ.วิชัย",
      lastName: "รัตนมงคล",
      position: "หัวหน้าภาควิชาเทคโนโลยีการศึกษา",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      department: "ภาควิชาเทคโนโลยีการศึกษา",
    },
    {
      id: "4",
      firstName: "ดร.พิมพ์ใจ",
      lastName: "สุขเกษม",
      position: "ผู้ช่วยคณบดีฝ่ายพัฒนานิสิต",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
      department: "กิจการนิสิต",
    },
  ];

  const displayFacilities = facilities.length > 0 ? facilities : [
    {
      id: "1",
      name: "ห้องประชุมใหญ่ สุจิตโต (Auditorium)",
      type: "ROOM",
      capacity: 200,
      imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80",
      status: "AVAILABLE",
    },
    {
      id: "2",
      name: "ห้องสัมมนา Smart Classroom 401",
      type: "ROOM",
      capacity: 45,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
      status: "AVAILABLE",
    },
    {
      id: "3",
      name: "รถตู้โดยสารปรับอากาศ คณะ 01",
      type: "VEHICLE",
      capacity: 12,
      imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80",
      status: "AVAILABLE",
    },
    {
      id: "4",
      name: "รถบัสทัศนศึกษา 40 ที่นั่ง",
      type: "VEHICLE",
      capacity: 40,
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80",
      status: "AVAILABLE",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* ═══ 1. FLOATING DYNAMIC NAVBAR (NexaCore Style) ═══ */}
      <PublicNavbar user={session?.user} logoUrl={tenant?.logoUrl} nameTh={tenant?.nameTh} nameEn={tenant?.nameEn} />


      {/* ═══ 2. 3D COIN TRACK HERO SECTION (AICM 3D Animation Style) ═══ */}
      <section
        id="home"
        className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center px-4 pt-28 pb-20 overflow-hidden bg-slate-950 text-white"
      >
        {/* Background Looping Video (Atmospheric Depth) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-15 scale-105 filter blur-[1px] pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4"
        />

        {/* 3D Spline Track & School Logo Coins (AICM 3D Animation) */}
        <Hero3DCoinScene logoUrl={tenant?.logoUrl} />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] z-0 pointer-events-none" />

        {/* Bottom Fade to Content Section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none bg-gradient-to-b from-transparent via-slate-950/70 to-slate-50" />

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center relative z-20">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-blue-500/10 animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300">
              SMART FACULTY WEB PLATFORM • SATIT MCU
            </span>
          </div>

          {/* Headline H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.18] max-w-4xl mx-auto mb-6 text-white drop-shadow-sm">
            พัฒนาปัญญา สร้างสรรค์วิชาการ <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-amber-300">
              สู่นวัตกรรมการศึกษาและบริหารจัดการที่ทันสมัย
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-slate-300/90 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            ศูนย์กลางบริการการศึกษาและบริหารงานคณะยุคใหม่ ครอบคลุมระบบข่าวสาร จัดการหลักสูตร ทำเนียบคณาจารย์ บริการคำร้องเอกสารดิจิทัล และระบบจองห้องประชุมส่วนกลาง
          </p>

          {/* Action Buttons Cluster (NexaCore Style) */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {/* Primary Action Button */}
            <Link
              href="#curriculum"
              className="relative inline-flex items-center justify-center rounded-2xl p-[1.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 shadow-xl shadow-blue-500/25 hover:scale-105 transition-all"
            >
              <span className="flex items-center gap-2 px-7 py-3.5 rounded-[14.5px] bg-blue-600 hover:bg-transparent text-white font-bold text-sm transition-all">
                สำรวจหลักสูตรการศึกษา <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Secondary Glass Button */}
            <Link
              href="#news"
              className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-105"
            >
              ข่าวสารและกิจกรรมล่าสุด
            </Link>

            {session?.user && (
              <Link
                href="/dashboard"
                className="px-7 py-3.5 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2"
              >
                <Layers className="w-4 h-4" /> แผงควบคุมหลังบ้าน (Admin)
              </Link>
            )}
          </div>

          {/* Glassmorphic Stats Grid (NexaCore Control Style) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl hover:border-white/30 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
                5+ <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/30 text-sky-200 border border-blue-400/30">มาตรฐาน</span>
              </div>
              <div className="text-xs text-slate-300 mt-1 font-medium">หลักสูตรคุณภาพที่เปิดสอน</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl hover:border-white/30 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
                40+ <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">คณาจารย์</span>
              </div>
              <div className="text-xs text-slate-300 mt-1 font-medium">ผู้ทรงคุณวุฒิและบุคลากร</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl hover:border-white/30 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
                100% <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">Online</span>
              </div>
              <div className="text-xs text-slate-300 mt-1 font-medium">ระบบยื่นคำร้องและเอกสาร</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl hover:border-white/30 transition-colors">
              <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
                24/7 <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/30">Service</span>
              </div>
              <div className="text-xs text-slate-300 mt-1 font-medium">จองห้องประชุมและยานพาหนะ</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. SECTION: ข่าวสารประชาสัมพันธ์ (News & PR) ═══ */}
      <section id="news" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Newspaper className="w-4 h-4" /> ประชาสัมพันธ์และกิจกรรม
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">ข่าวสารล่าสุดของคณะ</h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800 mt-4 sm:mt-0 group"
          >
            จัดการหรือดูข่าวทั้งหมด <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col"
            >
              <div className="h-52 bg-slate-100 border-b border-slate-100 relative overflow-hidden flex items-center justify-center">
                <span className="absolute top-4 left-4 z-10 text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-xs">
                  ข่าวประชาสัมพันธ์
                </span>
                {art.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-blue-400">
                    <Newspaper className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(art.createdAt).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 hover:text-blue-700 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                    {art.content || "ไม่มีรายละเอียดเพิ่มเติม"}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700">
                  <Link href="/news" className="hover:underline flex items-center gap-1">
                    อ่านต่อ / จัดการข่าว <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ 4. SECTION: จัดการหลักสูตร (Curriculum Management) ═══ */}
      <section id="curriculum" className="py-20 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" /> แผนการศึกษาและวิชาการ
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">หลักสูตรที่เปิดสอน</h2>
            <p className="text-slate-600 text-sm">มุ่งเสริมสร้างความรู้และทักษะแห่งอนาคต ด้วยหลักสูตรที่ได้รับการรับรองตามมาตรฐานสากล</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayCurricula.map((curr) => (
              <div
                key={curr.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                {curr.imageUrl && (
                  <div className="h-40 bg-slate-100 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={curr.imageUrl} alt={curr.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                      {curr.degreeLevel}
                    </span>
                    <span className="text-xs text-slate-500 font-mono font-medium">รหัส: {curr.code}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{curr.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{curr.description}</p>
                </div>
                <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">รวม <strong>{curr.totalCredits}</strong> หน่วยกิต</span>
                  <Link href="/curriculum" className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1">
                    ดูโครงสร้างวิชา <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. SECTION: ทำเนียบบุคลากร (Personnel Management) ═══ */}
      <section id="personnel" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Users className="w-4 h-4" /> คณาจารย์และเจ้าหน้าที่
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">ทำเนียบบุคลากรคณะ</h2>
          </div>
          <Link
            href="/personnel"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800 mt-4 sm:mt-0 group"
          >
            จัดการหรือดูทำเนียบทั้งหมด <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center"
            >
              {emp.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={emp.imageUrl}
                  alt={emp.firstName}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-white shadow-sm ring-2 ring-blue-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-bold text-2xl mb-4 border-2 border-white shadow-xs">
                  {emp.firstName.charAt(0)}
                </div>
              )}
              <h3 className="font-bold text-base text-slate-900 mb-1">
                {emp.firstName} {emp.lastName}
              </h3>
              <p className="text-xs text-blue-700 font-semibold mb-1">{emp.position || "อาจารย์ประจำคณะ"}</p>
              <p className="text-xs text-slate-500">{(emp as any).department?.name || (emp as any).department || "สำนักงานคณะ"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 6. SECTION: บริการเอกสาร & จองห้อง (Document & Facility) ═══ */}
      <section id="services" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Document Services */}
            <div id="document" className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80">
              <div className="inline-flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-3">
                <FileText className="w-4 h-4" /> งานสารบรรณและคำร้อง
              </div>
              <h2 className="text-2xl font-black mb-3">ระบบบริหารและอนุมัติเอกสาร</h2>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                บริการยื่นคำร้องทั่วไป คำร้องขอหนังสือรับรอง เอกสารลา และติดตามขั้นตอนการอนุมัติแบบดิจิทัล
              </p>
              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-between text-sm">
                  <span className="font-medium">คำร้องขอหนังสือรับรองสถานภาพ</span>
                  <span className="text-xs text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded">ออนไลน์</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-between text-sm">
                  <span className="font-medium">คำร้องขอเทียบโอนผลการเรียน</span>
                  <span className="text-xs text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded">ออนไลน์</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-between text-sm">
                  <span className="font-medium">เอกสารขออนุมัติโครงการและงบประมาณ</span>
                  <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">อาจารย์/จนท.</span>
                </div>
              </div>
              <Link
                href="/document"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white transition-all shadow-md"
              >
                เข้าสู่ระบบจัดการเอกสาร <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Facility & Vehicle Reservation */}
            <div id="facility" className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80">
              <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-3">
                <Building2 className="w-4 h-4" /> ทรัพยากรส่วนกลาง
              </div>
              <h2 className="text-2xl font-black mb-3">ระบบจองห้องประชุมและยานพาหนะ</h2>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                ตรวจสอบตารางการใช้งาน จองห้องสัมมนา ห้องเรียนอัจฉริยะ และขอใช้ยานพาหนะส่วนกลางของคณะ
              </p>
              <div className="space-y-4 mb-6">
                {displayFacilities.map((fac) => (
                  <div
                    key={fac.id}
                    className="p-3 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      {fac.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={fac.imageUrl} alt={fac.name} className="w-12 h-10 object-cover rounded-lg shrink-0 border border-slate-600" />
                      ) : fac.type === "VEHICLE" ? (
                        <div className="w-10 h-10 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center shrink-0">
                          <Car className="w-5 h-5 text-indigo-400" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-700/50 flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5 text-sky-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold">{fac.name}</div>
                        <div className="text-xs text-slate-400">{fac.capacity ? `${fac.capacity} ที่นั่ง` : "พร้อมใช้งาน"}</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 shrink-0">
                      {fac.status === "AVAILABLE" ? "พร้อมจอง" : "ปรับปรุง"}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/facility"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white transition-all shadow-md"
              >
                ตรวจสอบคิวจองและขอใช้บริการ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. MODERN THEMED FOOTER ═══ */}
      <PublicFooter logoUrl={tenant?.logoUrl} nameTh={tenant?.nameTh} nameEn={tenant?.nameEn} user={session?.user} />
    </div>
  );
}

