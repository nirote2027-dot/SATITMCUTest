import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeCode: z.string().min(1, "employee_code_required").max(100),
  firstName: z.string().min(1, "first_name_required").max(100),
  lastName: z.string().min(1, "last_name_required").max(100),
  position: z.string().max(255).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  departmentId: z.string().uuid().optional().nullable(),
  userId: z.string().uuid().optional().nullable(),
  contactInfo: z.record(z.string(), z.unknown()).optional().nullable(),
  isActive: z.boolean().default(true),
});

export const updateEmployeeSchema = createEmployeeSchema.extend({
  id: z.string().uuid(),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
