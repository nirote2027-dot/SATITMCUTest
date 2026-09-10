import { z } from "zod";

export const createFacilitySchema = z.object({
  type: z.enum(["ROOM", "VEHICLE"]),
  name: z.string().min(1, "name_required").max(255),
  capacity: z.coerce.number().int().positive().nullable().optional(),
  imageUrl: z.string().optional().nullable(),
  status: z.enum(["AVAILABLE", "MAINTENANCE"]).default("AVAILABLE"),
});

export const updateFacilitySchema = createFacilitySchema.extend({
  id: z.string().uuid(),
});

export type CreateFacilityInput = z.infer<typeof createFacilitySchema>;
export type UpdateFacilityInput = z.infer<typeof updateFacilitySchema>;
