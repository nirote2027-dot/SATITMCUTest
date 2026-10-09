"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import type { ChangeEvent } from "react";
import {
  Users,
  BookOpen,
  CalendarCheck,
  Award,
  Plus,
  Edit2,
  Trash2,
  Download,
  Search,
  Save,
  FileSpreadsheet,
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
  Check,
  AlertCircle,
  Percent,
  Upload,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  LiyonCard,
  StatusPill,
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
} from "@/shared/components/liyon";
import type {
  StudentDto,
  CourseDto,
  InstructorDto,
  StudentAttendanceSummary,
  GradeRecordDto,
  CourseGradingSchemeDto,
  ImportStudentInput,
  ParsedCsvStudent,
} from "@/features/registration";
import {
  createStudentAction,
  updateStudentAction,
  deleteStudentAction,
  importBatchStudentsAction,
  parseStudentsCsv,
  createCourseAction,
  updateCourseAction,
  deleteCourseAction,
  getInstructorsAction,
  recordBatchAttendanceAction,
  saveBatchGradesAction,
  getGradingSchemeAction,
  saveGradingSchemeAction,
  getGradesAction,
  getAttendanceSummariesAction,
  getAttendanceForPeriodAction,
} from "@/features/registration";

interface Props {
  initialStudents: StudentDto[];
  initialCourses: CourseDto[];
  initialAttendanceSummaries: StudentAttendanceSummary[];
  initialGrades: GradeRecordDto[];
  initialGradingScheme: CourseGradingSchemeDto;
  canManage: boolean;
}

function isCourseMatchingClassRoom(course: CourseDto, classRoom: string): boolean {
  if (!classRoom || classRoom === "ALL") return true;
  const match = classRoom.match(/ม\.([1-6])/);
  if (!match) return true;
  const gradeNum = match[1];
  const gradeLabel = `ม.${gradeNum}`;

  // 1. Course name includes "ม.X" or "(ม.X)"
  if (course.name.includes(gradeLabel)) return true;

  // 2. Course code digits start with 2X (for lower sec) or 3X (for upper sec)
  const digits = course.courseCode.replace(/^[^\d]+/, "");
  if (digits.length >= 2) {
    const p = digits.slice(0, 2);
    if (gradeNum === "1" && p === "21") return true;
    if (gradeNum === "2" && p === "22") return true;
    if (gradeNum === "3" && p === "23") return true;
    if (gradeNum === "4" && p === "31") return true;
    if (gradeNum === "5" && p === "32") return true;
    if (gradeNum === "6" && p === "33") return true;
  }

  // 3. Curriculum degree level match
  const isLowerSec = ["1", "2", "3"].includes(gradeNum);
  const isUpperSec = ["4", "5", "6"].includes(gradeNum);
  if (course.curriculumName) {
    if (isLowerSec && course.curriculumName.includes("ตอนต้น") && !course.name.includes("ม.")) return true;
    if (isUpperSec && course.curriculumName.includes("ตอนปลาย") && !course.name.includes("ม.")) return true;
  }

  return false;
}

export function RegistrationClient({
  initialStudents,
  initialCourses,
  initialAttendanceSummaries,
  initialGrades,
  initialGradingScheme,
  canManage,
}: Props) {
  const [activeTab, setActiveTab] = useState<"students" | "courses" | "attendance" | "grading">("students");
  const [students, setStudents] = useState<StudentDto[]>(initialStudents);
  const [courses, setCourses] = useState<CourseDto[]>(initialCourses);
  const [attendanceSummaries, setAttendanceSummaries] = useState<StudentAttendanceSummary[]>(initialAttendanceSummaries);
  const [grades, setGrades] = useState<GradeRecordDto[]>(initialGrades);
  const [gradingScheme, setGradingScheme] = useState<CourseGradingSchemeDto>(initialGradingScheme);
  const [isPending, startTransition] = useTransition();

  // Filters
  const [selectedClassRoom, setSelectedClassRoom] = useState<string>("ม.1/1");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>("2569");
  const [searchStudent, setSearchStudent] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourses[0]?.id || "");

  // Student Filters (Tab 1)
  const [studentFilterYear, setStudentFilterYear] = useState<string>("2569");
  const [studentFilterSemester, setStudentFilterSemester] = useState<string>("1");
  const [studentFilterClass, setStudentFilterClass] = useState<string>("ALL");

  // Student Dialog
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentDto | null>(null);
  const [deleteConfirmStudent, setDeleteConfirmStudent] = useState<StudentDto | null>(null);

  const [formStudentCode, setFormStudentCode] = useState("");
  const [formTitle, setFormTitle] = useState("ด.ช.");
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formClassRoom, setFormClassRoom] = useState("ม.1/1");
  const [formSeatNo, setFormSeatNo] = useState("1");
  const [formGender, setFormGender] = useState("ชาย");
  const [formAcademicYear, setFormAcademicYear] = useState("2569");
  const [formSemester, setFormSemester] = useState("1");
  const [formStatus, setFormStatus] = useState("ACTIVE");

  // Import CSV Dialog & State
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [csvFileName, setCsvFileName] = useState("");
  const [parsedRows, setParsedRows] = useState<ParsedCsvStudent[]>([]);
  const [importDefaultYear, setImportDefaultYear] = useState<string>("2569");
  const [importDefaultSemester, setImportDefaultSemester] = useState<string>("1");
  const [importDefaultClassRoom, setImportDefaultClassRoom] = useState<string>("ม.1/1");
  const [importOverwrite, setImportOverwrite] = useState<boolean>(true);
  const [importFilterTab, setImportFilterTab] = useState<"all" | "valid" | "invalid">("all");

  // Course Dialog & Management
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseDto | null>(null);
  const [deleteConfirmCourse, setDeleteConfirmCourse] = useState<CourseDto | null>(null);

  const [formCourseCode, setFormCourseCode] = useState("");
  const [formCourseName, setFormCourseName] = useState("");
  const [formCredits, setFormCredits] = useState("1.0");
  const [formCourseSemester, setFormCourseSemester] = useState("1");
  const [formSubjectGroup, setFormSubjectGroup] = useState("กลุ่มสาระการเรียนรู้ภาษาไทย");
  const [formInstructorId, setFormInstructorId] = useState("");
  const [formInstructorName, setFormInstructorName] = useState("");

  // Course Filter & Search in Tab 2
  const [searchCourse, setSearchCourse] = useState("");
  const [filterSubjectGroup, setFilterSubjectGroup] = useState("ALL");
  const [filterCourseSemester, setFilterCourseSemester] = useState("ALL");

  // Instructors list
  const [instructors, setInstructors] = useState<InstructorDto[]>([]);

  // Attendance Check State
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [attendancePeriod, setAttendancePeriod] = useState<number>(1);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, "PRESENT" | "ABSENT" | "LEAVE" | "LATE">>({});

  // Grading Scheme Modal State
  const [schemeModalOpen, setSchemeModalOpen] = useState(false);
  const [schemeAssignment, setSchemeAssignment] = useState<number>(initialGradingScheme?.maxAssignment ?? 30);
  const [schemeMidterm, setSchemeMidterm] = useState<number>(initialGradingScheme?.maxMidterm ?? 20);
  const [schemeBehavior, setSchemeBehavior] = useState<number>(initialGradingScheme?.maxBehavior ?? 20);
  const [schemeFinal, setSchemeFinal] = useState<number>(initialGradingScheme?.maxFinal ?? 30);
  const [schemeMinAttendance, setSchemeMinAttendance] = useState<number>(initialGradingScheme?.minAttendancePercent ?? 80);

  // Load grades, attendance, and scheme when classroom or course changes
  useEffect(() => {
    if (!selectedCourseId) return;
    startTransition(async () => {
      try {
        const [schemeRes, gradesRes, attRes] = await Promise.all([
          getGradingSchemeAction(selectedCourseId, selectedClassRoom),
          getGradesAction(selectedClassRoom, selectedCourseId),
          getAttendanceSummariesAction(selectedClassRoom, selectedCourseId),
        ]);
        if (schemeRes.ok && schemeRes.data) {
          setGradingScheme(schemeRes.data);
        }
        if (gradesRes.ok && gradesRes.data) {
          setGrades((prev) => {
            const others = prev.filter(
              (g) => !(g.classRoom === selectedClassRoom && g.courseId === selectedCourseId),
            );
            return [...others, ...gradesRes.data];
          });
        }
        if (attRes.ok && attRes.data) {
          setAttendanceSummaries((prev) => {
            const others = prev.filter((a) => a.classRoom !== selectedClassRoom);
            return [...others, ...attRes.data];
          });
        }
      } catch (err) {
        console.error("Failed to load registration data:", err);
      }
    });
  }, [selectedCourseId, selectedClassRoom]);

  // Courses filtered according to selected classroom's grade level
  const availableCourses = useMemo(() => {
    const matched = courses.filter((c) => isCourseMatchingClassRoom(c, selectedClassRoom));
    return matched.length > 0 ? matched : courses;
  }, [courses, selectedClassRoom]);

  // If selectedCourseId is not in availableCourses, auto-select the first one
  useEffect(() => {
    if (availableCourses.length > 0) {
      const exists = availableCourses.some((c) => c.id === selectedCourseId);
      if (!exists) {
        setSelectedCourseId(availableCourses[0].id);
      }
    }
  }, [availableCourses, selectedCourseId]);

  // Load Instructors for Course Management
  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getInstructorsAction();
        if (res.ok && res.data) {
          setInstructors(res.data);
        }
      } catch (err) {
        console.error("Failed to load instructors:", err);
      }
    });
  }, []);

  // Filtered Courses (Tab 2)
  const filteredCoursesList = useMemo(() => {
    return courses.filter((c) => {
      if (filterCourseSemester !== "ALL" && c.semester !== Number(filterCourseSemester)) {
        return false;
      }
      if (filterSubjectGroup !== "ALL" && c.subjectGroup !== filterSubjectGroup) {
        return false;
      }
      if (searchCourse) {
        const q = searchCourse.toLowerCase().trim();
        const codeMatch = c.courseCode.toLowerCase().includes(q);
        const nameMatch = c.name.toLowerCase().includes(q);
        const teacherMatch = (c.instructorName || "").toLowerCase().includes(q);
        const groupMatch = (c.subjectGroup || "").toLowerCase().includes(q);
        if (!codeMatch && !nameMatch && !teacherMatch && !groupMatch) return false;
      }
      return true;
    });
  }, [courses, filterCourseSemester, filterSubjectGroup, searchCourse]);

  // Tab 1: Academic Years List
  const academicYearsList = useMemo(() => {
    const set = new Set(students.map((s) => s.academicYear).filter(Boolean));
    set.add("2569");
    set.add("2568");
    set.add("2567");
    set.add("2570");
    return Array.from(set).sort().reverse();
  }, [students]);

  // Unique Classrooms
  const classRooms = useMemo(() => {
    const set = new Set(students.map((s) => s.classRoom));
    set.add("ม.1/1");
    set.add("ม.4/1");
    return Array.from(set).sort();
  }, [students]);

  // Filtered Students (Tab 1: Academic Year, Semester, Grade/Class, Search)
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Academic year filter
      if (studentFilterYear !== "ALL" && s.academicYear && s.academicYear !== studentFilterYear) {
        return false;
      }
      // Semester filter
      if (studentFilterSemester !== "ALL" && s.semester !== undefined && s.semester !== Number(studentFilterSemester)) {
        return false;
      }
      // Classroom / Grade filter (e.g. "ม.4" matches all "ม.4/*")
      if (studentFilterClass !== "ALL") {
        if (/^ม\.[1-6]$/.test(studentFilterClass)) {
          if (!s.classRoom.startsWith(studentFilterClass)) return false;
        } else if (s.classRoom !== studentFilterClass) {
          return false;
        }
      }
      // Search
      if (searchStudent) {
        const q = searchStudent.toLowerCase().trim();
        const codeMatch = s.studentCode.toLowerCase().includes(q);
        const nameMatch = s.fullName.toLowerCase().includes(q);
        if (!codeMatch && !nameMatch) return false;
      }
      return true;
    });
  }, [students, studentFilterYear, studentFilterSemester, studentFilterClass, searchStudent]);

  // Current classroom students for attendance & grading
  const currentClassStudents = useMemo(() => {
    return students.filter((s) => s.classRoom === selectedClassRoom);
  }, [students, selectedClassRoom]);

  // Load attendance records for current class, date, period, and course
  useEffect(() => {
    if (!selectedClassRoom || !attendanceDate || !attendancePeriod) return;
    startTransition(async () => {
      try {
        const res = await getAttendanceForPeriodAction(
          selectedClassRoom,
          attendanceDate,
          attendancePeriod,
          selectedCourseId || null,
        );
        if (res.ok && res.data) {
          if (Object.keys(res.data).length > 0) {
            setAttendanceMap(res.data);
          } else {
            const defaultMap: Record<string, "PRESENT" | "ABSENT" | "LEAVE" | "LATE"> = {};
            for (const s of currentClassStudents) {
              defaultMap[s.id] = "PRESENT";
            }
            setAttendanceMap(defaultMap);
          }
        }
      } catch (err) {
        console.error("Failed to load attendance for period:", err);
      }
    });
  }, [selectedClassRoom, selectedCourseId, attendanceDate, attendancePeriod, currentClassStudents]);

  // Current classroom grades
  const currentClassGrades = useMemo(() => {
    const list = grades.filter(
      (g) => g.classRoom === selectedClassRoom && (!selectedCourseId || g.courseId === selectedCourseId),
    );
    const minAtt = gradingScheme.minAttendancePercent ?? 80;
    return currentClassStudents.map((s) => {
      const existing = list.find((g) => g.studentId === s.id);
      if (existing) return existing;
      const att = attendanceSummaries.find((a) => a.studentId === s.id);
      const attPercent = att?.attendancePercent ?? 100;
      return {
        id: "",
        studentId: s.id,
        studentCode: s.studentCode,
        studentName: s.fullName,
        classRoom: s.classRoom,
        seatNo: s.seatNo,
        courseId: selectedCourseId,
        courseCode: courses.find((c) => c.id === selectedCourseId)?.courseCode || "",
        courseName: courses.find((c) => c.id === selectedCourseId)?.name || "",
        academicYear: selectedAcademicYear,
        semester: 1,
        assignmentScore: 0,
        midtermScore: 0,
        behaviorScore: 0,
        finalScore: 0,
        totalScore: 0,
        grade: attPercent < minAtt ? "มส" : "0",
        isPassing: false,
        attendancePercent: attPercent,
      };
    });
  }, [grades, selectedClassRoom, selectedCourseId, currentClassStudents, attendanceSummaries, courses, gradingScheme]);

  const openSchemeModal = () => {
    setSchemeAssignment(gradingScheme.maxAssignment);
    setSchemeMidterm(gradingScheme.maxMidterm);
    setSchemeBehavior(gradingScheme.maxBehavior);
    setSchemeFinal(gradingScheme.maxFinal);
    setSchemeMinAttendance(gradingScheme.minAttendancePercent ?? 80);
    setSchemeModalOpen(true);
  };

  const applySchemePreset = (
    assignment: number,
    midterm: number,
    behavior: number,
    finalScore: number,
    minAtt: number = 80,
  ) => {
    setSchemeAssignment(assignment);
    setSchemeMidterm(midterm);
    setSchemeBehavior(behavior);
    setSchemeFinal(finalScore);
    setSchemeMinAttendance(minAtt);
  };

  const handleSaveScheme = () => {
    const total = schemeAssignment + schemeMidterm + schemeBehavior + schemeFinal;
    if (total <= 0) {
      toast.error("กรุณาระบุคะแนนให้มากกว่า 0");
      return;
    }

    startTransition(async () => {
      try {
        const res = await saveGradingSchemeAction({
          courseId: selectedCourseId,
          classRoom: selectedClassRoom,
          maxAssignment: schemeAssignment,
          maxMidterm: schemeMidterm,
          maxBehavior: schemeBehavior,
          maxFinal: schemeFinal,
          minAttendancePercent: schemeMinAttendance,
        });

        if (!res.ok) {
          toast.error(res.error.message || "ไม่สามารถบันทึกเกณฑ์คะแนนได้");
          return;
        }

        const newScheme = res.data;
        setGradingScheme(newScheme);
        setSchemeModalOpen(false);

        // Re-calculate all grades for this classroom & course based on new cutoff
        setGrades((prev) => {
          return prev.map((g) => {
            if (g.classRoom !== selectedClassRoom || g.courseId !== selectedCourseId) {
              return g;
            }
            const attPercent = g.attendancePercent ?? 100;
            const tScore = Math.min(
              100,
              Math.round((g.assignmentScore + g.midtermScore + g.behaviorScore + g.finalScore) * 10) / 10,
            );
            let grade = "0";
            if (g.grade === "ร") {
              grade = "ร";
            } else if (attPercent < newScheme.minAttendancePercent) {
              grade = "มส";
            } else if (tScore >= 80) grade = "4";
            else if (tScore >= 75) grade = "3.5";
            else if (tScore >= 70) grade = "3";
            else if (tScore >= 65) grade = "2.5";
            else if (tScore >= 60) grade = "2";
            else if (tScore >= 55) grade = "1.5";
            else if (tScore >= 50) grade = "1";
            else grade = "0";

            return {
              ...g,
              totalScore: tScore,
              grade,
              isPassing: grade !== "0" && grade !== "มส" && grade !== "ร",
            };
          });
        });

        toast.success(`บันทึกเกณฑ์คะแนนสำหรับห้อง ${selectedClassRoom} เรียบร้อยแล้ว`);
      } catch (err: any) {
        toast.error(err.message || "เกิดข้อผิดพลาดในการบันทึกเกณฑ์คะแนน");
      }
    });
  };

  // Open Create Student
  const openCreateStudent = () => {
    setEditingStudent(null);
    const targetClass =
      studentFilterClass !== "ALL" && !/^ม\.[1-6]$/.test(studentFilterClass)
        ? studentFilterClass
        : studentFilterClass.startsWith("ม.4")
        ? "ม.4/1"
        : selectedClassRoom !== "ALL"
        ? selectedClassRoom
        : "ม.1/1";
    const nextSeat = students.filter((s) => s.classRoom === targetClass).length + 1;
    const year = studentFilterYear !== "ALL" ? studentFilterYear : "2569";
    const sem = studentFilterSemester !== "ALL" ? studentFilterSemester : "1";
    const yearShort = year.slice(-2);
    setFormStudentCode(`STU${yearShort}-${targetClass.replace("ม.", "").replace("/", "")}${String(nextSeat).padStart(2, "0")}`);
    setFormTitle(targetClass.startsWith("ม.4") || targetClass.startsWith("ม.5") || targetClass.startsWith("ม.6") ? "นาย" : "ด.ช.");
    setFormFirstName("");
    setFormLastName("");
    setFormClassRoom(targetClass);
    setFormSeatNo(String(nextSeat));
    setFormGender("ชาย");
    setFormAcademicYear(year);
    setFormSemester(sem);
    setFormStatus("ACTIVE");
    setStudentModalOpen(true);
  };

  // Open Edit Student
  const openEditStudent = (s: StudentDto) => {
    setEditingStudent(s);
    setFormStudentCode(s.studentCode);
    setFormTitle(s.title);
    setFormFirstName(s.firstName);
    setFormLastName(s.lastName);
    setFormClassRoom(s.classRoom);
    setFormSeatNo(String(s.seatNo));
    setFormGender(s.gender || "ชาย");
    setFormAcademicYear(s.academicYear || "2569");
    setFormSemester(String(s.semester || 1));
    setFormStatus(s.status || "ACTIVE");
    setStudentModalOpen(true);
  };

  // Save Student
  const handleSaveStudent = () => {
    if (!formStudentCode || !formFirstName || !formLastName) {
      toast.error("กรุณากรอกข้อมูลนักเรียนให้ครบถ้วน");
      return;
    }

    startTransition(async () => {
      try {
        if (editingStudent) {
          const res = await updateStudentAction(editingStudent.id, {
            studentCode: formStudentCode,
            title: formTitle,
            firstName: formFirstName,
            lastName: formLastName,
            classRoom: formClassRoom,
            seatNo: Number(formSeatNo),
            gender: formGender,
            academicYear: formAcademicYear,
            semester: Number(formSemester),
            status: formStatus,
          });
          if (!res.ok) {
            toast.error(res.error.message || "เกิดข้อผิดพลาด");
            return;
          }
          setStudents((prev) => prev.map((s) => (s.id === editingStudent.id ? res.data : s)));
          toast.success("บันทึกการแก้ไขข้อมูลนักเรียนสำเร็จ");
          setStudentModalOpen(false);
        } else {
          const res = await createStudentAction({
            studentCode: formStudentCode,
            title: formTitle,
            firstName: formFirstName,
            lastName: formLastName,
            classRoom: formClassRoom,
            seatNo: Number(formSeatNo),
            gender: formGender,
            academicYear: formAcademicYear,
            semester: Number(formSemester),
            status: formStatus,
          });
          if (!res.ok) {
            toast.error(res.error.message || "เกิดข้อผิดพลาด");
            return;
          }
          setStudents((prev) => [...prev, res.data]);
          toast.success("เพิ่มนักเรียนใหม่สำเร็จ");
          setStudentModalOpen(false);
        }
      } catch (e: any) {
        toast.error(e.message || "เกิดข้อผิดพลาดในการบันทึก");
      }
    });
  };

  // Delete Student
  const handleDeleteStudent = () => {
    if (!deleteConfirmStudent) return;
    startTransition(async () => {
      try {
        const res = await deleteStudentAction(deleteConfirmStudent.id);
        if (!res.ok) {
          toast.error(res.error.message || "ไม่สามารถลบข้อมูลได้");
          return;
        }
        setStudents((prev) => prev.filter((s) => s.id !== deleteConfirmStudent.id));
        toast.success("ลบข้อมูลนักเรียนเรียบร้อยแล้ว");
        setDeleteConfirmStudent(null);
      } catch (e: any) {
        toast.error(e.message || "เกิดข้อผิดพลาด");
      }
    });
  };

  // Open Import Modal
  const openImportModal = () => {
    setParsedRows([]);
    setCsvFileName("");
    setImportDefaultYear(studentFilterYear !== "ALL" ? studentFilterYear : "2569");
    setImportDefaultSemester(studentFilterSemester !== "ALL" ? studentFilterSemester : "1");
    setImportDefaultClassRoom(
      studentFilterClass !== "ALL" && !/^ม\.[1-6]$/.test(studentFilterClass)
        ? studentFilterClass
        : selectedClassRoom !== "ALL"
        ? selectedClassRoom
        : "ม.1/1",
    );
    setImportOverwrite(true);
    setImportFilterTab("all");
    setImportModalOpen(true);
  };

  // Download CSV Template with UTF-8 BOM
  const handleDownloadCsvTemplate = () => {
    const csvContent =
      "\uFEFF" +
      "เลขที่,รหัสนักเรียน,คำนำหน้า,ชื่อ,นามสกุล,ระดับชั้น,ปีการศึกษา,ภาคเรียน,เพศ,สถานะ\n" +
      '1,"STU69-101","ด.ช.","กิตติศักดิ์","รักเรียน","ม.1/1","2569",1,"ชาย","กำลังศึกษา"\n' +
      '2,"STU69-102","ด.ญ.","จินตนา","ปัญญาดี","ม.1/1","2569",1,"หญิง","กำลังศึกษา"\n' +
      '3,"STU69-103","ด.ช.","ณัฐดนัย","สุขเกษม","ม.1/1","2569",1,"ชาย","กำลังศึกษา"\n' +
      '1,"STU69-401","นาย","ธนพล","รุ่งเรือง","ม.4/1","2569",1,"ชาย","กำลังศึกษา"\n' +
      '2,"STU69-402","น.ส.","พรทิพย์","วิไลวรรณ","ม.4/1","2569",1,"หญิง","กำลังศึกษา"\n';

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `SATIT_Students_Template_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("ดาวน์โหลดแม่แบบไฟล์ CSV เรียบร้อยแล้ว");
  };

  // Upload & Parse CSV
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) {
        toast.error("ไม่สามารถอ่านข้อมูลจากไฟล์ได้ หรือไฟล์ว่างเปล่า");
        return;
      }
      const { rows, errors } = parseStudentsCsv(text, {
        academicYear: importDefaultYear,
        semester: Number(importDefaultSemester) || 1,
        defaultClassRoom: importDefaultClassRoom,
      });

      if (errors.length > 0) {
        toast.error(errors[0]);
        return;
      }

      setParsedRows(rows);
      if (rows.length === 0) {
        toast.error("ไม่พบแถวข้อมูลนักเรียนในไฟล์");
      } else {
        const validCount = rows.filter((r) => r.isValid).length;
        toast.success(`อ่านข้อมูลสำเร็จ: พบทั้งหมด ${rows.length} คน (ข้อมูลสมบูรณ์ ${validCount} คน)`);
      }
    };
    reader.onerror = () => {
      toast.error("เกิดข้อผิดพลาดในการเปิดไฟล์ CSV");
    };
    reader.readAsText(file, "utf-8");
  };

  // Re-apply defaults if user adjusts dropdowns
  const handleReapplyDefaults = (year: string, sem: string, room: string) => {
    setImportDefaultYear(year);
    setImportDefaultSemester(sem);
    setImportDefaultClassRoom(room);
    setParsedRows((prev) =>
      prev.map((r) => ({
        ...r,
        academicYear: r.academicYear || year,
        semester: r.semester || Number(sem),
        classRoom: r.classRoom || room,
      })),
    );
  };

  // Confirm Import
  const handleConfirmImport = () => {
    const validRows = parsedRows.filter((r) => r.isValid);
    if (validRows.length === 0) {
      toast.error("ไม่มีข้อมูลนักเรียนที่ถูกต้องสำหรับนำเข้า");
      return;
    }

    startTransition(async () => {
      try {
        const payload: ImportStudentInput[] = validRows.map((r) => ({
          studentCode: r.studentCode,
          title: r.title,
          firstName: r.firstName,
          lastName: r.lastName,
          classRoom: r.classRoom,
          seatNo: r.seatNo,
          academicYear: r.academicYear,
          semester: r.semester,
          gender: r.gender,
          status: r.status,
        }));

        const res = await importBatchStudentsAction(payload, {
          overwriteExisting: importOverwrite,
        });

        if (!res.ok) {
          toast.error(res.error.message || "เกิดข้อผิดพลาดในการนำเข้า");
          return;
        }

        const data = res.data;
        // Merge with existing students state
        setStudents((prev) => {
          const map = new Map(prev.map((s) => [s.studentCode, s]));
          for (const s of data.students) {
            map.set(s.studentCode, s);
          }
          return Array.from(map.values()).sort((a, b) => {
            if (a.classRoom !== b.classRoom) return a.classRoom.localeCompare(b.classRoom);
            return a.seatNo - b.seatNo;
          });
        });

        toast.success(
          `นำเข้าข้อมูลสำเร็จ! บันทึกใหม่ ${data.created} คน, อัปเดต ${data.updated} คน${
            data.failed > 0 ? `, ล้มเหลว ${data.failed} คน` : ""
          }`,
        );

        setImportModalOpen(false);
        setParsedRows([]);
        setCsvFileName("");
      } catch (err: any) {
        toast.error(err.message || "เกิดข้อผิดพลาดในการนำเข้าข้อมูล");
      }
    });
  };

  // Preview filtered rows for modal
  const displayedPreviewRows = useMemo(() => {
    if (importFilterTab === "valid") return parsedRows.filter((r) => r.isValid);
    if (importFilterTab === "invalid") return parsedRows.filter((r) => !r.isValid);
    return parsedRows;
  }, [parsedRows, importFilterTab]);

  // Open Create Course
  const openCreateCourse = () => {
    setEditingCourse(null);
    setFormCourseCode("");
    setFormCourseName("");
    setFormCredits("1.0");
    setFormCourseSemester("1");
    setFormSubjectGroup("กลุ่มสาระการเรียนรู้ภาษาไทย");
    setFormInstructorId("");
    setFormInstructorName("");
    setCourseModalOpen(true);
  };

  // Open Edit Course
  const openEditCourse = (course: CourseDto) => {
    setEditingCourse(course);
    setFormCourseCode(course.courseCode);
    setFormCourseName(course.name);
    setFormCredits(String(course.credits || 1.0));
    setFormCourseSemester(String(course.semester || 1));
    setFormSubjectGroup(course.subjectGroup || "กลุ่มสาระการเรียนรู้ภาษาไทย");
    setFormInstructorId(course.instructorId || "");
    setFormInstructorName(course.instructorName || "");
    setCourseModalOpen(true);
  };

  // Save Course (Create / Edit)
  const handleSaveCourse = () => {
    if (!formCourseCode || !formCourseName) {
      toast.error("กรุณากรอกรหัสวิชาและชื่อรายวิชา");
      return;
    }

    startTransition(async () => {
      try {
        if (editingCourse) {
          const res = await updateCourseAction(editingCourse.id, {
            courseCode: formCourseCode,
            name: formCourseName,
            credits: parseFloat(formCredits) || 1.0,
            semester: parseInt(formCourseSemester, 10) || 1,
            subjectGroup: formSubjectGroup,
            instructorId: formInstructorId || undefined,
            instructorName: formInstructorName || undefined,
          });
          if (!res.ok) {
            toast.error(res.error.message || "เกิดข้อผิดพลาดในการแก้ไขรายวิชา");
            return;
          }
          setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? res.data : c)));
          toast.success("แก้ไขข้อมูลรายวิชาสำเร็จ");
          setCourseModalOpen(false);
        } else {
          const res = await createCourseAction({
            courseCode: formCourseCode,
            name: formCourseName,
            credits: parseFloat(formCredits) || 1.0,
            semester: parseInt(formCourseSemester, 10) || 1,
            subjectGroup: formSubjectGroup,
            instructorId: formInstructorId || undefined,
            instructorName: formInstructorName || undefined,
          });
          if (!res.ok) {
            toast.error(res.error.message || "เกิดข้อผิดพลาดในการเพิ่มรายวิชา");
            return;
          }
          setCourses((prev) => [...prev, res.data]);
          toast.success("เพิ่มรายวิชาใหม่สำเร็จ");
          setCourseModalOpen(false);
        }
      } catch (e: any) {
        toast.error(e.message || "เกิดข้อผิดพลาด");
      }
    });
  };

  // Delete Course
  const handleDeleteCourse = () => {
    if (!deleteConfirmCourse) return;
    startTransition(async () => {
      try {
        const res = await deleteCourseAction(deleteConfirmCourse.id);
        if (!res.ok) {
          toast.error(res.error.message || "ไม่สามารถลบรายวิชานี้ได้");
          return;
        }
        setCourses((prev) => prev.filter((c) => c.id !== deleteConfirmCourse.id));
        toast.success(`ลบรายวิชา ${deleteConfirmCourse.courseCode} สำเร็จ`);
        setDeleteConfirmCourse(null);
      } catch (e: any) {
        toast.error(e.message || "เกิดข้อผิดพลาด");
      }
    });
  };

  // Batch Attendance Check
  const handleSetAllAttendance = (status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE") => {
    const nextMap: Record<string, "PRESENT" | "ABSENT" | "LEAVE" | "LATE"> = {};
    for (const s of currentClassStudents) {
      nextMap[s.id] = status;
    }
    setAttendanceMap(nextMap);
  };

  const handleSaveAttendance = () => {
    if (currentClassStudents.length === 0) return;
    const records = currentClassStudents.map((s) => ({
      studentId: s.id,
      courseId: selectedCourseId || null,
      classDate: attendanceDate,
      period: attendancePeriod,
      status: attendanceMap[s.id] || "PRESENT",
    }));

    startTransition(async () => {
      try {
        const res = await recordBatchAttendanceAction(records);
        if (res.ok) {
          toast.success(`บันทึกเวลาเรียนปีการศึกษา ${selectedAcademicYear} วันที่ ${attendanceDate} คาบที่ ${attendancePeriod} เรียบร้อยแล้ว`);
          const attRes = await getAttendanceSummariesAction(selectedClassRoom, selectedCourseId);
          if (attRes.ok && attRes.data) {
            setAttendanceSummaries((prev) => {
              const others = prev.filter((a) => a.classRoom !== selectedClassRoom);
              return [...others, ...attRes.data];
            });
          }
        } else {
          toast.error(res.error.message || "บันทึกเวลาเรียนไม่สำเร็จ");
        }
      } catch (e: any) {
        toast.error(e.message || "เกิดข้อผิดพลาด");
      }
    });
  };

  // Grade Edit
  const handleScoreChange = (
    studentId: string,
    field: "assignmentScore" | "midtermScore" | "behaviorScore" | "finalScore",
    val: string,
  ) => {
    const num = Math.max(0, parseFloat(val) || 0);
    const minAtt = gradingScheme.minAttendancePercent ?? 80;
    setGrades((prev) => {
      const idx = prev.findIndex((g) => g.studentId === studentId && g.courseId === selectedCourseId);
      if (idx >= 0) {
        const updated = { ...prev[idx], [field]: num };
        const total = Math.min(100, Math.round((updated.assignmentScore + updated.midtermScore + updated.behaviorScore + updated.finalScore) * 10) / 10);
        let grade = "0";
        if (updated.attendancePercent !== undefined && updated.attendancePercent < minAtt) {
          grade = "มส";
        } else if (total >= 80) grade = "4";
        else if (total >= 75) grade = "3.5";
        else if (total >= 70) grade = "3";
        else if (total >= 65) grade = "2.5";
        else if (total >= 60) grade = "2";
        else if (total >= 55) grade = "1.5";
        else if (total >= 50) grade = "1";
        else grade = "0";

        updated.totalScore = total;
        updated.grade = grade;
        updated.isPassing = grade !== "0" && grade !== "มส";
        return [...prev.slice(0, idx), updated, ...prev.slice(idx + 1)];
      } else {
        const s = students.find((item) => item.id === studentId);
        const att = attendanceSummaries.find((a) => a.studentId === studentId);
        const attPercent = att?.attendancePercent ?? 100;
        const newRecord: GradeRecordDto = {
          id: "",
          studentId,
          studentCode: s?.studentCode || "",
          studentName: s?.fullName || "",
          classRoom: s?.classRoom || selectedClassRoom,
          seatNo: s?.seatNo || 1,
          courseId: selectedCourseId,
          courseCode: courses.find((c) => c.id === selectedCourseId)?.courseCode || "",
          courseName: courses.find((c) => c.id === selectedCourseId)?.name || "",
          academicYear: selectedAcademicYear,
          semester: 1,
          assignmentScore: field === "assignmentScore" ? num : 0,
          midtermScore: field === "midtermScore" ? num : 0,
          behaviorScore: field === "behaviorScore" ? num : 0,
          finalScore: field === "finalScore" ? num : 0,
          totalScore: num,
          grade: attPercent < minAtt ? "มส" : num >= 50 ? "1" : "0",
          isPassing: num >= 50,
          attendancePercent: attPercent,
        };
        return [...prev, newRecord];
      }
    });
  };

  const handleSaveAllGrades = () => {
    const listToSave = currentClassGrades.map((g) => ({
      studentId: g.studentId,
      courseId: g.courseId || selectedCourseId,
      assignmentScore: g.assignmentScore,
      midtermScore: g.midtermScore,
      behaviorScore: g.behaviorScore,
      finalScore: g.finalScore,
      remarks: g.remarks || undefined,
    }));

    startTransition(async () => {
      try {
        const res = await saveBatchGradesAction(listToSave);
        if (res.ok) {
          toast.success("บันทึกคะแนนและตัดเกรดเรียบร้อยแล้ว");
        } else {
          toast.error(res.error.message || "บันทึกคะแนนไม่สำเร็จ");
        }
      } catch (e: any) {
        toast.error(e.message || "เกิดข้อผิดพลาด");
      }
    });
  };

  // Export to Google Sheets (CSV with UTF-8 BOM)
  const handleExportCSV = (type: "students" | "grades" | "attendance") => {
    let filename = "";
    let csvContent = "\uFEFF"; // UTF-8 BOM for Excel / Google Sheets Thai encoding

    if (type === "students") {
      filename = `Students_${studentFilterYear}_Sem${studentFilterSemester}_${studentFilterClass}_${new Date().toISOString().split("T")[0]}.csv`;
      csvContent += "เลขที่,รหัสนักเรียน,คำนำหน้า,ชื่อ,นามสกุล,ระดับชั้น,ปีการศึกษา,ภาคเรียน,เพศ,สถานะ\n";
      for (const s of filteredStudents) {
        csvContent += `"${s.seatNo}","${s.studentCode}","${s.title}","${s.firstName}","${s.lastName}","${s.classRoom}","${s.academicYear || "2569"}","${s.semester || 1}","${s.gender || ""}","${s.status || "ACTIVE"}"\n`;
      }
    } else if (type === "grades") {
      const course = courses.find((c) => c.id === selectedCourseId);
      const totalWeight =
        gradingScheme.maxAssignment + gradingScheme.maxMidterm + gradingScheme.maxBehavior + gradingScheme.maxFinal;
      filename = `Grading_${selectedClassRoom}_${course?.courseCode || "course"}_${selectedAcademicYear}.csv`;
      csvContent += `เลขที่,รหัสนักเรียน,ชื่อ-สกุล,ชั้น/ห้อง,รหัสวิชา,ชื่อวิชา,เวลาเรียน(%),คะแนนเก็บ(${gradingScheme.maxAssignment}),กลางภาค(${gradingScheme.maxMidterm}),จิตพิสัย(${gradingScheme.maxBehavior}),ปลายภาค(${gradingScheme.maxFinal}),รวม(${totalWeight}),เกรด,หมายเหตุ\n`;
      for (const g of currentClassGrades) {
        csvContent += `"${g.seatNo}","${g.studentCode}","${g.studentName}","${g.classRoom}","${g.courseCode}","${g.courseName}","${g.attendancePercent ?? 100}%","${g.assignmentScore}","${g.midtermScore}","${g.behaviorScore}","${g.finalScore}","${g.totalScore}","${g.grade}","${g.remarks || ""}"\n`;
      }
    } else if (type === "attendance") {
      const course = courses.find((c) => c.id === selectedCourseId);
      filename = `Attendance_Summary_${selectedClassRoom}_${course?.courseCode || "course"}_${attendanceDate}_Period${attendancePeriod}_${selectedAcademicYear}.csv`;
      csvContent += "ปีการศึกษา,วันที่,คาบเรียน,เลขที่,รหัสนักเรียน,ชื่อ-สกุล,ระดับชั้น/ห้อง,รหัสวิชา,ชื่อวิชา,สถานะคาบนี้,จำนวนคาบสะสม,มา(คาบ),ขาด(คาบ),ลา(คาบ),สาย(คาบ),ร้อยละเวลาเรียน(%),สิทธิ์เข้าสอบ\n";
      for (const s of currentClassStudents) {
        const a = attendanceSummaries.find((att) => att.studentId === s.id);
        const currentStatus = attendanceMap[s.id] || "PRESENT";
        const statusThai =
          currentStatus === "PRESENT"
            ? "มา"
            : currentStatus === "ABSENT"
            ? "ขาด"
            : currentStatus === "LEAVE"
            ? "ลา"
            : "สาย";

        const totalPeriods = a?.totalPeriods ?? 0;
        const presentCount = a?.presentCount ?? 0;
        const absentCount = a?.absentCount ?? 0;
        const leaveCount = a?.leaveCount ?? 0;
        const lateCount = a?.lateCount ?? 0;
        const attPercent = a?.attendancePercent ?? 100;
        const isEligible = a?.isEligibleForExam ?? true;

        csvContent += `"${selectedAcademicYear}","${attendanceDate}","คาบที่ ${attendancePeriod}","${s.seatNo}","${s.studentCode}","${s.fullName}","${s.classRoom}","${course?.courseCode || ""}","${course?.name || ""}","${statusThai}","${totalPeriods}","${presentCount}","${absentCount}","${leaveCount}","${lateCount}","${attPercent}%","${isEligible ? "มีสิทธิ์สอบ" : "มส (หมดสิทธิ์สอบ)"}"\n`;
      }
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`ส่งออกไฟล์ ${filename} เรียบร้อยแล้ว สามารถนำเข้า Google Sheets ได้ทันที`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* ═══ Top Header & Stats ═══ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" /> ทะเบียนและวัดผล สำหรับบุคลากร (Registration & Evaluation)
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            ระบบเช็คชื่อและตัดเกรดนักเรียน มัธยมศึกษา (satitmcuReg)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            บันทึกรายชื่อนักเรียน เช็คเวลาเรียน คำนวณตัดเกรดอัตโนมัติตามเกณฑ์ สพฐ. และเชื่อมโยงส่งออก Google Sheets
          </p>
        </div>

        {/* Global Export & Action Cluster */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => handleExportCSV(activeTab === "grading" ? "grades" : activeTab === "attendance" ? "attendance" : "students")}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs font-semibold"
          >
            <FileSpreadsheet className="w-4 h-4" />
            ส่งออกเป็น Google Sheets (CSV)
          </Button>
          <a
            href="https://docs.google.com/spreadsheets/u/0/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            title="เปิด Google Sheets เพื่อนำเข้าไฟล์"
          >
            เปิด Google Sheets <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {canManage && (
            <>
              <Button
                onClick={openImportModal}
                className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs font-semibold"
              >
                <Upload className="w-4 h-4" />
                นำเข้า CSV (Import)
              </Button>
              <Button onClick={openCreateStudent} className="gap-2 bg-blue-700 hover:bg-blue-800 text-white shadow-xs font-semibold">
                <Plus className="w-4 h-4" />
                เพิ่มนักเรียน
              </Button>
            </>
          )}
        </div>
      </div>

      {/* ═══ 4 Tab Navigation ═══ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("students")}
          className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "students"
              ? "bg-blue-700 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          1. รายชื่อนักเรียน ({students.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "courses"
              ? "bg-blue-700 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          2. รายวิชาที่สอน ({courses.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "attendance"
              ? "bg-blue-700 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          3. เช็คชื่อเข้าเรียน (Attendance)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("grading")}
          className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === "grading"
              ? "bg-blue-700 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Award className="w-4 h-4" />
          4. บันทึกคะแนนและตัดเกรด (Grading)
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 1: STUDENTS MANAGEMENT
      ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "students" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* 1. ปีการศึกษา */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 shrink-0">ปีการศึกษา:</span>
                  <select
                    value={studentFilterYear}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setStudentFilterYear(e.target.value)}
                    className="text-xs font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs"
                  >
                    <option value="ALL">ทุกปีการศึกษา</option>
                    {academicYearsList.map((y) => (
                      <option key={y} value={y}>
                        ปี {y}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. ภาคเรียน / เทอม */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 shrink-0">เทอม:</span>
                  <select
                    value={studentFilterSemester}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setStudentFilterSemester(e.target.value)}
                    className="text-xs font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs"
                  >
                    <option value="ALL">ทุกเทอม</option>
                    <option value="1">เทอม 1</option>
                    <option value="2">เทอม 2</option>
                  </select>
                </div>

                {/* 3. ระดับชั้น / ห้อง */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 shrink-0">ระดับชั้น/ห้อง:</span>
                  <select
                    value={studentFilterClass}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setStudentFilterClass(e.target.value)}
                    className="text-xs font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs"
                  >
                    <option value="ALL">ทั้งหมดทุกระดับชั้น</option>
                    <optgroup label="ระดับชั้น (แสดงทุกห้อง)">
                      <option value="ม.1">ชั้น ม.1 ทั้งหมด</option>
                      <option value="ม.2">ชั้น ม.2 ทั้งหมด</option>
                      <option value="ม.3">ชั้น ม.3 ทั้งหมด</option>
                      <option value="ม.4">ชั้น ม.4 ทั้งหมด</option>
                      <option value="ม.5">ชั้น ม.5 ทั้งหมด</option>
                      <option value="ม.6">ชั้น ม.6 ทั้งหมด</option>
                    </optgroup>
                    <optgroup label="ห้องเรียนเฉพาะ">
                      {classRooms.map((cr) => (
                        <option key={cr} value={cr}>
                          ห้อง {cr}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อ หรือรหัสนักเรียน..."
                  value={searchStudent}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchStudent(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Indicator of current selection */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span>ตัวกรองที่เลือก:</span>
                <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  ปี {studentFilterYear === "ALL" ? "ทั้งหมด" : studentFilterYear}
                </span>
                <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {studentFilterSemester === "ALL" ? "ทุกเทอม" : `เทอม ${studentFilterSemester}`}
                </span>
                <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {studentFilterClass === "ALL" ? "ทุกห้อง" : studentFilterClass.length === 3 ? `ชั้น ${studentFilterClass}` : `ห้อง ${studentFilterClass}`}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="font-medium">
                  พบข้อมูล <span className="font-bold text-slate-900">{filteredStudents.length}</span> คน จากทั้งหมด {students.length} คน
                </div>
                {canManage && (
                  <div className="flex items-center gap-1.5 ml-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={openImportModal}
                      className="h-7 px-2.5 text-xs gap-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      นำเข้า CSV
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={openCreateStudent}
                      className="h-7 px-2.5 text-xs gap-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      เพิ่มนักเรียน
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Students Table */}
          <LiyonCard>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 text-xs font-bold uppercase">
                    <th className="py-3 px-4 w-14 text-center">เลขที่</th>
                    <th className="py-3 px-4 w-32">รหัสนักเรียน</th>
                    <th className="py-3 px-4">ชื่อ - นามสกุล</th>
                    <th className="py-3 px-4 w-28 text-center">ระดับชั้น/ห้อง</th>
                    <th className="py-3 px-4 w-28 text-center">ปี/เทอม</th>
                    <th className="py-3 px-4 w-20 text-center">เพศ</th>
                    <th className="py-3 px-4 w-28 text-center">สถานะ</th>
                    <th className="py-3 px-4 w-28 text-center">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-10 text-slate-400">
                        ไม่พบข้อมูลนักเรียนที่ตรงกับเงื่อนไขที่เลือก (ปีการศึกษา {studentFilterYear} เทอม {studentFilterSemester} {studentFilterClass})
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-center font-bold text-slate-700">{s.seatNo}</td>
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-700">{s.studentCode}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{s.fullName}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {s.classRoom}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                            {s.academicYear || "2569"}/{s.semester || 1}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-xs text-slate-600">{s.gender || "-"}</td>
                        <td className="py-3 px-4 text-center">
                          {s.status === "GRADUATED" ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              สำเร็จการศึกษา
                            </span>
                          ) : s.status === "SUSPENDED" ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                              พักการเรียน
                            </span>
                          ) : s.status === "TRANSFERRED" ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              ย้ายสถานศึกษา
                            </span>
                          ) : s.status === "DROPOUT" ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              พ้นสภาพ
                            </span>
                          ) : (
                            <StatusPill tone="ok">กำลังศึกษา</StatusPill>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => openEditStudent(s)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="แก้ไข"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmStudent(s)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="ลบ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </LiyonCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 2: COURSES MANAGEMENT
      ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          {/* Header & Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-700" />
                  รายวิชาในหลักสูตรสถานศึกษา ({courses.length} วิชา)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  จัดการรหัสวิชา ชื่อวิชา หน่วยกิต ภาคเรียน กลุ่มสาระการเรียนรู้ และอาจารย์ผู้สอนประจำวิชา
                </p>
              </div>
              {canManage && (
                <Button
                  onClick={openCreateCourse}
                  className="gap-2 bg-blue-700 hover:bg-blue-800 text-white shadow-xs font-semibold shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  เพิ่มรายวิชา
                </Button>
              )}
            </div>

            {/* Filter & Search Controls */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-3">
                {/* 1. กลุ่มสาระการเรียนรู้ */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 shrink-0">กลุ่มสาระฯ:</span>
                  <select
                    value={filterSubjectGroup}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterSubjectGroup(e.target.value)}
                    className="text-xs font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs max-w-[220px] truncate"
                  >
                    <option value="ALL">ทุกกลุ่มสาระการเรียนรู้</option>
                    <option value="กลุ่มสาระการเรียนรู้ภาษาไทย">กลุ่มสาระฯ ภาษาไทย</option>
                    <option value="กลุ่มสาระการเรียนรู้คณิตศาสตร์">กลุ่มสาระฯ คณิตศาสตร์</option>
                    <option value="กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี">กลุ่มสาระฯ วิทยาศาสตร์และเทคโนโลยี</option>
                    <option value="กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม">กลุ่มสาระฯ สังคมศึกษาฯ</option>
                    <option value="กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ">กลุ่มสาระฯ ภาษาต่างประเทศ</option>
                    <option value="กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา">กลุ่มสาระฯ สุขศึกษาและพลศึกษา</option>
                    <option value="กลุ่มสาระการเรียนรู้ศิลปะ">กลุ่มสาระฯ ศิลปะ</option>
                    <option value="กลุ่มสาระการเรียนรู้การงานอาชีพ">กลุ่มสาระฯ การงานอาชีพ</option>
                    <option value="พุทธศาสน์ศึกษาและภาษาบาลี">พุทธศาสน์ศึกษาและภาษาบาลี</option>
                  </select>
                </div>

                {/* 2. ภาคเรียน */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 shrink-0">ภาคเรียน:</span>
                  <select
                    value={filterCourseSemester}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterCourseSemester(e.target.value)}
                    className="text-xs font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs"
                  >
                    <option value="ALL">ทุกภาคเรียน</option>
                    <option value="1">ภาคเรียนที่ 1</option>
                    <option value="2">ภาคเรียนที่ 2</option>
                  </select>
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="ค้นหารหัสวิชา, ชื่อวิชา, อาจารย์ผู้สอน..."
                  value={searchCourse}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchCourse(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Courses Table */}
          <LiyonCard>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 text-xs font-bold uppercase">
                    <th className="py-3 px-4 w-28">รหัสวิชา</th>
                    <th className="py-3 px-4">ชื่อรายวิชา</th>
                    <th className="py-3 px-4 w-24 text-center">หน่วยกิต</th>
                    <th className="py-3 px-4 w-28 text-center">ภาคเรียน</th>
                    <th className="py-3 px-4 w-52">กลุ่มสาระฯ / หลักสูตรที่สังกัด</th>
                    <th className="py-3 px-4 w-48">อาจารย์ผู้สอน</th>
                    <th className="py-3 px-4 w-28 text-center">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCoursesList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-slate-400">
                        ไม่พบข้อมูลรายวิชาที่ตรงกับเงื่อนไขการค้นหา
                      </td>
                    </tr>
                  ) : (
                    filteredCoursesList.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* รหัสวิชา */}
                        <td className="py-3 px-4">
                          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                            {c.courseCode}
                          </span>
                        </td>

                        {/* ชื่อรายวิชา */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {c.curriculumName || "หลักสูตรสถานศึกษา"}
                          </div>
                        </td>

                        {/* หน่วยกิต */}
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            {Number(c.credits).toFixed(1)} นก.
                          </span>
                        </td>

                        {/* ภาคเรียน */}
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            เทอม {c.semester || 1}
                          </span>
                        </td>

                        {/* กลุ่มสาระฯ */}
                        <td className="py-3 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50/70 text-indigo-800 border border-indigo-200/80">
                            {c.subjectGroup || "กลุ่มสาระการเรียนรู้ทั่วไป"}
                          </span>
                        </td>

                        {/* อาจารย์ผู้สอน */}
                        <td className="py-3 px-4">
                          {c.instructorName ? (
                            <div className="flex items-center gap-1.5 text-xs text-slate-800 font-semibold">
                              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="truncate">{c.instructorName}</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => openEditCourse(c)}
                              className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium hover:underline"
                            >
                              <Plus className="w-3 h-3" />
                              เลือกอาจารย์ผู้สอน
                            </button>
                          )}
                        </td>

                        {/* การจัดการ (แก้ไข, ลบ) */}
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => openEditCourse(c)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="แก้ไขรายวิชา"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmCourse(c)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="ลบรายวิชา"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </LiyonCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 3: ATTENDANCE CHECKING
      ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "attendance" && (
        <div className="space-y-4">
          {/* Attendance Controls Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ปีการศึกษา:</label>
                <select
                  value={selectedAcademicYear}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedAcademicYear(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 font-medium bg-slate-50/50"
                >
                  <option value="2569">2569 (ปัจจุบัน)</option>
                  <option value="2568">2568</option>
                  <option value="2567">2567</option>
                  <option value="2570">2570</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ระดับชั้น/ห้อง:</label>
                <select
                  value={selectedClassRoom}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedClassRoom(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 font-medium"
                >
                  {classRooms.filter((c) => c !== "ALL").map((cr) => (
                    <option key={cr} value={cr}>
                      {cr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  รายวิชา ({selectedClassRoom}):
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCourseId(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 font-medium truncate"
                >
                  {availableCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.courseCode} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">วันที่เช็คชื่อ:</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAttendanceDate(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">คาบเรียนที่ (1-40):</label>
                <select
                  value={attendancePeriod}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setAttendancePeriod(Number(e.target.value))}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 font-semibold text-blue-900 bg-blue-50/30"
                >
                  {Array.from({ length: 40 }, (_, i) => i + 1).map((p) => (
                    <option key={p} value={p}>
                      คาบที่ {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Actions & Save Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">เช็คด่วนทั้งห้อง:</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSetAllAttendance("PRESENT")}
                  className="text-xs text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                >
                  มาทั้งหมด (Present)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSetAllAttendance("ABSENT")}
                  className="text-xs text-red-700 border-red-200 hover:bg-red-50"
                >
                  ขาดทั้งหมด
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleExportCSV("attendance")}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs text-slate-700 hover:bg-slate-50 border-slate-300"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" /> ส่งออกสรุปเวลาเรียน (CSV)
                </Button>
                <Button
                  onClick={handleSaveAttendance}
                  disabled={isPending}
                  size="sm"
                  className="gap-1.5 bg-blue-700 hover:bg-blue-800 text-white shadow-2xs font-semibold"
                >
                  <Save className="w-3.5 h-3.5" /> บันทึกการเช็คชื่อ
                </Button>
              </div>
            </div>
          </div>

          {/* Attendance Check Sheet Table */}
          <LiyonCard>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 text-xs font-bold uppercase">
                    <th className="py-3 px-4 w-14 text-center">เลขที่</th>
                    <th className="py-3 px-4 w-32">รหัสนักเรียน</th>
                    <th className="py-3 px-4">ชื่อ - นามสกุล</th>
                    <th className="py-3 px-4 text-center w-80">
                      สถานะการเข้าเรียน (ปีการศึกษา {selectedAcademicYear} • วันที่ {attendanceDate} • คาบที่ {attendancePeriod})
                    </th>
                    <th className="py-3 px-4 w-44 text-center">สถิติเวลาเรียนรวม</th>
                    <th className="py-3 px-4 w-28 text-center">สิทธิ์สอบ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentClassStudents.map((s) => {
                    const st = attendanceMap[s.id] || "PRESENT";
                    const summary = attendanceSummaries.find((a) => a.studentId === s.id);
                    const attPercent = summary?.attendancePercent ?? 100;
                    const isEligible = attPercent >= 80;

                    return (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-center font-bold text-slate-700">{s.seatNo}</td>
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-700">{s.studentCode}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{s.fullName}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 gap-1">
                            <button
                              type="button"
                              onClick={() => setAttendanceMap((prev) => ({ ...prev, [s.id]: "PRESENT" }))}
                              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                                st === "PRESENT" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-emerald-700"
                              }`}
                            >
                              มา
                            </button>
                            <button
                              type="button"
                              onClick={() => setAttendanceMap((prev) => ({ ...prev, [s.id]: "ABSENT" }))}
                              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                                st === "ABSENT" ? "bg-red-600 text-white shadow-xs" : "text-slate-600 hover:text-red-700"
                              }`}
                            >
                              ขาด
                            </button>
                            <button
                              type="button"
                              onClick={() => setAttendanceMap((prev) => ({ ...prev, [s.id]: "LEAVE" }))}
                              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                                st === "LEAVE" ? "bg-amber-500 text-white shadow-xs" : "text-slate-600 hover:text-amber-700"
                              }`}
                            >
                              ลา
                            </button>
                            <button
                              type="button"
                              onClick={() => setAttendanceMap((prev) => ({ ...prev, [s.id]: "LATE" }))}
                              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                                st === "LATE" ? "bg-purple-600 text-white shadow-xs" : "text-slate-600 hover:text-purple-700"
                              }`}
                            >
                              สาย
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex flex-col items-center">
                            <span className={`text-xs font-bold ${isEligible ? "text-emerald-700" : "text-red-600"}`}>
                              {attPercent}%
                            </span>
                            <span className="text-[10px] text-slate-400">
                              (มา {summary?.presentCount ?? 10} / ขาด {summary?.absentCount ?? 0})
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isEligible ? (
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              มีสิทธิ์สอบ
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700 border border-red-300 animate-pulse">
                              มส (&lt; 80%)
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </LiyonCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 4: GRADING & EVALUATION (100 SCORES & AUTOMATIC GRADES)
      ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "grading" && (
        <div className="space-y-4">
          {/* Grading Controls Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ปีการศึกษา:</label>
                <select
                  value={selectedAcademicYear}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedAcademicYear(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg p-2 font-medium bg-slate-50/50 min-w-[120px]"
                >
                  <option value="2569">2569 (ปัจจุบัน)</option>
                  <option value="2568">2568</option>
                  <option value="2567">2567</option>
                  <option value="2570">2570</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ระดับชั้น/ห้อง:</label>
                <select
                  value={selectedClassRoom}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedClassRoom(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg p-2 font-medium min-w-[140px]"
                >
                  {classRooms.filter((c) => c !== "ALL").map((cr) => (
                    <option key={cr} value={cr}>
                      {cr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  รายวิชาที่ตัดเกรด ({selectedClassRoom}):
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCourseId(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg p-2 font-medium min-w-[220px]"
                >
                  {availableCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.courseCode} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 bg-blue-50/70 border border-blue-200/80 rounded-xl px-3.5 py-2">
                <div className="text-xs">
                  <div className="text-slate-500 font-medium">สัดส่วนคะแนน ({selectedClassRoom}):</div>
                  <div className="font-bold text-blue-900 flex items-center gap-1.5 flex-wrap">
                    <span>เก็บ {gradingScheme.maxAssignment}%</span>
                    <span>•</span>
                    <span>กลางภาค {gradingScheme.maxMidterm}%</span>
                    <span>•</span>
                    <span>จิตพิสัย {gradingScheme.maxBehavior}%</span>
                    <span>•</span>
                    <span>ปลายภาค {gradingScheme.maxFinal}%</span>
                    <span className="text-blue-700 font-black">
                      (= {gradingScheme.maxAssignment + gradingScheme.maxMidterm + gradingScheme.maxBehavior + gradingScheme.maxFinal}%)
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-xs font-normal text-slate-600">
                      เวลาเรียนขั้นต่ำ {gradingScheme.minAttendancePercent ?? 80}%
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={openSchemeModal}
                  className="h-8 gap-1.5 text-xs bg-white text-blue-700 border-blue-300 hover:bg-blue-100 font-semibold shadow-2xs"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" /> กำหนดเกณฑ์คะแนน
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleExportCSV("grades")}
                variant="outline"
                className="gap-2 text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-50"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> ส่งออก ปพ.5 (CSV)
              </Button>
              <Button
                onClick={handleSaveAllGrades}
                disabled={isPending}
                className="gap-2 bg-blue-700 hover:bg-blue-800 text-white"
              >
                <Save className="w-4 h-4" /> บันทึกผลการเรียนทั้งหมด
              </Button>
            </div>
          </div>

          {/* Grading Sheet Table */}
          <LiyonCard>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-600 text-xs font-bold uppercase">
                    <th className="py-3 px-3 w-12 text-center">เลขที่</th>
                    <th className="py-3 px-3 w-28">รหัสนักเรียน</th>
                    <th className="py-3 px-3 min-w-[160px]">ชื่อ - นามสกุล</th>
                    <th className="py-3 px-2 text-center w-24">เวลาเรียน</th>
                    <th className="py-3 px-2 text-center w-24">คะแนนเก็บ ({gradingScheme.maxAssignment})</th>
                    <th className="py-3 px-2 text-center w-24">กลางภาค ({gradingScheme.maxMidterm})</th>
                    <th className="py-3 px-2 text-center w-24">จิตพิสัย ({gradingScheme.maxBehavior})</th>
                    <th className="py-3 px-2 text-center w-24">ปลายภาค ({gradingScheme.maxFinal})</th>
                    <th className="py-3 px-2 text-center w-24 font-black">
                      รวม ({gradingScheme.maxAssignment + gradingScheme.maxMidterm + gradingScheme.maxBehavior + gradingScheme.maxFinal})
                    </th>
                    <th className="py-3 px-3 text-center w-24 font-black">เกรด</th>
                    <th className="py-3 px-3 w-32">หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentClassGrades.map((g) => {
                    const attPercent = g.attendancePercent ?? 100;
                    const minAtt = gradingScheme.minAttendancePercent ?? 80;
                    const isMS = attPercent < minAtt;

                    const getGradeBadge = (grade: string) => {
                      if (grade === "มส") return <span className="px-2.5 py-1 rounded-md text-xs font-black bg-red-100 text-red-700 border border-red-300">มส</span>;
                      if (grade === "ร") return <span className="px-2.5 py-1 rounded-md text-xs font-black bg-amber-100 text-amber-800 border border-amber-300">ร</span>;
                      if (grade === "4" || grade === "3.5") return <span className="px-2.5 py-1 rounded-md text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">{grade}</span>;
                      if (grade === "3" || grade === "2.5") return <span className="px-2.5 py-1 rounded-md text-xs font-black bg-blue-100 text-blue-800 border border-blue-300">{grade}</span>;
                      if (grade === "2" || grade === "1.5" || grade === "1") return <span className="px-2.5 py-1 rounded-md text-xs font-black bg-amber-50 text-amber-800 border border-amber-200">{grade}</span>;
                      return <span className="px-2.5 py-1 rounded-md text-xs font-black bg-slate-100 text-slate-700 border border-slate-300">0</span>;
                    };

                    return (
                      <tr key={g.studentId} className={`hover:bg-slate-50/80 transition-colors ${isMS ? "bg-red-50/30" : ""}`}>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-700">{g.seatNo}</td>
                        <td className="py-2.5 px-3 font-mono text-xs font-semibold text-blue-700">{g.studentCode}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{g.studentName}</td>
                        <td className="py-2.5 px-2 text-center">
                          <span className={`text-xs font-bold ${isMS ? "text-red-600" : "text-emerald-700"}`}>
                            {attPercent}%
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max={gradingScheme.maxAssignment}
                            step="0.5"
                            value={g.assignmentScore || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleScoreChange(g.studentId, "assignmentScore", e.target.value)}
                            className="w-16 text-center text-xs p-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                            placeholder="0"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max={gradingScheme.maxMidterm}
                            step="0.5"
                            value={g.midtermScore || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleScoreChange(g.studentId, "midtermScore", e.target.value)}
                            className="w-16 text-center text-xs p-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                            placeholder="0"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max={gradingScheme.maxBehavior}
                            step="0.5"
                            value={g.behaviorScore || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleScoreChange(g.studentId, "behaviorScore", e.target.value)}
                            className="w-16 text-center text-xs p-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                            placeholder="0"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max={gradingScheme.maxFinal}
                            step="0.5"
                            value={g.finalScore || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleScoreChange(g.studentId, "finalScore", e.target.value)}
                            className="w-16 text-center text-xs p-1.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                            placeholder="0"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span className="font-mono text-sm font-black text-slate-900">{g.totalScore}</span>
                        </td>
                        <td className="py-2.5 px-3 text-center">{getGradeBadge(g.grade)}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-xs text-slate-500 truncate block max-w-[120px]">
                            {isMS ? `เวลาเรียนไม่ถึง ${minAtt}%` : g.remarks || "-"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </LiyonCard>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL: CREATE / EDIT STUDENT
      ═══════════════════════════════════════════════════════════════════════ */}
      <LiyonDialog open={studentModalOpen} onOpenChange={setStudentModalOpen}>
        <LiyonDialogHeader title={editingStudent ? "แก้ไขข้อมูลนักเรียน" : "เพิ่มนักเรียนใหม่"} />
        <LiyonDialogBody className="space-y-4">
          {/* ส่วนที่ 1: ข้อมูลปีการศึกษา เทอม ชั้น/ห้อง และสถานะ */}
          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
            <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <span>📅 ข้อมูลปีการศึกษา เทอม ชั้น/ห้อง และสถานะ</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ปีการศึกษา *</label>
                <input
                  type="text"
                  value={formAcademicYear}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormAcademicYear(e.target.value)}
                  placeholder="เช่น 2569"
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">เทอม (ภาคเรียน) *</label>
                <select
                  value={formSemester}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormSemester(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-white font-medium"
                >
                  <option value="1">ภาคเรียนที่ 1</option>
                  <option value="2">ภาคเรียนที่ 2</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ระดับชั้น/ห้อง *</label>
                <select
                  value={formClassRoom}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormClassRoom(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-white font-medium"
                >
                  <option value="ม.1/1">ม.1/1</option>
                  <option value="ม.1/2">ม.1/2</option>
                  <option value="ม.2/1">ม.2/1</option>
                  <option value="ม.2/2">ม.2/2</option>
                  <option value="ม.3/1">ม.3/1</option>
                  <option value="ม.3/2">ม.3/2</option>
                  <option value="ม.4/1">ม.4/1</option>
                  <option value="ม.4/2">ม.4/2</option>
                  <option value="ม.5/1">ม.5/1</option>
                  <option value="ม.5/2">ม.5/2</option>
                  <option value="ม.6/1">ม.6/1</option>
                  <option value="ม.6/2">ม.6/2</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">สถานะนักเรียน *</label>
                <select
                  value={formStatus}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormStatus(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-white font-semibold text-slate-800"
                >
                  <option value="ACTIVE">กำลังศึกษา</option>
                  <option value="GRADUATED">สำเร็จการศึกษา</option>
                  <option value="SUSPENDED">พักการเรียน</option>
                  <option value="TRANSFERRED">ย้ายสถานศึกษา</option>
                  <option value="DROPOUT">พ้นสภาพ</option>
                </select>
              </div>
            </div>
          </div>

          {/* ส่วนที่ 2: รหัสนักเรียน เลขที่ และเพศ */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">รหัสนักเรียน *</label>
              <input
                type="text"
                value={formStudentCode}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormStudentCode(e.target.value)}
                placeholder="เช่น STU69-101"
                className="w-full text-sm border border-slate-200 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">เลขที่ *</label>
              <input
                type="number"
                min="1"
                value={formSeatNo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormSeatNo(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">เพศ</label>
              <select
                value={formGender}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormGender(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg p-2"
              >
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
            </div>
          </div>

          {/* ส่วนที่ 3: คำนำหน้า ชื่อจริง นามสกุล */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">คำนำหน้า</label>
              <select
                value={formTitle}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormTitle(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg p-2"
              >
                <option value="ด.ช.">ด.ช.</option>
                <option value="ด.ญ.">ด.ญ.</option>
                <option value="นาย">นาย</option>
                <option value="น.ส.">น.ส.</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อจริง *</label>
              <input
                type="text"
                value={formFirstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormFirstName(e.target.value)}
                placeholder="ชื่อจริง"
                className="w-full text-sm border border-slate-200 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">นามสกุล *</label>
              <input
                type="text"
                value={formLastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormLastName(e.target.value)}
                placeholder="นามสกุล"
                className="w-full text-sm border border-slate-200 rounded-lg p-2"
              />
            </div>
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setStudentModalOpen(false)}>
            ยกเลิก
          </Button>
          <Button onClick={handleSaveStudent} disabled={isPending} className="bg-blue-700 hover:bg-blue-800 text-white">
            บันทึกข้อมูล
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL: CREATE / EDIT COURSE
      ═══════════════════════════════════════════════════════════════════════ */}
      <LiyonDialog open={courseModalOpen} onOpenChange={setCourseModalOpen}>
        <LiyonDialogHeader title={editingCourse ? "แก้ไขข้อมูลรายวิชา" : "เพิ่มรายวิชาใหม่"} />
        <LiyonDialogBody className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">รหัสวิชา *</label>
              <input
                type="text"
                value={formCourseCode}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormCourseCode(e.target.value)}
                placeholder="เช่น ท21101, ค31101"
                className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:border-blue-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อรายวิชา *</label>
              <input
                type="text"
                value={formCourseName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormCourseName(e.target.value)}
                placeholder="เช่น ภาษาไทยพื้นฐาน 1"
                className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">จำนวนหน่วยกิต *</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="10"
                value={formCredits}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormCredits(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:border-blue-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ภาคเรียน (เทอม) *</label>
              <select
                value={formCourseSemester}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormCourseSemester(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:border-blue-500 focus:outline-hidden bg-white"
              >
                <option value="1">ภาคเรียนที่ 1</option>
                <option value="2">ภาคเรียนที่ 2</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">กลุ่มสาระการเรียนรู้ / หลักสูตรที่สังกัด *</label>
            <select
              value={formSubjectGroup}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormSubjectGroup(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:border-blue-500 focus:outline-hidden bg-white"
            >
              <option value="กลุ่มสาระการเรียนรู้ภาษาไทย">กลุ่มสาระการเรียนรู้ภาษาไทย</option>
              <option value="กลุ่มสาระการเรียนรู้คณิตศาสตร์">กลุ่มสาระการเรียนรู้คณิตศาสตร์</option>
              <option value="กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี">กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี</option>
              <option value="กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม">กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม</option>
              <option value="กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ">กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ</option>
              <option value="กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา">กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา</option>
              <option value="กลุ่มสาระการเรียนรู้ศิลปะ">กลุ่มสาระการเรียนรู้ศิลปะ</option>
              <option value="กลุ่มสาระการเรียนรู้การงานอาชีพ">กลุ่มสาระการเรียนรู้การงานอาชีพ</option>
              <option value="พุทธศาสน์ศึกษาและภาษาบาลี">พุทธศาสน์ศึกษาและภาษาบาลี</option>
            </select>
          </div>

          {/* อาจารย์ผู้สอน */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">
                👨‍🏫 อาจารย์ผู้สอน (เชื่อมต่อบุคลากร / กำหนดเอง)
              </label>
              {formInstructorId && (
                <button
                  type="button"
                  onClick={() => {
                    setFormInstructorId("");
                    setFormInstructorName("");
                  }}
                  className="text-[11px] text-red-600 hover:underline font-semibold"
                >
                  ล้างการเลือก
                </button>
              )}
            </div>

            {/* เลือกจากรายชื่อครู / อาจารย์ในระบบ */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">เลือกจากอาจารย์/บุคลากรในระบบ:</label>
              <select
                value={formInstructorId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  const instId = e.target.value;
                  setFormInstructorId(instId);
                  if (instId) {
                    const inst = instructors.find((i) => i.id === instId);
                    if (inst) {
                      setFormInstructorName(inst.fullName);
                    }
                  }
                }}
                className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:border-blue-500 focus:outline-hidden bg-white"
              >
                <option value="">-- ไม่ระบุ / ระบุชื่อเองด้านล่าง --</option>
                {instructors.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.fullName} {inst.position ? `(${inst.position})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* ช่องกรอกชื่ออาจารย์ผู้สอน (แสดงชื่อที่เลือก หรือพิมพ์เอง) */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">หรือพิมพ์ชื่ออาจารย์ผู้สอนโดยตรง:</label>
              <input
                type="text"
                value={formInstructorName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFormInstructorName(e.target.value);
                  if (formInstructorId) {
                    const inst = instructors.find((i) => i.id === formInstructorId);
                    if (inst && inst.fullName !== e.target.value) {
                      setFormInstructorId("");
                    }
                  }
                }}
                placeholder="เช่น อ.วิภาดา รัตนโกสินทร์, พระมหาบุญเลิศ เขมธโร"
                className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:border-blue-500 focus:outline-hidden bg-white"
              />
            </div>
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setCourseModalOpen(false)}>
            ยกเลิก
          </Button>
          <Button onClick={handleSaveCourse} disabled={isPending} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
            {editingCourse ? "บันทึกการแก้ไข" : "บันทึกรายวิชา"}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL: DELETE COURSE CONFIRM
      ═══════════════════════════════════════════════════════════════════════ */}
      <LiyonDialog open={!!deleteConfirmCourse} onOpenChange={() => setDeleteConfirmCourse(null)}>
        <LiyonDialogHeader title="ยืนยันการลบรายวิชา" />
        <LiyonDialogBody>
          <p className="text-sm text-slate-600">
            คุณแน่ใจหรือไม่ว่าต้องการลบรายวิชา{" "}
            <b>
              {deleteConfirmCourse?.courseCode} - {deleteConfirmCourse?.name}
            </b>
            ? การกระทำนี้ไม่สามารถย้อนกลับได้
          </p>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setDeleteConfirmCourse(null)}>
            ยกเลิก
          </Button>
          <Button onClick={handleDeleteCourse} disabled={isPending} className="bg-red-600 hover:bg-red-700 text-white font-semibold">
            ยืนยันการลบ
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL: DELETE CONFIRM
      ═══════════════════════════════════════════════════════════════════════ */}
      <LiyonDialog open={!!deleteConfirmStudent} onOpenChange={() => setDeleteConfirmStudent(null)}>
        <LiyonDialogHeader title="ยืนยันการลบนักเรียน" />
        <LiyonDialogBody>
          <p className="text-sm text-slate-600">
            คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนักเรียน{" "}
            <b>{deleteConfirmStudent?.fullName}</b> ({deleteConfirmStudent?.studentCode})? การกระทำนี้ไม่สามารถย้อนกลับได้
          </p>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setDeleteConfirmStudent(null)}>
            ยกเลิก
          </Button>
          <Button onClick={handleDeleteStudent} disabled={isPending} className="bg-red-600 hover:bg-red-700 text-white">
            ยืนยันการลบ
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL: CUSTOMIZE GRADING SCHEME (SCORE CRITERIA)
      ═══════════════════════════════════════════════════════════════════════ */}
      <LiyonDialog open={schemeModalOpen} onOpenChange={setSchemeModalOpen}>
        <LiyonDialogHeader
          title={`⚙️ กำหนดสัดส่วนคะแนนและเกณฑ์ตัดเกรด (${selectedClassRoom})`}
        />
        <LiyonDialogBody className="space-y-5">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              💡 เลือกสัดส่วนคะแนนสำเร็จรูป (Presets):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => applySchemePreset(30, 20, 20, 30, 80)}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all group"
              >
                <div className="font-bold text-slate-800 group-hover:text-blue-700">📌 มาตรฐาน สพฐ. / โรงเรียน</div>
                <div className="text-[11px] text-slate-500">เก็บ 30 | กลางภาค 20 | จิตพิสัย 20 | ปลายภาค 30 (รวม 100)</div>
              </button>

              <button
                type="button"
                onClick={() => applySchemePreset(50, 10, 20, 20, 80)}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all group"
              >
                <div className="font-bold text-slate-800 group-hover:text-blue-700">🔬 เน้นปฏิบัติการ / โครงงาน</div>
                <div className="text-[11px] text-slate-500">เก็บ 50 | กลางภาค 10 | จิตพิสัย 20 | ปลายภาค 20 (รวม 100)</div>
              </button>

              <button
                type="button"
                onClick={() => applySchemePreset(20, 30, 20, 30, 80)}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all group"
              >
                <div className="font-bold text-slate-800 group-hover:text-blue-700">📝 เน้นสอบข้อเขียน / ทฤษฎี</div>
                <div className="text-[11px] text-slate-500">เก็บ 20 | กลางภาค 30 | จิตพิสัย 20 | ปลายภาค 30 (รวม 100)</div>
              </button>

              <button
                type="button"
                onClick={() => applySchemePreset(40, 20, 10, 30, 80)}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all group"
              >
                <div className="font-bold text-slate-800 group-hover:text-blue-700">📚 เน้นการบ้านและชิ้นงาน</div>
                <div className="text-[11px] text-slate-500">เก็บ 40 | กลางภาค 20 | จิตพิสัย 10 | ปลายภาค 30 (รวม 100)</div>
              </button>
            </div>
          </div>

          {/* Detailed Inputs */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>กำหนดคะแนนเต็มแต่ละส่วน:</span>
              <span className="text-slate-500 font-normal text-[11px]">หน่วย: คะแนนเต็ม</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  1. คะแนนเก็บ
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={schemeAssignment}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSchemeAssignment(Number(e.target.value) || 0)}
                  className="w-full text-center font-bold text-sm border border-slate-300 rounded-lg p-2 bg-white focus:border-blue-500 focus:outline-hidden"
                />
                <span className="block text-[10px] text-slate-500 mt-0.5 text-center">ใบงาน/การบ้าน</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2. กลางภาค
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={schemeMidterm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSchemeMidterm(Number(e.target.value) || 0)}
                  className="w-full text-center font-bold text-sm border border-slate-300 rounded-lg p-2 bg-white focus:border-blue-500 focus:outline-hidden"
                />
                <span className="block text-[10px] text-slate-500 mt-0.5 text-center">สอบกลางภาค</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  3. จิตพิสัย
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={schemeBehavior}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSchemeBehavior(Number(e.target.value) || 0)}
                  className="w-full text-center font-bold text-sm border border-slate-300 rounded-lg p-2 bg-white focus:border-blue-500 focus:outline-hidden"
                />
                <span className="block text-[10px] text-slate-500 mt-0.5 text-center">พฤติกรรม/เวลาเรียน</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  4. ปลายภาค
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={schemeFinal}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSchemeFinal(Number(e.target.value) || 0)}
                  className="w-full text-center font-bold text-sm border border-slate-300 rounded-lg p-2 bg-white focus:border-blue-500 focus:outline-hidden"
                />
                <span className="block text-[10px] text-slate-500 mt-0.5 text-center">สอบปลายภาค</span>
              </div>
            </div>

            {/* Sum indicator */}
            {(() => {
              const currentTotal = schemeAssignment + schemeMidterm + schemeBehavior + schemeFinal;
              const isHundred = currentTotal === 100;
              return (
                <div
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    isHundred
                      ? "bg-emerald-50/80 border-emerald-200 text-emerald-800"
                      : "bg-amber-50/80 border-amber-200 text-amber-800"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold">
                    {isHundred ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>คะแนนรวม 100 คะแนน ถูกต้องตามเกณฑ์มาตรฐาน</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>คะแนนรวม = {currentTotal} คะแนน (เกณฑ์แนะนำคือ 100 คะแนน)</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm font-black font-mono">
                    {currentTotal} / 100
                  </div>
                </div>
              );
            })()}

            {/* Attendance Minimum Cutoff */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  เกณฑ์เวลาเรียนขั้นต่ำเพื่อมีสิทธิ์สอบ (%)
                </label>
                <p className="text-[11px] text-slate-500">
                  หากนักเรียนมีเวลาเรียนต่ำกว่าเกณฑ์นี้ ระบบจะตัดเกรดเป็น &quot;มส&quot; โดยอัตโนมัติ
                </p>
              </div>
              <div className="flex items-center gap-1.5 w-32 shrink-0">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={schemeMinAttendance}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSchemeMinAttendance(Number(e.target.value) || 0)
                  }
                  className="w-20 text-center font-bold text-sm border border-slate-300 rounded-lg p-1.5 bg-white focus:border-blue-500 focus:outline-hidden"
                />
                <span className="text-xs font-bold text-slate-600">%</span>
              </div>
            </div>
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setSchemeModalOpen(false)}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleSaveScheme}
            disabled={isPending}
            className="bg-blue-700 hover:bg-blue-800 text-white gap-1.5"
          >
            <Save className="w-4 h-4" /> บันทึกเกณฑ์คะแนน
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* ═══════════════════════════════════════════════════════════════════════
          MODAL: IMPORT STUDENTS CSV
      ═══════════════════════════════════════════════════════════════════════ */}
      <LiyonDialog open={importModalOpen} onOpenChange={setImportModalOpen}>
        <LiyonDialogHeader
          title="📥 นำเข้ารายชื่อนักเรียนจากไฟล์ CSV (Import Students CSV)"
        />
        <LiyonDialogBody className="space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Header Description & Download Template */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-blue-50/60 rounded-xl border border-blue-200">
            <div>
              <div className="text-xs font-bold text-blue-900">
                รองรับไฟล์ CSV จาก Google Sheets, Microsoft Excel หรือโปรแกรมระบบทะเบียน
              </div>
              <div className="text-[11px] text-blue-700 mt-0.5">
                หัวตารางที่รองรับ: เลขที่, รหัสนักเรียน, คำนำหน้า, ชื่อ, นามสกุล, ระดับชั้น, ปีการศึกษา, ภาคเรียน, เพศ, สถานะ
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadCsvTemplate}
              className="shrink-0 gap-1.5 text-xs bg-white text-blue-700 border-blue-300 hover:bg-blue-50 font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              ดาวน์โหลดแม่แบบ CSV
            </Button>
          </div>

          {/* File Picker & Upload Area */}
          <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 text-center transition-all bg-slate-50/50 hover:bg-blue-50/30">
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              id="csv-file-input"
              className="hidden"
            />
            <label htmlFor="csv-file-input" className="cursor-pointer block">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-bold text-slate-800">
                {csvFileName ? `ไฟล์ที่เลือก: ${csvFileName}` : "คลิกเพื่อเลือกไฟล์ CSV หรือลากไฟล์มาวางที่นี่"}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                เข้ารหัส UTF-8 หรือ UTF-8 with BOM เพื่อให้แสดงผลภาษาไทยถูกต้องสมบูรณ์
              </div>
            </label>
          </div>

          {/* Fallback Defaults Configuration */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-700">
              ⚙️ ค่าเริ่มต้น (ใช้กรณีที่ในไฟล์ CSV ไม่ได้ระบุคอลัมน์นั้น ๆ ไว้):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">ปีการศึกษาเริ่มต้น:</label>
                <select
                  value={importDefaultYear}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleReapplyDefaults(e.target.value, importDefaultSemester, importDefaultClassRoom)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium"
                >
                  <option value="2570">2570</option>
                  <option value="2569">2569</option>
                  <option value="2568">2568</option>
                  <option value="2567">2567</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">ภาคเรียนเริ่มต้น:</label>
                <select
                  value={importDefaultSemester}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleReapplyDefaults(importDefaultYear, e.target.value, importDefaultClassRoom)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium"
                >
                  <option value="1">ภาคเรียนที่ 1</option>
                  <option value="2">ภาคเรียนที่ 2</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">ระดับชั้น/ห้องเริ่มต้น:</label>
                <select
                  value={importDefaultClassRoom}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleReapplyDefaults(importDefaultYear, importDefaultSemester, e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-1.5 bg-white font-medium"
                >
                  <option value="ม.1/1">ม.1/1</option>
                  <option value="ม.1/2">ม.1/2</option>
                  <option value="ม.2/1">ม.2/1</option>
                  <option value="ม.3/1">ม.3/1</option>
                  <option value="ม.4/1">ม.4/1</option>
                  <option value="ม.4/2">ม.4/2</option>
                  <option value="ม.5/1">ม.5/1</option>
                  <option value="ม.6/1">ม.6/1</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="overwrite-checkbox"
                checked={importOverwrite}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setImportOverwrite(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="overwrite-checkbox" className="text-xs text-slate-700 cursor-pointer">
                <b>เขียนทับ/อัปเดตข้อมูลเดิม</b> หากพบรหัสนักเรียนซ้ำในระบบ (Overwrite existing records)
              </label>
            </div>
          </div>

          {/* Preview Section */}
          {parsedRows.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <span>ตัวอย่างข้อมูลที่อ่านได้:</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 font-semibold text-slate-700">
                    ทั้งหมด {parsedRows.length} แถว
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    ✓ พร้อมนำเข้า {parsedRows.filter((r) => r.isValid).length}
                  </span>
                  {parsedRows.some((r) => !r.isValid) && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                      ✕ ไม่สมบูรณ์ {parsedRows.filter((r) => !r.isValid).length}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setImportFilterTab("all")}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      importFilterTab === "all" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    ทั้งหมด ({parsedRows.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setImportFilterTab("valid")}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      importFilterTab === "valid" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    พร้อมนำเข้า ({parsedRows.filter((r) => r.isValid).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setImportFilterTab("invalid")}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      importFilterTab === "invalid" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    ไม่สมบูรณ์ ({parsedRows.filter((r) => !r.isValid).length})
                  </button>
                </div>
              </div>

              {/* Preview Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto text-xs shadow-2xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 sticky top-0 text-slate-600 font-bold uppercase text-[11px]">
                    <tr className="border-b border-slate-200">
                      <th className="py-2 px-2.5 text-center w-10">แถว</th>
                      <th className="py-2 px-2.5 text-center w-12">เลขที่</th>
                      <th className="py-2 px-2.5 w-28">รหัสนักเรียน</th>
                      <th className="py-2 px-2.5">ชื่อ - นามสกุล</th>
                      <th className="py-2 px-2.5 text-center w-20">ระดับชั้น</th>
                      <th className="py-2 px-2.5 text-center w-20">ปี/เทอม</th>
                      <th className="py-2 px-2.5 text-center w-14">เพศ</th>
                      <th className="py-2 px-2.5 text-center w-20">สถานะ</th>
                      <th className="py-2 px-2.5 text-center w-24">ความพร้อม</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayedPreviewRows.map((r) => (
                      <tr key={r.rowNumber} className={r.isValid ? "hover:bg-slate-50" : "bg-rose-50/50"}>
                        <td className="py-2 px-2.5 text-center text-slate-400">{r.rowNumber}</td>
                        <td className="py-2 px-2.5 text-center font-bold text-slate-700">{r.seatNo}</td>
                        <td className="py-2 px-2.5 font-mono text-blue-700 font-semibold">{r.studentCode}</td>
                        <td className="py-2 px-2.5 font-medium text-slate-900">{r.fullName}</td>
                        <td className="py-2 px-2.5 text-center font-semibold text-slate-700">{r.classRoom}</td>
                        <td className="py-2 px-2.5 text-center font-mono text-slate-600">{r.academicYear}/{r.semester}</td>
                        <td className="py-2 px-2.5 text-center text-slate-600">{r.gender}</td>
                        <td className="py-2 px-2.5 text-center text-[11px] text-slate-600">{r.status}</td>
                        <td className="py-2 px-2.5 text-center">
                          {r.isValid ? (
                            <span className="text-emerald-700 font-bold text-[11px] inline-flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> พร้อม
                            </span>
                          ) : (
                            <span className="text-rose-600 font-bold text-[11px]" title={r.errorMsg}>
                              ✕ {r.errorMsg}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setImportModalOpen(false)}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleConfirmImport}
            disabled={isPending || parsedRows.filter((r) => r.isValid).length === 0}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2"
          >
            <Upload className="w-4 h-4" />
            ยืนยันนำเข้าข้อมูล ({parsedRows.filter((r) => r.isValid).length} คน)
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
