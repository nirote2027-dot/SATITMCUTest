import { describe, it, expect } from "vitest";
import { CreateCurriculumSchema, UpdateCurriculumSchema } from "./validations";

describe("Curriculum Validations", () => {
  it("validate CreateCurriculumSchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      code: "CURR-2569-CS",
      name: "หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
      degreeLevel: "ปริญญาตรี (4 ปี)",
      totalCredits: 130,
      isActive: true,
    };
    const result = CreateCurriculumSchema.parse(valid);
    expect(result.code).toBe(valid.code);
    expect(result.totalCredits).toBe(130);
  });

  it("validate CreateCurriculumSchema แปลง totalCredits จาก string เป็น number ได้", () => {
    const valid = {
      code: "CURR-01",
      name: "หลักสูตรทดสอบ",
      degreeLevel: "ปริญญาตรี",
      totalCredits: "128",
    };
    const result = CreateCurriculumSchema.parse(valid);
    expect(result.totalCredits).toBe(128);
  });

  it("validate CreateCurriculumSchema ล้มเมื่อไม่มี code หรือ name", () => {
    expect(() => CreateCurriculumSchema.parse({ code: "", name: "ทดสอบ", degreeLevel: "ตรี", totalCredits: 120 })).toThrow();
  });

  it("validate UpdateCurriculumSchema ต้องการ uuid", () => {
    const validId = "123e4567-e89b-12d3-a456-426614174000";
    const result = UpdateCurriculumSchema.parse({
      id: validId,
      name: "หลักสูตรปรับปรุง",
    });
    expect(result.id).toBe(validId);
    expect(result.name).toBe("หลักสูตรปรับปรุง");
  });
});
