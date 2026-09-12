import { z } from "zod";
import { ArticleStatus } from "@/generated/prisma";

export const createArticleSchema = z.object({
  title: z.string().min(1, "กรุณาระบุหัวข้อข่าว"),
  titleEn: z.string().max(255).optional().nullable(),
  content: z.string().optional().nullable(),
  contentEn: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  categoryId: z.string().uuid().optional().nullable(),
  status: z.nativeEnum(ArticleStatus).default(ArticleStatus.DRAFT),
  publishedAt: z.string().optional().nullable(),
});
export type CreateArticleInput = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = createArticleSchema.partial().extend({
  id: z.string().uuid(),
});
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;

export const generateEnglishNewsSchema = z.object({
  titleTh: z.string().min(1, "กรุณาระบุหัวข้อข่าวภาษาไทยก่อนให้ AI แปล"),
  contentTh: z.string().optional().nullable(),
});
export type GenerateEnglishNewsInput = z.infer<typeof generateEnglishNewsSchema>;
