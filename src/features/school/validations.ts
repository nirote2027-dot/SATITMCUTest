import { z } from "zod";

export const galleryItemSchema = z.object({
  id: z.string(),
  url: z.string().min(1, "กรุณาระบุ URL รูปภาพ"),
  title: z.string().optional().default(""),
  description: z.string().optional().default(""),
  createdAt: z.string().optional(),
});

export const updateSchoolInfoSchema = z.object({
  nameTh: z.string().min(1, "กรุณาระบุชื่อโรงเรียนภาษาไทย"),
  nameEn: z.string().optional().default(""),
  shortName: z.string().optional().default(""),
  motto: z.string().optional().default(""),
  philosophy: z.string().optional().default(""),
  vision: z.string().optional().default(""),
  mission: z.array(z.string()).optional().default([]),
  identity: z.string().optional().default(""),
  uniqueness: z.string().optional().default(""),
  schoolColors: z.string().optional().default(""),
  treeFlower: z.string().optional().default(""),
  history: z.string().optional().default(""),
  address: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  fax: z.string().optional().default(""),
  email: z.string().optional().default(""),
  website: z.string().optional().default(""),
  facebook: z.string().optional().default(""),
  facebookPageUrl: z.string().optional().default(""),
  facebookDisplayHeight: z.enum(["compact", "medium", "tall", "full", "custom"]).optional().default("medium"),
  facebookCustomHeight: z.coerce.number().optional().default(450),
  showFacebookWidget: z.boolean().optional().default(true),
  facebookTabs: z.string().optional().default("timeline"),
  facebookSmallHeader: z.boolean().optional().default(false),
  facebookHideCover: z.boolean().optional().default(false),
  facebookShowFacepile: z.boolean().optional().default(true),
  facebookDisplayMode: z.enum(["plugin", "card"]).optional().default("plugin"),
  line: z.string().optional().default(""),
  mapUrl: z.string().optional().default(""),
  mapEmbedUrl: z.string().optional().default(""),
  mapDisplayHeight: z.enum(["compact", "medium", "tall", "full", "custom"]).optional().default("medium"),
  mapCustomHeight: z.coerce.number().optional().default(450),
  showMapWidget: z.boolean().optional().default(true),
  logoUrl: z.string().optional().default(""),
  coverImageUrl: z.string().optional().default(""),
  gallery: z.array(galleryItemSchema).optional().default([]),
});

export const createExecutiveSchema = z.object({
  prefix: z.string().optional().default(""),
  firstName: z.string().min(1, "กรุณาระบุชื่อ"),
  lastName: z.string().min(1, "กรุณาระบุนามสกุล"),
  position: z.string().min(1, "กรุณาระบุตำแหน่งบริหาร"),
  academicRank: z.string().optional().default(""),
  department: z.string().optional().default(""),
  displayOrder: z.coerce.number().default(1),
  imageUrl: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export const updateExecutiveSchema = createExecutiveSchema.extend({
  id: z.string().min(1, "Missing ID"),
});

export type UpdateSchoolInfoInput = z.infer<typeof updateSchoolInfoSchema>;
export type CreateExecutiveInput = z.infer<typeof createExecutiveSchema>;
export type UpdateExecutiveInput = z.infer<typeof updateExecutiveSchema>;
