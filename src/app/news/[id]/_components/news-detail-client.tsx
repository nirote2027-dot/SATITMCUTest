"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Check,
  Copy,
  Globe,
  Settings,
  Newspaper,
  Eye,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { parseCoverImage, type ArticleDto } from "@/features/news";
import { type ThemeColorKey, THEME_CONFIGS } from "@/features/school/types";

interface Props {
  article: ArticleDto & { authorName?: string | null };
  themeColor: ThemeColorKey;
  isSuperAdmin: boolean;
  relatedArticles: ArticleDto[];
}

export function NewsDetailClient({
  article,
  themeColor,
  isSuperAdmin,
  relatedArticles,
}: Props) {
  const theme = THEME_CONFIGS[themeColor] || THEME_CONFIGS.pink;
  const [lang, setLang] = useState<"th" | "en">("th");
  const [copied, setCopied] = useState(false);

  const hasEnglish = Boolean(article.titleEn || article.contentEn);
  const activeTitle = (lang === "en" && article.titleEn) ? article.titleEn : article.title;
  const activeContent = (lang === "en" && article.contentEn) ? article.contentEn : (article.content || "");

  const { url: coverUrl, position: coverPosition } = parseCoverImage(article.coverImage);

  const formattedDateTh = new Date(article.createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedDateEn = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("คัดลอกลิงก์ข่าวประชาสัมพันธ์แล้ว");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareFacebook = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, "_blank", "width=600,height=500,noopener,noreferrer");
    }
  };

  const handleShareLine = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, "_blank", "width=600,height=500,noopener,noreferrer");
    }
  };

  return (
    <div className="w-full">
      {/* ═══ TOP BREADCRUMB & ADMIN ACTION ═══ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              หน้าแรก
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/#news" className="hover:text-slate-900 transition-colors">
              ข่าวสารประชาสัมพันธ์
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {activeTitle}
            </span>
          </nav>

          {isSuperAdmin && (
            <Link
              href="/news"
              style={{
                borderColor: `${theme.hex}40`,
                backgroundColor: `${theme.hex}10`,
                color: theme.hex,
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border hover:shadow-xs transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>จัดการข่าวสาร (ผู้ดูแลระบบ)</span>
            </Link>
          )}
        </div>
      </div>

      {/* ═══ MAIN ARTICLE CONTAINER ═══ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          {/* Header Metadata */}
          <div className="p-6 sm:p-10 border-b border-slate-100 dark:border-slate-800">
            {/* Category / Status Pill & Language Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: theme.hex }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                >
                  <Newspaper className="w-3.5 h-3.5" />
                  ข่าวประชาสัมพันธ์
                </span>
                {article.status === "DRAFT" && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    แบบร่าง (Draft)
                  </span>
                )}
              </div>

              {/* Bilingual Switcher (Thai / English) */}
              {hasEnglish && (
                <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setLang("th")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      lang === "th"
                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    <span>🇹🇭 ไทย</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      lang === "en"
                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>🇬🇧 English</span>
                  </button>
                </div>
              )}
            </div>

            {/* Headline H1 */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.25] mb-6">
              {activeTitle}
            </h1>

            {/* Author, Date, Reading Meta */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{lang === "en" ? formattedDateEn : formattedDateTh}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span>{article.authorName || "งานประชาสัมพันธ์ โรงเรียนสาธิต มจร"}</span>
              </div>
            </div>
          </div>

          {/* Cover Image with Position Shift Support */}
          {coverUrl && (
            <div className="w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative border-b border-slate-100 dark:border-slate-800">
              <div className="w-full aspect-[16/9] max-h-[460px] overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverUrl}
                  alt={activeTitle}
                  referrerPolicy="no-referrer"
                  style={{ objectPosition: coverPosition }}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Article Body Content */}
          <div className="p-6 sm:p-10 lg:p-12">
            {activeContent ? (
              <div
                className="article-rich-content text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: activeContent }}
              />
            ) : (
              <p className="text-slate-500 italic py-8 text-center">ไม่มีรายละเอียดเนื้อหาข่าวเพิ่มเติม</p>
            )}

            {/* Social Share & Copy Link Section */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                <Share2 className="w-4 h-4 text-slate-400" />
                <span>แบ่งปันข่าวสารนี้:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Copy Link Button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "คัดลอกแล้ว!" : "คัดลอกลิงก์"}</span>
                </button>

                {/* Facebook Share */}
                <button
                  type="button"
                  onClick={handleShareFacebook}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>แชร์บน Facebook</span>
                </button>

                {/* Line Share */}
                <button
                  type="button"
                  onClick={handleShareLine}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] transition-colors"
                >
                  <span className="font-black text-xs">LINE</span>
                  <span>ส่งต่อผ่าน Line</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Back Link */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าข่าวสารประชาสัมพันธ์</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span>กลับสู่หน้าแรก</span>
          </Link>
        </div>

        {/* ═══ RELATED NEWS ARTICLES ═══ */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  ข่าวประชาสัมพันธ์อื่นๆ ที่น่าสนใจ
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  ติดตามข่าวสาร กิจกรรม และประกาศล่าสุดจากโรงเรียนสาธิต มจร
                </p>
              </div>
              <Link
                href="/#news"
                style={{ color: theme.hex }}
                className="text-xs sm:text-sm font-semibold hover:underline inline-flex items-center gap-1"
              >
                ดูทั้งหมด <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => {
                const { url: relCoverUrl, position: relCoverPos } = parseCoverImage(rel.coverImage);
                return (
                  <Link
                    key={rel.id}
                    href={`/news/${rel.id}`}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                  >
                    <div className="h-44 bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
                      {relCoverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={relCoverUrl}
                          alt={rel.title}
                          referrerPolicy="no-referrer"
                          style={{ objectPosition: relCoverPos }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center text-slate-400">
                          <Newspaper className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(rel.createdAt).toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {rel.title}
                        </h4>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold" style={{ color: theme.hex }}>
                        <span>อ่านต่อ</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Styled JSX / Scoped CSS for Rich Content */}
      <style jsx global>{`
        .article-rich-content p {
          margin-bottom: 1.25rem;
          line-height: 1.85;
        }
        .article-rich-content h1,
        .article-rich-content h2,
        .article-rich-content h3,
        .article-rich-content h4 {
          font-weight: 800;
          color: #0f172a;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.35;
        }
        .dark .article-rich-content h1,
        .dark .article-rich-content h2,
        .dark .article-rich-content h3,
        .dark .article-rich-content h4 {
          color: #f8fafc;
        }
        .article-rich-content h1 { font-size: 1.875rem; }
        .article-rich-content h2 { font-size: 1.5rem; }
        .article-rich-content h3 { font-size: 1.25rem; }
        .article-rich-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 1.5rem auto;
          display: block;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .article-rich-content iframe {
          max-width: 100%;
          width: 100%;
          min-height: 380px;
          border-radius: 1rem;
          margin: 1.5rem 0;
          border: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .article-rich-content a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .article-rich-content a:hover {
          color: #1d4ed8;
        }
        .article-rich-content ul,
        .article-rich-content ol {
          margin: 1rem 0 1.25rem 1.5rem;
          padding-left: 0.5rem;
        }
        .article-rich-content ul {
          list-style-type: disc;
        }
        .article-rich-content ol {
          list-style-type: decimal;
        }
        .article-rich-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .article-rich-content blockquote {
          border-left: 4px solid #3b82f6;
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background: #f8fafc;
          border-radius: 0 0.75rem 0.75rem 0;
          font-style: italic;
          color: #475569;
        }
        .dark .article-rich-content blockquote {
          background: #1e293b;
          color: #cbd5e1;
        }
        .article-rich-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .article-rich-content th,
        .article-rich-content td {
          border: 1px solid #e2e8f0;
          padding: 0.75rem 1rem;
          text-align: left;
        }
        .dark .article-rich-content th,
        .dark .article-rich-content td {
          border-color: #334155;
        }
        .article-rich-content th {
          background-color: #f1f5f9;
          font-weight: 700;
          color: #1e293b;
        }
        .dark .article-rich-content th {
          background-color: #1e293b;
          color: #f1f5f9;
        }
      `}</style>
    </div>
  );
}
