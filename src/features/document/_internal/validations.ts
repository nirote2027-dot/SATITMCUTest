import { z } from "zod";

export const createDocumentSchema = z.object({
  docNo: z.string().min(1, "docNo_required").max(100),
  title: z.string().min(1, "title_required").max(255),
  docType: z.string().min(1, "docType_required").max(100),
  fileUrl: z.string().max(500).optional(),
  status: z.enum(["DRAFT", "PENDING", "APPROVED", "REJECTED"]).default("DRAFT"),
});

export const updateDocumentSchema = createDocumentSchema.extend({
  id: z.string().uuid(),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
