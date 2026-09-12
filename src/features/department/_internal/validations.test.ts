import { describe, it, expect } from "vitest";
import { CreateDepartmentSchema, UpdateDepartmentSchema } from "./validations";

describe("Department Validations", () => {
  it("should validate valid CreateDepartmentInput", () => {
    const valid = {
      code: "SCI",
      name: "ภาควิชาวิทยาศาสตร์",
      description: "จัดการเรียนการสอนกลุ่มสาระวิทยาศาสตร์และเทคโนโลยี",
    };
    const result = CreateDepartmentSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("should reject empty name", () => {
    const invalid = {
      name: "",
    };
    const result = CreateDepartmentSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("should validate valid UpdateDepartmentInput", () => {
    const valid = {
      id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      name: "ภาควิชาคณิตศาสตร์",
    };
    const result = UpdateDepartmentSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });
});
