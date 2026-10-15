"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Download,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Layers,
  Award,
  Network,
  Clock,
  Compass,
  CheckCircle2,
  Search,
} from "lucide-react";
import { PdfViewerModal, resolvePdfUrl } from "@/components/ui/pdf-viewer-modal";
import { type ThemeColorKey, THEME_CONFIGS } from "@/features/school/types";

export interface HomeCurriculumItem {
  id: string;
  code: string;
  name: string;
  nameEn?: string | null;
  degreeLevel: string;
  degreeNameTh?: string | null;
  degreeNameEn?: string | null;
  curriculumYear?: string | null;
  durationYears?: number | null;
  totalCredits: number;
  geCredits?: number | null;
  majorCredits?: number | null;
  electiveCredits?: number | null;
  description?: string | null;
  philosophy?: string | null;
  imageUrl?: string | null;
  pdfUrl?: string | null;
  department?: {
    id: string;
    name: string;
    code?: string | null;
  } | null;
}

interface CurriculumSectionProps {
  curricula: HomeCurriculumItem[];
  themeColor?: ThemeColorKey;
}

// Fallback high quality curricula inspired by satit.tu.ac.th/course/
const DEFAULT_SATIT_CURRICULA: HomeCurriculumItem[] = [
  {
    id: "sample-m-junior",
    code: "SM-JUNIOR-60",
    name: "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนต้น (ม.1 - ม.3)",
    nameEn: "Basic Education Core Curriculum (Lower Secondary Education: Grade 7-9)",
    degreeLevel: "มัธยมศึกษาตอนต้น (ม.1 - ม.3)",
    degreeNameTh: "ประกาศนียบัตรมัธยมศึกษาตอนต้น (ม.3)",
    degreeNameEn: "Certificate of Lower Secondary Education",
    curriculumYear: "2551 (ปรับปรุง 2560)",
    durationYears: 3,
    totalCredits: 88,
    geCredits: 66,
    majorCredits: 16,
    electiveCredits: 6,
    description:
      "มุ่งเน้นการพัฒนาผู้เรียนรอบด้าน สร้างพื้นฐานกระบวนการคิดเชิงวิพากษ์ ทักษะการสื่อสารภาษาไทยและภาษาอังกฤษ บูรณาการคุณธรรม จริยธรรม ตามแนวทางพุทธปัญญา",
    philosophy:
      "พัฒนาศักยภาพผู้เรียนสู่ความเป็นมนุษย์ที่สมบูรณ์ มีปัญญาคู่คุณธรรม รู้วิธีการเรียนรู้ตลอดชีวิต และมีทักษะชีวิตในศตวรรษที่ 21",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    pdfUrl: "/uploads/sample-tqf2.pdf",
    department: {
      id: "dept-1",
      name: "กลุ่มสาระการเรียนรู้บูรณาการและวิชาการทั่วไป",
    },
  },
  {
    id: "sample-m-sci",
    code: "SM-SCI-MATH-60",
    name: "หลักสูตรมัธยมศึกษาตอนปลาย แผนการเรียนวิทยาศาสตร์ - คณิตศาสตร์ (ม.4 - ม.6)",
    nameEn: "Senior Secondary Curriculum: Science & Mathematics Track (Grade 10-12)",
    degreeLevel: "มัธยมศึกษาตอนปลาย (ม.4 - ม.6)",
    degreeNameTh: "ประกาศนียบัตรมัธยมศึกษาตอนปลาย (ม.6)",
    degreeNameEn: "Certificate of Senior Secondary Education",
    curriculumYear: "2551 (ปรับปรุง 2560)",
    durationYears: 3,
    totalCredits: 84,
    geCredits: 41,
    majorCredits: 37,
    electiveCredits: 6,
    description:
      "เตรียมความพร้อมทางวิชาการขั้นสูงด้านวิทยาศาสตร์ คณิตศาสตร์ เทคโนโลยี และการวิจัยโครงงาน สู่การศึกษาต่อในกลุ่มคณะวิทยาศาสตร์สุขภาพ วิศวกรรมศาสตร์ และเทคโนโลยี",
    philosophy:
      "สร้างนักวิทยาศาสตร์และนวัตกรรุ่นเยาว์ที่มีจิตสำนึกรับผิดชอบต่อสิ่งแวดล้อมและสังคม",
    imageUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
    pdfUrl: "/uploads/sample-tqf2.pdf",
    department: {
      id: "dept-2",
      name: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี",
    },
  },
  {
    id: "sample-m-lang",
    code: "SM-LANG-BUDD-60",
    name: "หลักสูตรมัธยมศึกษาตอนปลาย แผนการเรียนภาษา - สังคมศึกษาและพุทธศาสน์ศึกษา (ม.4 - ม.6)",
    nameEn: "Senior Secondary Curriculum: Languages, Social Studies & Buddhist Studies",
    degreeLevel: "มัธยมศึกษาตอนปลาย (ม.4 - ม.6)",
    degreeNameTh: "ประกาศนียบัตรมัธยมศึกษาตอนปลาย (ม.6)",
    degreeNameEn: "Certificate of Senior Secondary Education",
    curriculumYear: "2551 (ปรับปรุง 2560)",
    durationYears: 3,
    totalCredits: 82,
    geCredits: 41,
    majorCredits: 35,
    electiveCredits: 6,
    description:
      "พัฒนาทักษะความเป็นเลิศทางภาษา (ไทย, อังกฤษ, บาลี, สันสกฤต, จีน) ความเข้าใจในมิติสังคม วัฒนธรรม ปรัชญา และภาวะผู้นำทางคุณธรรมในสังคมพหุวัฒนธรรม",
    philosophy:
      "ปัญญานำพาสังคม สื่อสารเข้าใจโลก เชื่อมโยงรากเหง้าภูมิปัญญาพุทธสู่สากล",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
    pdfUrl: "/uploads/sample-tqf2.pdf",
    department: {
      id: "dept-3",
      name: "กลุ่มสาระการเรียนรู้ภาษาและสังคมศึกษา ศาสนา และวัฒนธรรม",
    },
  },
  {
    id: "sample-m-tech",
    code: "SM-ART-TECH-60",
    name: "หลักสูตรมัธยมศึกษาตอนปลาย แผนการเรียนศิลปะ - เทคโนโลยีและนวัตกรรมดิจิทัล (ม.4 - ม.6)",
    nameEn: "Senior Secondary Curriculum: Creative Arts & Digital Innovation",
    degreeLevel: "มัธยมศึกษาตอนปลาย (ม.4 - ม.6)",
    degreeNameTh: "ประกาศนียบัตรมัธยมศึกษาตอนปลาย (ม.6)",
    degreeNameEn: "Certificate of Senior Secondary Education",
    curriculumYear: "2551 (ปรับปรุง 2560)",
    durationYears: 3,
    totalCredits: 84,
    geCredits: 41,
    majorCredits: 37,
    electiveCredits: 6,
    description:
      "บูรณาการความคิดสร้างสรรค์ทางศิลปะ สื่อดิจิทัล การเขียนโปรแกรมคอมพิวเตอร์ และการพัฒนาโครงงานนวัตกรรม เพื่อเตรียมพร้อมสู่อุตสาหกรรมสร้างสรรค์และเทคโนโลยีแห่งอนาคต",
    philosophy:
      "ผสานจินตนาการกับเทคโนโลยี สรรค์สร้างนวัตกรรมที่มีคุณค่าแก่สังคม",
    imageUrl:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=80",
    pdfUrl: "/uploads/sample-tqf2.pdf",
    department: {
      id: "dept-4",
      name: "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี",
    },
  },
];

type LevelTab = "ALL" | "JUNIOR" | "SENIOR";

export function CurriculumSection({ curricula, themeColor }: CurriculumSectionProps) {
  const [selectedTab, setSelectedTab] = useState<LevelTab>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const theme = THEME_CONFIGS[themeColor || "blue"] || THEME_CONFIGS.blue;

  // Modal PDF reader state
  const [pdfReaderOpen, setPdfReaderOpen] = useState(false);
  const [pdfReaderUrl, setPdfReaderUrl] = useState("");
  const [pdfReaderTitle, setPdfReaderTitle] = useState("");

  const allItems = useMemo(() => {
    return curricula && curricula.length > 0 ? curricula : DEFAULT_SATIT_CURRICULA;
  }, [curricula]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Filter by level tab
      let matchTab = true;
      if (selectedTab === "JUNIOR") {
        matchTab =
          item.degreeLevel.includes("ตอนต้น") ||
          item.degreeLevel.includes("ม.1") ||
          item.name.includes("ตอนต้น");
      } else if (selectedTab === "SENIOR") {
        matchTab =
          item.degreeLevel.includes("ตอนปลาย") ||
          item.degreeLevel.includes("ม.4") ||
          item.name.includes("ตอนปลาย");
      }

      // Filter by search
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(q)) ||
        item.code.toLowerCase().includes(q) ||
        (item.department?.name && item.department.name.toLowerCase().includes(q));

      return matchTab && matchSearch;
    });
  }, [allItems, selectedTab, searchQuery]);

  const handleOpenPdf = (url: string, title: string) => {
    setPdfReaderUrl(url);
    setPdfReaderTitle(title);
    setPdfReaderOpen(true);
  };

  return (
    <section id="curriculum" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Styled like Satit Thammasat Course page */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            style={{
              backgroundColor: `${theme.hex}14`,
              color: theme.hex,
              borderColor: `${theme.hex}30`,
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-bold text-xs uppercase tracking-wider mb-3.5 shadow-2xs"
          >
            <BookOpen className="w-4 h-4" style={{ color: theme.hex }} />
            <span>หลักสูตรสถานศึกษา • COURSE & CURRICULUM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3.5">
            หลักสูตรโรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            จัดการเรียนรู้เพื่อพัฒนาศักยภาพผู้เรียนรอบด้าน บูรณาการพุทธปัญญากับศาสตร์สากล
            เน้นการคิดวิเคราะห์ ความคิดสร้างสรรค์ และเตรียมความพร้อมสู่อนาคต
          </p>
        </div>

        {/* Level Switcher Tabs & Search Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedTab("ALL")}
              style={selectedTab === "ALL" ? { color: theme.hex, borderColor: `${theme.hex}30` } : undefined}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedTab === "ALL"
                  ? "bg-white shadow-sm border"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ทั้งหมด ({allItems.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab("JUNIOR")}
              style={selectedTab === "JUNIOR" ? { color: theme.hex, borderColor: `${theme.hex}30` } : undefined}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedTab === "JUNIOR"
                  ? "bg-white shadow-sm border"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              มัธยมศึกษาตอนต้น (ม.1 - ม.3)
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab("SENIOR")}
              style={selectedTab === "SENIOR" ? { color: theme.hex, borderColor: `${theme.hex}30` } : undefined}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedTab === "SENIOR"
                  ? "bg-white shadow-sm border"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              มัธยมศึกษาตอนปลาย (ม.4 - ม.6)
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="ค้นหาแผนการเรียนหรือรายวิชา..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
              />
            </div>
            <Link
              href="/curriculum"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors whitespace-nowrap"
            >
              <span>สารบบหลักสูตร</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Curriculum Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredItems.map((curr) => {
              const isJunior =
                curr.degreeLevel.includes("ตอนต้น") ||
                curr.degreeLevel.includes("ม.1") ||
                curr.name.includes("ตอนต้น");

              return (
                <div
                  key={curr.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Image Banner */}
                  <div className="h-52 sm:h-60 bg-slate-100 overflow-hidden relative">
                    {curr.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={curr.imageUrl}
                        alt={curr.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white/40">
                        <BookOpen className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Badge on top image */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-xl backdrop-blur-md shadow-sm border ${
                          isJunior
                            ? "bg-amber-500/90 text-white border-amber-300/30"
                            : "bg-blue-600/90 text-white border-blue-300/30"
                        }`}
                      >
                        {curr.degreeLevel}
                      </span>
                      {curr.curriculumYear && (
                        <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-900/80 text-white backdrop-blur-md shadow-sm border border-white/20 font-mono">
                          พ.ศ. {curr.curriculumYear}
                        </span>
                      )}
                    </div>

                    {/* Learning Area Badge on bottom image */}
                    {curr.department && (
                      <div className="absolute bottom-3 left-3.5 right-3.5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-lg bg-slate-900/70 text-slate-100 backdrop-blur-md border border-white/20 shadow-xs">
                          <Network className="w-3.5 h-3.5 text-blue-400" />
                          <span className="truncate">{curr.department.name}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
                      <span>รหัสหลักสูตร: {curr.code}</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {curr.durationYears ?? 3} ปี (6 ภาคเรียน)
                      </span>
                    </div>

                    <h3 className="font-bold text-lg sm:text-xl text-slate-900 leading-snug group-hover:text-blue-700 transition-colors mb-1.5">
                      {curr.name}
                    </h3>
                    {curr.nameEn && (
                      <p className="text-xs text-slate-500 italic font-medium mb-3">
                        {curr.nameEn}
                      </p>
                    )}

                    {curr.degreeNameTh && (
                      <div className="text-xs text-blue-900 bg-blue-50/70 p-2.5 rounded-xl border border-blue-200/70 mb-3.5 flex items-center gap-2 font-medium">
                        <GraduationCap className="w-4 h-4 text-blue-700 shrink-0" />
                        <span>วุฒิการศึกษา: {curr.degreeNameTh}</span>
                      </div>
                    )}

                    {curr.description && (
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {curr.description}
                      </p>
                    )}

                    {/* Credit Breakdown Bar */}
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" style={{ color: theme.hex }} />
                          โครงสร้างหน่วยกิตตลอดหลักสูตร
                        </span>
                        <span className="text-sm font-extrabold" style={{ color: theme.hex }}>
                          {curr.totalCredits} หน่วยกิต
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 block text-[10px]">วิชาพื้นฐาน</span>
                          <span className="font-bold text-slate-800">{curr.geCredits ?? "—"} นก.</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 block text-[10px]">วิชาเพิ่มเติม</span>
                          <span className="font-bold text-slate-800">{curr.majorCredits ?? "—"} นก.</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 block text-[10px]">กิจกรรมพัฒนา</span>
                          <span className="font-bold text-slate-800">{curr.electiveCredits ?? 6} นก.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-6 sm:px-7 py-4 bg-slate-50/90 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    {curr.pdfUrl ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenPdf(curr.pdfUrl!, curr.name)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>อ่านหลักสูตรฉบับเต็ม (PDF)</span>
                        </button>
                        {(() => {
                          const { downloadUrl, isGoogleDrive } = resolvePdfUrl(curr.pdfUrl);
                          return (
                            <a
                              href={downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={!isGoogleDrive}
                              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
                              title="ดาวน์โหลดไฟล์ PDF"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>
                          );
                        })()}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">พร้อมเปิดสอนตามแผนการเรียน</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-12 px-6 bg-white rounded-3xl border border-dashed border-slate-300">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-sm mb-1">ไม่พบข้อมูลหลักสูตรที่ค้นหา</h4>
            <p className="text-xs text-slate-500 mb-4">ลองเปลี่ยนคำค้นหา หรือเลือกแท็บระดับชั้นเรียนอื่น</p>
            <button
              type="button"
              onClick={() => {
                setSelectedTab("ALL");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        )}
      </div>

      {/* PDF Reader Modal */}
      <PdfViewerModal
        open={pdfReaderOpen}
        onOpenChange={setPdfReaderOpen}
        pdfUrl={pdfReaderUrl}
        title={pdfReaderTitle}
        subtitle="หลักสูตรสถานศึกษา โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย"
      />
    </section>
  );
}
