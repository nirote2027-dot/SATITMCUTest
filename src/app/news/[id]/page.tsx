import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { auth, getSessionContext, hasPermission } from "@/features/identity/server";
import { NEWS_P } from "@/features/news/permissions";
import { getArticleById } from "@/features/news/server";
import { parseCoverImage } from "@/features/news";
import { getFooterSettings } from "@/features/school/footer-services";
import {
  type ThemeColorKey,
  THEME_CONFIGS,
  type BackgroundThemeKey,
  BACKGROUND_THEMES,
} from "@/features/school/types";
import { prisma } from "@/shared/lib/infra/prisma";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { NewsDetailClient } from "./_components/news-detail-client";
import { ArrowLeft, Newspaper } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id).catch(() => null);
  if (!article) {
    return {
      title: "ไม่พบข่าวสาร | โรงเรียนสาธิต มจร",
    };
  }

  const { url: coverUrl } = parseCoverImage(article.coverImage);
  const plainDescription = article.content ? article.content.replace(/<[^>]*>?/gm, "").slice(0, 160) : "";

  return {
    title: `${article.title} | ข่าวประชาสัมพันธ์ โรงเรียนสาธิต มจร`,
    description: plainDescription || "ข่าวสารและกิจกรรมประชาสัมพันธ์ โรงเรียนสาธิต มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
    openGraph: {
      title: article.title,
      description: plainDescription,
      images: coverUrl ? [{ url: coverUrl }] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;

  const [session, sessionCtx, article] = await Promise.all([
    auth().catch(() => null),
    getSessionContext().catch(() => null),
    getArticleById(id).catch(() => null),
  ]);

  const tenant = await (session?.tenantId
    ? prisma.tenant.findUnique({ where: { id: session.tenantId } })
    : prisma.tenant.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" } })
  ).catch(() => null);

  const tenantId = tenant?.id || sessionCtx?.tenantId || "";
  const footerSettings = tenantId ? await getFooterSettings(tenantId).catch(() => null) : null;

  const themeColor = footerSettings?.themeColor || "pink";
  const bgThemeKey: BackgroundThemeKey = (footerSettings?.backgroundTheme as BackgroundThemeKey) || "light";
  const bgConfig = BACKGROUND_THEMES[bgThemeKey] || BACKGROUND_THEMES.light;
  const isDarkBg = bgConfig.isDark;

  const isSuperAdmin = sessionCtx?.isSuperAdmin === true;
  const canManageNews = isSuperAdmin || (sessionCtx ? hasPermission(sessionCtx, NEWS_P.manage) : false);

  // If article not found, or is DRAFT and user has no manage permission
  if (!article || (article.status === "DRAFT" && !canManageNews)) {
    return (
      <div className={`min-h-screen flex flex-col ${isDarkBg ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
        <PublicNavbar
          user={session?.user}
          logoUrl={tenant?.logoUrl}
          nameTh={tenant?.nameTh}
          nameEn={tenant?.nameEn}
          themeColor={themeColor}
        />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-24 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <Newspaper className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">ไม่พบข่าวสารประชาสัมพันธ์นี้</h1>
          <p className="text-slate-500 text-sm max-w-md mb-8">
            ข่าวสารที่คุณกำลังเข้าถึงอาจถูกลบ ย้าย หรือยังไม่ได้เผยแพร่สู่สาธารณะ
          </p>
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าข่าวสารประชาสัมพันธ์</span>
          </Link>
        </main>
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

  // Fetch 3 other published articles for related news showcase
  const relatedArticlesRaw = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: id },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  const relatedArticles = relatedArticlesRaw.map((item) => ({
    id: item.id,
    tenantId: item.tenantId,
    title: item.title,
    titleEn: item.titleEn,
    content: item.content,
    contentEn: item.contentEn,
    coverImage: item.coverImage,
    status: item.status,
    publishedAt: item.publishedAt ? item.publishedAt.toISOString() : null,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return (
    <div className={`min-h-screen flex flex-col ${isDarkBg ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
      <PublicNavbar
        user={session?.user}
        logoUrl={tenant?.logoUrl}
        nameTh={tenant?.nameTh}
        nameEn={tenant?.nameEn}
        themeColor={themeColor}
      />

      <NewsDetailClient
        article={article}
        themeColor={themeColor}
        isSuperAdmin={isSuperAdmin}
        relatedArticles={relatedArticles}
      />

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
