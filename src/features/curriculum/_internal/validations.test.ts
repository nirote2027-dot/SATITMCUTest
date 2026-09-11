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
});
