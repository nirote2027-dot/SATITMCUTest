import Link from "next/link";
import { auth, getSessionContext, hasPermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import { prisma } from "@/shared/lib/infra/prisma";
import { getFooterSettings } from "@/features/school/footer-services";
import {
  type ThemeColorKey,
  THEME_CONFIGS,
  type BackgroundThemeKey,
  BACKGROUND_THEMES,
} from "@/features/school/types";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { PersonnelPortalClient, type PublicEmployeeItem } from "./_components/personnel-portal-client";
import {
  Users,
  ChevronRight,
  Settings,
  Building2,
  GraduationCap,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PublicPersonnelPage() {
  const [session, sessionCtx] = await Promise.all([
    auth().catch(() => null),
    getSessionContext().catch(() => null),
  ]);

  const tenant = await (session?.tenantId
    ? prisma.tenant.findUnique({ where: { id: session.tenantId } })
    : prisma.tenant.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" } })
  ).catch(() => null);

  const tenantId = tenant?.id || sessionCtx?.tenantId || "";

  const [employeesRaw, footerSettings] = await Promise.all([
    prisma.employee
      .findMany({
        where: { isActive: true },
        include: { department: { select: { id: true, name: true } } },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      })
      .catch(() => []),
    getFooterSettings(tenantId).catch(() => null),
  ]);

  const themeColor: ThemeColorKey = (footerSettings?.themeColor as ThemeColorKey) || "blue";
  const theme = THEME_CONFIGS[themeColor] || THEME_CONFIGS.blue;

  const bgThemeKey: BackgroundThemeKey = (footerSettings?.backgroundTheme as BackgroundThemeKey) || "light";
  const bgTheme = BACKGROUND_THEMES[bgThemeKey] || BACKGROUND_THEMES.light;
  const isDarkBg = bgTheme.isDark;

  const canManage = sessionCtx
    ? hasPermission(sessionCtx, PERSONNEL_P.manage) || sessionCtx.isSuperAdmin === true
    : false;

  // Format employees for client
  const employees: PublicEmployeeItem[] = employeesRaw.map((emp) => {
    const contact = (emp.contactInfo as any) || {};
    return {
      id: emp.id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      position: emp.position,
      imageUrl: emp.imageUrl,
      departmentName: emp.department?.name || null,
      phone: typeof contact.phone === "string" ? contact.phone : null,
      email: typeof contact.email === "string" ? contact.email : null,
      lineId: typeof contact.lineId === "string" ? contact.lineId : null,
      address: typeof contact.address === "string" ? contact.address : null,
      displayOrder: emp.displayOrder,
    };
  });

  // Extract department count
  const deptCount = new Set(employees.map((e) => e.departmentName).filter(Boolean)).size;

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
      {/* ═══ 1. PORTAL NAVBAR ═══ */}
      <PublicNavbar
        user={session?.user}
        logoUrl={tenant?.logoUrl}
        nameTh={tenant?.nameTh}
        nameEn={tenant?.nameEn}
        themeColor={themeColor}
      />

      {/* ═══ 2. HERO HEADER SECTION (Portal Style) ═══ */}
      <section className="relative pt-28 pb-14 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-b border-white/10">
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background: `radial-gradient(ellipse at center top, ${theme.glowColor}, transparent 70%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              หน้าแรก
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/#about" className="hover:text-white transition-colors">
              เกี่ยวกับโรงเรียน
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span style={{ color: theme.hex }} className="font-bold">
              ทำเนียบบุคลากร
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div
                style={{
                  backgroundColor: `${theme.hex}25`,
                  color: "#ffffff",
                  borderColor: `${theme.hex}50`,
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border font-bold text-xs uppercase tracking-wider mb-3 shadow-xs"
              >
                <Users className="w-3.5 h-3.5" /> SATIT MCU • FACULTY & STAFF DIRECTORY
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                ทำเนียบคณาจารย์และบุคลากรทางการศึกษา
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-normal">
                รายนามคณะผู้บริหาร คณาจารย์ ครูผู้สอน และบุคลากรสายสนับสนุนการศึกษา
                โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-xs text-slate-400 block font-medium">บุคลากรทั้งหมด</span>
                <span className="text-xl font-black text-white">{employees.length} ท่าน</span>
              </div>
              {deptCount > 0 && (
                <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <span className="text-xs text-slate-400 block font-medium">กลุ่มงาน/ฝ่าย</span>
                  <span style={{ color: theme.hex }} className="text-xl font-black">
                    {deptCount} ฝ่าย
                  </span>
                </div>
              )}
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-xs text-slate-400 block font-medium">การเข้าถึง</span>
                <span className="text-xl font-black text-emerald-400">สาธารณะ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. MAIN PERSONNEL INTERACTIVE CLIENT ═══ */}
      <main className="flex-1">
        <PersonnelPortalClient
          initialEmployees={employees}
          canManage={canManage}
          themeColor={themeColor}
        />
      </main>

      {/* ═══ 4. PORTAL FOOTER ═══ */}
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
