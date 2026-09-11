import { describe, it, expect } from "vitest";
import { createArticleSchema } from "./validations";

describe("news validations", () => {
  it("validates createArticleSchema successfully", () => {
    const res = createArticleSchema.safeParse({
      title: "ข่าวประชาสัมพันธ์",
      content: "รายละเอียด",
    });
    expect(res.success).toBe(true);
  });

  it("fails when title is missing", () => {
    const res = createArticleSchema.safeParse({
      title: "",
    });
    expect(res.success).toBe(false);
  });
});
