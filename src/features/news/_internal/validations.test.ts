import { describe, it, expect } from "vitest";
import { createArticleSchema, updateArticleSchema } from "./validations";
import { ArticleStatus } from "@/generated/prisma";

describe("News Validations", () => {
  it("validate createArticleSchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      title: "ประกาศรับสมัครนักศึกษาใหม่ 2569",
      content: "รายละเอียดการรับสมัคร",
      status: ArticleStatus.PUBLISHED,
    };
    const result = createArticleSchema.parse(valid);
    expect(result.title).toBe(valid.title);
    expect(result.status).toBe(ArticleStatus.PUBLISHED);
  });

  it("validate createArticleSchema ให้ค่าเริ่มต้น status เป็น DRAFT เมื่อไม่ได้ระบุ", () => {
    const result = createArticleSchema.parse({ title: "ข่าวด่วน" });
    expect(result.status).toBe(ArticleStatus.DRAFT);
  });

  it("validate createArticleSchema ล้มเมื่อไม่มี title หรือ title ว่างเปล่า", () => {
    expect(() => createArticleSchema.parse({ title: "" })).toThrow();
  });

  it("validate updateArticleSchema ต้องมี uuid ที่ถูกต้อง", () => {
    const validId = "123e4567-e89b-12d3-a456-426614174000";
    const result = updateArticleSchema.parse({ id: validId, title: "แก้ไขหัวข้อข่าว" });
    expect(result.id).toBe(validId);
    expect(result.title).toBe("แก้ไขหัวข้อข่าว");
  });

  it("validate updateArticleSchema ล้มเมื่อ id ไม่ใช่ uuid", () => {
    expect(() => updateArticleSchema.parse({ id: "invalid-id" })).toThrow();
  });
});
