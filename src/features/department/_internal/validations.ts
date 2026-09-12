import { z } from "zod";

export const CreateDepartmentSchema = z.object({
  code: z.string().max(50).optional().nullable(),
  name: z.string().min(1, "Name is required").max(255),
  parentId: z.string().uuid().optional().nullable(),
  description: z.string().optional().nullable(),
});

export type CreateDepartmentInput = z.infer<typeof CreateDepartmentSchema>;

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateDepartmentInput = z.infer<typeof UpdateDepartmentSchema>;
