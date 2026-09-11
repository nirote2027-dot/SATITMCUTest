import { describe, it, expect } from "vitest";
import { createEmployeeSchema, updateEmployeeSchema } from "./validations";

describe("Personnel Validations", () => {
  it("validate createEmployeeSchema สำเร็จเมื่อข้อมูลจำเป็นครบ", () => {
    const valid = {
      employeeCode: "EMP-001",
      firstName: "สมชาย",
      lastName: "ใจดี",
      position: "อาจารย์ประจำคณะ",
      isActive: true,
    };
    const result = createEmployeeSchema.parse(valid);
    expect(result.employeeCode).toBe("EMP-001");
    expect(result.firstName).toBe("สมชาย");
    expect(result.isActive).toBe(true);
  });

  it("validate createEmployeeSchema ล้มเมื่อรหัสหรือชื่อว่าง", () => {
    expect(() => createEmployeeSchema.parse({ employeeCode: "", firstName: "สมชาย", lastName: "ใจดี" })).toThrow();
    expect(() => createEmployeeSchema.parse({ employeeCode: "EMP-001", firstName: "", lastName: "ใจดี" })).toThrow();
  });

  it("validate updateEmployeeSchema ต้องการ uuid", () => {
    const validId = "123e4567-e89b-12d3-a456-426614174000";
    const result = updateEmployeeSchema.parse({
      id: validId,
      employeeCode: "EMP-001",
      firstName: "สมชาย",
      lastName: "ใจดี",
    });
    expect(result.id).toBe(validId);
  });
});
