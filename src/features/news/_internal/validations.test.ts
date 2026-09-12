import { describe, it, expect } from "vitest";
import { createArticleSchema, updateArticleSchema, generateEnglishNewsSchema } from "./validations";

describe("news validations", () => {
  it("validates createArticleSchema successfully with Thai and English", () => {
    const res = createArticleSchema.safeParse({
      title: "ข่าวประชาสัมพันธ์",
      titleEn: "Public Relations News",
      content: "รายละเอียด",
      contentEn: "Details here",
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.titleEn).toBe("Public Relations News");
      expect(res.data.contentEn).toBe("Details here");
    }
  });

  it("fails when title is missing", () => {
    const res = createArticleSchema.safeParse({
      title: "",
    });
    expect(res.success).toBe(false);
  });

  it("validates updateArticleSchema successfully", () => {
    const res = updateArticleSchema.safeParse({
      id: "123e4567-e89b-12d3-a456-426614174000",
      titleEn: "Updated English Title",
    });
    expect(res.success).toBe(true);
  });

  it("validates generateEnglishNewsSchema", () => {
    const valid = generateEnglishNewsSchema.safeParse({
      titleTh: "เปิดรับสมัครนักเรียนใหม่",
      contentTh: "ปีการศึกษา 2569",
    });
    expect(valid.success).toBe(true);

    const invalid = generateEnglishNewsSchema.safeParse({
      titleTh: "",
    });
    expect(invalid.success).toBe(false);
  });
});

