"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";

interface PublicNavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export function PublicNavbar({ user }: PublicNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loggedIn = !!user;

  return (
    <header className="fixed top-3 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`w-full pointer-events-auto transition-all duration-500 ease-in-out ${
          isScrolled ? "max-w-4xl" : "max-w-6xl"
        }`}
      >
        <nav
          className={`rounded-2xl sm:rounded-full border transition-all duration-500 backdrop-blur-xl flex items-center justify-between ${
            isScrolled
              ? "bg-slate-950/85 border-white/15 shadow-2xl shadow-black/40 py-2 px-4 sm:px-6 text-white"
              : "bg-slate-900/75 border-white/15 shadow-xl shadow-black/20 py-3 px-5 sm:px-8 text-white"
          }`}
        >
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative p-[1.5px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 shadow-xs group-hover:scale-105 transition-transform">
              <div className="w-8 h-8 rounded-[10px] bg-slate-950 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                SATIT MCU
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-sky-300 border border-blue-400/30 uppercase font-bold tracking-wider">
                  Portal
                </span>
              </span>
              {!isScrolled && (
                <span className="text-[10px] text-slate-400 hidden sm:block font-normal transition-opacity duration-300">
                  คณะพุทธศาสตร์และสังคมศาสตร์
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div
            className={`hidden md:flex items-center font-medium transition-all duration-300 ${
              isScrolled ? "gap-1 text-xs" : "gap-2 text-sm"
            }`}
          >
            <Link
              href="#home"
              className="px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              หน้าแรก
            </Link>
            <Link
              href="#news"
              className="px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <Newspaper className="w-3.5 h-3.5 text-blue-400" /> ข่าวสาร
            </Link>
            <Link
              href="#personnel"
              className="px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-blue-400" /> บุคลากร
            </Link>
            <Link
              href="#curriculum"
              className="px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" /> หลักสูตร
            </Link>
            <Link
              href="#document"
              className="px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" /> เอกสาร/คำร้อง
            </Link>
            <Link
              href="#facility"
              className="px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-400" /> จองห้อง/รถ
            </Link>
          </div>

          {/* Right Action Button (Gradient Border Pill) */}
          <div className="flex items-center gap-2">
            {loggedIn ? (
              <Link
                href="/dashboard"
                className="relative inline-flex items-center justify-center rounded-xl sm:rounded-full p-[1.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 shadow-md hover:shadow-blue-500/25 transition-all hover:scale-[1.02]"
              >
                <span className="flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-[10px] sm:rounded-full bg-slate-950 text-white text-xs sm:text-sm font-semibold hover:bg-transparent transition-colors">
                  <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">แผงควบคุมหลังบ้าน</span>
                  <span className="sm:hidden">Admin</span>
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="relative inline-flex items-center justify-center rounded-xl sm:rounded-full p-[1.5px] bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 shadow-md hover:shadow-purple-500/25 transition-all hover:scale-[1.02]"
              >
                <span className="flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-[10px] sm:rounded-full bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-transparent transition-colors">
                  <LogIn className="w-3.5 h-3.5" />
                  <span>เข้าสู่ระบบ</span>
                </span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-slate-950/95 border border-white/15 backdrop-blur-2xl text-white shadow-2xl space-y-2 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl hover:bg-white/10"
            >
              หน้าแรก
            </Link>
            <Link
              href="#news"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10"
            >
              <Newspaper className="w-4 h-4 text-blue-400" /> ข่าวสารประชาสัมพันธ์
            </Link>
            <Link
              href="#personnel"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10"
            >
              <Users className="w-4 h-4 text-blue-400" /> ทำเนียบคณาจารย์
            </Link>
            <Link
              href="#curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10"
            >
              <BookOpen className="w-4 h-4 text-blue-400" /> หลักสูตรการศึกษา
            </Link>
            <Link
              href="#document"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10"
            >
              <FileText className="w-4 h-4 text-blue-400" /> คำร้องและเอกสาร
            </Link>
            <Link
              href="#facility"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10"
            >
              <Building2 className="w-4 h-4 text-blue-400" /> จองห้องประชุม/ยานพาหนะ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
