import { requirePermission, hasPermission } from "@/features/identity/server";
import { DOCUMENT_P } from "@/features/document/permissions";
import {
  listStudents,
  listCourses,
  getStudentAttendanceSummaries,
  listGrades,
  getGradingScheme,
} from "@/features/registration/server";
import { RegistrationClient } from "./_components/registration-client";

export default async function SatitmcuRegPage() {
  const ctx = await requirePermission(DOCUMENT_P.documentRead);
  const [students, courses] = await Promise.all([
    listStudents(ctx.tenantId),
    listCourses(ctx.tenantId),
  ]);

  const defaultCourse = courses[0];
  const [attendanceSummaries, grades, gradingScheme] = await Promise.all([
    getStudentAttendanceSummaries(ctx.tenantId, "ม.1/1", defaultCourse?.id),
    defaultCourse ? listGrades(ctx.tenantId, "ม.1/1", defaultCourse.id) : Promise.resolve([]),
    defaultCourse
      ? getGradingScheme(ctx.tenantId, defaultCourse.id, "ม.1/1")
      : Promise.resolve({
          id: "",
          courseId: "",
          classRoom: "ม.1/1",
          academicYear: "2569",
          semester: 1,
          maxAssignment: 30,
          maxMidterm: 20,
          maxBehavior: 20,
          maxFinal: 30,
          minAttendancePercent: 80,
        }),
  ]);

  return (
    <RegistrationClient
      initialStudents={students}
      initialCourses={courses}
      initialAttendanceSummaries={attendanceSummaries}
      initialGrades={grades}
      initialGradingScheme={gradingScheme}
      canManage={hasPermission(ctx, DOCUMENT_P.documentManage)}
    />
  );
}
