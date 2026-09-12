import { describe, it, expect } from "vitest";
import { CreateCurriculumSchema } from "./validations";

describe("curriculum validations", () => {
  it("validates CreateCurriculumSchema successfully", () => {
    const res = CreateCurriculumSchema.safeParse({
      code: "CS101",
      name: "Computer Science",
      degreeLevel: "Bachelor",
      totalCredits: 130,
    });
    expect(res.success).toBe(true);
  });

  it("fails when code is missing", () => {
    const res = CreateCurriculumSchema.safeParse({
      code: "",
      name: "Computer Science",
      degreeLevel: "Bachelor",
      totalCredits: 130,
    });
    expect(res.success).toBe(false);
  });

  it("validates with optional departmentId", () => {
    const res = CreateCurriculumSchema.safeParse({
      code: "CS102",
      name: "Software Engineering",
      degreeLevel: "Bachelor",
      totalCredits: 130,
      departmentId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    });
    expect(res.success).toBe(true);
  });

  it("validates with complete TQF 2 fields", () => {
    const res = CreateCurriculumSchema.safeParse({
      code: "01001",
      name: "หลักสูตรพุทธศาสตรบัณฑิต สาขาวิชาพระพุทธศาสนา",
      nameEn: "Bachelor of Arts Program in Buddhism",
      degreeLevel: "ปริญญาตรี",
      degreeNameTh: "พุทธศาสตรบัณฑิต (พระพุทธศาสนา)",
      degreeNameEn: "Bachelor of Arts (Buddhism)",
      curriculumYear: "2567",
      durationYears: 4,
      totalCredits: 132,
      geCredits: 30,
      majorCredits: 96,
      electiveCredits: 6,
      philosophy: "มุ่งผลิตบัณฑิตให้มีความรู้ ความเข้าใจในหลักพุทธธรรม",
      objectives: "เพื่อผลิตบัณฑิตที่มีคุณธรรม จริยธรรม",
      careerProspects: "อาจารย์สอนพระพุทธศาสนา นักวิชาการศาสนา",
      pdfUrl: "/uploads/tqf2-buddhism.pdf",
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.nameEn).toBe("Bachelor of Arts Program in Buddhism");
      expect(res.data.geCredits).toBe(30);
      expect(res.data.pdfUrl).toBe("/uploads/tqf2-buddhism.pdf");
    }
  });
});
