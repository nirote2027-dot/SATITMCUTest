import { describe, it, expect } from "vitest";
import { createEmployeeSchema } from "./validations";

describe("personnel validations", () => {
  it("validates createEmployeeSchema successfully", () => {
    const res = createEmployeeSchema.safeParse({
      employeeCode: "EMP001",
      firstName: "สมชาย",
      lastName: "ใจดี",
    });
    expect(res.success).toBe(true);
  });

  it("fails when firstName is missing", () => {
    const res = createEmployeeSchema.safeParse({
      employeeCode: "EMP001",
      firstName: "",
      lastName: "ใจดี",
    });
    expect(res.success).toBe(false);
  });
});
