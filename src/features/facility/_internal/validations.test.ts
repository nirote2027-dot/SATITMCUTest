import { describe, it, expect } from "vitest";
import { createFacilitySchema, updateFacilitySchema } from "./validations";

describe("Facility Validations", () => {
  it("validate createFacilitySchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      type: "ROOM" as const,
      name: "ห้องประชุมใหญ่ สุจิตโต",
      capacity: 200,
      status: "AVAILABLE" as const,
    };
    const result = createFacilitySchema.parse(valid);
    expect(result.name).toBe("ห้องประชุมใหญ่ สุจิตโต");
    expect(result.capacity).toBe(200);
    expect(result.type).toBe("ROOM");
    expect(result.status).toBe("AVAILABLE");
  });

  it("validate createFacilitySchema แปลง capacity จาก string เป็น number ได้", () => {
    const valid = {
      type: "VEHICLE" as const,
      name: "รถตู้ส่วนกลาง 1",
      capacity: "12",
    };
    const result = createFacilitySchema.parse(valid);
    expect(result.capacity).toBe(12);
  });

  it("validate createFacilitySchema ล้มเมื่อไม่มี type หรือ name", () => {
    expect(() => createFacilitySchema.parse({ name: "ไม่มี type" })).toThrow();
    expect(() => createFacilitySchema.parse({ type: "ROOM", name: "" })).toThrow();
  });

  it("validate updateFacilitySchema ต้องการ uuid", () => {
    const validId = "123e4567-e89b-12d3-a456-426614174000";
    const result = updateFacilitySchema.parse({
      id: validId,
      type: "ROOM",
      name: "ห้องประชุมย่อย 1",
    });
    expect(result.id).toBe(validId);
  });
});
