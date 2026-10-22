"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission, requireSession, hasPermission } from "@/features/identity/server";
import { prisma } from "@/shared/lib/infra/prisma";
import { DOCUMENT_P } from "@/features/document/permissions";
import {
  listStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  importBatchStudents,
  listCourses,
  listInstructors,
  createCourse,
  updateCourse,
  deleteCourse,
  promoteStudents,
  bulkDeleteStudents,
  bulkUpdateStudents,
  copyStudents,
  bulkCopyCourses,
  bulkDeleteCourses,
  bulkUpdateCourses,
  recordBatchAttendance,
  getStudentAttendanceSummaries,
  getAttendanceForPeriod,
  getCourseAttendanceMatrix,
  saveCourseAttendanceMatrix,
  listGrades,
  saveGradeRecord,
  getGradingScheme,
  saveGradingScheme,
} from "./services";
import type {
  StudentDto,
  CourseDto,
  StudentAttendanceSummary,
  GradeRecordDto,
  CourseGradingSchemeDto,
  ImportStudentInput,
  ImportBatchStudentsResult,
  InstructorDto,
  CourseAttendanceCell,
  CourseAttendanceMatrixDto,
  BulkPromoteStudentsInput,
  BulkUpdateStudentsInput,
  BulkCopyStudentInputItem,
  BulkCopyCourseInputItem,
  BulkUpdateCoursesInput,
} from "./types";

export async function getStudentsAction(filter?: {
  classRoom?: string;
  academicYear?: string;
  semester?: number;
  search?: string;
}): Promise<ActionResult<StudentDto[]>> {
  return runAction(async () => {
    const ctx = await requireSession();
    return listStudents(ctx.tenantId, filter);
  });
}

export async function createStudentAction(data: {
  studentCode: string;
  title?: string;
  firstName: string;
  lastName: string;
  classRoom: string;
  seatNo: number;
  gender?: string;
  academicYear?: string;
  semester?: number;
  status?: string;
}): Promise<ActionResult<StudentDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const result = await createStudent(ctx.tenantId, data);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function updateStudentAction(
  id: string,
  data: {
    studentCode?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    classRoom?: string;
    seatNo?: number;
    gender?: string;
    academicYear?: string;
    semester?: number;
    status?: string;
  },
): Promise<ActionResult<StudentDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const result = await updateStudent(ctx.tenantId, id, data);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function deleteStudentAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    await deleteStudent(ctx.tenantId, id);
    revalidatePath("/satitmcuReg");
  });
}

export async function promoteStudentsAction(
  data: BulkPromoteStudentsInput,
): Promise<ActionResult<{ updatedCount: number; students: StudentDto[] }>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const result = await promoteStudents(ctx.tenantId, data);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function bulkDeleteStudentsAction(
  studentIds: string[],
): Promise<ActionResult<number>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const count = await bulkDeleteStudents(ctx.tenantId, studentIds);
    revalidatePath("/satitmcuReg");
    return count;
  });
}

export async function bulkUpdateStudentsAction(
  data: BulkUpdateStudentsInput,
): Promise<ActionResult<{ updatedCount: number; students: StudentDto[] }>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const result = await bulkUpdateStudents(ctx.tenantId, data);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function copyStudentsAction(
  items: BulkCopyStudentInputItem[],
): Promise<ActionResult<{ copiedCount: number; students: StudentDto[] }>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const result = await copyStudents(ctx.tenantId, items);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function importBatchStudentsAction(
  items: ImportStudentInput[],
  options?: { overwriteExisting?: boolean },
): Promise<ActionResult<ImportBatchStudentsResult>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const result = await importBatchStudents(ctx.tenantId, items, options);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function getCoursesAction(): Promise<ActionResult<CourseDto[]>> {
  return runAction(async () => {
    const ctx = await requireSession();
    return listCourses(ctx.tenantId);
  });
}

export async function getInstructorsAction(): Promise<ActionResult<InstructorDto[]>> {
  return runAction(async () => {
    const ctx = await requireSession();
    return listInstructors(ctx.tenantId);
  });
}

export async function createCourseAction(data: {
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
}): Promise<ActionResult<CourseDto>> {
  return runAction(async () => {
    const ctx = await requireSession();
    const result = await createCourse(ctx.tenantId, data);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function updateCourseAction(
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
): Promise<ActionResult<CourseDto>> {
  return runAction(async () => {
    const ctx = await requireSession();
    const result = await updateCourse(ctx.tenantId, id, data);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function deleteCourseAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    await deleteCourse(ctx.tenantId, id);
    revalidatePath("/satitmcuReg");
  });
}

export async function bulkCopyCoursesAction(
  items: BulkCopyCourseInputItem[],
): Promise<ActionResult<CourseDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const result = await bulkCopyCourses(ctx.tenantId, items);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function bulkDeleteCoursesAction(
  courseIds: string[],
): Promise<ActionResult<number>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const count = await bulkDeleteCourses(ctx.tenantId, courseIds);
    revalidatePath("/satitmcuReg");
    return count;
  });
}

export async function bulkUpdateCoursesAction(
  data: BulkUpdateCoursesInput,
): Promise<ActionResult<{ updatedCount: number; courses: CourseDto[] }>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const result = await bulkUpdateCourses(ctx.tenantId, data);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function recordBatchAttendanceAction(
  records: {
    studentId: string;
    courseId?: string | null;
    classDate: string;
    period: number;
    status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE";
    remarks?: string;
  }[],
): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requireSession();
    await recordBatchAttendance(ctx.tenantId, records);
    revalidatePath("/satitmcuReg");
  });
}

export async function getAttendanceSummariesAction(
  classRoom: string,
  courseId?: string,
): Promise<ActionResult<StudentAttendanceSummary[]>> {
  return runAction(async () => {
    const ctx = await requireSession();
    return getStudentAttendanceSummaries(ctx.tenantId, classRoom, courseId);
  });
}

export async function getAttendanceForPeriodAction(
  classRoom: string,
  classDate: string,
  period: number,
  courseId?: string | null,
): Promise<ActionResult<Record<string, "PRESENT" | "ABSENT" | "LEAVE" | "LATE">>> {
  return runAction(async () => {
    const ctx = await requireSession();
    return getAttendanceForPeriod(ctx.tenantId, classRoom, classDate, period, courseId);
  });
}

export async function getCourseAttendanceMatrixAction(
  classRoom: string,
  courseId: string,
): Promise<ActionResult<CourseAttendanceMatrixDto>> {
  return runAction(async () => {
    const ctx = await requireSession();
    return getCourseAttendanceMatrix(ctx.tenantId, classRoom, courseId);
  });
}

export async function saveCourseAttendanceMatrixAction(
  classRoom: string,
  courseId: string,
  records: CourseAttendanceCell[],
): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requireSession();
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { instructor: true },
    });
    if (!course) throw new Error("ไม่พบข้อมูลรายวิชา");

    const isSuper = ctx.isSuperAdmin;
    const canManage = hasPermission(ctx, DOCUMENT_P.documentManage);
    const isInstructor =
      (course.instructorId && course.instructorId === ctx.userId) ||
      (course.instructor?.id && course.instructor.id === ctx.userId) ||
      (course.instructorName && ctx.userName && (
        course.instructorName.includes(ctx.userName) ||
        ctx.userName.includes(course.instructorName)
      ));

    if (!isSuper && !canManage && !isInstructor) {
      throw new Error(
        `สิทธิ์ไม่เพียงพอ: เฉพาะอาจารย์ผู้สอนประจำวิชา (${course.instructorName || "ไม่ระบุ"}) หรือผู้ดูแลระบบเท่านั้นที่มีสิทธิ์บันทึกการเช็คชื่อ`,
      );
    }

    await saveCourseAttendanceMatrix(ctx.tenantId, classRoom, courseId, records);
    revalidatePath("/satitmcuReg");
  });
}

export async function getGradesAction(
  classRoom: string,
  courseId: string,
  academicYear?: string,
  semester?: number,
): Promise<ActionResult<GradeRecordDto[]>> {
  return runAction(async () => {
    const ctx = await requireSession();
    return listGrades(ctx.tenantId, classRoom, courseId, academicYear, semester);
  });
}

export async function saveGradeAction(data: {
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
}): Promise<ActionResult<GradeRecordDto>> {
  return runAction(async () => {
    const ctx = await requireSession();
    const result = await saveGradeRecord(ctx.tenantId, data);
    revalidatePath("/satitmcuReg");
    return result;
  });
}

export async function saveBatchGradesAction(
  grades: {
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
  }[],
): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requireSession();
    for (const g of grades) {
      await saveGradeRecord(ctx.tenantId, g);
    }
    revalidatePath("/satitmcuReg");
  });
}

export async function getGradingSchemeAction(
  courseId: string,
  classRoom: string,
  academicYear?: string,
  semester?: number,
): Promise<ActionResult<CourseGradingSchemeDto>> {
  return runAction(async () => {
    const ctx = await requireSession();
    return getGradingScheme(ctx.tenantId, courseId, classRoom, academicYear, semester);
  });
}

export async function saveGradingSchemeAction(data: {
  courseId: string;
  classRoom: string;
  maxAssignment: number;
  maxMidterm: number;
  maxBehavior: number;
  maxFinal: number;
  minAttendancePercent?: number;
  academicYear?: string;
  semester?: number;
}): Promise<ActionResult<CourseGradingSchemeDto>> {
  return runAction(async () => {
    const ctx = await requireSession();
    const result = await saveGradingScheme(ctx.tenantId, data);
    revalidatePath("/satitmcuReg");
    return result;
  });
}
