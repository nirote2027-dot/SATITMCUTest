import Link from "next/link";
import { auth, getSessionContext, hasPermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import { getSchoolInfo, listExecutives } from "@/features/school/services";
import { getFooterSettings, recordVisitorHit } from "@/features/school/footer-services";
import {
  type ThemeColorKey,
  THEME_CONFIGS,
  type BackgroundThemeKey,
  BACKGROUND_THEMES,
} from "@/features/school/types";
import { prisma } from "@/shared/lib/infra/prisma";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { Hero3DCoinScene } from "@/components/home/hero-3d-coin-scene";
import { HeroInteractiveCarousel } from "@/components/home/hero-interactive-carousel";
import { getHeroSettings } from "@/features/school/hero-services";
import { DEFAULT_HERO_SETTINGS } from "@/features/school/hero-types";
import { CurriculumSection } from "@/components/home/curriculum-section";
import { AboutSchoolSection } from "@/components/home/about-school-section";
import { DownloadShowcaseSection } from "@/components/home/download-showcase-section";
import { listDownloadDocuments } from "@/features/download/server";
import { parseCoverImage } from "@/features/news";
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
  Download,
  Sparkles,
  CheckCircle2,
  Layers,
  LogIn,
  Network,
  Settings,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [session, sessionCtx] = await Promise.all([
    auth().catch(() => null),
    getSessionContext().catch(() => null),
  ]);

  const tenant = await (session?.tenantId
    ? prisma.tenant.findUnique({ where: { id: session.tenantId } })
    : prisma.tenant.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" } })
  ).catch(() => null);

  const tenantId = tenant?.id || sessionCtx?.tenantId || "";

  // Fetch real data from DB if available & Record live visitor hit (Auto-Tracker)
  const [articles, employees, curricula, schoolInfo, executives, downloadDocs, footerSettings, liveVisitorStats, heroSettings] = await Promise.all([
    prisma.article.findMany({ take: 6, orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.employee.findMany({ where: { isActive: true }, take: 12, orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }] }).catch(() => []),
    prisma.curriculum
      .findMany({
        take: 6,
        include: { department: { select: { id: true, name: true, code: true } } },
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []),
    getSchoolInfo(tenantId).catch(() => null),
    listExecutives(tenantId).catch(() => []),
    listDownloadDocuments().catch(() => []),
    getFooterSettings(tenantId).catch(() => null),
    recordVisitorHit(tenantId).catch(() => undefined),
    getHeroSettings(tenantId).catch(() => DEFAULT_HERO_SETTINGS),
  ]);

  // Combine live stats if recorded
  if (footerSettings && liveVisitorStats) {
    footerSettings.visitorStats = liveVisitorStats;
  }

  const themeColor: ThemeColorKey = (footerSettings?.themeColor as ThemeColorKey) || "blue";
  const theme = THEME_CONFIGS[themeColor] || THEME_CONFIGS.blue;

  const bgThemeKey: BackgroundThemeKey = (footerSettings?.backgroundTheme as BackgroundThemeKey) || "light";
  const bgTheme = BACKGROUND_THEMES[bgThemeKey] || BACKGROUND_THEMES.light;
  const isDarkBg = bgTheme.isDark;
  const isSuperAdmin = sessionCtx?.isSuperAdmin === true;

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

  const displayCurricula = curricula;

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

  return (
    <div
      className={`min-h-screen flex flex-col ${
        bgThemeKey === "warm"
          ? "bg-gradient-to-b from-white via-slate-50/50 to-slate-100 text-slate-900"
          : bgThemeKey === "slate"
          ? "bg-slate-900 text-slate-100"
          : bgThemeKey === "dark"
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
      style={{
        ["--theme-primary" as any]: theme.hex,
        ["--theme-glow" as any]: theme.glowColor,
      }}
    >
      {/* ═══ 1. FLOATING DYNAMIC NAVBAR (NexaCore Style) ═══ */}
      <PublicNavbar
        user={session?.user}
        logoUrl={tenant?.logoUrl}
        nameTh={tenant?.nameTh}
        nameEn={tenant?.nameEn}
        themeColor={themeColor}
      />


      {/* ═══ 2. DYNAMIC HERO SECTION (3D / Slideshow / Hybrid / Video) ═══ */}
      <section
        id="home"
        className={`relative min-h-[95vh] lg:min-h-screen flex items-center justify-center px-4 pt-28 pb-20 overflow-hidden ${
          bgThemeKey === "warm"
            ? "bg-gradient-to-b from-white via-amber-50/20 to-slate-50 text-slate-900"
            : bgThemeKey === "slate"
            ? "bg-slate-900 text-white"
            : bgThemeKey === "dark"
            ? "bg-slate-950 text-white"
            : "bg-gradient-to-b from-white via-slate-50/60 to-slate-100 text-slate-900"
        }`}
      >
        {/* Layer 1: Background Slideshow (in hybrid & slideshow modes) */}
        {(heroSettings.displayMode === "slideshow" || heroSettings.displayMode === "hybrid") && (
          <div className="absolute inset-0 w-full h-full z-0">
            <HeroInteractiveCarousel
              slides={heroSettings.slides}
              interval={heroSettings.slideInterval}
              animation={heroSettings.slideAnimation}
              brightness={heroSettings.slideBrightness || "bright"}
            />
          </div>
        )}

        {/* Layer 2: Background Cinematic Video (in 3d & video modes, or if hybrid video enabled) */}
        {(heroSettings.displayMode === "3d" || heroSettings.displayMode === "video") &&
          heroSettings.showVideoBg &&
          heroSettings.videoBgUrl && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover filter blur-[1px] pointer-events-none z-0 ${
                isDarkBg ? "opacity-15 scale-105" : "opacity-10 scale-105"
              }`}
              src={heroSettings.videoBgUrl}
            />
          )}

        {/* Layer 3: Interactive 3D Coin & Particle Scene (in 3d & hybrid modes) */}
        {(heroSettings.displayMode === "3d" || heroSettings.displayMode === "hybrid") && (
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
            <Hero3DCoinScene
              logoUrl={tenant?.logoUrl}
              showCoins={heroSettings.show3DCoins}
              showParticles={heroSettings.showParticles}
              speedMultiplier={heroSettings.coinSpeed}
            />
          </div>
        )}

        {/* Ambient Gradient Overlays for contrast & depth */}
        {isDarkBg ? (
          <>
            <div
              className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${
                heroSettings.slideBrightness === "bright"
                  ? "bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/60 opacity-60"
                  : "bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950"
              }`}
            />
            <div
              className={`absolute inset-0 z-10 pointer-events-none ${
                heroSettings.slideBrightness === "bright" ? "opacity-30" : ""
              }`}
              style={{
                background: `radial-gradient(ellipse at center, ${theme.glowColor}, transparent 70%)`,
              }}
            />
            {/* Bottom Fade to Content Section */}
            <div className="absolute bottom-0 left-0 right-0 h-36 z-20 pointer-events-none bg-gradient-to-b from-transparent via-slate-950/60 to-slate-50" />
          </>
        ) : (
          <>
            <div
              className={`absolute inset-0 z-10 pointer-events-none ${
                heroSettings.slideBrightness === "bright"
                  ? "bg-gradient-to-b from-white/30 via-transparent to-slate-50/60"
                  : "bg-gradient-to-b from-white/70 via-transparent to-slate-50/90"
              }`}
            />
            <div
              className="absolute inset-0 z-10 pointer-events-none opacity-30"
              style={{
                background: `radial-gradient(ellipse at center, ${theme.glowColor}, transparent 65%)`,
              }}
            />
            {/* Bottom Fade to Content Section */}
            <div className="absolute bottom-0 left-0 right-0 h-28 z-20 pointer-events-none bg-gradient-to-b from-transparent to-slate-50" />
          </>
        )}

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center relative z-30 pointer-events-none">
          {/* Eyebrow Pill */}
          {heroSettings.showEyebrowBadge && heroSettings.eyebrowBadge && (
            <div
              style={{
                boxShadow: `0 8px 24px ${theme.glowColor}`,
              }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md text-xs sm:text-sm font-semibold mb-6 animate-in fade-in slide-in-from-top-4 duration-700 pointer-events-auto ${
                isDarkBg
                  ? "bg-white/10 border border-white/20 text-white"
                  : "bg-white/80 border border-slate-200/80 text-slate-800 shadow-sm"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span
                className={
                  isDarkBg
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300"
                    : "font-bold text-slate-800"
                }
              >
                {heroSettings.eyebrowBadge}
              </span>
            </div>
          )}

          {/* Headline H1 */}
          {(heroSettings.showHeadlinePart1 || heroSettings.showHeadlinePart2) && (
            <h1
              className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.18] max-w-4xl mx-auto mb-6 drop-shadow-sm pointer-events-auto ${
                isDarkBg ? "text-white" : "text-slate-900"
              }`}
            >
              {heroSettings.showHeadlinePart1 && heroSettings.headlinePart1}
              {heroSettings.showHeadlinePart1 && heroSettings.showHeadlinePart2 && (
                <br className="hidden sm:inline" />
              )}
              {heroSettings.showHeadlinePart2 && (
                <span
                  style={{
                    backgroundImage: isDarkBg
                      ? undefined
                      : `linear-gradient(135deg, ${theme.hex}, #f59e0b)`,
                  }}
                  className={
                    isDarkBg
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-amber-300"
                      : "text-transparent bg-clip-text"
                  }
                >
                  {heroSettings.headlinePart2}
                </span>
              )}
            </h1>
          )}

          {/* Subtitle / Description */}
          {heroSettings.showDescription && heroSettings.description && (
            <p
              className={`text-base sm:text-lg max-w-2xl mx-auto mb-10 font-normal leading-relaxed pointer-events-auto ${
                isDarkBg ? "text-slate-300/90" : "text-slate-600"
              }`}
            >
              {heroSettings.description}
            </p>
          )}


          {/* Action Buttons Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 pointer-events-auto">
            {/* Primary Action Button */}
            {heroSettings.showPrimaryButton && heroSettings.primaryButtonText && (
              <Link
                href={heroSettings.primaryButtonUrl || "#curriculum"}
                style={{
                  background: `linear-gradient(135deg, ${theme.hex}, #fbbf24)`,
                  boxShadow: `0 8px 24px ${theme.glowColor}`,
                }}
                className="relative inline-flex items-center justify-center rounded-2xl p-[1.5px] hover:scale-105 transition-all shadow-md"
              >
                <span
                  style={{ backgroundColor: theme.hex }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-[14.5px] hover:bg-transparent text-white font-bold text-sm transition-all shadow-md"
                >
                  {heroSettings.primaryButtonText} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            )}

            {/* Secondary Glass Button */}
            {heroSettings.showSecondaryButton && heroSettings.secondaryButtonText && (
              <Link
                href={heroSettings.secondaryButtonUrl || "#news"}
                className={`px-7 py-3.5 rounded-2xl font-semibold text-sm backdrop-blur-md shadow-sm transition-all hover:scale-105 ${
                  isDarkBg
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-lg"
                    : "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-md"
                }`}
              >
                {heroSettings.secondaryButtonText}
              </Link>
            )}

            {session?.user && (
              <Link
                href="/dashboard"
                className="px-7 py-3.5 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2"
              >
                <Layers className="w-4 h-4" /> แผงควบคุมหลังบ้าน
              </Link>
            )}

            {isSuperAdmin && (
              <Link
                href="/school/hero"
                className="px-6 py-3.5 rounded-2xl bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <Settings className="w-4 h-4" /> จัดการส่วนหัว 3D
              </Link>
            )}
          </div>
        </div>
      </section>


      {/* ═══ 3. SECTION: ข่าวสารประชาสัมพันธ์ (News & PR) ═══ */}
      <section id="news" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div
              style={{ color: theme.hex }}
              className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider mb-2"
            >
              <Newspaper className="w-4 h-4" /> ประชาสัมพันธ์และกิจกรรม
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">ข่าวสารล่าสุด</h2>
          </div>
          {isSuperAdmin && (
            <Link
              href="/news"
              style={{ color: theme.hex }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline mt-4 sm:mt-0 group bg-white/80 dark:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs"
            >
              <Settings className="w-4 h-4" />
              <span>จัดการข่าว</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayArticles.map((art) => {
            const { url: coverUrl, position: coverPosition } = parseCoverImage(art.coverImage);
            const previewText = art.content ? art.content.replace(/<[^>]*>?/gm, "").trim() : "ไม่มีรายละเอียดเพิ่มเติม";

            return (
              <article
                key={art.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <Link
                  href={`/news/${art.id}`}
                  className="block h-52 bg-slate-100 border-b border-slate-100 relative overflow-hidden group/img"
                >
                  <span
                    style={{ backgroundColor: theme.hex }}
                    className="absolute top-4 left-4 z-10 text-xs font-semibold px-2.5 py-1 rounded-md text-white shadow-xs"
                  >
                    ข่าวประชาสัมพันธ์
                  </span>
                  {coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={coverUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      style={{ objectPosition: coverPosition }}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full" style={{ color: theme.hex }}>
                      <Newspaper className="w-12 h-12" />
                    </div>
                  )}
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(art.createdAt).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                    <Link href={`/news/${art.id}`}>
                      <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {art.title}
                      </h3>
                    </Link>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {previewText}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <Link
                      href={`/news/${art.id}`}
                      style={{ color: theme.hex }}
                      className="hover:underline flex items-center gap-1 group/btn"
                    >
                      <span>อ่านต่อ</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                    {isSuperAdmin && (
                      <Link
                        href="/news"
                        className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 bg-slate-50 hover:bg-blue-50 px-2 py-1 rounded-md border border-slate-200 transition-colors"
                      >
                        <Settings className="w-3 h-3" />
                        <span>จัดการข่าว</span>
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ═══ 4. SECTION: เกี่ยวกับโรงเรียน & คณะผู้บริหาร (About School & Executives) ═══ */}
      {schoolInfo && (
        <AboutSchoolSection
          schoolInfo={schoolInfo}
          executives={executives}
          canManage={sessionCtx ? hasPermission(sessionCtx, PERSONNEL_P.manage) : false}
          themeColor={themeColor}
        />
      )}

      {/* ═══ 5. SECTION: ทำเนียบบุคลากร (Personnel Management) ═══ */}
      <section id="personnel" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div
              style={{ color: theme.hex }}
              className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider mb-2"
            >
              <Users className="w-4 h-4" /> คณาจารย์และเจ้าหน้าที่
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">ทำเนียบบุคลากร</h2>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            {isSuperAdmin && (
              <Link
                href="/school/personnel"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>จัดการบุคลากร</span>
              </Link>
            )}
            <Link
              href="/personnel"
              style={{ color: theme.hex }}
              className="inline-flex items-center gap-1 text-sm font-semibold hover:underline group"
            >
              ดูทำเนียบทั้งหมด <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-xs hover:shadow-md transition-all flex flex-col items-center group"
            >
              {emp.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={emp.imageUrl}
                  alt={emp.firstName}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-white shadow-sm ring-2 ring-slate-100"
                />
              ) : (
                <div
                  style={{
                    backgroundColor: `${theme.hex}18`,
                    color: theme.hex,
                  }}
                  className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-2xl mb-4 border-2 border-white shadow-xs"
                >
                  {emp.firstName.charAt(0)}
                </div>
              )}
              <h3 className="font-bold text-base text-slate-900 mb-1">
                {emp.firstName} {emp.lastName}
              </h3>
              <p className="text-xs font-semibold mb-1" style={{ color: theme.hex }}>
                {emp.position || "อาจารย์ผู้สอน"}
              </p>
              {Boolean((emp as any).department?.name || (emp as any).department) && (
                <p className="text-xs text-slate-500">{(emp as any).department?.name || (emp as any).department}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 6. SECTION: หลักสูตรสถานศึกษา (Curriculum Section) ═══ */}
      <CurriculumSection curricula={displayCurricula as any} themeColor={themeColor} />

      {/* ═══ 6. SECTION: สารสนเทศ & ศูนย์ดาวน์โหลด (Services & Downloads) ═══ */}
      <DownloadShowcaseSection
        documents={downloadDocs}
        themeColor={themeColor}
        backgroundTheme={bgThemeKey}
      />

      {/* ═══ 7. MODERN THEMED FOOTER ═══ */}
      <PublicFooter
        logoUrl={tenant?.logoUrl}
        nameTh={tenant?.nameTh}
        nameEn={tenant?.nameEn}
        user={session?.user}
        settings={footerSettings}
      />
    </div>
  );
}

