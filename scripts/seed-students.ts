import { prisma } from "../src/shared/lib/infra/prisma";
import { calculateGrade } from "../src/features/registration/services";

async function main() {
  console.log("Seeding Students, Courses, Attendance and Grades...");

  const tenant = await prisma.tenant.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" } });
  if (!tenant) throw new Error("No active tenant found");

  const tenantId = tenant.id;

  // 1. Ensure Curriculums and Courses exist
  let currM1 = await prisma.curriculum.findFirst({
    where: { tenantId, degreeLevel: { contains: "มัธยมศึกษาตอนต้น" } },
  });
  if (!currM1) {
    currM1 = await prisma.curriculum.create({
      data: {
        tenantId,
        code: "CURR-M1-2560",
        name: "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน มัธยมศึกษาตอนต้น (ม.1-ม.3)",
        degreeLevel: "มัธยมศึกษาตอนต้น",
        totalCredits: 66,
      },
    });
  }

  let currM4 = await prisma.curriculum.findFirst({
    where: { tenantId, degreeLevel: { contains: "มัธยมศึกษาตอนปลาย" } },
  });
  if (!currM4) {
    currM4 = await prisma.curriculum.create({
      data: {
        tenantId,
        code: "CURR-M4-2560",
        name: "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน มัธยมศึกษาตอนปลาย (ม.4-ม.6)",
        degreeLevel: "มัธยมศึกษาตอนปลาย",
        totalCredits: 77,
      },
    });
  }

  // Create sample Courses
  const m1CoursesData = [
    { courseCode: "ท21101", name: "ภาษาไทยพื้นฐาน 1 (ม.1)", credits: 1, semester: 1 },
    { courseCode: "ค21101", name: "คณิตศาสตร์พื้นฐาน 1 (ม.1)", credits: 1, semester: 1 },
    { courseCode: "ว21101", name: "วิทยาศาสตร์และเทคโนโลยี 1 (ม.1)", credits: 1, semester: 1 },
  ];

  const m4CoursesData = [
    { courseCode: "ท31101", name: "ภาษาไทยพื้นฐาน 1 (ม.4)", credits: 1, semester: 1 },
    { courseCode: "ค31101", name: "คณิตศาสตร์เพิ่มเติม 1 (ม.4)", credits: 2, semester: 1 },
    { courseCode: "ว31101", name: "ฟิสิกส์ 1 (ม.4)", credits: 2, semester: 1 },
  ];

  for (const c of m1CoursesData) {
    await prisma.course.upsert({
      where: { curriculumId_courseCode: { curriculumId: currM1.id, courseCode: c.courseCode } },
      update: { name: c.name, credits: c.credits, semester: c.semester },
      create: { curriculumId: currM1.id, courseCode: c.courseCode, name: c.name, credits: c.credits, semester: c.semester },
    });
  }

  for (const c of m4CoursesData) {
    await prisma.course.upsert({
      where: { curriculumId_courseCode: { curriculumId: currM4.id, courseCode: c.courseCode } },
      update: { name: c.name, credits: c.credits, semester: c.semester },
      create: { curriculumId: currM4.id, courseCode: c.courseCode, name: c.name, credits: c.credits, semester: c.semester },
    });
  }

  const allM1Courses = await prisma.course.findMany({ where: { curriculumId: currM1.id } });
  const allM4Courses = await prisma.course.findMany({ where: { curriculumId: currM4.id } });

  // 2. Sample Students for ม.1/1
  const m1Students = [
    { studentCode: "STU69-101", title: "ด.ช.", firstName: "กิตติศักดิ์", lastName: "เจริญสุข", classRoom: "ม.1/1", seatNo: 1, gender: "ชาย" },
    { studentCode: "STU69-102", title: "ด.ช.", firstName: "ชญานนท์", lastName: "พงษ์พิสุทธิ์", classRoom: "ม.1/1", seatNo: 2, gender: "ชาย" },
    { studentCode: "STU69-103", title: "ด.ญ.", firstName: "ณิชากร", lastName: "มงคลสวัสดิ์", classRoom: "ม.1/1", seatNo: 3, gender: "หญิง" },
    { studentCode: "STU69-104", title: "ด.ญ.", firstName: "ทักษอร", lastName: "วรรณรัตน์", classRoom: "ม.1/1", seatNo: 4, gender: "หญิง" },
    { studentCode: "STU69-105", title: "ด.ช.", firstName: "ปภังกร", lastName: "รักษ์แดนไทย", classRoom: "ม.1/1", seatNo: 5, gender: "ชาย" },
  ];

  // Sample Students for ม.4/1
  const m4Students = [
    { studentCode: "STU69-401", title: "นาย", firstName: "พงศกร", lastName: "เมธาวัฒน์", classRoom: "ม.4/1", seatNo: 1, gender: "ชาย" },
    { studentCode: "STU69-402", title: "นาย", firstName: "ภาณุวิชญ์", lastName: "เลิศวิทยากุล", classRoom: "ม.4/1", seatNo: 2, gender: "ชาย" },
    { studentCode: "STU69-403", title: "น.ส.", firstName: "วริศรา", lastName: "เกียรติบำรุง", classRoom: "ม.4/1", seatNo: 3, gender: "หญิง" },
    { studentCode: "STU69-404", title: "น.ส.", firstName: "ศศิธร", lastName: "ประเสริฐสิน", classRoom: "ม.4/1", seatNo: 4, gender: "หญิง" },
    { studentCode: "STU69-405", title: "นาย", firstName: "อัครพล", lastName: "ธนสารสมบูรณ์", classRoom: "ม.4/1", seatNo: 5, gender: "ชาย" },
  ];

  const createdM1Students = [];
  for (const s of m1Students) {
    const student = await prisma.student.upsert({
      where: { tenantId_studentCode: { tenantId, studentCode: s.studentCode } },
      update: { title: s.title, firstName: s.firstName, lastName: s.lastName, classRoom: s.classRoom, seatNo: s.seatNo, gender: s.gender },
      create: { tenantId, studentCode: s.studentCode, title: s.title, firstName: s.firstName, lastName: s.lastName, classRoom: s.classRoom, seatNo: s.seatNo, gender: s.gender },
    });
    createdM1Students.push(student);
  }

  const createdM4Students = [];
  for (const s of m4Students) {
    const student = await prisma.student.upsert({
      where: { tenantId_studentCode: { tenantId, studentCode: s.studentCode } },
      update: { title: s.title, firstName: s.firstName, lastName: s.lastName, classRoom: s.classRoom, seatNo: s.seatNo, gender: s.gender },
      create: { tenantId, studentCode: s.studentCode, title: s.title, firstName: s.firstName, lastName: s.lastName, classRoom: s.classRoom, seatNo: s.seatNo, gender: s.gender },
    });
    createdM4Students.push(student);
  }

  console.log(`Created ${createdM1Students.length} students for ม.1/1 and ${createdM4Students.length} students for ม.4/1`);

  // 3. Seed Attendance Records (simulate 10 class periods)
  const primaryM1Course = allM1Courses[0]; // ท21101
  const primaryM4Course = allM4Courses[0]; // ท31101

  const baseDate = new Date("2026-05-18"); // Semester 1 start

  // Student 5 in M.1 will have < 80% attendance to demonstrate "มส" (Absent 4 out of 10 periods = 60%)
  for (let period = 1; period <= 10; period++) {
    const classDate = new Date(baseDate);
    classDate.setDate(baseDate.getDate() + (period - 1) * 3);

    for (let idx = 0; idx < createdM1Students.length; idx++) {
      const s = createdM1Students[idx];
      let status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE" = "PRESENT";
      if (idx === 4 && (period === 3 || period === 5 || period === 7 || period === 9)) {
        status = "ABSENT"; // ปภังกร absent 4 periods
      } else if (idx === 1 && period === 4) {
        status = "LATE";
      } else if (idx === 2 && period === 6) {
        status = "LEAVE";
      }

      await prisma.attendance.upsert({
        where: {
          studentId_courseId_classDate_period: {
            studentId: s.id,
            courseId: primaryM1Course.id,
            classDate,
            period: 1,
          },
        },
        update: { status },
        create: {
          tenantId,
          studentId: s.id,
          courseId: primaryM1Course.id,
          classDate,
          period: 1,
          status,
        },
      });
    }

    // M.4 attendance
    for (let idx = 0; idx < createdM4Students.length; idx++) {
      const s = createdM4Students[idx];
      let status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE" = "PRESENT";
      if (idx === 2 && period === 5) status = "LEAVE";
      if (idx === 3 && period === 2) status = "LATE";

      await prisma.attendance.upsert({
        where: {
          studentId_courseId_classDate_period: {
            studentId: s.id,
            courseId: primaryM4Course.id,
            classDate,
            period: 1,
          },
        },
        update: { status },
        create: {
          tenantId,
          studentId: s.id,
          courseId: primaryM4Course.id,
          classDate,
          period: 1,
          status,
        },
      });
    }
  }

  // 4. Seed Grade Records
  const m1GradeScores = [
    { assignment: 28, midterm: 18, behavior: 20, final: 26 }, // total 92 -> Grade 4
    { assignment: 25, midterm: 16, behavior: 19, final: 24 }, // total 84 -> Grade 4
    { assignment: 22, midterm: 14, behavior: 18, final: 22 }, // total 76 -> Grade 3.5
    { assignment: 20, midterm: 13, behavior: 17, final: 18 }, // total 68 -> Grade 2.5
    { assignment: 24, midterm: 15, behavior: 12, final: 22 }, // total 73 -> BUT attendance 60% < 80% => "มส" !
  ];

  for (let i = 0; i < createdM1Students.length; i++) {
    const s = createdM1Students[i];
    const scores = m1GradeScores[i];
    const attPercent = i === 4 ? 60 : 100; // student 5 has 60%
    const calc = calculateGrade(scores.assignment, scores.midterm, scores.behavior, scores.final, attPercent);

    await prisma.gradeRecord.upsert({
      where: {
        studentId_courseId_academicYear_semester: {
          studentId: s.id,
          courseId: primaryM1Course.id,
          academicYear: "2569",
          semester: 1,
        },
      },
      update: {
        assignmentScore: scores.assignment,
        midtermScore: scores.midterm,
        behaviorScore: scores.behavior,
        finalScore: scores.final,
        totalScore: calc.totalScore,
        grade: calc.grade,
        isPassing: calc.isPassing,
        remarks: calc.grade === "มส" ? "เวลาเรียนไม่ถึง 80%" : null,
      },
      create: {
        tenantId,
        studentId: s.id,
        courseId: primaryM1Course.id,
        academicYear: "2569",
        semester: 1,
        assignmentScore: scores.assignment,
        midtermScore: scores.midterm,
        behaviorScore: scores.behavior,
        finalScore: scores.final,
        totalScore: calc.totalScore,
        grade: calc.grade,
        isPassing: calc.isPassing,
        remarks: calc.grade === "มส" ? "เวลาเรียนไม่ถึง 80%" : null,
      },
    });
  }

  // M.4 Grades for ท31101
  const m4GradeScores = [
    { assignment: 29, midterm: 19, behavior: 20, final: 28 }, // 96 -> 4
    { assignment: 26, midterm: 17, behavior: 20, final: 25 }, // 88 -> 4
    { assignment: 23, midterm: 15, behavior: 19, final: 21 }, // 78 -> 3.5
    { assignment: 21, midterm: 14, behavior: 18, final: 19 }, // 72 -> 3
    { assignment: 18, midterm: 12, behavior: 17, final: 18 }, // 65 -> 2.5
  ];

  for (let i = 0; i < createdM4Students.length; i++) {
    const s = createdM4Students[i];
    const scores = m4GradeScores[i];
    const calc = calculateGrade(scores.assignment, scores.midterm, scores.behavior, scores.final, 100);

    await prisma.gradeRecord.upsert({
      where: {
        studentId_courseId_academicYear_semester: {
          studentId: s.id,
          courseId: primaryM4Course.id,
          academicYear: "2569",
          semester: 1,
        },
      },
      update: {
        assignmentScore: scores.assignment,
        midtermScore: scores.midterm,
        behaviorScore: scores.behavior,
        finalScore: scores.final,
        totalScore: calc.totalScore,
        grade: calc.grade,
        isPassing: calc.isPassing,
      },
      create: {
        tenantId,
        studentId: s.id,
        courseId: primaryM4Course.id,
        academicYear: "2569",
        semester: 1,
        assignmentScore: scores.assignment,
        midtermScore: scores.midterm,
        behaviorScore: scores.behavior,
        finalScore: scores.final,
        totalScore: calc.totalScore,
        grade: calc.grade,
        isPassing: calc.isPassing,
      },
    });
  }

  console.log("Seeding complete successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
