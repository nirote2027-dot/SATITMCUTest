import { prisma } from "../src/shared/lib/infra/prisma";

async function main() {
  const tenant = await prisma.tenant.findFirst({ where: { isActive: true } });
  if (!tenant) {
    console.log("No active tenant found.");
    return;
  }

  console.log("Seeding departments for tenant:", tenant.nameTh);

  // 1. Create main departments
  const deptSci = await prisma.department.upsert({
    where: { id: "d1000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "d1000000-0000-0000-0000-000000000001",
      tenantId: tenant.id,
      code: "SCI-MATH",
      name: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี",
      description: "จัดการเรียนการสอนวิทยาศาสตร์ เคมี ฟิสิกส์ ชีววิทยา คอมพิวเตอร์ และเทคโนโลยี",
    },
  });

  const deptLang = await prisma.department.upsert({
    where: { id: "d1000000-0000-0000-0000-000000000002" },
    update: {},
    create: {
      id: "d1000000-0000-0000-0000-000000000002",
      tenantId: tenant.id,
      code: "LANG",
      name: "กลุ่มสาระการเรียนรู้ภาษาไทยและภาษาต่างประเทศ",
      description: "ส่งเสริมทักษะภาษาไทย ภาษาบาลี-สันสกฤต ภาษาอังกฤษ และภาษาจีนเพื่อการสื่อสาร",
    },
  });

  const deptSoc = await prisma.department.upsert({
    where: { id: "d1000000-0000-0000-0000-000000000003" },
    update: {},
    create: {
      id: "d1000000-0000-0000-0000-000000000003",
      tenantId: tenant.id,
      code: "SOC-BUD",
      name: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
      description: "มุ่งเน้นการศึกษาหลักธรรมทางพระพุทธศาสนา ประวัติศาสตร์ และพลเมืองดีตามวิถีพุทธ",
    },
  });

  console.log("Created/Found departments:", [deptSci.name, deptLang.name, deptSoc.name]);

  // 2. Create sample curriculums if empty
  const currSci = await prisma.curriculum.upsert({
    where: {
      tenantId_code: {
        tenantId: tenant.id,
        code: "CURR-SCI-M4",
      },
    },
    update: { departmentId: deptSci.id },
    create: {
      tenantId: tenant.id,
      departmentId: deptSci.id,
      code: "CURR-SCI-M4",
      name: "หลักสูตรวิทยาศาสตร์-คณิตศาสตร์ และปัญญาประดิษฐ์ (ม.4-ม.6)",
      degreeLevel: "มัธยมศึกษาตอนปลาย",
      totalCredits: 84,
      description: "หลักสูตรมุ่งเน้นการคิดเชิงคำนวณ สะเต็มศึกษา (STEM) และปัญญาประดิษฐ์เพื่อเตรียมความพร้อมสู่อุดมศึกษา",
    },
  });

  const currLang = await prisma.curriculum.upsert({
    where: {
      tenantId_code: {
        tenantId: tenant.id,
        code: "CURR-LANG-M4",
      },
    },
    update: { departmentId: deptLang.id },
    create: {
      tenantId: tenant.id,
      departmentId: deptLang.id,
      code: "CURR-LANG-M4",
      name: "หลักสูตรศิลป์ภาษาและวัฒนธรรมสากล (ม.4-ม.6)",
      degreeLevel: "มัธยมศึกษาตอนปลาย",
      totalCredits: 81,
      description: "ส่งเสริมความเชี่ยวชาญภาษาอังกฤษ ภาษาจีน และภาษาบาลี-สันสกฤต พร้อมการสื่อสารข้ามวัฒนธรรม",
    },
  });

  const currSoc = await prisma.curriculum.upsert({
    where: {
      tenantId_code: {
        tenantId: tenant.id,
        code: "CURR-BUD-M1",
      },
    },
    update: { departmentId: deptSoc.id },
    create: {
      tenantId: tenant.id,
      departmentId: deptSoc.id,
      code: "CURR-BUD-M1",
      name: "หลักสูตรวิถีพุทธศึกษาและนวัตกรรมสังคม (ม.1-ม.3)",
      degreeLevel: "มัธยมศึกษาตอนต้น",
      totalCredits: 88,
      description: "บูรณาการพุทธธรรมและศีลธรรมเข้ากับการพัฒนาทักษะชีวิตและความเป็นพลเมืองโลก",
    },
  });

  console.log("Upserted curriculums:", [currSci.name, currLang.name, currSoc.name]);

  // 3. Link employees if any without department
  const employees = await prisma.employee.findMany({ where: { tenantId: tenant.id } });
  for (let i = 0; i < employees.length; i++) {
    if (!employees[i].departmentId) {
      const depts = [deptSci.id, deptLang.id, deptSoc.id];
      await prisma.employee.update({
        where: { id: employees[i].id },
        data: { departmentId: depts[i % depts.length] },
      });
    }
  }

  console.log("Department seeding completed successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
