import { auth, getSessionContext, hasPermission } from "@/features/identity/server";
import { FACILITY_P } from "@/features/facility/server";
import { listDownloadDocuments } from "@/features/download/server";
import { prisma } from "@/shared/lib/infra/prisma";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { DownloadPortalClient } from "./_components/download-portal-client";
import { Download, FileText, ChevronRight, Sparkles, FolderDown, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DownloadPage() {
  const [session, sessionCtx] = await Promise.all([
    auth().catch(() => null),
    getSessionContext().catch(() => null),
  ]);

  const tenant = await (session?.tenantId
    ? prisma.tenant.findUnique({ where: { id: session.tenantId } })
    : prisma.tenant.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" } })
  ).catch(() => null);

  const initialItems = await listDownloadDocuments();
  const canManage = sessionCtx
    ? hasPermission(sessionCtx, FACILITY_P.manage) || sessionCtx.isSuperAdmin
    : false;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* ═══ 1. PORTAL NAVBAR ═══ */}
      <PublicNavbar
        user={session?.user}
        logoUrl={tenant?.logoUrl}
        nameTh={tenant?.nameTh}
        nameEn={tenant?.nameEn}
      />

      {/* ═══ 2. HERO HEADER SECTION (Portal Style) ═══ */}
      <section className="relative pt-28 pb-12 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-b border-white/10">
        {/* Ambient subtle glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              หน้าแรก
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-400">บริการสารสนเทศ</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-sky-400">ศูนย์ดาวน์โหลด</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-400 font-bold text-xs uppercase tracking-wider mb-3">
                <FolderDown className="w-3.5 h-3.5" /> SATIT MCU • DOWNLOAD CENTER
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                ศูนย์ดาวน์โหลดเอกสารและแบบฟอร์ม
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-normal">
                บริการดาวน์โหลดแบบฟอร์มคำร้องทางการศึกษา เอกสารหลักสูตร คู่มือการจัดการเรียนรู้
                และประกาศระเบียบข้อบังคับ สำหรับนักเรียน ผู้ปกครอง ครู และผู้สนใจทั่วไป
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-xs text-slate-400 block font-medium">เอกสารทั้งหมด</span>
                <span className="text-xl font-black text-white">{initialItems.length} ฉบับ</span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-xs text-slate-400 block font-medium">หมวดหมู่บริการ</span>
                <span className="text-xl font-black text-sky-400">3 หมวดหมู่</span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-xs text-slate-400 block font-medium">เข้าถึงได้</span>
                <span className="text-xl font-black text-emerald-400">ทุกคน (สาธารณะ)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. MAIN DOWNLOAD CONTENT CLIENT ═══ */}
      <main className="flex-1">
        <DownloadPortalClient initialItems={initialItems} canManage={canManage} />
      </main>

      {/* ═══ 4. PORTAL FOOTER ═══ */}
      <PublicFooter
        logoUrl={tenant?.logoUrl}
        nameTh={tenant?.nameTh}
        nameEn={tenant?.nameEn}
        user={session?.user}
      />
    </div>
  );
}
