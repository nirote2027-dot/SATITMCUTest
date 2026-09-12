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
        code: "01001",
      },
    },
    update: {
      departmentId: deptSci.id,
      nameEn: "Bachelor of Arts Program in Buddhism",
      degreeNameTh: "พุทธศาสตรบัณฑิต (พระพุทธศาสนา)",
      degreeNameEn: "Bachelor of Arts (Buddhism)",
      curriculumYear: "2567",
      durationYears: 4,
      totalCredits: 132,
      geCredits: 30,
      majorCredits: 96,
      electiveCredits: 6,
      philosophy: "มุ่งผลิตบัณฑิตให้มีความรู้ความเข้าใจในพระไตรปิฎก หลักธรรมทางพระพุทธศาสนาอย่างถ่องแท้ มีคุณธรรมจริยธรรม และสามารถประยุกต์ใช้เพื่อการพัฒนาจิตใจและสังคม",
      objectives: "1. เพื่อผลิตบัณฑิตให้มีความรู้ความเชี่ยวชาญในพระพุทธศาสนาทั้งภาคทฤษฎีและปฏิบัติ\n2. เพื่อสร้างผู้นำทางจิตวิญญาณที่มีคุณธรรมและจริยธรรม\n3. เพื่อเผยแผ่หลักธรรมคำสอนสู่สังคมไทยและสากล",
      careerProspects: "อาจารย์สอนวิชาพระพุทธศาสนา/สังคมศึกษา, นักวิชาการศาสนา, พระวิปัสสนาจารย์/ผู้นำเผยแผ่ศาสนา, เจ้าหน้าที่ฝ่ายบุคคลหรือองค์กรพัฒนาเอกชน",
      pdfUrl: "/uploads/sample-tqf2.pdf",
    },
    create: {
      tenantId: tenant.id,
      departmentId: deptSci.id,
      code: "01001",
      name: "หลักสูตรพุทธศาสตรบัณฑิต สาขาวิชาพระพุทธศาสนา",
      nameEn: "Bachelor of Arts Program in Buddhism",
      degreeLevel: "ปริญญาตรี (4 ปี)",
      degreeNameTh: "พุทธศาสตรบัณฑิต (พระพุทธศาสนา)",
      degreeNameEn: "Bachelor of Arts (Buddhism)",
      curriculumYear: "2567",
      durationYears: 4,
      totalCredits: 132,
      geCredits: 30,
      majorCredits: 96,
      electiveCredits: 6,
      philosophy: "มุ่งผลิตบัณฑิตให้มีความรู้ความเข้าใจในพระไตรปิฎก หลักธรรมทางพระพุทธศาสนาอย่างถ่องแท้ มีคุณธรรมจริยธรรม และสามารถประยุกต์ใช้เพื่อการพัฒนาจิตใจและสังคม",
      objectives: "1. เพื่อผลิตบัณฑิตให้มีความรู้ความเชี่ยวชาญในพระพุทธศาสนาทั้งภาคทฤษฎีและปฏิบัติ\n2. เพื่อสร้างผู้นำทางจิตวิญญาณที่มีคุณธรรมและจริยธรรม\n3. เพื่อเผยแผ่หลักธรรมคำสอนสู่สังคมไทยและสากล",
      careerProspects: "อาจารย์สอนวิชาพระพุทธศาสนา/สังคมศึกษา, นักวิชาการศาสนา, พระวิปัสสนาจารย์/ผู้นำเผยแผ่ศาสนา, เจ้าหน้าที่ฝ่ายบุคคลหรือองค์กรพัฒนาเอกชน",
      description: "หลักสูตรมุ่งเน้นการศึกษาหลักพุทธธรรม ปรัชญา และการประยุกต์ใช้เพื่อสันติสุขของสังคม",
      pdfUrl: "/uploads/sample-tqf2.pdf",
    },
  });

  const currLang = await prisma.curriculum.upsert({
    where: {
      tenantId_code: {
        tenantId: tenant.id,
        code: "01002",
      },
    },
    update: {
      departmentId: deptLang.id,
      nameEn: "Bachelor of Education Program in Teaching Buddhism and Social Studies",
      degreeNameTh: "ครุศาสตรบัณฑิต (การสอนพระพุทธศาสนาและสังคมศึกษา)",
      degreeNameEn: "Bachelor of Education (Teaching Buddhism and Social Studies)",
      curriculumYear: "2566",
      durationYears: 4,
      totalCredits: 138,
      geCredits: 30,
      majorCredits: 102,
      electiveCredits: 6,
      philosophy: "มุ่งพัฒนาครูผู้สอนที่มีจิตวิญญาณความเป็นครู มีสมรรถนะการจัดการเรียนรู้เชิงรุก (Active Learning) ผสานเทคโนโลยีดิจิทัลและคุณธรรมวิถีพุทธ",
      objectives: "1. เพื่อผลิตครูและบุคลากรทางการศึกษาที่มีความรู้ความสามารถในศาสตร์การสอนวิถีพุทธ\n2. เพื่อส่งเสริมวิจัยและนวัตกรรมการจัดการเรียนรู้ในยุคดิจิทัล",
      careerProspects: "ครูผู้สอนวิชาพระพุทธศาสนาและสังคมศึกษาในสถานศึกษาขั้นพื้นฐาน, นักวิชาการศึกษา, นักพัฒนาสื่อและนวัตกรรมการเรียนรู้",
      pdfUrl: "/uploads/sample-tqf2.pdf",
    },
    create: {
      tenantId: tenant.id,
      departmentId: deptLang.id,
      code: "01002",
      name: "หลักสูตรครุศาสตรบัณฑิต สาขาวิชาการสอนพระพุทธศาสนาและสังคมศึกษา",
      nameEn: "Bachelor of Education Program in Teaching Buddhism and Social Studies",
      degreeLevel: "ปริญญาตรี (4 ปี)",
      degreeNameTh: "ครุศาสตรบัณฑิต (การสอนพระพุทธศาสนาและสังคมศึกษา)",
      degreeNameEn: "Bachelor of Education (Teaching Buddhism and Social Studies)",
      curriculumYear: "2566",
      durationYears: 4,
      totalCredits: 138,
      geCredits: 30,
      majorCredits: 102,
      electiveCredits: 6,
      philosophy: "มุ่งพัฒนาครูผู้สอนที่มีจิตวิญญาณความเป็นครู มีสมรรถนะการจัดการเรียนรู้เชิงรุก (Active Learning) ผสานเทคโนโลยีดิจิทัลและคุณธรรมวิถีพุทธ",
      objectives: "1. เพื่อผลิตครูและบุคลากรทางการศึกษาที่มีความรู้ความสามารถในศาสตร์การสอนวิถีพุทธ\n2. เพื่อส่งเสริมวิจัยและนวัตกรรมการจัดการเรียนรู้ในยุคดิจิทัล",
      careerProspects: "ครูผู้สอนวิชาพระพุทธศาสนาและสังคมศึกษาในสถานศึกษาขั้นพื้นฐาน, นักวิชาการศึกษา, นักพัฒนาสื่อและนวัตกรรมการเรียนรู้",
      description: "เตรียมความพร้อมวิชาชีพครูด้วยจิตวิญญาณพุทธปัญญา นวัตกรรมการสอนที่ทันสมัย",
      pdfUrl: "/uploads/sample-tqf2.pdf",
    },
  });

  const currSoc = await prisma.curriculum.upsert({
    where: {
      tenantId_code: {
        tenantId: tenant.id,
        code: "01003",
      },
    },
    update: {
      departmentId: deptSoc.id,
      nameEn: "Bachelor of Arts Program in English for Global Communication",
      degreeNameTh: "ศิลปศาสตรบัณฑิต (ภาษาอังกฤษเพื่อการสื่อสารสากล)",
      degreeNameEn: "Bachelor of Arts (English for Global Communication)",
      curriculumYear: "2567",
      durationYears: 4,
      totalCredits: 130,
      geCredits: 30,
      majorCredits: 94,
      electiveCredits: 6,
      philosophy: "มุ่งผลิตบัณฑิตที่มีทักษะภาษาอังกฤษระดับสากล มีความเข้าใจในความหลากหลายทางวัฒนธรรม และประยุกต์ใช้เพื่อการเผยแผ่และการทำงานในเวทีโลก",
      objectives: "1. เพื่อผลิตบัณฑิตที่มีสมรรถนะการใช้ภาษาอังกฤษเพื่อการสื่อสารระดับสูง\n2. เพื่อเตรียมความพร้อมสู่การทำงานในองค์กรระหว่างประเทศ",
      careerProspects: "นักแปลและล่าม, เจ้าหน้าที่วิเทศสัมพันธ์, มัคคุเทศก์, ผู้ประสานงานโครงการระหว่างประเทศ, ครูผู้สอนภาษาอังกฤษ",
      pdfUrl: "/uploads/sample-tqf2.pdf",
    },
    create: {
      tenantId: tenant.id,
      departmentId: deptSoc.id,
      code: "01003",
      name: "หลักสูตรศิลปศาสตรบัณฑิต สาขาวิชาภาษาอังกฤษเพื่อการสื่อสารสากล",
      nameEn: "Bachelor of Arts Program in English for Global Communication",
      degreeLevel: "ปริญญาตรี (4 ปี)",
      degreeNameTh: "ศิลปศาสตรบัณฑิต (ภาษาอังกฤษเพื่อการสื่อสารสากล)",
      degreeNameEn: "Bachelor of Arts (English for Global Communication)",
      curriculumYear: "2567",
      durationYears: 4,
      totalCredits: 130,
      geCredits: 30,
      majorCredits: 94,
      electiveCredits: 6,
      philosophy: "มุ่งผลิตบัณฑิตที่มีทักษะภาษาอังกฤษระดับสากล มีความเข้าใจในความหลากหลายทางวัฒนธรรม และประยุกต์ใช้เพื่อการเผยแผ่และการทำงานในเวทีโลก",
      objectives: "1. เพื่อผลิตบัณฑิตที่มีสมรรถนะการใช้ภาษาอังกฤษเพื่อการสื่อสารระดับสูง\n2. เพื่อเตรียมความพร้อมสู่การทำงานในองค์กรระหว่างประเทศ",
      careerProspects: "นักแปลและล่าม, เจ้าหน้าที่วิเทศสัมพันธ์, มัคคุเทศก์, ผู้ประสานงานโครงการระหว่างประเทศ, ครูผู้สอนภาษาอังกฤษ",
      description: "ภาษาอังกฤษเพื่อการสื่อสารระดับนานาชาติ เชื่อมโยงวัฒนธรรมและพุทธปัญญาสู่สากล",
      pdfUrl: "/uploads/sample-tqf2.pdf",
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
