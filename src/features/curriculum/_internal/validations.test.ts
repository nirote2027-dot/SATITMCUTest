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
});
