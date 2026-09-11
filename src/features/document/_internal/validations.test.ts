import { describe, it, expect } from "vitest";
import { createDocumentSchema } from "./validations";

describe("document validations", () => {
  it("validates createDocumentSchema successfully", () => {
    const res = createDocumentSchema.safeParse({
      docNo: "DOC-001",
      title: "หนังสือขออนุมัติ",
      docType: "คำร้องทั่วไป",
    });
    expect(res.success).toBe(true);
  });

  it("fails when docNo is empty", () => {
    const res = createDocumentSchema.safeParse({
      docNo: "",
      title: "หนังสือขออนุมัติ",
      docType: "คำร้องทั่วไป",
    });
    expect(res.success).toBe(false);
  });
});
