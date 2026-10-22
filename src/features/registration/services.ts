import { prisma } from "@/shared/lib/infra/prisma";
import type {
  StudentDto,
  CourseDto,
  AttendanceDto,
  StudentAttendanceSummary,
  GradeRecordDto,
  CourseGradingSchemeDto,
  ImportStudentInput,
  ImportBatchStudentsResult,
  InstructorDto,
  BulkPromoteStudentsInput,
  BulkUpdateStudentsInput,
  BulkCopyStudentInputItem,
  BulkCopyCourseInputItem,
  BulkUpdateCoursesInput,
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

  if (explicitStatus === "มส") {
    return { totalScore: total, grade: "มส", isPassing: false };
  }

  if (explicitStatus === "0") {
    return { totalScore: total, grade: "0", isPassing: false };
  }

  if (attendancePercent !== undefined && attendancePercent < minAttendancePercent) {
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
  filter?: { classRoom?: string; academicYear?: string; semester?: number; search?: string },
): Promise<StudentDto[]> {
  const where: any = { tenantId };
  if (filter?.classRoom && filter.classRoom !== "ALL") {
    if (/^ม\.[1-6]$/.test(filter.classRoom)) {
      where.classRoom = { startsWith: filter.classRoom };
    } else {
      where.classRoom = filter.classRoom;
    }
  }
  if (filter?.academicYear && filter.academicYear !== "ALL") {
    where.academicYear = filter.academicYear;
  }
  if (filter?.semester !== undefined && filter.semester !== null && filter.semester !== 0) {
    where.semester = Number(filter.semester);
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
    academicYear: s.academicYear,
    semester: s.semester,
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
    academicYear?: string;
    semester?: number;
    gender?: string;
    status?: string;
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
      academicYear: data.academicYear?.trim() || "2569",
      semester: data.semester ? Number(data.semester) : 1,
      gender: data.gender || "ชาย",
      status: data.status || "ACTIVE",
    },
  });

  await enrollStudentIntoCourses(tenantId, created.id, created.classRoom, created.academicYear, created.semester);

  return {
    id: created.id,
    studentCode: created.studentCode,
    title: created.title,
    firstName: created.firstName,
    lastName: created.lastName,
    fullName: `${created.title}${created.firstName} ${created.lastName}`,
    classRoom: created.classRoom,
    seatNo: created.seatNo,
    academicYear: created.academicYear,
    semester: created.semester,
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
    academicYear?: string;
    semester?: number;
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
      ...(data.academicYear ? { academicYear: data.academicYear.trim() } : {}),
      ...(data.semester !== undefined ? { semester: Number(data.semester) } : {}),
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
    academicYear: updated.academicYear,
    semester: updated.semester,
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

export async function promoteStudents(
  tenantId: string,
  data: BulkPromoteStudentsInput,
): Promise<{ updatedCount: number; students: StudentDto[] }> {
  const students = await prisma.student.findMany({
    where: { id: { in: data.studentIds }, tenantId },
  });

  const updatedStudents: StudentDto[] = [];

  for (const s of students) {
    let nextClassRoom = s.classRoom;
    let nextStatus = s.status;
    let nextTitle = s.title;

    const override = data.studentOverrides?.[s.id];
    const effectiveMode = override?.mode || data.mode;
    const effectiveTargetRoom = override?.targetClassRoom || data.targetClassRoom;

    if (effectiveMode === "GRADUATE") {
      nextStatus = "GRADUATED";
    } else if (effectiveMode === "RETAIN") {
      nextClassRoom = s.classRoom;
    } else if (effectiveMode === "SPECIFY_ROOM") {
      nextClassRoom = effectiveTargetRoom?.trim() || s.classRoom;
    } else if (effectiveMode === "PROMOTE_NEXT") {
      const match = s.classRoom.match(/ม\.([1-6])(.*)/);
      if (match) {
        const gradeNum = parseInt(match[1], 10);
        const suffix = match[2] || "";
        if (gradeNum >= 6) {
          nextStatus = "GRADUATED";
        } else {
          const nextGrade = gradeNum + 1;
          nextClassRoom = `ม.${nextGrade}${suffix}`;
          if (nextGrade >= 4) {
            if (s.title === "ด.ช.") nextTitle = "นาย";
            else if (s.title === "ด.ญ.") nextTitle = "น.ส.";
          }
        }
      }
    }

    const updated = await prisma.student.update({
      where: { id: s.id },
      data: {
        classRoom: nextClassRoom,
        status: nextStatus,
        title: nextTitle,
        academicYear: data.targetAcademicYear.trim(),
        semester: Number(data.targetSemester) || 1,
      },
    });

    if (nextStatus === "ACTIVE") {
      await enrollStudentIntoCourses(
        tenantId,
        updated.id,
        updated.classRoom,
        updated.academicYear,
        updated.semester,
      );
    }

    updatedStudents.push({
      id: updated.id,
      studentCode: updated.studentCode,
      title: updated.title,
      firstName: updated.firstName,
      lastName: updated.lastName,
      fullName: `${updated.title}${updated.firstName} ${updated.lastName}`,
      classRoom: updated.classRoom,
      seatNo: updated.seatNo,
      academicYear: updated.academicYear,
      semester: updated.semester,
      gender: updated.gender,
      status: updated.status,
      createdAt: updated.createdAt.toISOString(),
    });
  }

  return { updatedCount: updatedStudents.length, students: updatedStudents };
}

export async function bulkDeleteStudents(tenantId: string, studentIds: string[]): Promise<number> {
  const res = await prisma.student.deleteMany({
    where: { id: { in: studentIds }, tenantId },
  });
  return res.count;
}

export async function bulkUpdateStudents(
  tenantId: string,
  data: BulkUpdateStudentsInput,
): Promise<{ updatedCount: number; students: StudentDto[] }> {
  const students = await prisma.student.findMany({
    where: { id: { in: data.studentIds }, tenantId },
  });

  const updatedStudents: StudentDto[] = [];

  for (const s of students) {
    const updated = await prisma.student.update({
      where: { id: s.id },
      data: {
        ...(data.classRoom ? { classRoom: data.classRoom.trim() } : {}),
        ...(data.academicYear ? { academicYear: data.academicYear.trim() } : {}),
        ...(data.semester !== undefined ? { semester: Number(data.semester) } : {}),
        ...(data.status ? { status: data.status.trim() } : {}),
      },
    });

    if (updated.status === "ACTIVE") {
      await enrollStudentIntoCourses(
        tenantId,
        updated.id,
        updated.classRoom,
        updated.academicYear,
        updated.semester,
      );
    }

    updatedStudents.push({
      id: updated.id,
      studentCode: updated.studentCode,
      title: updated.title,
      firstName: updated.firstName,
      lastName: updated.lastName,
      fullName: `${updated.title}${updated.firstName} ${updated.lastName}`,
      classRoom: updated.classRoom,
      seatNo: updated.seatNo,
      academicYear: updated.academicYear,
      semester: updated.semester,
      gender: updated.gender,
      status: updated.status,
      createdAt: updated.createdAt.toISOString(),
    });
  }

  return { updatedCount: updatedStudents.length, students: updatedStudents };
}

export async function copyStudents(
  tenantId: string,
  items: BulkCopyStudentInputItem[],
): Promise<{ copiedCount: number; students: StudentDto[] }> {
  const resultStudents: StudentDto[] = [];

  for (const item of items) {
    const studentCode = item.studentCode.trim();
    if (!studentCode) continue;

    const academicYear = item.academicYear?.trim() || "2569";
    const semester = Number(item.semester) || 1;

    const existing = await prisma.student.findUnique({
      where: {
        tenantId_studentCode_academicYear_semester: {
          tenantId,
          studentCode,
          academicYear,
          semester,
        },
      },
    });

    let studentRecord;
    if (existing) {
      studentRecord = await prisma.student.update({
        where: { id: existing.id },
        data: {
          title: item.title,
          firstName: item.firstName.trim(),
          lastName: item.lastName.trim(),
          classRoom: item.classRoom.trim(),
          seatNo: Number(item.seatNo) || 1,
          academicYear,
          semester,
          gender: item.gender || existing.gender,
          status: item.status || "ACTIVE",
        },
      });
    } else {
      studentRecord = await prisma.student.create({
        data: {
          tenantId,
          studentCode,
          title: item.title,
          firstName: item.firstName.trim(),
          lastName: item.lastName.trim(),
          classRoom: item.classRoom.trim(),
          seatNo: Number(item.seatNo) || 1,
          academicYear,
          semester,
          gender: item.gender || "ชาย",
          status: item.status || "ACTIVE",
        },
      });
    }

    if (studentRecord.status === "ACTIVE") {
      await enrollStudentIntoCourses(
        tenantId,
        studentRecord.id,
        studentRecord.classRoom,
        studentRecord.academicYear,
        studentRecord.semester,
      );
    }

    resultStudents.push({
      id: studentRecord.id,
      studentCode: studentRecord.studentCode,
      title: studentRecord.title,
      firstName: studentRecord.firstName,
      lastName: studentRecord.lastName,
      fullName: `${studentRecord.title}${studentRecord.firstName} ${studentRecord.lastName}`,
      classRoom: studentRecord.classRoom,
      seatNo: studentRecord.seatNo,
      academicYear: studentRecord.academicYear,
      semester: studentRecord.semester,
      gender: studentRecord.gender,
      status: studentRecord.status,
      createdAt: studentRecord.createdAt.toISOString(),
    });
  }

  return {
    copiedCount: resultStudents.length,
    students: resultStudents,
  };
}

export async function importBatchStudents(
  tenantId: string,
  items: ImportStudentInput[],
  options?: { overwriteExisting?: boolean },
): Promise<ImportBatchStudentsResult> {
  const overwrite = options?.overwriteExisting ?? true;
  let createdCount = 0;
  let updatedCount = 0;
  let failedCount = 0;
  const errors: { row: number; studentCode?: string; message: string }[] = [];
  const processedStudents: StudentDto[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const rowNum = i + 1;
    const studentCode = item.studentCode?.trim();
    const firstName = item.firstName?.trim();
    const lastName = item.lastName?.trim();
    const classRoom = item.classRoom?.trim() || "ม.1/1";
    const seatNo = Number(item.seatNo) || rowNum;
    const academicYear = item.academicYear?.trim() || "2569";
    const semester = item.semester ? Number(item.semester) : 1;
    const title =
      item.title?.trim() ||
      (classRoom.startsWith("ม.4") || classRoom.startsWith("ม.5") || classRoom.startsWith("ม.6") ? "นาย" : "ด.ช.");
    let gender = item.gender?.trim();
    if (!gender) {
      if (title.includes("ญ") || title.includes("น.ส.")) gender = "หญิง";
      else gender = "ชาย";
    }
    const status = item.status?.trim() || "ACTIVE";

    if (!studentCode || !firstName || !lastName) {
      failedCount++;
      errors.push({
        row: rowNum,
        studentCode,
        message: "ข้อมูลไม่ครบถ้วน (ต้องมี รหัสนักเรียน, ชื่อจริง, นามสกุล)",
      });
      continue;
    }

    try {
      const existing = await prisma.student.findUnique({
        where: {
          tenantId_studentCode_academicYear_semester: {
            tenantId,
            studentCode,
            academicYear,
            semester,
          },
        },
      });

      if (existing) {
        if (overwrite) {
          const updated = await prisma.student.update({
            where: { id: existing.id },
            data: {
              title,
              firstName,
              lastName,
              classRoom,
              seatNo,
              academicYear,
              semester,
              gender,
              status,
            },
          });
          updatedCount++;
          processedStudents.push({
            id: updated.id,
            studentCode: updated.studentCode,
            title: updated.title,
            firstName: updated.firstName,
            lastName: updated.lastName,
            fullName: `${updated.title}${updated.firstName} ${updated.lastName}`,
            classRoom: updated.classRoom,
            seatNo: updated.seatNo,
            academicYear: updated.academicYear,
            semester: updated.semester,
            gender: updated.gender,
            status: updated.status,
            createdAt: updated.createdAt.toISOString(),
          });
        } else {
          // skip update
          processedStudents.push({
            id: existing.id,
            studentCode: existing.studentCode,
            title: existing.title,
            firstName: existing.firstName,
            lastName: existing.lastName,
            fullName: `${existing.title}${existing.firstName} ${existing.lastName}`,
            classRoom: existing.classRoom,
            seatNo: existing.seatNo,
            academicYear: existing.academicYear,
            semester: existing.semester,
            gender: existing.gender,
            status: existing.status,
            createdAt: existing.createdAt.toISOString(),
          });
        }
      } else {
        const created = await prisma.student.create({
          data: {
            tenantId,
            studentCode,
            title,
            firstName,
            lastName,
            classRoom,
            seatNo,
            academicYear,
            semester,
            gender,
            status,
          },
        });
        createdCount++;
        processedStudents.push({
          id: created.id,
          studentCode: created.studentCode,
          title: created.title,
          firstName: created.firstName,
          lastName: created.lastName,
          fullName: `${created.title}${created.firstName} ${created.lastName}`,
          classRoom: created.classRoom,
          seatNo: created.seatNo,
          academicYear: created.academicYear,
          semester: created.semester,
          gender: created.gender,
          status: created.status,
          createdAt: created.createdAt.toISOString(),
        });
      }
    } catch (err: any) {
      failedCount++;
      errors.push({
        row: rowNum,
        studentCode,
        message: err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      });
    }
  }

  for (const s of processedStudents) {
    await enrollStudentIntoCourses(tenantId, s.id, s.classRoom, s.academicYear, s.semester);
  }

  return {
    total: items.length,
    created: createdCount,
    updated: updatedCount,
    failed: failedCount,
    errors,
    students: processedStudents,
  };
}

export async function listInstructors(tenantId: string): Promise<InstructorDto[]> {
  const employees = await prisma.employee.findMany({
    where: { tenantId, isActive: true },
    include: { department: { select: { name: true } } },
    orderBy: { firstName: "asc" },
  });

  return employees.map((emp) => {
    const fullName = `${emp.firstName} ${emp.lastName}`.trim();
    return {
      id: emp.id,
      employeeCode: emp.employeeCode,
      name: fullName,
      fullName: fullName,
      position: emp.position,
      departmentName: emp.department?.name,
    };
  });
}

function detectTargetGrade(c: {
  name: string;
  courseCode: string;
  curriculum?: { degreeLevel?: string | null } | null;
}): string {
  const match = c.name.match(/ม\.([1-6])/);
  if (match) return `ม.${match[1]}`;
  const digits = c.courseCode.replace(/^[^\d]+/, "");
  if (digits.length >= 2) {
    const p = digits.slice(0, 2);
    if (p === "21") return "ม.1";
    if (p === "22") return "ม.2";
    if (p === "23") return "ม.3";
    if (p === "31") return "ม.4";
    if (p === "32") return "ม.5";
    if (p === "33") return "ม.6";
  }
  if (c.curriculum?.degreeLevel?.includes("ปลาย")) return "ม.4";
  return "ม.1";
}

async function enrollStudentsForCourse(
  tenantId: string,
  courseId: string,
  targetGrade: string,
  academicYear: string,
  semester: number,
) {
  try {
    const students = await prisma.student.findMany({
      where: {
        tenantId,
        classRoom: { startsWith: targetGrade },
        academicYear,
      },
      select: { id: true, semester: true },
    });

    if (students.length === 0) return;

    const data = students
      .filter((s) => !s.semester || s.semester === semester)
      .map((s) => ({
        tenantId,
        studentId: s.id,
        courseId,
        academicYear,
        semester,
      }));

    if (data.length > 0) {
      await prisma.courseEnrollment.createMany({
        data,
        skipDuplicates: true,
      });
    }
  } catch (err) {
    console.error("Auto enrollment error:", err);
  }
}

async function enrollStudentIntoCourses(
  tenantId: string,
  studentId: string,
  classRoom: string,
  academicYear: string,
  semester: number,
) {
  try {
    const match = classRoom.match(/ม\.([1-6])/);
    if (!match) return;
    const gradeLabel = `ม.${match[1]}`;

    const courses = await prisma.course.findMany({
      where: {
        curriculum: { tenantId },
        academicYear,
        semester,
        OR: [
          { targetGrade: gradeLabel },
          { name: { contains: gradeLabel } },
        ],
      },
      select: { id: true },
    });

    if (courses.length === 0) return;

    const data = courses.map((c) => ({
      tenantId,
      studentId,
      courseId: c.id,
      academicYear,
      semester,
    }));

    await prisma.courseEnrollment.createMany({
      data,
      skipDuplicates: true,
    });
  } catch (err) {
    console.error("Auto enroll student into courses error:", err);
  }
}

export async function listCourses(tenantId: string): Promise<CourseDto[]> {
  const [courses, employees] = await Promise.all([
    prisma.course.findMany({
      where: { curriculum: { tenantId } },
      include: {
        curriculum: { select: { id: true, name: true, degreeLevel: true } },
        instructor: { select: { id: true, firstName: true, lastName: true, position: true } },
      },
      orderBy: { courseCode: "asc" },
    }),
    prisma.employee.findMany({
      where: { tenantId, isActive: true },
      orderBy: { firstName: "asc" },
    }),
  ]);

  const sciTeacher = employees.find((e) => e.firstName.includes("วิภาดา")) || employees[0];
  const budTeacher = employees.find((e) => e.firstName.includes("บุญเลิศ")) || employees[1] || employees[0];
  const socTeacher = employees.find((e) => e.firstName.includes("สมศักดิ์")) || employees[0];

  const results: CourseDto[] = [];
  for (let i = 0; i < courses.length; i++) {
    const c = courses[i];
    let instId = c.instructorId;
    let instName = c.instructor ? `${c.instructor.firstName} ${c.instructor.lastName}`.trim() : c.instructorName;

    if (!instName && employees.length > 0) {
      const group = `${c.subjectGroup || ""} ${c.name || ""} ${c.courseCode || ""}`;
      let picked = employees[i % employees.length];
      if (
        group.includes("วิทยา") ||
        group.includes("คณิต") ||
        group.includes("ว2") ||
        group.includes("ว3") ||
        group.includes("ค2") ||
        group.includes("ค3")
      ) {
        picked = sciTeacher || picked;
      } else if (group.includes("พุทธ") || group.includes("บาลี") || group.includes("ส2") || group.includes("ส3")) {
        picked = budTeacher || picked;
      } else if (group.includes("สังคม") || group.includes("ประวัติ")) {
        picked = socTeacher || picked;
      }
      if (picked) {
        instId = picked.id;
        instName = `${picked.firstName} ${picked.lastName}`.trim();
        await prisma.course
          .update({
            where: { id: c.id },
            data: { instructorId: instId, instructorName: instName },
          })
          .catch(() => {});
      }
    }

    results.push({
      id: c.id,
      courseCode: c.courseCode,
      name: c.name,
      credits: c.credits,
      semester: c.semester,
      academicYear: c.academicYear || "2569",
      curriculumName: c.curriculum?.name,
      curriculumId: c.curriculumId,
      degreeLevel: c.curriculum?.degreeLevel || null,
      targetGrade: c.targetGrade || detectTargetGrade(c),
      subjectGroup: c.subjectGroup,
      instructorName: instName || "อาจารย์ประจำวิชา",
      instructorId: instId,
    });
  }

  return results;
}

export async function createCourse(
  tenantId: string,
  data: {
    courseCode: string;
    name: string;
    credits: number;
    semester?: number;
    academicYear?: string;
    curriculumId?: string;
    degreeLevel?: string;
    targetGrade?: string;
    subjectGroup?: string;
    instructorName?: string;
    instructorId?: string;
  },
): Promise<CourseDto> {
  const targetGrade = data.targetGrade || (data.degreeLevel?.includes("ปลาย") ? "ม.4" : "ม.1");
  const isJunior = ["ม.1", "ม.2", "ม.3"].includes(targetGrade) || (data.degreeLevel ? data.degreeLevel.includes("ต้น") : true);

  let currId = data.curriculumId;
  if (!currId) {
    const matchedCurr = await prisma.curriculum.findFirst({
      where: {
        tenantId,
        degreeLevel: isJunior ? { contains: "ต้น" } : { contains: "ปลาย" },
      },
    });
    if (matchedCurr) {
      currId = matchedCurr.id;
    } else {
      const createdCurr = await prisma.curriculum.create({
        data: {
          tenantId,
          code: isJunior ? "CURR-JHS-GEN" : "CURR-SHS-GEN",
          name: isJunior
            ? "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนต้น (ม.1 - ม.3)"
            : "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนปลาย (ม.4 - ม.6)",
          degreeLevel: isJunior ? "มัธยมศึกษาตอนต้น (ม.1 - ม.3)" : "มัธยมศึกษาตอนปลาย (ม.4 - ม.6)",
          totalCredits: isJunior ? 88 : 84,
        },
      });
      currId = createdCurr.id;
    }
  }

  const semester = data.semester ? Number(data.semester) : 1;
  const academicYear = data.academicYear?.trim() || "2569";

  const created = await prisma.course.create({
    data: {
      curriculumId: currId,
      courseCode: data.courseCode.trim(),
      name: data.name.trim(),
      credits: Number(data.credits) || 1.0,
      semester,
      academicYear,
      targetGrade,
      subjectGroup: data.subjectGroup?.trim() || null,
      instructorName: data.instructorName?.trim() || null,
      instructorId: data.instructorId || null,
    },
    include: {
      curriculum: { select: { id: true, name: true, degreeLevel: true } },
      instructor: { select: { id: true, firstName: true, lastName: true, position: true } },
    },
  });

  // Auto-enroll all matching students into this course
  await enrollStudentsForCourse(tenantId, created.id, targetGrade, academicYear, semester);

  return {
    id: created.id,
    courseCode: created.courseCode,
    name: created.name,
    credits: created.credits,
    semester: created.semester,
    academicYear: created.academicYear || "2569",
    curriculumName: created.curriculum?.name,
    curriculumId: created.curriculumId,
    degreeLevel: created.curriculum?.degreeLevel || (isJunior ? "มัธยมศึกษาตอนต้น (ม.1 - ม.3)" : "มัธยมศึกษาตอนปลาย (ม.4 - ม.6)"),
    targetGrade: created.targetGrade || targetGrade,
    subjectGroup: created.subjectGroup,
    instructorName: created.instructor ? `${created.instructor.firstName} ${created.instructor.lastName}` : created.instructorName,
    instructorId: created.instructorId,
  };
}

export async function updateCourse(
  tenantId: string,
  id: string,
  data: {
    courseCode?: string;
    name?: string;
    credits?: number;
    semester?: number;
    academicYear?: string;
    curriculumId?: string;
    degreeLevel?: string;
    targetGrade?: string;
    subjectGroup?: string;
    instructorName?: string;
    instructorId?: string;
  },
): Promise<CourseDto> {
  let targetCurriculumId = data.curriculumId;
  const targetGrade = data.targetGrade;

  if (targetGrade) {
    const isJunior = ["ม.1", "ม.2", "ม.3"].includes(targetGrade);
    if (!targetCurriculumId) {
      const matchedCurr = await prisma.curriculum.findFirst({
        where: {
          tenantId,
          degreeLevel: isJunior ? { contains: "ต้น" } : { contains: "ปลาย" },
        },
      });
      if (matchedCurr) {
        targetCurriculumId = matchedCurr.id;
      }
    }
  } else if (!targetCurriculumId && data.degreeLevel) {
    const isJunior = data.degreeLevel.includes("ต้น");
    const matchedCurr = await prisma.curriculum.findFirst({
      where: {
        tenantId,
        degreeLevel: isJunior ? { contains: "ต้น" } : { contains: "ปลาย" },
      },
    });
    if (matchedCurr) {
      targetCurriculumId = matchedCurr.id;
    } else {
      const createdCurr = await prisma.curriculum.create({
        data: {
          tenantId,
          code: isJunior ? "CURR-JHS-GEN" : "CURR-SHS-GEN",
          name: isJunior
            ? "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนต้น (ม.1 - ม.3)"
            : "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนปลาย (ม.4 - ม.6)",
          degreeLevel: isJunior ? "มัธยมศึกษาตอนต้น (ม.1 - ม.3)" : "มัธยมศึกษาตอนปลาย (ม.4 - ม.6)",
          totalCredits: isJunior ? 88 : 84,
        },
      });
      targetCurriculumId = createdCurr.id;
    }
  }

  const updated = await prisma.course.update({
    where: { id },
    data: {
      ...(data.courseCode ? { courseCode: data.courseCode.trim() } : {}),
      ...(data.name ? { name: data.name.trim() } : {}),
      ...(data.credits !== undefined ? { credits: Number(data.credits) || 1.0 } : {}),
      ...(data.semester !== undefined ? { semester: Number(data.semester) || 1 } : {}),
      ...(data.academicYear !== undefined ? { academicYear: data.academicYear?.trim() || "2569" } : {}),
      ...(targetCurriculumId ? { curriculumId: targetCurriculumId } : {}),
      ...(targetGrade ? { targetGrade } : {}),
      ...(data.subjectGroup !== undefined ? { subjectGroup: data.subjectGroup?.trim() || null } : {}),
      ...(data.instructorName !== undefined ? { instructorName: data.instructorName?.trim() || null } : {}),
      ...(data.instructorId !== undefined ? { instructorId: data.instructorId || null } : {}),
    },
    include: {
      curriculum: { select: { id: true, name: true, degreeLevel: true } },
      instructor: { select: { id: true, firstName: true, lastName: true, position: true } },
    },
  });

  const resolvedGrade = updated.targetGrade || detectTargetGrade(updated);
  const resolvedYear = updated.academicYear || "2569";
  const resolvedSem = updated.semester || 1;

  // Auto-enroll matching students
  await enrollStudentsForCourse(tenantId, updated.id, resolvedGrade, resolvedYear, resolvedSem);

  return {
    id: updated.id,
    courseCode: updated.courseCode,
    name: updated.name,
    credits: updated.credits,
    semester: updated.semester,
    academicYear: updated.academicYear || "2569",
    curriculumName: updated.curriculum?.name,
    curriculumId: updated.curriculumId,
    degreeLevel: updated.curriculum?.degreeLevel || data.degreeLevel || null,
    targetGrade: resolvedGrade,
    subjectGroup: updated.subjectGroup,
    instructorName: updated.instructor ? `${updated.instructor.firstName} ${updated.instructor.lastName}` : updated.instructorName,
    instructorId: updated.instructorId,
  };
}

export async function deleteCourse(tenantId: string, id: string): Promise<void> {
  await prisma.course.delete({
    where: { id },
  });
}

export async function bulkCopyCourses(
  tenantId: string,
  items: BulkCopyCourseInputItem[],
): Promise<CourseDto[]> {
  const createdCourses: CourseDto[] = [];

  for (const item of items) {
    const created = await createCourse(tenantId, {
      courseCode: item.courseCode,
      name: item.name,
      credits: item.credits,
      semester: item.semester,
      academicYear: item.academicYear,
      targetGrade: item.targetGrade,
      subjectGroup: item.subjectGroup || undefined,
      instructorId: item.instructorId || undefined,
      instructorName: item.instructorName || undefined,
    });
    createdCourses.push(created);
  }

  return createdCourses;
}

export async function bulkDeleteCourses(tenantId: string, courseIds: string[]): Promise<number> {
  const res = await prisma.course.deleteMany({
    where: {
      id: { in: courseIds },
      curriculum: { tenantId },
    },
  });
  return res.count;
}

export async function bulkUpdateCourses(
  tenantId: string,
  data: BulkUpdateCoursesInput,
): Promise<{ updatedCount: number; courses: CourseDto[] }> {
  const updatedList: CourseDto[] = [];

  for (const id of data.courseIds) {
    const updated = await updateCourse(tenantId, id, {
      targetGrade: data.targetGrade,
      academicYear: data.academicYear,
      semester: data.semester,
      subjectGroup: data.subjectGroup,
      instructorId: data.instructorId,
      instructorName: data.instructorName,
    });
    updatedList.push(updated);
  }

  return { updatedCount: updatedList.length, courses: updatedList };
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

export async function getCourseAttendanceMatrix(
  tenantId: string,
  classRoom: string,
  courseId: string,
): Promise<{
  records: {
    studentId: string;
    period: number;
    classDate: string;
    status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE";
    remarks?: string;
  }[];
  periodDates: Record<number, string>;
}> {
  const attendances = await prisma.attendance.findMany({
    where: {
      tenantId,
      courseId,
      student: { classRoom },
    },
    orderBy: [{ period: "asc" }, { classDate: "asc" }],
  });

  const periodDates: Record<number, string> = {};
  const records = attendances.map((a) => {
    const dateStr = a.classDate ? a.classDate.toISOString().split("T")[0] : "";
    if (dateStr && !periodDates[a.period]) {
      periodDates[a.period] = dateStr;
    }
    return {
      studentId: a.studentId,
      period: a.period,
      classDate: dateStr,
      status: a.status as "PRESENT" | "ABSENT" | "LEAVE" | "LATE",
      remarks: a.remarks || undefined,
    };
  });

  return { records, periodDates };
}

export async function saveCourseAttendanceMatrix(
  tenantId: string,
  classRoom: string,
  courseId: string,
  records: {
    studentId: string;
    period: number;
    classDate: string;
    status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE";
    remarks?: string;
  }[],
): Promise<void> {
  if (records.length === 0) return;

  const studentIds = Array.from(new Set(records.map((r) => r.studentId)));
  const periods = Array.from(new Set(records.map((r) => r.period)));

  await prisma.$transaction(async (tx) => {
    await tx.attendance.deleteMany({
      where: {
        tenantId,
        courseId,
        studentId: { in: studentIds },
        period: { in: periods },
      },
    });

    for (const rec of records) {
      if (!rec.classDate) continue;
      const d = new Date(rec.classDate);
      await tx.attendance.create({
        data: {
          tenantId,
          studentId: rec.studentId,
          courseId,
          period: rec.period,
          classDate: d,
          status: rec.status,
          remarks: rec.remarks,
        },
      });
    }
  });
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
  const classRoomFilter = /^ม\.[1-6]$/.test(classRoom)
    ? { startsWith: classRoom }
    : classRoom;

  const students = await prisma.student.findMany({
    where: {
      tenantId,
      classRoom: classRoomFilter,
      academicYear,
      semester,
    },
    orderBy: [{ classRoom: "asc" }, { seatNo: "asc" }, { studentCode: "asc" }],
  });

  if (students.length === 0) return [];

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
      const explicit = (existing.remarks === "ร" || existing.remarks === "มส" || existing.remarks === "0")
        ? existing.remarks
        : (existing.grade === "ร" || existing.grade === "มส" || existing.grade === "0" ? existing.grade : undefined);

      const calc = calculateGrade(
        existing.assignmentScore,
        existing.midtermScore,
        existing.behaviorScore,
        existing.finalScore,
        attPercent,
        explicit,
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

  const explicit =
    data.explicitStatus ||
    (["ร", "มส", "0"].includes(data.remarks?.trim() || "") ? data.remarks!.trim() : undefined);

  const calc = calculateGrade(
    Number(data.assignmentScore) || 0,
    Number(data.midtermScore) || 0,
    Number(data.behaviorScore) || 0,
    Number(data.finalScore) || 0,
    attPercent,
    explicit,
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
