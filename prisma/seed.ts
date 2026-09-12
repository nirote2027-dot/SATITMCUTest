import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { seedCore, seedUser } from "./lib/seed-core";
import { requireDatabaseUrl } from "./lib/require-database-url";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: requireDatabaseUrl() }) });

/** รหัสผ่านทุกบัญชีตัวอย่าง */
export const DEV_PASSWORD = "Passw0rd!vibe";

async function main() {
  if (process.env.NODE_ENV === "production" && process.env.SEED_ALLOW_PROD !== "1") {
    console.error("[seed] ปฏิเสธ: NODE_ENV=production — ใช้ npm run db:bootstrap แทน");
    process.exit(1);
  }

  // 1. Core Tenant & Roles
  const core = await seedCore(prisma, {
    tenantCode: "DEMO",
    nameTh: "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
    nameEn: "SATIT MCU",
  });

  // Update Tenant with Satit MCU Branding
  await prisma.tenant.update({
    where: { id: core.tenantId },
    data: {
      nameTh: "โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
      nameEn: "SATIT MCU",
    },
  });

  // 2. Users
  const hash = await bcrypt.hash(DEV_PASSWORD, 12);
  const users = [
    { email: "admin@app.local", name: "ผู้ดูแลสูงสุด (Admin)", roles: ["SUPER_ADMIN"] },
    { email: "staff@app.local", name: "เจ้าหน้าที่ฝ่ายวิชาการ", roles: ["STAFF"] },
    { email: "viewer@app.local", name: "อาจารย์ผู้สอน", roles: ["VIEWER"] },
    { email: "lockme@app.local", name: "บัญชีทดสอบล็อก", roles: ["VIEWER"] },
    { email: "forced@app.local", name: "บัญชีบังคับเปลี่ยนรหัส", roles: ["VIEWER"], mustChangePassword: true },
  ];
  const createdUserIds: Record<string, string> = {};
  for (const u of users) {
    const uid = await seedUser(prisma, core.tenantId, { ...u, passwordHash: hash, roleIds: u.roles.map((c) => core.roleIds[c]) });
    createdUserIds[u.email] = uid;
  }

  // 3. Departments
  const deptData = [
    {
      code: "SCI-MATH",
      name: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี",
      description: "จัดการเรียนการสอนวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีสารสนเทศ",
    },
    {
      code: "LANG",
      name: "กลุ่มสาระการเรียนรู้ภาษาไทยและภาษาต่างประเทศ",
      description: "จัดการเรียนการสอนภาษาไทย ภาษาอังกฤษ และภาษาต่างประเทศเสริม",
    },
    {
      code: "SOC-BUD",
      name: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
      description: "จัดการเรียนการสอนสังคมศึกษา ประวัติศาสตร์ พระพุทธศาสนา และภาษาบาลี",
    },
  ];

  const deptMap: Record<string, string> = {};
  for (const d of deptData) {
    const existing = await prisma.department.findFirst({
      where: { tenantId: core.tenantId, code: d.code },
    });
    if (existing) {
      const updated = await prisma.department.update({
        where: { id: existing.id },
        data: { name: d.name, description: d.description },
      });
      deptMap[d.code] = updated.id;
    } else {
      const created = await prisma.department.create({
        data: {
          tenantId: core.tenantId,
          code: d.code,
          name: d.name,
          description: d.description,
        },
      });
      deptMap[d.code] = created.id;
    }
  }

  // 4. Curriculums
  const currData = [
    {
      code: "CURR-SCI-M4",
      name: "หลักสูตรวิทยาศาสตร์-คณิตศาสตร์ มัธยมศึกษาตอนปลาย",
      nameEn: "Science-Mathematics Curriculum (Senior High School)",
      degreeLevel: "HIGH_SCHOOL",
      degreeNameTh: "มัธยมศึกษาตอนปลาย",
      curriculumYear: "2568",
      totalCredits: 84,
      geCredits: 30,
      majorCredits: 42,
      electiveCredits: 12,
      description: "หลักสูตรเน้นกระบวนการคิดวิเคราะห์ การทดลองทางวิทยาศาสตร์ คณิตศาสตร์เข้มข้น และนวัตกรรมเทคโนโลยี",
      departmentId: deptMap["SCI-MATH"],
    },
    {
      code: "CURR-LANG-M4",
      name: "หลักสูตรภาษาและวัฒนธรรมสากล มัธยมศึกษาตอนปลาย",
      nameEn: "Language & Global Culture Curriculum",
      degreeLevel: "HIGH_SCHOOL",
      degreeNameTh: "มัธยมศึกษาตอนปลาย",
      curriculumYear: "2568",
      totalCredits: 81,
      geCredits: 30,
      majorCredits: 39,
      electiveCredits: 12,
      description: "หลักสูตรเน้นความเชี่ยวชาญด้านภาษาอังกฤษ ภาษาต่างประเทศที่สอง และการสื่อสารข้ามวัฒนธรรม",
      departmentId: deptMap["LANG"],
    },
    {
      code: "CURR-BUD-M1",
      name: "หลักสูตรพุทธศาสน์ศึกษาและภาษาบาลี (มคอ. 2)",
      nameEn: "Buddhist Studies & Pali Language Curriculum",
      degreeLevel: "JUNIOR_HIGH",
      degreeNameTh: "มัธยมศึกษาตอนต้น",
      curriculumYear: "2568",
      totalCredits: 88,
      geCredits: 32,
      majorCredits: 44,
      electiveCredits: 12,
      description: "หลักสูตรมาตรฐาน มคอ. 2 บูรณาการคุณธรรม จริยธรรม หลักพุทธธรรม และภาษาบาลีเบื้องต้นเพื่อชีวิต",
      departmentId: deptMap["SOC-BUD"],
    },
  ];

  for (const c of currData) {
    await prisma.curriculum.upsert({
      where: {
        tenantId_code: {
          tenantId: core.tenantId,
          code: c.code,
        },
      },
      update: {
        name: c.name,
        nameEn: c.nameEn,
        degreeLevel: c.degreeLevel,
        degreeNameTh: c.degreeNameTh,
        curriculumYear: c.curriculumYear,
        totalCredits: c.totalCredits,
        geCredits: c.geCredits,
        majorCredits: c.majorCredits,
        electiveCredits: c.electiveCredits,
        description: c.description,
        departmentId: c.departmentId,
      },
      create: {
        tenantId: core.tenantId,
        code: c.code,
        name: c.name,
        nameEn: c.nameEn,
        degreeLevel: c.degreeLevel,
        degreeNameTh: c.degreeNameTh,
        curriculumYear: c.curriculumYear,
        totalCredits: c.totalCredits,
        geCredits: c.geCredits,
        majorCredits: c.majorCredits,
        electiveCredits: c.electiveCredits,
        description: c.description,
        departmentId: c.departmentId,
      },
    });
  }

  // 5. Bilingual Articles with Tiny Editor HTML content
  const adminId = createdUserIds["admin@app.local"];
  const existingArticle = await prisma.article.findFirst({
    where: { tenantId: core.tenantId, title: "โรงเรียนสาธิต มจร เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2569" },
  });

  const sampleThaiContent = `<p>โรงเรียนสาธิตมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ประกาศเปิดรับสมัครนักเรียนระดับชั้นมัธยมศึกษาปีที่ 1 และ 4 ประจำปีการศึกษา 2569</p>
<h3>คุณสมบัติของผู้สมัคร</h3>
<ul>
  <li>กำลังศึกษาอยู่ในระดับชั้นประถมศึกษาปีที่ 6 หรือมัธยมศึกษาปีที่ 3</li>
  <li>มีความประพฤติเรียบร้อย มีความสนใจศึกษาด้านคุณธรรม จริยธรรม และวิชาการ</li>
</ul>
<p>ผู้สนใจสามารถยื่นใบสมัครออนไลน์ได้ตั้งแต่วันนี้เป็นต้นไป สอบถามรายละเอียดเพิ่มเติมได้ที่ห้องประชาสัมพันธ์</p>`;

  const sampleEnglishContent = `<p>MCU Demonstration School announces the opening of admissions for Grade 7 and Grade 10 students for the 2026 academic year.</p>
<h3>Applicant Qualifications</h3>
<ul>
  <li>Currently studying in Grade 6 or Grade 9</li>
  <li>Good conduct with a keen interest in ethics, moral values, and academic excellence</li>
</ul>
<p>Interested candidates can apply online starting today. For more information, please contact the Public Relations Office.</p>`;

  if (!existingArticle) {
    await prisma.article.create({
      data: {
        tenantId: core.tenantId,
        authorId: adminId,
        title: "โรงเรียนสาธิต มจร เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2569",
        titleEn: "MCU Demonstration School Opens Admissions for Academic Year 2026",
        content: sampleThaiContent,
        contentEn: sampleEnglishContent,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
  } else {
    await prisma.article.update({
      where: { id: existingArticle.id },
      data: {
        titleEn: "MCU Demonstration School Opens Admissions for Academic Year 2026",
        content: sampleThaiContent,
        contentEn: sampleEnglishContent,
        status: "PUBLISHED",
      },
    });
  }

  // 6. Employees
  const employeeData = [
    {
      employeeCode: "EMP-001",
      firstName: "สมศักดิ์",
      lastName: "ปัญญาดี",
      position: "ผู้อำนวยการโรงเรียนสาธิต มจร",
      departmentId: deptMap["SOC-BUD"],
    },
    {
      employeeCode: "EMP-002",
      firstName: "วิภาดา",
      lastName: "รัตนโกสินทร์",
      position: "หัวหน้ากลุ่มสาระวิทยาศาสตร์และเทคโนโลยี",
      departmentId: deptMap["SCI-MATH"],
    },
    {
      employeeCode: "EMP-003",
      firstName: "พระมหาบุญเลิศ",
      lastName: "เขมธโร",
      position: "หัวหน้ากลุ่มสาระสังคมศึกษาและภาษาบาลี",
      departmentId: deptMap["SOC-BUD"],
    },
  ];

  for (const emp of employeeData) {
    await prisma.employee.upsert({
      where: {
        tenantId_employeeCode: {
          tenantId: core.tenantId,
          employeeCode: emp.employeeCode,
        },
      },
      update: {
        firstName: emp.firstName,
        lastName: emp.lastName,
        position: emp.position,
        departmentId: emp.departmentId,
      },
      create: {
        tenantId: core.tenantId,
        employeeCode: emp.employeeCode,
        firstName: emp.firstName,
        lastName: emp.lastName,
        position: emp.position,
        departmentId: emp.departmentId,
      },
    });
  }

  console.log(`[seed] เสร็จสมบูรณ์ — login: admin@app.local / ${DEV_PASSWORD}`);
  console.log(`[seed] สร้างข้อมูลตั้งต้น Satit MCU: องค์กร, กลุ่มสาระ, หลักสูตร, ข่าว 2 ภาษา, และบุคลากร เรียบร้อยแล้ว`);
}

main().finally(() => prisma.$disconnect());
