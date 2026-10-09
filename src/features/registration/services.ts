import { prisma } from "@/shared/lib/infra/prisma";
import type {
  StudentDto,
  CourseDto,
  AttendanceDto,
  StudentAttendanceSummary,
  GradeRecordDto,
  CourseGradingSchemeDto,
} from "./types";

export function calculateGrade(
  assignmentScore: number,
  midtermScore: number,
  behaviorScore: number,
  finalScore: number,
  attendancePercent?: number,
  explicitStatus?: string | null,
  minAttendancePercent: number = 80,
): { totalScore: number; grade: string; isPassing: boolean } {
  const total = Math.min(100, Math.max(0, Math.round((assignmentScore + midtermScore + behaviorScore + finalScore) * 10) / 10));

  if (explicitStatus === "ร") {
    return { totalScore: total, grade: "ร", isPassing: false };
  }

  if (explicitStatus === "มส" || (attendancePercent !== undefined && attendancePercent < minAttendancePercent)) {
    return { totalScore: total, grade: "มส", isPassing: false };
  }

  let grade = "0";
  if (total >= 80) grade = "4";
  else if (total >= 75) grade = "3.5";
  else if (total >= 70) grade = "3";
  else if (total >= 65) grade = "2.5";
  else if (total >= 60) grade = "2";
  else if (total >= 55) grade = "1.5";
  else if (total >= 50) grade = "1";
  else grade = "0";

  return { totalScore: total, grade, isPassing: total >= 50 };
}

export async function getGradingScheme(
  tenantId: string,
  courseId: string,
  classRoom: string,
  academicYear: string = "2569",
  semester: number = 1,
): Promise<CourseGradingSchemeDto> {
  const scheme = await prisma.courseGradingScheme.findFirst({
    where: {
      tenantId,
      courseId,
      academicYear,
      semester,
      classRoom: { in: [classRoom, "DEFAULT"] },
    },
    orderBy: { classRoom: "asc" },
  });

  if (scheme) {
    return {
      id: scheme.id,
      courseId: scheme.courseId,
      classRoom,
      academicYear: scheme.academicYear,
      semester: scheme.semester,
      maxAssignment: scheme.maxAssignment,
      maxMidterm: scheme.maxMidterm,
      maxBehavior: scheme.maxBehavior,
      maxFinal: scheme.maxFinal,
      minAttendancePercent: scheme.minAttendancePercent,
    };
  }

  return {
    id: "",
    courseId,
    classRoom,
    academicYear,
    semester,
    maxAssignment: 30,
    maxMidterm: 20,
    maxBehavior: 20,
    maxFinal: 30,
    minAttendancePercent: 80,
  };
}

export async function saveGradingScheme(
  tenantId: string,
  data: {
    courseId: string;
    classRoom: string;
    maxAssignment: number;
    maxMidterm: number;
    maxBehavior: number;
    maxFinal: number;
    minAttendancePercent?: number;
    academicYear?: string;
    semester?: number;
  },
): Promise<CourseGradingSchemeDto> {
  const academicYear = data.academicYear || "2569";
  const semester = data.semester || 1;
  const minAttendancePercent = data.minAttendancePercent !== undefined ? Number(data.minAttendancePercent) : 80;

  const upserted = await prisma.courseGradingScheme.upsert({
    where: {
      courseId_classRoom_academicYear_semester: {
        courseId: data.courseId,
        classRoom: data.classRoom,
        academicYear,
        semester,
      },
    },
    update: {
      maxAssignment: Number(data.maxAssignment),
      maxMidterm: Number(data.maxMidterm),
      maxBehavior: Number(data.maxBehavior),
      maxFinal: Number(data.maxFinal),
      minAttendancePercent,
    },
    create: {
      tenantId,
      courseId: data.courseId,
      classRoom: data.classRoom,
      academicYear,
      semester,
      maxAssignment: Number(data.maxAssignment),
      maxMidterm: Number(data.maxMidterm),
      maxBehavior: Number(data.maxBehavior),
      maxFinal: Number(data.maxFinal),
      minAttendancePercent,
    },
  });

  return {
    id: upserted.id,
    courseId: upserted.courseId,
    classRoom: upserted.classRoom,
    academicYear: upserted.academicYear,
    semester: upserted.semester,
    maxAssignment: upserted.maxAssignment,
    maxMidterm: upserted.maxMidterm,
    maxBehavior: upserted.maxBehavior,
    maxFinal: upserted.maxFinal,
    minAttendancePercent: upserted.minAttendancePercent,
  };
}

export async function listStudents(
  tenantId: string,
  filter?: { classRoom?: string; search?: string },
): Promise<StudentDto[]> {
  const where: any = { tenantId };
  if (filter?.classRoom && filter.classRoom !== "ALL") {
    where.classRoom = filter.classRoom;
  }
  if (filter?.search) {
    const q = filter.search.trim();
    where.OR = [
      { studentCode: { contains: q, mode: "insensitive" } },
      { firstName: { contains: q, mode: "insensitive" } },
      { lastName: { contains: q, mode: "insensitive" } },
      { classRoom: { contains: q, mode: "insensitive" } },
    ];
  }

  const rows = await prisma.student.findMany({
    where,
    orderBy: [{ classRoom: "asc" }, { seatNo: "asc" }, { studentCode: "asc" }],
  });

  return rows.map((s) => ({
    id: s.id,
    studentCode: s.studentCode,
    title: s.title,
    firstName: s.firstName,
    lastName: s.lastName,
    fullName: `${s.title}${s.firstName} ${s.lastName}`,
    classRoom: s.classRoom,
    seatNo: s.seatNo,
    gender: s.gender,
    status: s.status,
    createdAt: s.createdAt.toISOString(),
  }));
}

export async function createStudent(
  tenantId: string,
  data: {
    studentCode: string;
    title?: string;
    firstName: string;
    lastName: string;
    classRoom: string;
    seatNo: number;
    gender?: string;
  },
): Promise<StudentDto> {
  const created = await prisma.student.create({
    data: {
      tenantId,
      studentCode: data.studentCode.trim(),
      title: data.title?.trim() || "ด.ช.",
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      classRoom: data.classRoom.trim(),
      seatNo: Number(data.seatNo),
      gender: data.gender || "ชาย",
    },
  });

  return {
    id: created.id,
    studentCode: created.studentCode,
    title: created.title,
    firstName: created.firstName,
    lastName: created.lastName,
    fullName: `${created.title}${created.firstName} ${created.lastName}`,
    classRoom: created.classRoom,
    seatNo: created.seatNo,
    gender: created.gender,
    status: created.status,
    createdAt: created.createdAt.toISOString(),
  };
}

export async function updateStudent(
  tenantId: string,
  id: string,
  data: {
    studentCode?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    classRoom?: string;
    seatNo?: number;
    gender?: string;
    status?: string;
  },
): Promise<StudentDto> {
  const updated = await prisma.student.update({
    where: { id, tenantId },
    data: {
      ...(data.studentCode ? { studentCode: data.studentCode.trim() } : {}),
      ...(data.title ? { title: data.title.trim() } : {}),
      ...(data.firstName ? { firstName: data.firstName.trim() } : {}),
      ...(data.lastName ? { lastName: data.lastName.trim() } : {}),
      ...(data.classRoom ? { classRoom: data.classRoom.trim() } : {}),
      ...(data.seatNo !== undefined ? { seatNo: Number(data.seatNo) } : {}),
      ...(data.gender !== undefined ? { gender: data.gender } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
    },
  });

  return {
    id: updated.id,
    studentCode: updated.studentCode,
    title: updated.title,
    firstName: updated.firstName,
    lastName: updated.lastName,
    fullName: `${updated.title}${updated.firstName} ${updated.lastName}`,
    classRoom: updated.classRoom,
    seatNo: updated.seatNo,
    gender: updated.gender,
    status: updated.status,
    createdAt: updated.createdAt.toISOString(),
  };
}

export async function deleteStudent(tenantId: string, id: string): Promise<void> {
  await prisma.student.delete({
    where: { id, tenantId },
  });
}

export async function listCourses(tenantId: string): Promise<CourseDto[]> {
  const courses = await prisma.course.findMany({
    where: { curriculum: { tenantId } },
    include: { curriculum: { select: { name: true } } },
    orderBy: { courseCode: "asc" },
  });

  return courses.map((c) => ({
    id: c.id,
    courseCode: c.courseCode,
    name: c.name,
    credits: c.credits,
    semester: c.semester,
    curriculumName: c.curriculum?.name,
  }));
}

export async function createCourse(
  tenantId: string,
  data: {
    courseCode: string;
    name: string;
    credits: number;
    semester?: number;
    curriculumId?: string;
  },
): Promise<CourseDto> {
  let currId = data.curriculumId;
  if (!currId) {
    const firstCurr = await prisma.curriculum.findFirst({ where: { tenantId } });
    if (firstCurr) {
      currId = firstCurr.id;
    } else {
      const createdCurr = await prisma.curriculum.create({
        data: {
          tenantId,
          code: "CURR-GEN-01",
          name: "หลักสูตรสถานศึกษา โรงเรียนสาธิตฯ",
          degreeLevel: "มัธยมศึกษา",
          totalCredits: 77,
        },
      });
      currId = createdCurr.id;
    }
  }

  const created = await prisma.course.create({
    data: {
      curriculumId: currId,
      courseCode: data.courseCode.trim(),
      name: data.name.trim(),
      credits: Number(data.credits) || 1,
      semester: data.semester ? Number(data.semester) : 1,
    },
    include: { curriculum: { select: { name: true } } },
  });

  return {
    id: created.id,
    courseCode: created.courseCode,
    name: created.name,
    credits: created.credits,
    semester: created.semester,
    curriculumName: created.curriculum?.name,
  };
}

export async function deleteCourse(tenantId: string, id: string): Promise<void> {
  await prisma.course.delete({
    where: { id },
  });
}

export async function recordBatchAttendance(
  tenantId: string,
  records: {
    studentId: string;
    courseId?: string | null;
    classDate: string; // "YYYY-MM-DD"
    period: number;
    status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE";
    remarks?: string;
  }[],
): Promise<void> {
  for (const rec of records) {
    const d = new Date(rec.classDate);
    await prisma.attendance.upsert({
      where: {
        studentId_courseId_classDate_period: {
          studentId: rec.studentId,
          courseId: rec.courseId || null as any,
          classDate: d,
          period: rec.period,
        },
      },
      update: {
        status: rec.status,
        remarks: rec.remarks,
      },
      create: {
        tenantId,
        studentId: rec.studentId,
        courseId: rec.courseId,
        classDate: d,
        period: rec.period,
        status: rec.status,
        remarks: rec.remarks,
      },
    });
  }
}

export async function getAttendanceForPeriod(
  tenantId: string,
  classRoom: string,
  classDate: string,
  period: number,
  courseId?: string | null,
): Promise<Record<string, "PRESENT" | "ABSENT" | "LEAVE" | "LATE">> {
  const d = new Date(classDate);
  const where: any = {
    tenantId,
    student: { classRoom },
    classDate: d,
    period,
  };
  if (courseId) {
    where.courseId = courseId;
  }
  const records = await prisma.attendance.findMany({ where });
  const map: Record<string, "PRESENT" | "ABSENT" | "LEAVE" | "LATE"> = {};
  for (const r of records) {
    map[r.studentId] = r.status as any;
  }
  return map;
}

export async function getStudentAttendanceSummaries(
  tenantId: string,
  classRoom: string,
  courseId?: string,
): Promise<StudentAttendanceSummary[]> {
  const students = await prisma.student.findMany({
    where: { tenantId, classRoom },
    orderBy: [{ seatNo: "asc" }, { studentCode: "asc" }],
  });

  const summaries: StudentAttendanceSummary[] = [];

  for (const s of students) {
    const attWhere: any = {
      tenantId,
      studentId: s.id,
    };
    if (courseId) {
      attWhere.courseId = courseId;
    }

    const attList = await prisma.attendance.findMany({ where: attWhere });
    const totalPeriods = attList.length;
    const presentCount = attList.filter((a) => a.status === "PRESENT").length;
    const absentCount = attList.filter((a) => a.status === "ABSENT").length;
    const leaveCount = attList.filter((a) => a.status === "LEAVE").length;
    const lateCount = attList.filter((a) => a.status === "LATE").length;

    // Time calculation: Present + Late (counted as present or with proportion)
    const effectivePresent = presentCount + lateCount * 0.5;
    const attendancePercent = totalPeriods > 0 ? Math.round((effectivePresent / totalPeriods) * 100) : 100;
    const isEligibleForExam = attendancePercent >= 80;

    summaries.push({
      studentId: s.id,
      studentCode: s.studentCode,
      studentName: `${s.title}${s.firstName} ${s.lastName}`,
      classRoom: s.classRoom,
      seatNo: s.seatNo,
      totalPeriods,
      presentCount,
      absentCount,
      leaveCount,
      lateCount,
      attendancePercent,
      isEligibleForExam,
    });
  }

  return summaries;
}

export async function listGrades(
  tenantId: string,
  classRoom: string,
  courseId: string,
  academicYear: string = "2569",
  semester: number = 1,
): Promise<GradeRecordDto[]> {
  const students = await prisma.student.findMany({
    where: { tenantId, classRoom },
    orderBy: [{ seatNo: "asc" }, { studentCode: "asc" }],
  });

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return [];

  const existingGrades = await prisma.gradeRecord.findMany({
    where: {
      tenantId,
      courseId,
      academicYear,
      semester,
      studentId: { in: students.map((s) => s.id) },
    },
  });

  const gradeMap = new Map(existingGrades.map((g) => [g.studentId, g]));

  // Grading scheme for attendance cutoff
  const scheme = await getGradingScheme(tenantId, courseId, classRoom, academicYear, semester);

  // Also get attendance summaries to verify if < 80% (or custom minAttendancePercent)
  const attSummaries = await getStudentAttendanceSummaries(tenantId, classRoom, courseId);
  const attMap = new Map(attSummaries.map((a) => [a.studentId, a]));

  return students.map((s) => {
    const existing = gradeMap.get(s.id);
    const att = attMap.get(s.id);
    const attPercent = att?.attendancePercent ?? 100;

    if (existing) {
      // Re-evaluate if attendance < minAttendancePercent and not explicitly overridden
      const calc = calculateGrade(
        existing.assignmentScore,
        existing.midtermScore,
        existing.behaviorScore,
        existing.finalScore,
        attPercent,
        existing.grade === "ร" ? "ร" : undefined,
        scheme.minAttendancePercent,
      );

      return {
        id: existing.id,
        studentId: s.id,
        studentCode: s.studentCode,
        studentName: `${s.title}${s.firstName} ${s.lastName}`,
        classRoom: s.classRoom,
        seatNo: s.seatNo,
        courseId: course.id,
        courseCode: course.courseCode,
        courseName: course.name,
        academicYear,
        semester,
        assignmentScore: existing.assignmentScore,
        midtermScore: existing.midtermScore,
        behaviorScore: existing.behaviorScore,
        finalScore: existing.finalScore,
        totalScore: calc.totalScore,
        grade: calc.grade,
        isPassing: calc.isPassing,
        remarks: existing.remarks,
        attendancePercent: attPercent,
      };
    }

    // Default zero record
    const defCalc = calculateGrade(0, 0, 0, 0, attPercent, undefined, scheme.minAttendancePercent);
    return {
      id: "",
      studentId: s.id,
      studentCode: s.studentCode,
      studentName: `${s.title}${s.firstName} ${s.lastName}`,
      classRoom: s.classRoom,
      seatNo: s.seatNo,
      courseId: course.id,
      courseCode: course.courseCode,
      courseName: course.name,
      academicYear,
      semester,
      assignmentScore: 0,
      midtermScore: 0,
      behaviorScore: 0,
      finalScore: 0,
      totalScore: 0,
      grade: defCalc.grade,
      isPassing: defCalc.isPassing,
      remarks: "",
      attendancePercent: attPercent,
    };
  });
}

export async function saveGradeRecord(
  tenantId: string,
  data: {
    studentId: string;
    courseId: string;
    assignmentScore: number;
    midtermScore: number;
    behaviorScore: number;
    finalScore: number;
    remarks?: string;
    academicYear?: string;
    semester?: number;
    explicitStatus?: string | null;
  },
): Promise<GradeRecordDto> {
  const academicYear = data.academicYear || "2569";
  const semester = data.semester || 1;

  // Check student attendance
  const student = await prisma.student.findUnique({ where: { id: data.studentId } });
  if (!student) throw new Error("Student not found");

  const course = await prisma.course.findUnique({ where: { id: data.courseId } });
  if (!course) throw new Error("Course not found");

  const scheme = await getGradingScheme(tenantId, data.courseId, student.classRoom, academicYear, semester);
  const attSummaries = await getStudentAttendanceSummaries(tenantId, student.classRoom, course.id);
  const myAtt = attSummaries.find((a) => a.studentId === student.id);
  const attPercent = myAtt?.attendancePercent ?? 100;

  const calc = calculateGrade(
    Number(data.assignmentScore) || 0,
    Number(data.midtermScore) || 0,
    Number(data.behaviorScore) || 0,
    Number(data.finalScore) || 0,
    attPercent,
    data.explicitStatus,
    scheme.minAttendancePercent,
  );

  const upserted = await prisma.gradeRecord.upsert({
    where: {
      studentId_courseId_academicYear_semester: {
        studentId: data.studentId,
        courseId: data.courseId,
        academicYear,
        semester,
      },
    },
    update: {
      assignmentScore: Number(data.assignmentScore) || 0,
      midtermScore: Number(data.midtermScore) || 0,
      behaviorScore: Number(data.behaviorScore) || 0,
      finalScore: Number(data.finalScore) || 0,
      totalScore: calc.totalScore,
      grade: calc.grade,
      isPassing: calc.isPassing,
      remarks: data.remarks || null,
    },
    create: {
      tenantId,
      studentId: data.studentId,
      courseId: data.courseId,
      academicYear,
      semester,
      assignmentScore: Number(data.assignmentScore) || 0,
      midtermScore: Number(data.midtermScore) || 0,
      behaviorScore: Number(data.behaviorScore) || 0,
      finalScore: Number(data.finalScore) || 0,
      totalScore: calc.totalScore,
      grade: calc.grade,
      isPassing: calc.isPassing,
      remarks: data.remarks || null,
    },
  });

  return {
    id: upserted.id,
    studentId: student.id,
    studentCode: student.studentCode,
    studentName: `${student.title}${student.firstName} ${student.lastName}`,
    classRoom: student.classRoom,
    seatNo: student.seatNo,
    courseId: course.id,
    courseCode: course.courseCode,
    courseName: course.name,
    academicYear,
    semester,
    assignmentScore: upserted.assignmentScore,
    midtermScore: upserted.midtermScore,
    behaviorScore: upserted.behaviorScore,
    finalScore: upserted.finalScore,
    totalScore: upserted.totalScore,
    grade: upserted.grade,
    isPassing: upserted.isPassing,
    remarks: upserted.remarks,
    attendancePercent: attPercent,
  };
}
