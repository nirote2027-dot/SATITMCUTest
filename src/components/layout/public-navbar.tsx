"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PublicNavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  logoUrl?: string | null;
  nameTh?: string | null;
  nameEn?: string | null;
}

export function PublicNavbar({ user, logoUrl, nameTh, nameEn }: PublicNavbarProps) {
  const t = useT();
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loggedIn = !!user;
  const displayName = user?.name || user?.email?.split("@")[0] || "เจ้าหน้าที่";
  const initials = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  const primaryName = (locale === "en" ? nameEn : nameTh) || nameTh || nameEn || "SATIT MCU";
  const secondaryName = (locale === "en" ? nameTh : nameEn) || nameEn || nameTh || "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย";

  const navLinks = [
    { href: "#home", label: t("nav.home") || "หน้าแรก", icon: null },
    { href: "#news", label: t("roles.module.news") || "ข่าวสาร", icon: Newspaper },
    { href: "#personnel", label: t("roles.module.personnel") || "บุคลากร", icon: Users },
    { href: "#curriculum", label: t("roles.module.curriculum") || "หลักสูตร", icon: BookOpen },
    { href: "#document", label: t("roles.module.document") || "เอกสาร/คำร้อง", icon: FileText },
    { href: "#facility", label: t("roles.module.facility") || "จองห้อง/รถ", icon: Building2 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand Block (Styled exactly like Admin brand-blk) */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-[36px] h-[36px] rounded-lg bg-white border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center justify-center overflow-hidden p-0.5 shrink-0 transition-transform group-hover:scale-105">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={primaryName} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full bg-blue-600 rounded-md flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <b className="font-bold text-slate-900 dark:text-white tracking-tight text-sm sm:text-base leading-tight truncate max-w-[200px] sm:max-w-xs">
                {primaryName}
              </b>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-sky-300 border border-blue-500/20 shrink-0">
                Portal
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[220px] sm:max-w-sm font-normal leading-tight">
              {secondaryName}
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links (Admin-style pill items) */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Theme Toggle, Language Switcher, Avatar Menu or Login Button, Mobile Hamburger) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle Button (Admin Style) */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-lg border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="w-4 h-4 hidden dark:block text-amber-400" />
            <Moon className="w-4 h-4 block dark:hidden text-slate-600" />
          </button>

          {/* Language Switcher Button (Admin Style) */}
          <LanguageSwitcher className="w-9 h-9 rounded-lg border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors" />

          {/* User Avatar Menu / Login Button */}
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
              <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-xl">
                <DropdownMenuLabel className="font-normal px-2.5 py-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">
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
                    <span>แผงควบคุมหลังบ้าน</span>
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
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium shadow-xs hover:shadow-sm transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>เข้าสู่ระบบ</span>
            </Link>
          )}

          {/* Mobile Drawer Toggle (Admin data-drawer style) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 w-full bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl px-4 py-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                {Icon && <Icon className="w-4 h-4 text-blue-500 dark:text-blue-400" />}
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Mobile Utility Controls (Language & Theme) */}
          <div className="flex items-center justify-between px-3 py-2.5 border-t border-slate-200/80 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
            <span>ภาษา & ธีม (Language & Theme)</span>
            <div className="flex items-center gap-2">
              <LanguageSwitcher className="h-8 px-2.5 rounded-md border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold" />
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 rounded-md border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                <Sun className="w-3.5 h-3.5 hidden dark:block text-amber-400" />
                <Moon className="w-3.5 h-3.5 block dark:hidden text-slate-600" />
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 dark:border-white/10">
            {loggedIn ? (
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 mb-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-xs shrink-0">
                    {user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
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
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>แผงควบคุมหลังบ้าน (Dashboard)</span>
                </Link>
                <Link
                  href="/me"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>ข้อมูลส่วนตัว (Profile)</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>ตั้งค่าระบบ (Settings)</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
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

