"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { useT, useLocale } from "@/shared/lib/i18n/client";
import { LanguageSwitcher } from "./language-switcher";
import {
  GraduationCap,
  Newspaper,
  Users,
  BookOpen,
  FileText,
  Building2,
  LogIn,
  LayoutDashboard,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  User as UserIcon,
  Settings,
  LogOut,
  Layers,
  Download,
  Award,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Info,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type ThemeColorKey,
  THEME_CONFIGS,
} from "@/features/school/types";

interface PublicNavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  } | null;
  logoUrl?: string | null;
  nameTh?: string | null;
  nameEn?: string | null;
  themeColor?: ThemeColorKey;
}

interface NavSubItem {
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
  adminHref?: string;
}

interface NavMenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  href?: string;
  badge?: string;
  description?: string;
  adminGroupHref?: string;
  adminLabel?: string;
  items?: NavSubItem[];
}

export function PublicNavbar({ user, logoUrl, nameTh, nameEn, themeColor }: PublicNavbarProps) {
  const t = useT();
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const currentTheme = THEME_CONFIGS[themeColor || "blue"] || THEME_CONFIGS.blue;

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>("school");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const loggedIn = !!user;
  const displayName = user?.name || user?.email?.split("@")[0] || "เจ้าหน้าที่";
  const initials = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  const primaryName = (locale === "en" ? nameEn : nameTh) || nameTh || nameEn || "SATIT MCU";
  const secondaryName = (locale === "en" ? nameTh : nameEn) || nameEn || nameTh || "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย";

  // Dropdown hover control with debounce
  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuId);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Main Navigation structure: 1:1 aligned with Admin Sidebar
  const navGroups: NavMenuItem[] = [
    {
      id: "home",
      title: t("nav.home") || "หน้าแรก",
      icon: LayoutDashboard,
      href: "/#home",
    },
    {
      id: "news",
      title: locale === "en" ? "News & PR" : "ข่าวประชาสัมพันธ์",
      icon: Newspaper,
      href: "/#news",
    },
    {
      id: "school",
      title: t("school.title") || "เกี่ยวกับโรงเรียน",
      icon: Building2,
      description: "ข้อมูลทั่วไป วิสัยทัศน์ ปรัชญา และทำเนียบผู้บริหาร/บุคลากร",
      adminGroupHref: "/school/info",
      adminLabel: "จัดการข้อมูลโรงเรียน (Admin)",
      items: [
        {
          title: t("school.info") || "ข้อมูลทั่วไป",
          subtitle: "ประวัติ ปรัชญา วิสัยทัศน์ พันธกิจ อัตลักษณ์ และคลังภาพ",
          href: "/#about",
          adminHref: "/school/info",
          icon: Building2,
          badge: "แนะนำ",
        },
        {
          title: t("school.executives") || "คณะผู้บริหาร",
          subtitle: "ทำเนียบคณะกรรมการและผู้บริหารสถานศึกษาขั้นพื้นฐาน",
          href: "/#executives",
          adminHref: "/school/executives",
          icon: Award,
          badge: "ผู้บริหาร",
        },
        {
          title: t("school.personnel") || "ครู/บุคลากร",
          subtitle: "ทำเนียบคณาจารย์ ครูผู้สอน และบุคลากรทางการศึกษา",
          href: "/#personnel",
          adminHref: "/school/personnel",
          icon: Users,
        },
      ],
    },
    {
      id: "curriculum",
      title: locale === "en" ? "Curriculum" : "หลักสูตร",
      icon: BookOpen,
      href: "/#curriculum",
    },
    {
      id: "services",
      title: t("nav.services") || "บริการสารสนเทศ",
      icon: FileText,
      description: "ระบบทะเบียนและวัดผลสำหรับบุคลากร และศูนย์ดาวน์โหลด",
      adminGroupHref: "/satitmcuReg",
      adminLabel: "จัดการระบบบริการ (Admin)",
      items: [
        {
          title: t("document.title") || "งานทะเบียนและวัดผล",
          subtitle: "ระบบงานทะเบียน บันทึกผลการเรียน และระเบียนนักเรียน",
          href: "/satitmcuReg",
          adminHref: "/satitmcuReg",
          icon: CheckCircle2,
          badge: "ออนไลน์",
        },
        {
          title: t("facility.title") || "ศูนย์ดาวน์โหลด",
          subtitle: "ดาวน์โหลดแบบฟอร์มคำร้อง คู่มือ และเอกสารวิชาการ",
          href: "/download",
          adminHref: "/download",
          icon: Download,
          badge: "พร้อมโหลด",
        },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-xs transition-colors">
      <div
        ref={navContainerRef}
        className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3"
      >
        {/* ════════════════ LEFT: Portal Brand Block ════════════════ */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div
            style={{ borderColor: `${currentTheme.hex}40` }}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border shadow-xs flex items-center justify-center overflow-hidden p-0.5 shrink-0 transition-transform group-hover:scale-105"
          >
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={primaryName} className="w-full h-full object-contain" />
            ) : (
              <div
                style={{ background: `linear-gradient(135deg, ${currentTheme.hex}, #1e1b4b)` }}
                className="w-full h-full rounded-lg flex items-center justify-center text-white"
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <b className="font-black text-slate-900 dark:text-white tracking-tight text-sm sm:text-base leading-tight truncate max-w-[200px] sm:max-w-xs">
                {primaryName}
              </b>
              <span
                style={{
                  backgroundColor: `${currentTheme.hex}18`,
                  color: currentTheme.hex,
                  borderColor: `${currentTheme.hex}35`,
                }}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0"
              >
                PORTAL
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[220px] sm:max-w-sm font-normal leading-tight">
              {secondaryName}
            </span>
          </div>
        </Link>

        {/* ════════════════ CENTER: Interactive Dropdown Menu (Portal Style) ════════════════ */}
        <nav className="hidden lg:flex items-center gap-1">
          {navGroups.map((group) => {
            const Icon = group.icon;
            const hasSub = group.items && group.items.length > 0;
            const isOpen = activeDropdown === group.id;

            if (!hasSub) {
              return (
                <Link
                  key={group.id}
                  href={group.href || "#"}
                  className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-all flex items-center gap-2 group/link"
                >
                  <Icon className="w-4 h-4 transition-colors" style={{ color: currentTheme.hex }} />
                  <span>{group.title}</span>
                </Link>
              );
            }

            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(group.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Dropdown Trigger Button */}
                <button
                  type="button"
                  onClick={() => setActiveDropdown(isOpen ? null : group.id)}
                  aria-expanded={isOpen}
                  style={
                    isOpen
                      ? { backgroundColor: `${currentTheme.hex}15`, color: currentTheme.hex }
                      : undefined
                  }
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isOpen
                      ? "shadow-xs font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" style={{ color: currentTheme.hex }} />
                  <span>{group.title}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "text-slate-400 dark:text-slate-500"
                    }`}
                    style={isOpen ? { color: currentTheme.hex } : undefined}
                  />
                </button>

                {/* Dropdown Card Flyout */}
                {isOpen && (
                  <div
                    className="absolute top-full left-0 mt-1.5 w-[380px] rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/10 shadow-2xl backdrop-blur-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseEnter={() => handleMouseEnter(group.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Header Strip */}
                    <div className="px-3 py-2 mb-1 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.hex }} />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {group.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        SATIT MCU PORTAL
                      </span>
                    </div>

                    {/* Submenu Items List */}
                    <div className="space-y-1">
                      {group.items?.map((item) => {
                        const SubIcon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                          >
                            <div
                              style={{
                                backgroundColor: `${currentTheme.hex}14`,
                                borderColor: `${currentTheme.hex}30`,
                              }}
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border group-hover/item:scale-105 transition-all shadow-2xs"
                            >
                              <SubIcon className="w-4 h-4" style={{ color: currentTheme.hex }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5 mb-0.5">
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/item:opacity-90 transition-colors">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span
                                    style={{
                                      backgroundColor: `${currentTheme.hex}15`,
                                      color: currentTheme.hex,
                                      borderColor: `${currentTheme.hex}30`,
                                    }}
                                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0"
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed">
                                {item.subtitle}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover/item:translate-x-0.5 transition-all self-center shrink-0" />
                          </Link>
                        );
                      })}
                    </div>

                    {/* Footer Shortcut to Admin if user is logged in or wants admin view */}
                    {loggedIn && group.adminGroupHref && (
                      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5 px-2">
                        <Link
                          href={group.adminGroupHref}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-semibold text-blue-600 dark:text-sky-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Settings className="w-3.5 h-3.5" />
                            <span>{group.adminLabel || "จัดการข้อมูลหลังบ้าน"}</span>
                          </span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ════════════════ RIGHT: Controls & Auth ════════════════ */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4 hidden dark:block text-amber-400" />
            <Moon className="w-4 h-4 block dark:hidden text-slate-600" />
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer" />

          {/* Logged in User Menu OR Sign-in Button */}
          {loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 p-1 pr-2.5 rounded-full border border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-hidden cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-xs shrink-0">
                    {user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="hidden sm:flex flex-col text-left leading-tight max-w-[110px]">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-sky-400 font-medium">
                      Staff Console
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 p-1.5 shadow-xl rounded-2xl">
                <DropdownMenuLabel className="font-normal px-2.5 py-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                      {displayName}
                    </p>
                    {user?.email && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-none truncate mt-0.5">
                        {user.email}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex items-center gap-2 py-2">
                    <LayoutDashboard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold">แผงควบคุมหลังบ้าน (Dashboard)</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/school/info" className="cursor-pointer flex items-center gap-2 py-2">
                    <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>จัดการข้อมูลเกี่ยวกับโรงเรียน</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/me" className="cursor-pointer flex items-center gap-2 py-2">
                    <UserIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span>ข้อมูลส่วนตัว (Profile)</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer flex items-center gap-2 py-2">
                    <Settings className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span>ตั้งค่าระบบ (Settings)</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 flex items-center gap-2 py-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ออกจากระบบ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              style={{
                backgroundColor: currentTheme.hex,
                boxShadow: `0 4px 14px ${currentTheme.glowColor}`,
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>เข้าสู่ระบบ</span>
            </Link>
          )}

          {/* Mobile Drawer Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ════════════════ MOBILE DRAWER (Portal Accordion Style) ════════════════ */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-white/10 backdrop-blur-2xl shadow-2xl px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navGroups.map((group) => {
            const Icon = group.icon;
            const hasSub = group.items && group.items.length > 0;
            const isExpanded = mobileExpandedGroup === group.id;

            if (!hasSub) {
              return (
                <Link
                  key={group.id}
                  href={group.href || "#"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4" style={{ color: currentTheme.hex }} />
                  <span>{group.title}</span>
                </Link>
              );
            }

            return (
              <div
                key={group.id}
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setMobileExpandedGroup(isExpanded ? null : group.id)}
                  className="flex items-center justify-between w-full px-3.5 py-3 text-left font-bold text-sm text-slate-800 dark:text-slate-100"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" style={{ color: currentTheme.hex }} />
                    <span>{group.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    style={isExpanded ? { color: currentTheme.hex } : undefined}
                  />
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="px-2 pb-2.5 pt-1 space-y-1 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/5">
                    {group.items?.map((item) => {
                      const SubIcon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                        >
                          <div
                            style={{
                              backgroundColor: `${currentTheme.hex}14`,
                              borderColor: `${currentTheme.hex}25`,
                            }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                          >
                            <SubIcon className="w-4 h-4" style={{ color: currentTheme.hex }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span
                                  style={{
                                    backgroundColor: `${currentTheme.hex}15`,
                                    color: currentTheme.hex,
                                    borderColor: `${currentTheme.hex}30`,
                                  }}
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                    {loggedIn && group.adminGroupHref && (
                      <div className="pt-2 px-1">
                        <Link
                          href={group.adminGroupHref}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/40"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          <span>{group.adminLabel || "จัดการข้อมูลหลังบ้าน"}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Mobile Utility Strip: Theme & Language */}
          <div className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
            <span>ภาษา & โหมดการแสดงผล</span>
            <div className="flex items-center gap-2">
              <LanguageSwitcher className="h-8 px-2.5 rounded-lg border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold" />
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 rounded-lg border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer"
                aria-label="Toggle theme"
              >
                <Sun className="w-3.5 h-3.5 hidden dark:block text-amber-400" />
                <Moon className="w-3.5 h-3.5 block dark:hidden text-slate-600" />
              </button>
            </div>
          </div>

          {/* Mobile Auth actions */}
          <div className="pt-2">
            {loggedIn ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-xs shrink-0">
                    {user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {displayName}
                    </span>
                    {user?.email && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-blue-600 dark:text-sky-400 bg-blue-50/50 dark:bg-blue-950/30"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>แผงควบคุมหลังบ้าน (Dashboard)</span>
                </Link>
                <Link
                  href="/me"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>ข้อมูลส่วนตัว (Profile)</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  backgroundColor: currentTheme.hex,
                  boxShadow: `0 4px 14px ${currentTheme.glowColor}`,
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white font-bold text-sm shadow-md hover:scale-105 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>เข้าสู่ระบบ</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
