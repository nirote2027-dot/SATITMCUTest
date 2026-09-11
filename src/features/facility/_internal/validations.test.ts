import { describe, it, expect } from "vitest";
import { createFacilitySchema } from "./validations";

describe("facility validations", () => {
  it("validates createFacilitySchema successfully", () => {
    const res = createFacilitySchema.safeParse({
      type: "ROOM",
      name: "ห้องประชุม 101",
      capacity: 30,
    });
    expect(res.success).toBe(true);
  });

  it("fails when name is missing", () => {
    const res = createFacilitySchema.safeParse({
      type: "ROOM",
      name: "",
    });
    expect(res.success).toBe(false);
  });
});
