import { z } from "zod";

export const CreateCurriculumSchema = z.object({
  code: z.string().min(1, "Code is required").max(100),
  name: z.string().min(1, "Name is required").max(255),
  degreeLevel: z.string().min(1, "Degree level is required").max(100),
  totalCredits: z.coerce.number().min(0, "Total credits must be a positive number"),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateCurriculumInput = z.infer<typeof CreateCurriculumSchema>;

export const UpdateCurriculumSchema = CreateCurriculumSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateCurriculumInput = z.infer<typeof UpdateCurriculumSchema>;
