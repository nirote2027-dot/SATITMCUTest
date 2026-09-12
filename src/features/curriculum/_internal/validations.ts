import { z } from "zod";

export const CreateCurriculumSchema = z.object({
  code: z.string().min(1, "Code is required").max(100),
  name: z.string().min(1, "Name is required").max(255),
  nameEn: z.string().max(255).optional().nullable(),
  degreeLevel: z.string().min(1, "Degree level is required").max(100),
  degreeNameTh: z.string().max(255).optional().nullable(),
  degreeNameEn: z.string().max(255).optional().nullable(),
  curriculumYear: z.string().max(20).optional().nullable(),
  durationYears: z.coerce.number().min(1).max(10).optional().nullable(),
  departmentId: z.string().uuid().optional().nullable(),
  totalCredits: z.coerce.number().min(0, "Total credits must be a positive number"),
  geCredits: z.coerce.number().min(0).optional().nullable(),
  majorCredits: z.coerce.number().min(0).optional().nullable(),
  electiveCredits: z.coerce.number().min(0).optional().nullable(),
  description: z.string().optional().nullable(),
  philosophy: z.string().optional().nullable(),
  objectives: z.string().optional().nullable(),
  careerProspects: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  pdfUrl: z.string().max(500).optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CreateCurriculumInput = z.infer<typeof CreateCurriculumSchema>;

export const UpdateCurriculumSchema = CreateCurriculumSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateCurriculumInput = z.infer<typeof UpdateCurriculumSchema>;
