"use client";

import React, { useState, useMemo, ChangeEvent } from "react";
import {
  FileText,
  Printer,
  Award,
  CheckCircle2,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  School,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";
import { StudentDto, CourseDto, GradeRecordDto } from "@/features/registration/types";

// ─────────────────────────────────────────────────────────────────────────────
// Types for PP6 Report
// ─────────────────────────────────────────────────────────────────────────────

export interface PP6SubjectItem {
  id: string;
  group: string; // กลุ่มสาระการเรียนรู้ (ใช้สำหรับสรุปสถิติ 8 สาระ)
  instructorName: string; // ชื่อ อาจารย์ผู้สอน
  type: "CORE" | "ELECTIVE" | "ACTIVITY"; // พื้นฐาน, เพิ่มเติม, กิจกรรมพัฒนาผู้เรียน
  courseCodeSem1: string;
  courseCodeSem2: string;
  name: string;
  creditsSem1: number;
  creditsSem2: number;
  scoreSem1: number;
  gradeSem1: string;
  scoreSem2: number;
  gradeSem2: string;
}

export interface PP6Props {
  students: StudentDto[];
  courses: CourseDto[];
  initialGrades: GradeRecordDto[];
  currentUser?: {
    id: string;
    name: string;
    email: string;
    isSuperAdmin: boolean;
    roles?: { roleCode: string }[];
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Curriculum Presets (มัธยมศึกษาตอนต้น & มัธยมศึกษาตอนปลาย)
// ─────────────────────────────────────────────────────────────────────────────

function getInitialSubjects(isUpperSecondary: boolean): PP6SubjectItem[] {
  if (isUpperSecondary) {
    // ════ มัธยมศึกษาตอนปลาย (ม.4 - ม.6) ════
    return [
      // 1. ภาษาไทย
      {
        id: "th-upper",
        group: "กลุ่มสาระการเรียนรู้ภาษาไทย",
        instructorName: "อ.กาญจนา สดใส",
        type: "CORE",
        courseCodeSem1: "ท31101",
        courseCodeSem2: "ท31102",
        name: "ภาษาไทยพื้นฐาน",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 82,
        gradeSem1: "4",
        scoreSem2: 80,
        gradeSem2: "4",
      },
      // 2. คณิตศาสตร์
      {
        id: "ma-upper-core",
        group: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
        instructorName: "อ.ชาญชัย เก่งคิด",
        type: "CORE",
        courseCodeSem1: "ค31101",
        courseCodeSem2: "ค31102",
        name: "คณิตศาสตร์พื้นฐาน",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 78,
        gradeSem1: "3.5",
        scoreSem2: 84,
        gradeSem2: "4",
      },
      {
        id: "ma-upper-elec",
        group: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
        instructorName: "อ.ชาญชัย เก่งคิด",
        type: "ELECTIVE",
        courseCodeSem1: "ค31201",
        courseCodeSem2: "ค31202",
        name: "คณิตศาสตร์เพิ่มเติม",
        creditsSem1: 1.5,
        creditsSem2: 1.5,
        scoreSem1: 75,
        gradeSem1: "3.5",
        scoreSem2: 73,
        gradeSem2: "3",
      },
      // 3. วิทยาศาสตร์และเทคโนโลยี
      {
        id: "sc-upper-core",
        group: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี",
        instructorName: "ดร.สุรศักดิ์ วิทย์กุล",
        type: "CORE",
        courseCodeSem1: "ว31101",
        courseCodeSem2: "ว31102",
        name: "วิทยาศาสตร์กายภาพและชีวภาพ",
        creditsSem1: 1.5,
        creditsSem2: 1.5,
        scoreSem1: 85,
        gradeSem1: "4",
        scoreSem2: 88,
        gradeSem2: "4",
      },
      {
        id: "sc-upper-elec",
        group: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี",
        instructorName: "อ.ธนากร เทคโน",
        type: "ELECTIVE",
        courseCodeSem1: "ว31201",
        courseCodeSem2: "ว31202",
        name: "วิทยาการคำนวณและเทคโนโลยีขั้นสูง",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 90,
        gradeSem1: "4",
        scoreSem2: 92,
        gradeSem2: "4",
      },
      // 4. สังคมศึกษาฯ
      {
        id: "so-upper-core",
        group: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
        instructorName: "พระมหาประเสริฐ ญาณวโร",
        type: "CORE",
        courseCodeSem1: "ส31101",
        courseCodeSem2: "ส31102",
        name: "สังคมศึกษา ศาสนา และวัฒนธรรม",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 76,
        gradeSem1: "3.5",
        scoreSem2: 81,
        gradeSem2: "4",
      },
      {
        id: "so-upper-hist",
        group: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
        instructorName: "อ.กิตติพงษ์ สังคมศาสตร์",
        type: "CORE",
        courseCodeSem1: "ส31103",
        courseCodeSem2: "ส31104",
        name: "ประวัติศาสตร์สากลและประวัติศาสตร์ไทย",
        creditsSem1: 0.5,
        creditsSem2: 0.5,
        scoreSem1: 85,
        gradeSem1: "4",
        scoreSem2: 82,
        gradeSem2: "4",
      },
      // 5. สุขศึกษาและพลศึกษา
      {
        id: "he-upper-core",
        group: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
        instructorName: "อ.ประพันธ์ พลศึกษา",
        type: "CORE",
        courseCodeSem1: "พ31101",
        courseCodeSem2: "พ31102",
        name: "สุขศึกษาและพลศึกษา",
        creditsSem1: 0.5,
        creditsSem2: 0.5,
        scoreSem1: 88,
        gradeSem1: "4",
        scoreSem2: 86,
        gradeSem2: "4",
      },
      // 6. ศิลปะ
      {
        id: "ar-upper-core",
        group: "กลุ่มสาระการเรียนรู้ศิลปะ",
        instructorName: "อ.อารี ศิลปิน",
        type: "CORE",
        courseCodeSem1: "ศ31101",
        courseCodeSem2: "ศ31102",
        name: "ทัศนศิลป์ ดนตรี และนาฏศิลป์",
        creditsSem1: 0.5,
        creditsSem2: 0.5,
        scoreSem1: 84,
        gradeSem1: "4",
        scoreSem2: 85,
        gradeSem2: "4",
      },
      // 7. การงานอาชีพ
      {
        id: "ca-upper-core",
        group: "กลุ่มสาระการเรียนรู้การงานอาชีพ",
        instructorName: "อ.ชูศักดิ์ การงาน",
        type: "CORE",
        courseCodeSem1: "ง31101",
        courseCodeSem2: "ง31102",
        name: "การงานอาชีพและการเป็นผู้ประกอบการ",
        creditsSem1: 0.5,
        creditsSem2: 0.5,
        scoreSem1: 80,
        gradeSem1: "4",
        scoreSem2: 78,
        gradeSem2: "3.5",
      },
      // 8. ภาษาต่างประเทศ
      {
        id: "en-upper-core",
        group: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
        instructorName: "Ms. Sarah Jenkins",
        type: "CORE",
        courseCodeSem1: "อ31101",
        courseCodeSem2: "อ31102",
        name: "ภาษาอังกฤษพื้นฐาน",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 79,
        gradeSem1: "3.5",
        scoreSem2: 83,
        gradeSem2: "4",
      },
      {
        id: "en-upper-elec",
        group: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
        instructorName: "อ.วิภาดา รักการสอน",
        type: "ELECTIVE",
        courseCodeSem1: "อ31201",
        courseCodeSem2: "อ31202",
        name: "ภาษาอังกฤษเพื่อการสื่อสารสากล",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 77,
        gradeSem1: "3.5",
        scoreSem2: 80,
        gradeSem2: "4",
      },
      // กิจกรรมพัฒนาผู้เรียน
      {
        id: "act-guidance",
        group: "กิจกรรมพัฒนาผู้เรียน",
        instructorName: "อ.นภาพร จิตวิทยา",
        type: "ACTIVITY",
        courseCodeSem1: "ก31901",
        courseCodeSem2: "ก31902",
        name: "กิจกรรมแนะแนว",
        creditsSem1: 0,
        creditsSem2: 0,
        scoreSem1: 100,
        gradeSem1: "ผ",
        scoreSem2: 100,
        gradeSem2: "ผ",
      },
      {
        id: "act-student",
        group: "กิจกรรมพัฒนาผู้เรียน",
        instructorName: "อ.ประพันธ์ พลศึกษา",
        type: "ACTIVITY",
        courseCodeSem1: "ก31903",
        courseCodeSem2: "ก31904",
        name: "กิจกรรมนักเรียน (รด. / ผู้บำเพ็ญประโยชน์ / จิตอาสา)",
        creditsSem1: 0,
        creditsSem2: 0,
        scoreSem1: 100,
        gradeSem1: "ผ",
        scoreSem2: 100,
        gradeSem2: "ผ",
      },
      {
        id: "act-club",
        group: "กิจกรรมพัฒนาผู้เรียน",
        instructorName: "อ.ธนากร เทคโน",
        type: "ACTIVITY",
        courseCodeSem1: "ก31905",
        courseCodeSem2: "ก31906",
        name: "กิจกรรมชุมนุม / ชมรมวิชาการ",
        creditsSem1: 0,
        creditsSem2: 0,
        scoreSem1: 100,
        gradeSem1: "ผ",
        scoreSem2: 100,
        gradeSem2: "ผ",
      },
      {
        id: "act-social",
        group: "กิจกรรมพัฒนาผู้เรียน",
        instructorName: "พระมหาประเสริฐ ญาณวโร",
        type: "ACTIVITY",
        courseCodeSem1: "ก31907",
        courseCodeSem2: "ก31908",
        name: "กิจกรรมเพื่อสังคมและสาธารณประโยชน์",
        creditsSem1: 0,
        creditsSem2: 0,
        scoreSem1: 100,
        gradeSem1: "ผ",
        scoreSem2: 100,
        gradeSem2: "ผ",
      },
    ];
  } else {
    // ════ มัธยมศึกษาตอนต้น (ม.1 - ม.3) ════
    return [
      // 1. ภาษาไทย
      {
        id: "th-lower",
        group: "กลุ่มสาระการเรียนรู้ภาษาไทย",
        instructorName: "อ.สมศรี มีสุข",
        type: "CORE",
        courseCodeSem1: "ท21101",
        courseCodeSem2: "ท21102",
        name: "ภาษาไทยพื้นฐาน",
        creditsSem1: 1.5,
        creditsSem2: 1.5,
        scoreSem1: 81,
        gradeSem1: "4",
        scoreSem2: 78,
        gradeSem2: "3.5",
      },
      // 2. คณิตศาสตร์
      {
        id: "ma-lower-core",
        group: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
        instructorName: "อ.วิชาญ เก่งคณิต",
        type: "CORE",
        courseCodeSem1: "ค21101",
        courseCodeSem2: "ค21102",
        name: "คณิตศาสตร์พื้นฐาน",
        creditsSem1: 1.5,
        creditsSem2: 1.5,
        scoreSem1: 76,
        gradeSem1: "3.5",
        scoreSem2: 83,
        gradeSem2: "4",
      },
      {
        id: "ma-lower-elec",
        group: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
        instructorName: "อ.วิชาญ เก่งคณิต",
        type: "ELECTIVE",
        courseCodeSem1: "ค21201",
        courseCodeSem2: "ค21202",
        name: "คณิตศาสตร์เพิ่มเติม",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 74,
        gradeSem1: "3",
        scoreSem2: 76,
        gradeSem2: "3.5",
      },
      // 3. วิทยาศาสตร์และเทคโนโลยี
      {
        id: "sc-lower-core",
        group: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี",
        instructorName: "ดร.สุรศักดิ์ วิทย์กุล",
        type: "CORE",
        courseCodeSem1: "ว21101",
        courseCodeSem2: "ว21102",
        name: "วิทยาศาสตร์และเทคโนโลยี",
        creditsSem1: 1.5,
        creditsSem2: 1.5,
        scoreSem1: 85,
        gradeSem1: "4",
        scoreSem2: 86,
        gradeSem2: "4",
      },
      {
        id: "sc-lower-elec",
        group: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี",
        instructorName: "อ.ธนากร เทคโน",
        type: "ELECTIVE",
        courseCodeSem1: "ว21201",
        courseCodeSem2: "ว21202",
        name: "การออกแบบและเทคโนโลยีคอมพิวเตอร์",
        creditsSem1: 0.5,
        creditsSem2: 0.5,
        scoreSem1: 89,
        gradeSem1: "4",
        scoreSem2: 91,
        gradeSem2: "4",
      },
      // 4. สังคมศึกษาฯ
      {
        id: "so-lower-core",
        group: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
        instructorName: "พระมหาประเสริฐ ญาณวโร",
        type: "CORE",
        courseCodeSem1: "ส21101",
        courseCodeSem2: "ส21102",
        name: "สังคมศึกษา ศาสนา และวัฒนธรรม",
        creditsSem1: 1.5,
        creditsSem2: 1.5,
        scoreSem1: 79,
        gradeSem1: "3.5",
        scoreSem2: 80,
        gradeSem2: "4",
      },
      {
        id: "so-lower-hist",
        group: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
        instructorName: "อ.กิตติพงษ์ สังคมศาสตร์",
        type: "CORE",
        courseCodeSem1: "ส21103",
        courseCodeSem2: "ส21104",
        name: "ประวัติศาสตร์",
        creditsSem1: 0.5,
        creditsSem2: 0.5,
        scoreSem1: 84,
        gradeSem1: "4",
        scoreSem2: 82,
        gradeSem2: "4",
      },
      // 5. สุขศึกษาและพลศึกษา
      {
        id: "he-lower-core",
        group: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
        instructorName: "อ.ประพันธ์ พลศึกษา",
        type: "CORE",
        courseCodeSem1: "พ21101",
        courseCodeSem2: "พ21102",
        name: "สุขศึกษาและพลศึกษา",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 88,
        gradeSem1: "4",
        scoreSem2: 85,
        gradeSem2: "4",
      },
      // 6. ศิลปะ
      {
        id: "ar-lower-core",
        group: "กลุ่มสาระการเรียนรู้ศิลปะ",
        instructorName: "อ.อารี ศิลปิน",
        type: "CORE",
        courseCodeSem1: "ศ21101",
        courseCodeSem2: "ศ21102",
        name: "ทัศนศิลป์ ดนตรี และนาฏศิลป์",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 85,
        gradeSem1: "4",
        scoreSem2: 87,
        gradeSem2: "4",
      },
      // 7. การงานอาชีพ
      {
        id: "ca-lower-core",
        group: "กลุ่มสาระการเรียนรู้การงานอาชีพ",
        instructorName: "อ.ชูศักดิ์ การงาน",
        type: "CORE",
        courseCodeSem1: "ง21101",
        courseCodeSem2: "ง21102",
        name: "การงานอาชีพ",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 82,
        gradeSem1: "4",
        scoreSem2: 80,
        gradeSem2: "4",
      },
      // 8. ภาษาต่างประเทศ
      {
        id: "en-lower-core",
        group: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
        instructorName: "Ms. Sarah Jenkins",
        type: "CORE",
        courseCodeSem1: "อ21101",
        courseCodeSem2: "อ21102",
        name: "ภาษาอังกฤษพื้นฐาน",
        creditsSem1: 1.5,
        creditsSem2: 1.5,
        scoreSem1: 75,
        gradeSem1: "3.5",
        scoreSem2: 78,
        gradeSem2: "3.5",
      },
      {
        id: "en-lower-elec",
        group: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
        instructorName: "อ.วิภาดา รักการสอน",
        type: "ELECTIVE",
        courseCodeSem1: "อ21201",
        courseCodeSem2: "อ21202",
        name: "ภาษาอังกฤษเพื่อการสื่อสาร",
        creditsSem1: 1.0,
        creditsSem2: 1.0,
        scoreSem1: 80,
        gradeSem1: "4",
        scoreSem2: 84,
        gradeSem2: "4",
      },
      // กิจกรรมพัฒนาผู้เรียน
      {
        id: "act-guidance-low",
        group: "กิจกรรมพัฒนาผู้เรียน",
        instructorName: "อ.นภาพร จิตวิทยา",
        type: "ACTIVITY",
        courseCodeSem1: "ก21901",
        courseCodeSem2: "ก21902",
        name: "กิจกรรมแนะแนว",
        creditsSem1: 0,
        creditsSem2: 0,
        scoreSem1: 100,
        gradeSem1: "ผ",
        scoreSem2: 100,
        gradeSem2: "ผ",
      },
      {
        id: "act-scout-low",
        group: "กิจกรรมพัฒนาผู้เรียน",
        instructorName: "อ.ประพันธ์ พลศึกษา",
        type: "ACTIVITY",
        courseCodeSem1: "ก21903",
        courseCodeSem2: "ก21904",
        name: "กิจกรรมนักเรียน (ลูกเสือ / เนตรนารี / ยุวกาชาด)",
        creditsSem1: 0,
        creditsSem2: 0,
        scoreSem1: 100,
        gradeSem1: "ผ",
        scoreSem2: 100,
        gradeSem2: "ผ",
      },
      {
        id: "act-club-low",
        group: "กิจกรรมพัฒนาผู้เรียน",
        instructorName: "อ.ธนากร เทคโน",
        type: "ACTIVITY",
        courseCodeSem1: "ก21905",
        courseCodeSem2: "ก21906",
        name: "กิจกรรมชุมนุม / ชมรม",
        creditsSem1: 0,
        creditsSem2: 0,
        scoreSem1: 100,
        gradeSem1: "ผ",
        scoreSem2: 100,
        gradeSem2: "ผ",
      },
      {
        id: "act-social-low",
        group: "กิจกรรมพัฒนาผู้เรียน",
        instructorName: "พระมหาประเสริฐ ญาณวโร",
        type: "ACTIVITY",
        courseCodeSem1: "ก21907",
        courseCodeSem2: "ก21908",
        name: "กิจกรรมเพื่อสังคมและสาธารณประโยชน์",
        creditsSem1: 0,
        creditsSem2: 0,
        scoreSem1: 100,
        gradeSem1: "ผ",
        scoreSem2: 100,
        gradeSem2: "ผ",
      },
    ];
  }
}

function gradeToPoint(grade: string): number {
  const num = parseFloat(grade);
  return isNaN(num) ? 0 : num;
}

// ─────────────────────────────────────────────────────────────────────────────
// PP6 Main Component (Read-Only Official Report)
// ─────────────────────────────────────────────────────────────────────────────

export function PP6ReportClient({ students, courses, initialGrades, currentUser }: PP6Props) {
  // Semester selector: "ALL" = รวม 2 ภาคเรียน (ทั้งปีการศึกษา), "1" = ภาคเรียนที่ 1, "2" = ภาคเรียนที่ 2
  const [selectedSemester, setSelectedSemester] = useState<"ALL" | "1" | "2">("ALL");
  const [selectedClassRoom, setSelectedClassRoom] = useState<string>("ALL");
  const [selectedStudentId, setSelectedStudentId] = useState<string>(() => {
    if (currentUser?.roles?.some((r) => r.roleCode === "STUDENT")) {
      const matched = students.find(
        (s) => s.fullName.includes(currentUser.name) || currentUser.name.includes(s.firstName),
      );
      if (matched) return matched.id;
    }
    return students[0]?.id || "";
  });
  const [academicYear, setAcademicYear] = useState<string>("2569");
  const [viewMode, setViewMode] = useState<"official" | "analytics">("official");

  // Determine current student
  const currentStudent = useMemo(() => {
    return students.find((s) => s.id === selectedStudentId) || students[0] || null;
  }, [students, selectedStudentId]);

  // Check if current student is Upper Secondary (ม.ปลาย: ม.4, ม.5, ม.6)
  const isUpper = useMemo(() => {
    if (!currentStudent) return false;
    const room = currentStudent.classRoom.toLowerCase();
    return (
      room.startsWith("ม.4") ||
      room.startsWith("ม.5") ||
      room.startsWith("ม.6") ||
      room.startsWith("4") ||
      room.startsWith("5") ||
      room.startsWith("6")
    );
  }, [currentStudent]);

  // Active subjects for current student (Read-Only: loaded from actual grades and standard curriculum)
  const activeSubjects = useMemo(() => {
    const initial = getInitialSubjects(isUpper);

    return initial.map((sub) => {
      // Find matching course for instructor name if configured in database
      const courseSem1 = courses.find((c) => c.courseCode === sub.courseCodeSem1);
      const courseSem2 = courses.find((c) => c.courseCode === sub.courseCodeSem2);
      const resolvedInstructor =
        courseSem1?.instructorName || courseSem2?.instructorName || sub.instructorName;

      // Merge any actual grades from initialGrades if they exist for this student
      if (currentStudent && initialGrades.length > 0) {
        const studentGrades = initialGrades.filter((g) => g.studentId === currentStudent.id);
        const matchSem1 = studentGrades.find(
          (g) => g.courseCode === sub.courseCodeSem1 && g.semester === 1,
        );
        const matchSem2 = studentGrades.find(
          (g) => g.courseCode === sub.courseCodeSem2 && g.semester === 2,
        );
        return {
          ...sub,
          instructorName: resolvedInstructor,
          scoreSem1: matchSem1 ? matchSem1.totalScore : sub.scoreSem1,
          gradeSem1: matchSem1 ? matchSem1.grade : sub.gradeSem1,
          scoreSem2: matchSem2 ? matchSem2.totalScore : sub.scoreSem2,
          gradeSem2: matchSem2 ? matchSem2.grade : sub.gradeSem2,
        };
      }

      return {
        ...sub,
        instructorName: resolvedInstructor,
      };
    });
  }, [isUpper, currentStudent, initialGrades, courses]);

  // ─────────────────────────────────────────────────────────────────────────
  // GPA & Statistics Calculations
  // ─────────────────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    let enrolledCreditsSem1 = 0;
    let earnedCreditsSem1 = 0;
    let totalPointsSem1 = 0;

    let enrolledCreditsSem2 = 0;
    let earnedCreditsSem2 = 0;
    let totalPointsSem2 = 0;

    let activityPassSem1 = true;
    let activityPassSem2 = true;

    // Group-based calculations
    const groupStats: Record<
      string,
      {
        totalCredits: number;
        totalPoints: number;
        count: number;
      }
    > = {};

    for (const sub of activeSubjects) {
      if (sub.type === "ACTIVITY") {
        if (sub.gradeSem1 !== "ผ") activityPassSem1 = false;
        if (sub.gradeSem2 !== "ผ") activityPassSem2 = false;
        continue;
      }

      const p1 = gradeToPoint(sub.gradeSem1);
      const p2 = gradeToPoint(sub.gradeSem2);

      enrolledCreditsSem1 += sub.creditsSem1;
      enrolledCreditsSem2 += sub.creditsSem2;

      if (p1 > 0) earnedCreditsSem1 += sub.creditsSem1;
      if (p2 > 0) earnedCreditsSem2 += sub.creditsSem2;

      totalPointsSem1 += p1 * sub.creditsSem1;
      totalPointsSem2 += p2 * sub.creditsSem2;

      // Group totals based on selected semester
      let subCred = sub.creditsSem1 + sub.creditsSem2;
      let subPoints = p1 * sub.creditsSem1 + p2 * sub.creditsSem2;
      if (selectedSemester === "1") {
        subCred = sub.creditsSem1;
        subPoints = p1 * sub.creditsSem1;
      } else if (selectedSemester === "2") {
        subCred = sub.creditsSem2;
        subPoints = p2 * sub.creditsSem2;
      }

      if (!groupStats[sub.group]) {
        groupStats[sub.group] = { totalCredits: 0, totalPoints: 0, count: 0 };
      }
      groupStats[sub.group].totalCredits += subCred;
      groupStats[sub.group].totalPoints += subPoints;
      groupStats[sub.group].count += 1;
    }

    const gpaSem1 = enrolledCreditsSem1 > 0 ? totalPointsSem1 / enrolledCreditsSem1 : 0;
    const gpaSem2 = enrolledCreditsSem2 > 0 ? totalPointsSem2 / enrolledCreditsSem2 : 0;

    const totalEnrolled = enrolledCreditsSem1 + enrolledCreditsSem2;
    const totalEarned = earnedCreditsSem1 + earnedCreditsSem2;
    const totalAnnualPoints = totalPointsSem1 + totalPointsSem2;
    const annualGpa = totalEnrolled > 0 ? totalAnnualPoints / totalEnrolled : 0;

    // Group GPAs
    const groupGpas = Object.entries(groupStats).map(([group, val]) => ({
      group,
      gpa: val.totalCredits > 0 ? val.totalPoints / val.totalCredits : 0,
      credits: val.totalCredits,
    }));

    return {
      enrolledCreditsSem1,
      earnedCreditsSem1,
      totalPointsSem1,
      gpaSem1,
      enrolledCreditsSem2,
      earnedCreditsSem2,
      totalPointsSem2,
      gpaSem2,
      totalEnrolled,
      totalEarned,
      totalAnnualPoints,
      annualGpa,
      activityPassSem1,
      activityPassSem2,
      isPromoted: annualGpa >= 1.0 && activityPassSem1 && activityPassSem2,
      groupGpas,
    };
  }, [activeSubjects, selectedSemester]);

  // Filtered student list for dropdown & navigation
  const availableStudents = useMemo(() => {
    return students.filter((s) => {
      if (selectedClassRoom !== "ALL" && s.classRoom !== selectedClassRoom) return false;
      return true;
    });
  }, [students, selectedClassRoom]);

  // Unique classrooms in database
  const classRooms = useMemo(() => {
    const set = new Set(students.map((s) => s.classRoom));
    return Array.from(set).sort();
  }, [students]);

  // Previous and Next Student handlers
  const currentIdx = availableStudents.findIndex((s) => s.id === currentStudent?.id);
  const handlePrevStudent = () => {
    if (currentIdx > 0) {
      setSelectedStudentId(availableStudents[currentIdx - 1].id);
    }
  };
  const handleNextStudent = () => {
    if (currentIdx >= 0 && currentIdx < availableStudents.length - 1) {
      setSelectedStudentId(availableStudents[currentIdx + 1].id);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Export to CSV with UTF-8 BOM
  // ─────────────────────────────────────────────────────────────────────────

  const handleExportPP6CSV = () => {
    if (!currentStudent) {
      toast.error("ไม่พบข้อมูลนักเรียนสำหรับส่งออก");
      return;
    }

    const semSuffix = selectedSemester === "ALL" ? "Annual" : `Sem${selectedSemester}`;
    const filename = `PP6_${currentStudent.studentCode}_${currentStudent.firstName}_${academicYear}_${semSuffix}.csv`;
    let csv = "\uFEFF"; // UTF-8 BOM for Excel / Google Sheets

    // Document Header
    csv += `"แบบรายงานผลการพัฒนาคุณภาพผู้เรียนรายบุคคล (ปพ. 6)"\n`;
    csv += `"โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (SATIT MCU)"\n`;
    csv += `"ตามหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน พุทธศักราช ๒๕๕๑ (ฉบับปรับปรุง ๒๕๖๐)"\n`;
    csv += `"ระดับการศึกษา: ${isUpper ? "มัธยมศึกษาตอนปลาย" : "มัธยมศึกษาตอนต้น"}","${selectedSemester === "ALL" ? `ปีการศึกษา: ${academicYear} (รวม 2 ภาคเรียน)` : `ภาคเรียนที่: ${selectedSemester} ปีการศึกษา: ${academicYear}`}"\n`;
    csv += `"ชื่อ - สกุล: ${currentStudent.fullName}","รหัสประจำตัว: ${currentStudent.studentCode}","เลขที่: ${currentStudent.seatNo}","ชั้น/ห้อง: ${currentStudent.classRoom}"\n\n`;

    if (selectedSemester === "1" || selectedSemester === "2") {
      const sem = selectedSemester === "1" ? 1 : 2;
      csv += `"รหัสวิชา","รายวิชา","อาจารย์ผู้สอน","ประเภทวิชา","หน่วยกิต","คะแนนเต็ม","คะแนนที่ได้","ระดับเกรด","ผลการตัดสิน"\n`;
      for (const sub of activeSubjects) {
        const typeThai = sub.type === "CORE" ? "พื้นฐาน" : sub.type === "ELECTIVE" ? "เพิ่มเติม" : "กิจกรรม";
        const code = sem === 1 ? sub.courseCodeSem1 : sub.courseCodeSem2;
        const cred = sem === 1 ? sub.creditsSem1 : sub.creditsSem2;
        const score = sem === 1 ? sub.scoreSem1 : sub.scoreSem2;
        const grade = sem === 1 ? sub.gradeSem1 : sub.gradeSem2;
        const result = sub.type === "ACTIVITY" ? (grade === "ผ" ? "ผ่าน" : "ไม่ผ่าน") : (gradeToPoint(grade) >= 1 ? "ผ่าน" : "ไม่ผ่าน");
        csv += `"${code}","${sub.name}","${sub.instructorName}","${typeThai}","${sub.type === "ACTIVITY" ? "-" : cred}","${sub.type === "ACTIVITY" ? "-" : 100}","${sub.type === "ACTIVITY" ? "-" : score}","${grade}","${result}"\n`;
      }
      csv += `\n"--- สรุปผลการประเมิน ภาคเรียนที่ ${sem} ปีการศึกษา ${academicYear} ---"\n`;
      csv += `"รายการสรุป","ผลการประเมิน"\n`;
      csv += `"จำนวนหน่วยกิตที่ลงทะเบียน","${(sem === 1 ? stats.enrolledCreditsSem1 : stats.enrolledCreditsSem2).toFixed(1)}"\n`;
      csv += `"จำนวนหน่วยกิตที่ได้","${(sem === 1 ? stats.earnedCreditsSem1 : stats.earnedCreditsSem2).toFixed(1)}"\n`;
      csv += `"แต้มระดับคะแนนรวม","${(sem === 1 ? stats.totalPointsSem1 : stats.totalPointsSem2).toFixed(2)}"\n`;
      csv += `"ผลการเรียนเฉลี่ย (GPA)","${(sem === 1 ? stats.gpaSem1 : stats.gpaSem2).toFixed(2)}"\n`;
      csv += `"ผลการประเมินกิจกรรมพัฒนาผู้เรียน","${(sem === 1 ? stats.activityPassSem1 : stats.activityPassSem2) ? "ผ่าน (ผ)" : "ไม่ผ่าน (มผ)"}"\n`;
      csv += `"การประเมินคุณลักษณะอันพึงประสงค์","ดีเยี่ยม (3)"\n`;
      csv += `"การประเมินการอ่าน คิดวิเคราะห์ และเขียน","ดีเยี่ยม (3)"\n`;
    } else {
      // ALL: 2 semesters
      csv += `"รายวิชา","อาจารย์ผู้สอน","ประเภทวิชา","รหัสวิชา (เทอม 1)","นก. (เทอม 1)","คะแนน (เทอม 1)","เกรด (เทอม 1)","รหัสวิชา (เทอม 2)","นก. (เทอม 2)","คะแนน (เทอม 2)","เกรด (เทอม 2)","เกรดเฉลี่ยรายวิชา","หน่วยกิตสะสม"\n`;
      for (const sub of activeSubjects) {
        const typeThai = sub.type === "CORE" ? "พื้นฐาน" : sub.type === "ELECTIVE" ? "เพิ่มเติม" : "กิจกรรม";
        let annualSubjectAvg = "-";
        let earnedCreditsTotal = "-";
        if (sub.type !== "ACTIVITY") {
          const p1 = gradeToPoint(sub.gradeSem1);
          const p2 = gradeToPoint(sub.gradeSem2);
          const totalCred = sub.creditsSem1 + sub.creditsSem2;
          const avg = totalCred > 0 ? (p1 * sub.creditsSem1 + p2 * sub.creditsSem2) / totalCred : 0;
          annualSubjectAvg = avg.toFixed(2);
          const earned = (p1 > 0 ? sub.creditsSem1 : 0) + (p2 > 0 ? sub.creditsSem2 : 0);
          earnedCreditsTotal = earned.toFixed(1);
        } else {
          annualSubjectAvg = sub.gradeSem1 === "ผ" && sub.gradeSem2 === "ผ" ? "ผ" : "มผ";
        }
        csv += `"${sub.name}","${sub.instructorName}","${typeThai}","${sub.courseCodeSem1}","${sub.creditsSem1}","${sub.scoreSem1}","${sub.gradeSem1}","${sub.courseCodeSem2}","${sub.creditsSem2}","${sub.scoreSem2}","${sub.gradeSem2}","${annualSubjectAvg}","${earnedCreditsTotal}"\n`;
      }
      csv += `\n"--- สรุปผลการประเมินและการตัดสินผลการเรียน ประจำปีการศึกษา ${academicYear} ---"\n`;
      csv += `"รายการสรุป","ภาคเรียนที่ 1","ภาคเรียนที่ 2","สรุปตลอดปีการศึกษา"\n`;
      csv += `"จำนวนหน่วยกิตที่ลงทะเบียน","${stats.enrolledCreditsSem1.toFixed(1)}","${stats.enrolledCreditsSem2.toFixed(1)}","${stats.totalEnrolled.toFixed(1)}"\n`;
      csv += `"จำนวนหน่วยกิตที่ได้","${stats.earnedCreditsSem1.toFixed(1)}","${stats.earnedCreditsSem2.toFixed(1)}","${stats.totalEarned.toFixed(1)}"\n`;
      csv += `"แต้มระดับคะแนนรวม","${stats.totalPointsSem1.toFixed(2)}","${stats.totalPointsSem2.toFixed(2)}","${stats.totalAnnualPoints.toFixed(2)}"\n`;
      csv += `"ผลการเรียนเฉลี่ย (GPA)","${stats.gpaSem1.toFixed(2)}","${stats.gpaSem2.toFixed(2)}","${stats.annualGpa.toFixed(2)}"\n`;
      csv += `"ผลการประเมินกิจกรรมพัฒนาผู้เรียน","${stats.activityPassSem1 ? "ผ่าน (ผ)" : "ไม่ผ่าน (มผ)"}","${stats.activityPassSem2 ? "ผ่าน (ผ)" : "ไม่ผ่าน (มผ)"}","${stats.activityPassSem1 && stats.activityPassSem2 ? "ผ่าน (ผ)" : "ไม่ผ่าน (มผ)"}"\n`;
      csv += `"การประเมินคุณลักษณะอันพึงประสงค์","ดีเยี่ยม (3)","ดีเยี่ยม (3)","ดีเยี่ยม (3)"\n`;
      csv += `"การประเมินการอ่าน คิดวิเคราะห์ และเขียน","ดีเยี่ยม (3)","ดีเยี่ยม (3)","ดีเยี่ยม (3)"\n`;
      csv += `"ผลการตัดสินประจำปี","${stats.isPromoted ? "อนุมัติเลื่อนชั้น" : "ซ่อมเสริม"}","${stats.isPromoted ? "อนุมัติเลื่อนชั้น" : "ซ่อมเสริม"}","${stats.isPromoted ? "อนุมัติเลื่อนชั้น" : "ซ่อมเสริม"}"\n`;
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`ส่งออกไฟล์แบบ ปพ.6 (${filename}) สำเร็จ เปิดใน Excel / Sheets ได้ทันที`);
  };

  const handlePrint = () => {
    setViewMode("official");
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* ═══ Top Filter Bar & Student Switcher ═══ */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 rounded-xl text-blue-700">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                แบบ ปพ. 6 (รายงานผลการพัฒนาคุณภาพผู้เรียนรายบุคคล)
              </h2>
              <p className="text-xs text-slate-500">
                {selectedSemester === "ALL"
                  ? "สรุปผลการเรียนรู้และเกรดเฉลี่ยรายวิชา 2 ภาคเรียน สรุปรายปีการศึกษา และเกรดเฉลี่ยสะสม (GPA) ตามเกณฑ์ สพฐ."
                  : `สรุปผลการเรียนรู้และผลการประเมินรายวิชา ประจำภาคเรียนที่ ${selectedSemester} ปีการศึกษา ${academicYear}`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportPP6CSV}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              ส่งออกเป็นไฟล์ .CSV (Excel/Sheets)
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              พิมพ์แบบ ปพ.6
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Semester Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">ภาคเรียน:</label>
            <select
              value={selectedSemester}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setSelectedSemester(e.target.value as any);
              }}
              className="w-full text-xs border border-blue-200 rounded-lg p-2 bg-blue-50/40 font-bold text-blue-900 focus:outline-hidden focus:border-blue-500"
            >
              <option value="ALL">รวม 2 ภาคเรียน (ทั้งปีการศึกษา)</option>
              <option value="1">ภาคเรียนที่ 1</option>
              <option value="2">ภาคเรียนที่ 2</option>
            </select>
          </div>

          {/* ClassRoom Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">ระดับชั้น/ห้อง:</label>
            <select
              value={selectedClassRoom}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedClassRoom(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white font-medium"
            >
              <option value="ALL">ทุกห้องเรียน</option>
              {classRooms.map((cr) => (
                <option key={cr} value={cr}>
                  ห้อง {cr}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">ปีการศึกษา:</label>
            <select
              value={academicYear}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setAcademicYear(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white font-medium"
            >
              <option value="2570">2570</option>
              <option value="2569">2569</option>
              <option value="2568">2568</option>
            </select>
          </div>

          {/* Select Student */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              เลือกนักเรียน ({availableStudents.length} คน):
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevStudent}
                disabled={currentIdx <= 0}
                className="p-2 border border-slate-200 rounded-lg text-slate-600 disabled:opacity-30 hover:bg-slate-50"
                title="คนก่อนหน้า"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <select
                value={currentStudent?.id || ""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStudentId(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white font-semibold text-slate-800"
              >
                {availableStudents.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.classRoom} | เลขที่ {s.seatNo} - {s.fullName} ({s.studentCode})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleNextStudent}
                disabled={currentIdx >= availableStudents.length - 1}
                className="p-2 border border-slate-200 rounded-lg text-slate-600 disabled:opacity-30 hover:bg-slate-50"
                title="คนถัดไป"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode("official")}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === "official" ? "bg-white text-blue-800 shadow-2xs font-bold" : "text-slate-600"
              }`}
            >
              📜 แบบฟอร์ม ปพ.6 สพฐ.
            </button>
            <button
              type="button"
              onClick={() => setViewMode("analytics")}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === "analytics" ? "bg-white text-blue-800 shadow-2xs font-bold" : "text-slate-600"
              }`}
            >
              📊 สรุป 8 สาระ & เกรดเฉลี่ย
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Official Por Phor 6 Document Preview Card ═══ */}
      <div
        id="pp6-official-sheet"
        className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6 print:shadow-none print:border-none print:p-0 print:space-y-2.5 print:m-0 print:w-full"
      >
        {/* Document Header (Thai Official Style) */}
        <div className="text-center space-y-2 border-b-2 border-slate-800 pb-5 print:pb-1.5 print:space-y-0.5 print:border-b-2 print:border-slate-900">
          <div className="flex items-center justify-center gap-2 mb-1 print:mb-0.5">
            <GraduationCap className="w-8 h-8 text-blue-900 print:w-5 print:h-5" />
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight print:text-[15px] print:leading-tight">
              โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
            </span>
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-800 print:text-[12px] print:leading-tight">
            แบบรายงานผลการพัฒนาคุณภาพผู้เรียนรายบุคคล (แบบ ปพ. 6)
          </div>
          <div className="text-xs sm:text-sm text-slate-600 print:text-[9.5px] print:leading-tight">
            ตามหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน พุทธศักราช ๒๕๕๑ (ฉบับปรับปรุง ๒๕๖๐)
          </div>
          <div className="inline-block px-4 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 mt-1 print:mt-0.5 print:bg-slate-50 print:border-slate-300 print:py-0.5 print:px-2.5 print:text-[9px]">
            ระดับ{isUpper ? "มัธยมศึกษาตอนปลาย (ม.4 - ม.6)" : "มัธยมศึกษาตอนต้น (ม.1 - ม.3)"}{" "}
            {selectedSemester === "ALL"
              ? `ประจำปีการศึกษา ${academicYear} (รวม 2 ภาคเรียน)`
              : `ประจำภาคเรียนที่ ${selectedSemester === "1" ? "๑" : "๒"} ปีการศึกษา ${academicYear}`}
          </div>
        </div>

        {/* Student Identification Banner */}
        {currentStudent ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 print:grid-cols-4 print:p-1.5 print:gap-1.5 print:bg-slate-50/50 print:border-slate-300 print:text-[9px]">
            <div>
              <span className="text-slate-500 block text-[11px] print:text-[8px]">ชื่อ - นามสกุล:</span>
              <span className="font-bold text-sm text-slate-900 print:text-[10px]">{currentStudent.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px] print:text-[8px]">รหัสประจำตัวนักเรียน:</span>
              <span className="font-mono font-bold text-sm text-blue-700 print:text-slate-900 print:text-[10px]">{currentStudent.studentCode}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px] print:text-[8px]">ระดับชั้น / ห้อง:</span>
              <span className="font-bold text-sm text-slate-900 print:text-[10px]">
                {currentStudent.classRoom} (เลขที่ {currentStudent.seatNo})
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px] print:text-[8px]">สถานะการศึกษา:</span>
              <span className="font-bold text-sm text-emerald-700 print:text-slate-900 print:text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 print:w-3 print:h-3" /> ปกติ (Active)
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-xs text-slate-400">ไม่พบข้อมูลนักเรียน</div>
        )}

        {/* ═══ Official Table (Always rendered for print, toggled for screen) ═══ */}
        <div className={viewMode === "official" ? "space-y-4 print:space-y-0" : "hidden print:block space-y-4 print:space-y-0"}>
          <div className="border border-slate-300 rounded-xl overflow-x-auto shadow-2xs print:border-slate-300 print:rounded-lg print:shadow-none">
            {selectedSemester === "ALL" ? (
              /* ─── Mode A: รวม 2 ภาคเรียน (ทั้งปีการศึกษา) ─── */
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  {/* Top Header Grouping: Column 1 = รายวิชา, Column 2 = อาจารย์ผู้สอน */}
                  <tr className="bg-slate-800 text-white font-bold text-center border-b border-slate-700 print:bg-slate-900 print:border-slate-800">
                    <th rowSpan={2} className="py-2.5 px-3 border-r border-slate-700 text-left print:py-1 print:px-1.5 print:text-[9px]">
                      รายวิชา
                    </th>
                    <th rowSpan={2} className="py-2.5 px-3 w-44 text-left border-r border-slate-700 print:py-1 print:px-1.5 print:w-32 print:text-[9px]">
                      อาจารย์ผู้สอน
                    </th>
                    <th colSpan={3} className="py-1 px-2 border-r border-slate-700 bg-blue-900/60 print:bg-slate-800 print:py-0.5 print:text-[8.5px]">
                      ภาคเรียนที่ 1
                    </th>
                    <th colSpan={3} className="py-1 px-2 border-r border-slate-700 bg-indigo-900/60 print:bg-slate-800 print:py-0.5 print:text-[8.5px]">
                      ภาคเรียนที่ 2
                    </th>
                    <th colSpan={2} className="py-1 px-2 bg-slate-900 print:py-0.5 print:text-[8.5px]">
                      สรุปผลการเรียนรายปี
                    </th>
                  </tr>
                  {/* Sub Header */}
                  <tr className="bg-slate-100 text-slate-700 font-bold text-center border-b border-slate-300 text-[11px] print:bg-slate-100 print:text-[8px]">
                    <th className="py-1.5 px-2 w-14 border-r border-slate-200 print:py-0.5 print:px-1 print:w-9">นก.</th>
                    <th className="py-1.5 px-2 w-16 border-r border-slate-200 print:py-0.5 print:px-1 print:w-11">คะแนน</th>
                    <th className="py-1.5 px-2 w-14 border-r border-slate-300 print:py-0.5 print:px-1 print:w-10">เกรด</th>
                    <th className="py-1.5 px-2 w-14 border-r border-slate-200 print:py-0.5 print:px-1 print:w-9">นก.</th>
                    <th className="py-1.5 px-2 w-16 border-r border-slate-200 print:py-0.5 print:px-1 print:w-11">คะแนน</th>
                    <th className="py-1.5 px-2 w-14 border-r border-slate-300 print:py-0.5 print:px-1 print:w-10">เกรด</th>
                    <th className="py-1.5 px-2 w-20 border-r border-slate-200 print:py-0.5 print:px-1 print:w-12">เกรดเฉลี่ย</th>
                    <th className="py-1.5 px-2 w-16 print:py-0.5 print:px-1 print:w-11">นก.ได้</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 print:divide-slate-300">
                  {activeSubjects.map((sub, index) => {
                    const isActivity = sub.type === "ACTIVITY";
                    const p1 = gradeToPoint(sub.gradeSem1);
                    const p2 = gradeToPoint(sub.gradeSem2);
                    const totalCred = sub.creditsSem1 + sub.creditsSem2;
                    const annualAvg =
                      !isActivity && totalCred > 0
                        ? ((p1 * sub.creditsSem1 + p2 * sub.creditsSem2) / totalCred).toFixed(2)
                        : isActivity
                        ? sub.gradeSem1 === "ผ" && sub.gradeSem2 === "ผ"
                          ? "ผ"
                          : "มผ"
                        : "-";
                    const earnedCred =
                      !isActivity
                        ? ((p1 > 0 ? sub.creditsSem1 : 0) + (p2 > 0 ? sub.creditsSem2 : 0)).toFixed(1)
                        : "-";

                    return (
                      <tr
                        key={sub.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isActivity ? "bg-amber-50/30" : index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                        } print:bg-white`}
                      >
                        {/* 1. รายวิชา (Subject Code & Name) */}
                        <td className="py-2.5 px-3 border-r border-slate-200 print:py-0.5 print:px-1.5">
                          <div className="font-bold text-slate-900 print:text-[8.5px] print:leading-tight">{sub.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5 print:text-[7.5px] print:mt-0">
                            <span>{sub.courseCodeSem1} / {sub.courseCodeSem2}</span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-600 print:text-[7px] print:px-1">
                              {sub.type === "CORE" ? "พื้นฐาน" : sub.type === "ELECTIVE" ? "เพิ่มเติม" : "กิจกรรม"}
                            </span>
                          </div>
                        </td>

                        {/* 2. อาจารย์ผู้สอน (Instructor Name) */}
                        <td className="py-2.5 px-3 font-semibold text-slate-700 border-r border-slate-200 text-xs print:py-0.5 print:px-1.5 print:text-[8px]">
                          {sub.instructorName}
                        </td>

                        {/* Sem 1 Credits */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono font-medium print:py-0.5 print:px-1 print:text-[8.5px]">
                          {isActivity ? "-" : sub.creditsSem1.toFixed(1)}
                        </td>

                        {/* Sem 1 Score */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono font-medium text-slate-700 print:py-0.5 print:px-1 print:text-[8.5px]">
                          {isActivity ? "-" : sub.scoreSem1}
                        </td>

                        {/* Sem 1 Grade */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-300 print:py-0.5 print:px-1 print:text-[8.5px]">
                          {isActivity ? (
                            <span className="font-bold text-xs text-emerald-700 print:text-black">
                              {sub.gradeSem1}
                            </span>
                          ) : (
                            <span
                              className={`font-black text-xs font-mono ${
                                sub.gradeSem1 === "4"
                                  ? "text-emerald-700"
                                  : sub.gradeSem1 === "0"
                                  ? "text-rose-600"
                                  : "text-blue-800"
                              } print:text-black`}
                            >
                              {sub.gradeSem1}
                            </span>
                          )}
                        </td>

                        {/* Sem 2 Credits */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono font-medium print:py-0.5 print:px-1 print:text-[8.5px]">
                          {isActivity ? "-" : sub.creditsSem2.toFixed(1)}
                        </td>

                        {/* Sem 2 Score */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono font-medium text-slate-700 print:py-0.5 print:px-1 print:text-[8.5px]">
                          {isActivity ? "-" : sub.scoreSem2}
                        </td>

                        {/* Sem 2 Grade */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-300 print:py-0.5 print:px-1 print:text-[8.5px]">
                          {isActivity ? (
                            <span className="font-bold text-xs text-emerald-700 print:text-black">
                              {sub.gradeSem2}
                            </span>
                          ) : (
                            <span
                              className={`font-black text-xs font-mono ${
                                sub.gradeSem2 === "4"
                                  ? "text-emerald-700"
                                  : sub.gradeSem2 === "0"
                                  ? "text-rose-600"
                                  : "text-blue-800"
                              } print:text-black`}
                            >
                              {sub.gradeSem2}
                            </span>
                          )}
                        </td>

                        {/* Annual Course GPA */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono font-black text-blue-900 bg-blue-50/20 print:py-0.5 print:px-1 print:text-[8.5px] print:text-black print:bg-transparent">
                          {annualAvg}
                        </td>

                        {/* Annual Credits Earned */}
                        <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-700 bg-slate-50/20 print:py-0.5 print:px-1 print:text-[8.5px] print:text-black print:bg-transparent">
                          {earnedCred}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                {/* Table Footer with Summary Breakdown */}
                <tfoot className="border-t-2 border-slate-700 bg-slate-100 font-bold text-slate-900 text-[11px] print:border-slate-800 print:bg-slate-100/70 print:text-[8.5px]">
                  <tr>
                    <td colSpan={2} className="py-2.5 px-3 text-right border-r border-slate-300 print:py-1 print:px-2">
                      รวมหน่วยกิต / ผลการเรียนเฉลี่ย (GPA):
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono border-r border-slate-200 print:py-1 print:px-1">
                      {stats.enrolledCreditsSem1.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono text-slate-500 print:py-1 print:px-1">-</td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-300 font-mono text-blue-800 font-black print:py-1 print:px-1 print:text-black">
                      {stats.gpaSem1.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono border-r border-slate-200 print:py-1 print:px-1">
                      {stats.enrolledCreditsSem2.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono text-slate-500 print:py-1 print:px-1">-</td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-300 font-mono text-indigo-800 font-black print:py-1 print:px-1 print:text-black">
                      {stats.gpaSem2.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-black text-emerald-800 bg-emerald-50 border-r border-slate-300 text-sm print:py-1 print:px-1 print:text-[9.5px] print:text-black print:bg-transparent">
                      {stats.annualGpa.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-900 bg-slate-200 print:py-1 print:px-1 print:bg-transparent">
                      {stats.totalEarned.toFixed(1)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              /* ─── Mode B: รายงานทีละ 1 ภาคเรียน (ภาคเรียนที่ 1 หรือ ภาคเรียนที่ 2) ─── */
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white font-bold text-center border-b border-slate-700 print:bg-slate-900 print:border-slate-800">
                    <th className="py-2.5 px-3 border-r border-slate-700 text-left print:py-1 print:px-1.5 print:text-[9px]">
                      รายวิชา
                    </th>
                    <th className="py-2.5 px-3 w-48 text-left border-r border-slate-700 print:py-1 print:px-1.5 print:w-36 print:text-[9px]">
                      อาจารย์ผู้สอน
                    </th>
                    <th className="py-2.5 px-2 w-16 border-r border-slate-700 bg-blue-900/60 print:bg-slate-800 print:py-1 print:px-1 print:w-12 print:text-[8.5px]">
                      หน่วยกิต
                    </th>
                    <th className="py-2.5 px-2 w-20 border-r border-slate-700 bg-blue-900/60 print:bg-slate-800 print:py-1 print:px-1 print:w-14 print:text-[8.5px]">
                      คะแนนเต็ม
                    </th>
                    <th className="py-2.5 px-2 w-20 border-r border-slate-700 bg-blue-900/60 print:bg-slate-800 print:py-1 print:px-1 print:w-14 print:text-[8.5px]">
                      คะแนนที่ได้
                    </th>
                    <th className="py-2.5 px-2 w-20 border-r border-slate-700 bg-blue-900/60 print:bg-slate-800 print:py-1 print:px-1 print:w-14 print:text-[8.5px]">
                      ระดับเกรด
                    </th>
                    <th className="py-2.5 px-2 w-28 bg-slate-900 print:py-1 print:px-1 print:w-20 print:text-[8.5px]">
                      ผลการตัดสิน
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 print:divide-slate-300">
                  {activeSubjects.map((sub, index) => {
                    const isActivity = sub.type === "ACTIVITY";
                    const isSem1 = selectedSemester === "1";
                    const code = isSem1 ? sub.courseCodeSem1 : sub.courseCodeSem2;
                    const credits = isSem1 ? sub.creditsSem1 : sub.creditsSem2;
                    const score = isSem1 ? sub.scoreSem1 : sub.scoreSem2;
                    const grade = isSem1 ? sub.gradeSem1 : sub.gradeSem2;
                    const point = gradeToPoint(grade);
                    const isPass = isActivity ? grade === "ผ" : point >= 1.0;

                    return (
                      <tr
                        key={sub.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isActivity ? "bg-amber-50/30" : index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                        } print:bg-white`}
                      >
                        {/* 1. รายวิชา */}
                        <td className="py-2.5 px-3 border-r border-slate-200 print:py-0.5 print:px-1.5">
                          <div className="font-bold text-slate-900 print:text-[8.5px] print:leading-tight">{sub.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5 print:text-[7.5px] print:mt-0">
                            <span className="font-bold text-blue-700 print:text-black">{code}</span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-600 print:text-[7px] print:px-1">
                              {sub.type === "CORE" ? "พื้นฐาน" : sub.type === "ELECTIVE" ? "เพิ่มเติม" : "กิจกรรม"}
                            </span>
                          </div>
                        </td>

                        {/* 2. อาจารย์ผู้สอน */}
                        <td className="py-2.5 px-3 font-semibold text-slate-700 border-r border-slate-200 text-xs print:py-0.5 print:px-1.5 print:text-[8px]">
                          {sub.instructorName}
                        </td>

                        {/* 3. หน่วยกิต */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono font-medium print:py-0.5 print:px-1 print:text-[8.5px]">
                          {isActivity ? "-" : credits.toFixed(1)}
                        </td>

                        {/* 4. คะแนนเต็ม */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono text-slate-500 print:py-0.5 print:px-1 print:text-[8.5px]">
                          {isActivity ? "-" : 100}
                        </td>

                        {/* 5. คะแนนที่ได้ */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono font-bold text-slate-800 print:py-0.5 print:px-1 print:text-[8.5px]">
                          {isActivity ? "-" : score}
                        </td>

                        {/* 6. ระดับผลการเรียน (เกรด) */}
                        <td className="py-2.5 px-2 text-center border-r border-slate-200 print:py-0.5 print:px-1 print:text-[8.5px]">
                          <span
                            className={`font-black text-xs font-mono ${
                              isActivity
                                ? "text-emerald-700"
                                : grade === "4"
                                ? "text-emerald-700"
                                : grade === "0"
                                ? "text-rose-600"
                                : "text-blue-800"
                            } print:text-black`}
                          >
                            {grade}
                          </span>
                        </td>

                        {/* 7. ผลการตัดสิน */}
                        <td className="py-2.5 px-2 text-center print:py-0.5 print:px-1 print:text-[8.5px]">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              isPass
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            } print:border-none print:bg-transparent print:text-black print:p-0 print:text-[8px]`}
                          >
                            {isPass ? "ผ่าน" : "ไม่ผ่าน"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                {/* Table Footer: Single Semester Summary */}
                <tfoot className="border-t-2 border-slate-700 bg-slate-100 font-bold text-slate-900 text-[11px] print:border-slate-800 print:bg-slate-100/70 print:text-[8.5px]">
                  <tr>
                    <td colSpan={2} className="py-2.5 px-3 text-right border-r border-slate-300 print:py-1 print:px-2">
                      รวมหน่วยกิต / ผลการเรียนเฉลี่ย ภาคเรียนที่ {selectedSemester} (GPA):
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono border-r border-slate-200 print:py-1 print:px-1">
                      {(selectedSemester === "1" ? stats.enrolledCreditsSem1 : stats.enrolledCreditsSem2).toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono text-slate-500 print:py-1 print:px-1">-</td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono text-slate-500 print:py-1 print:px-1">-</td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-200 font-mono text-blue-800 font-black text-sm print:py-1 print:px-1 print:text-black">
                      {(selectedSemester === "1" ? stats.gpaSem1 : stats.gpaSem2).toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-emerald-800 bg-emerald-50 print:py-1 print:px-1 print:text-black print:bg-transparent">
                      {(selectedSemester === "1" ? stats.earnedCreditsSem1 : stats.earnedCreditsSem2).toFixed(1)} นก. ได้
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>

        {/* ═══ View Mode 2: Analytics by 8 Learning Areas (Screen Only) ═══ */}
        {viewMode === "analytics" && (
          <div className="space-y-4 print:hidden">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-700" />
              สรุปผลการเรียนและเกรดเฉลี่ย แยกตามกลุ่มสาระการเรียนรู้ ({selectedSemester === "ALL" ? "รวม 2 ภาคเรียน" : `ภาคเรียนที่ ${selectedSemester}`})
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {stats.groupGpas.map((g) => {
                const gpaVal = g.gpa;
                const badgeColor =
                  gpaVal >= 3.5
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : gpaVal >= 3.0
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : gpaVal >= 2.0
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-rose-50 text-rose-800 border-rose-200";

                return (
                  <div
                    key={g.group}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all shadow-2xs space-y-2"
                  >
                    <div className="text-xs font-bold text-slate-800 line-clamp-1" title={g.group}>
                      {g.group.replace("กลุ่มสาระการเรียนรู้", "")}
                    </div>
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-black text-slate-900 font-mono">{gpaVal.toFixed(2)}</div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                        {gpaVal >= 3.5 ? "ดีเยี่ยม" : gpaVal >= 3.0 ? "ดีมาก" : gpaVal >= 2.0 ? "ปานกลาง" : "ปรับปรุง"}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          gpaVal >= 3.5 ? "bg-emerald-500" : gpaVal >= 3.0 ? "bg-blue-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${(gpaVal / 4) * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 flex justify-between font-mono">
                      <span>หน่วยกิตรวม: {g.credits.toFixed(1)}</span>
                      <span>{((gpaVal / 4) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ Official Summary Boxes ═══ */}
        <div className="pp6-summary-box border border-slate-200 rounded-xl overflow-hidden shadow-2xs print:border-slate-300 print:rounded-lg print:shadow-none">
          <div className="bg-slate-900 text-white font-bold p-3 text-xs flex items-center justify-between print:py-1 print:px-2.5 print:text-[9px]">
            <div className="flex items-center gap-2 print:gap-1.5">
              <Award className="w-4 h-4 text-amber-400 print:w-3 print:h-3" />
              <span>
                {selectedSemester === "ALL"
                  ? `สรุปผลการประเมินและการตัดสินผลการเรียน ประจำปีการศึกษา ${academicYear}`
                  : `สรุปผลการประเมินและการตัดสินผลการเรียน ประจำภาคเรียนที่ ${selectedSemester} ปีการศึกษา ${academicYear}`}
              </span>
            </div>
            <span className="text-[11px] text-slate-300 font-mono print:text-[8.5px]">
              รหัสนักเรียน: {currentStudent?.studentCode}
            </span>
          </div>

          {selectedSemester === "ALL" ? (
            /* Mode A: 3 Cards (ภาค 1, ภาค 2, สรุปรายปี) */
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-white print:grid-cols-3 print:divide-y-0 print:divide-x print:divide-slate-300">
              {/* Box 1: ภาคเรียนที่ 1 */}
              <div className="p-4 space-y-3 print:p-1.5 print:space-y-1">
                <div className="text-xs font-bold text-blue-900 flex items-center justify-between border-b border-blue-50 pb-2 print:text-[9.5px] print:pb-1 print:border-slate-200">
                  <span>📘 ภาคเรียนที่ 1</span>
                  <span className="text-[10px] text-slate-500 print:text-[8px]">ปีการศึกษา {academicYear}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 print:space-y-0.5 print:text-[8.5px]">
                  <div className="flex justify-between">
                    <span>หน่วยกิตลงทะเบียน:</span>
                    <span className="font-mono font-bold text-slate-800">{stats.enrolledCreditsSem1.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>หน่วยกิตที่ได้:</span>
                    <span className="font-mono font-bold text-emerald-700 print:text-black">{stats.earnedCreditsSem1.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>แต้มระดับคะแนน:</span>
                    <span className="font-mono font-bold text-slate-800">{stats.totalPointsSem1.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 print:pt-0.5 print:border-slate-200">
                    <span className="font-bold text-slate-900">ผลการเรียนเฉลี่ย (GPA):</span>
                    <span className="text-2xl font-black font-mono text-blue-700 print:text-sm print:text-black">{stats.gpaSem1.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] print:text-[8px]">
                    <span>กิจกรรมพัฒนาผู้เรียน:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded print:text-black print:bg-transparent print:p-0">ผ่าน (ผ)</span>
                  </div>
                </div>
              </div>

              {/* Box 2: ภาคเรียนที่ 2 */}
              <div className="p-4 space-y-3 print:p-1.5 print:space-y-1">
                <div className="text-xs font-bold text-indigo-900 flex items-center justify-between border-b border-indigo-50 pb-2 print:text-[9.5px] print:pb-1 print:border-slate-200">
                  <span>📙 ภาคเรียนที่ 2</span>
                  <span className="text-[10px] text-slate-500 print:text-[8px]">ปีการศึกษา {academicYear}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 print:space-y-0.5 print:text-[8.5px]">
                  <div className="flex justify-between">
                    <span>หน่วยกิตลงทะเบียน:</span>
                    <span className="font-mono font-bold text-slate-800">{stats.enrolledCreditsSem2.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>หน่วยกิตที่ได้:</span>
                    <span className="font-mono font-bold text-emerald-700 print:text-black">{stats.earnedCreditsSem2.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>แต้มระดับคะแนน:</span>
                    <span className="font-mono font-bold text-slate-800">{stats.totalPointsSem2.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 print:pt-0.5 print:border-slate-200">
                    <span className="font-bold text-slate-900">ผลการเรียนเฉลี่ย (GPA):</span>
                    <span className="text-2xl font-black font-mono text-indigo-700 print:text-sm print:text-black">{stats.gpaSem2.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] print:text-[8px]">
                    <span>กิจกรรมพัฒนาผู้เรียน:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded print:text-black print:bg-transparent print:p-0">ผ่าน (ผ)</span>
                  </div>
                </div>
              </div>

              {/* Box 3: สรุปผลตลอดปีการศึกษา */}
              <div className="p-4 space-y-3 bg-amber-50/20 print:p-1.5 print:space-y-1 print:bg-transparent">
                <div className="text-xs font-bold text-amber-900 flex items-center justify-between border-b border-amber-100 pb-2 print:text-[9.5px] print:pb-1 print:border-slate-200 print:text-black">
                  <span>🏆 สรุปผลรวมตลอดปีการศึกษา</span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full print:text-[8px] print:text-black print:bg-transparent print:p-0">
                    ประจำปี {academicYear}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 print:space-y-0.5 print:text-[8.5px]">
                  <div className="flex justify-between">
                    <span>หน่วยกิตรวมทั้งปี:</span>
                    <span className="font-mono font-bold text-slate-900">{stats.totalEnrolled.toFixed(1)} นก.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>หน่วยกิตที่ได้รวมทั้งปี:</span>
                    <span className="font-mono font-bold text-emerald-700 print:text-black">{stats.totalEarned.toFixed(1)} นก.</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1 border-t border-amber-200/60 print:pt-0.5 print:border-slate-200">
                    <span className="font-black text-slate-900 text-xs print:text-[8.5px]">ผลการเรียนเฉลี่ยสะสมรายปี (GPA):</span>
                    <span className="text-2xl font-black font-mono text-emerald-700 print:text-base print:text-black">{stats.annualGpa.toFixed(2)}</span>
                  </div>
                  <div className="pt-0.5 space-y-0.5 text-[11px] print:text-[8px]">
                    <div className="flex justify-between">
                      <span>คุณลักษณะอันพึงประสงค์:</span>
                      <span className="font-bold text-emerald-800 print:text-black">ดีเยี่ยม (3)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>การอ่าน คิดวิเคราะห์ เขียน:</span>
                      <span className="font-bold text-emerald-800 print:text-black">ดีเยี่ยม (3)</span>
                    </div>
                    <div className="flex justify-between pt-0.5 font-bold text-slate-900 border-t border-slate-200">
                      <span>การตัดสินผลการเรียน:</span>
                      <span className="text-emerald-700 font-black print:text-black">
                        {stats.isPromoted ? "อนุมัติเลื่อนชั้น" : "ซ่อมเสริม"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mode B: 2 Cards สำหรับ 1 ภาคเรียน (ผลการเรียน และ ผลการประเมินคุณลักษณะ) */
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-white print:grid-cols-2 print:divide-y-0 print:divide-x print:divide-slate-300">
              {/* Card 1: ผลการเรียนประจำภาคเรียน */}
              <div className="p-4 space-y-3 print:p-1.5 print:space-y-1">
                <div className="text-xs font-bold text-blue-900 flex items-center justify-between border-b border-blue-50 pb-2 print:text-[9.5px] print:pb-1 print:border-slate-200">
                  <span>📘 สรุปผลการเรียน ภาคเรียนที่ {selectedSemester}</span>
                  <span className="text-[10px] text-slate-500 print:text-[8px]">ปีการศึกษา {academicYear}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 print:space-y-0.5 print:text-[8.5px]">
                  <div className="flex justify-between">
                    <span>หน่วยกิตลงทะเบียน:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {(selectedSemester === "1" ? stats.enrolledCreditsSem1 : stats.enrolledCreditsSem2).toFixed(1)} นก.
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>หน่วยกิตที่ได้:</span>
                    <span className="font-mono font-bold text-emerald-700 print:text-black">
                      {(selectedSemester === "1" ? stats.earnedCreditsSem1 : stats.earnedCreditsSem2).toFixed(1)} นก.
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>แต้มระดับคะแนน:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {(selectedSemester === "1" ? stats.totalPointsSem1 : stats.totalPointsSem2).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 print:pt-0.5 print:border-slate-200">
                    <span className="font-bold text-slate-900">ผลการเรียนเฉลี่ย (GPA):</span>
                    <span className="text-2xl font-black font-mono text-blue-700 print:text-sm print:text-black">
                      {(selectedSemester === "1" ? stats.gpaSem1 : stats.gpaSem2).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] print:text-[8px]">
                    <span>กิจกรรมพัฒนาผู้เรียน:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded print:text-black print:bg-transparent print:p-0">
                      {(selectedSemester === "1" ? stats.activityPassSem1 : stats.activityPassSem2) ? "ผ่าน (ผ)" : "ไม่ผ่าน (มผ)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: ผลการประเมินคุณลักษณะและทักษะ */}
              <div className="p-4 space-y-3 bg-slate-50/40 print:p-1.5 print:space-y-1 print:bg-transparent">
                <div className="text-xs font-bold text-slate-800 flex items-center justify-between border-b border-slate-200 pb-2 print:text-[9.5px] print:pb-1">
                  <span>📋 ผลการประเมินคุณลักษณะ & กิจกรรม</span>
                  <span className="text-[10px] text-slate-500 font-bold print:text-[8px]">ภาคเรียนที่ {selectedSemester}</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600 print:space-y-1 print:text-[8.5px]">
                  <div className="flex justify-between">
                    <span>คุณลักษณะอันพึงประสงค์:</span>
                    <span className="font-bold text-emerald-800 print:text-black">ดีเยี่ยม (3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>การอ่าน คิดวิเคราะห์ และเขียน:</span>
                    <span className="font-bold text-emerald-800 print:text-black">ดีเยี่ยม (3)</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold text-slate-900 border-t border-slate-200">
                    <span>ผลการประเมินภาคเรียนที่ {selectedSemester}:</span>
                    <span className="text-emerald-700 font-black print:text-black">
                      {((selectedSemester === "1" ? stats.gpaSem1 : stats.gpaSem2) >= 1.0 &&
                        (selectedSemester === "1" ? stats.activityPassSem1 : stats.activityPassSem2))
                        ? "ผ่านเกณฑ์การประเมิน"
                        : "ต้องซ่อมเสริม/พัฒนา"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ═══ Official Signature Section for Print ═══ */}
        <div className="pp6-signature-box grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5 text-center text-xs text-slate-700 print:grid-cols-3 print:pt-3 print:gap-3 print:text-[9.5px]">
          <div className="space-y-4 print:space-y-1.5">
            <div className="text-slate-500 text-[11px] print:text-[8.5px]">ลงชื่อ ...........................................................</div>
            <div>
              <div className="font-bold print:text-[9.5px]">( ........................................................... )</div>
              <div className="text-[11px] print:text-[8.5px] text-slate-700 font-semibold mt-0.5">ครูที่ปรึกษา / ครูประจำชั้น</div>
              <div className="text-[10px] print:text-[8px] text-slate-400 mt-0.5">วันที่ ...... เดือน ..................... พ.ศ. ..........</div>
            </div>
          </div>

          <div className="space-y-4 print:space-y-1.5">
            <div className="text-slate-500 text-[11px] print:text-[8.5px]">ลงชื่อ ...........................................................</div>
            <div>
              <div className="font-bold print:text-[9.5px]">( ........................................................... )</div>
              <div className="text-[11px] print:text-[8.5px] text-slate-700 font-semibold mt-0.5">นายทะเบียนและวัดผล</div>
              <div className="text-[10px] print:text-[8px] text-slate-400 mt-0.5">วันที่ ...... เดือน ..................... พ.ศ. ..........</div>
            </div>
          </div>

          <div className="space-y-4 print:space-y-1.5">
            <div className="text-slate-500 text-[11px] print:text-[8.5px]">ลงชื่อ ...........................................................</div>
            <div>
              <div className="font-bold print:text-[9.5px]">( ........................................................... )</div>
              <div className="text-[11px] print:text-[8.5px] text-slate-900 font-bold mt-0.5">ผู้อำนวยการโรงเรียน</div>
              <div className="text-[10px] print:text-[8px] text-slate-400 mt-0.5">วันที่ ...... เดือน ..................... พ.ศ. ..........</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated A4 Print Style Block */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 8mm 6mm 8mm;
          }
          #pp6-official-sheet {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          table {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .pp6-summary-box, .pp6-signature-box {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
