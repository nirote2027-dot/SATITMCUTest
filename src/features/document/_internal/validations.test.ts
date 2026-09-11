import { describe, it, expect } from "vitest";
import { createDocumentSchema, updateDocumentSchema } from "./validations";

describe("Document Validations", () => {
  it("validate createDocumentSchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      docNo: "DOC-2026-001",
      title: "คำร้องขอเปิดรายวิชาใหม่",
      docType: "คำร้องวิชาการ",
      status: "DRAFT" as const,
    };
    const result = createDocumentSchema.parse(valid);
    expect(result.docNo).toBe("DOC-2026-001");
    expect(result.status).toBe("DRAFT");
  });

  it("validate createDocumentSchema ให้ค่าเริ่มต้น status เป็น DRAFT เมื่อไม่ได้ระบุ", () => {
    const result = createDocumentSchema.parse({
      docNo: "DOC-2026-002",
      title: "คำร้องขอลาพักการเรียน",
      docType: "คำร้องทั่วไป",
    });
    expect(result.status).toBe("DRAFT");
  });

  it("validate createDocumentSchema ล้มเมื่อไม่มี docNo หรือ title", () => {
    expect(() => createDocumentSchema.parse({ docNo: "", title: "", docType: "คำร้อง" })).toThrow();
  });

  it("validate updateDocumentSchema ต้องการ uuid", () => {
    const validId = "123e4567-e89b-12d3-a456-426614174000";
    const result = updateDocumentSchema.parse({
      id: validId,
      docNo: "DOC-2026-001",
      title: "แก้ไขคำร้อง",
      docType: "คำร้องทั่วไป",
    });
    expect(result.id).toBe(validId);
  });
});
