import { z } from "zod";
import { PALETTE_IDS } from "@/shared/lib/palette";

export const updateSettingsSchema = z.object({
  nameTh: z.string().trim().min(1).max(255),
  nameEn: z.string().trim().min(1).max(255),
  logoUrl: z
    .string()
    .trim()
    .max(500)
    .refine((val) => !val || val.startsWith("/") || /^https?:\/\//i.test(val), {
      message: "ต้องเป็น URL ที่ถูกต้อง หรือ path รูปภาพที่อัปโหลด",
    })
    .default(""),
  palette: z.enum(PALETTE_IDS),
  smtpHost: z
    .string()
    .trim()
    .max(255)
    .refine((val) => !val || !val.includes("@"), {
      message: "SMTP Host ต้องเป็นชื่อโฮสต์ เช่น smtp.gmail.com (ไม่ใช่ที่อยู่อีเมล)",
    })
    .default(""),
  smtpPort: z.coerce.number().int().min(1).max(65535).default(465),
  smtpUser: z.string().trim().max(255).default(""),
  smtpPass: z.string().default(""),
  smtpFrom: z.string().trim().max(255).default(""),
  smtpSecure: z.boolean().default(true),
  geminiApiKey: z.string().trim().max(255).default(""),
});

export const testGeminiSchema = z.object({
  apiKey: z.string().trim().min(1, "กรุณาระบุ Gemini API Key ที่ต้องการทดสอบ"),
});

export const testSmtpSchema = z.object({
  to: z.string().trim().email("กรุณาระบุอีเมลผู้รับที่ถูกต้อง"),
  smtpHost: z
    .string()
    .trim()
    .min(1, "กรุณาระบุ SMTP Host")
    .refine((val) => !val.includes("@"), {
      message: "SMTP Host ต้องเป็นชื่อโฮสต์ เช่น smtp.gmail.com (ไม่ใช่ที่อยู่อีเมล)",
    }),
  smtpPort: z.coerce.number().int().min(1).max(65535).default(465),
  smtpUser: z.string().trim().min(1, "กรุณาระบุอีเมลผู้ส่ง (Username)"),
  smtpPass: z.string().min(1, "กรุณาระบุรหัสผ่านแอป (App Password)"),
  smtpFrom: z.string().trim().default(""),
  smtpSecure: z.boolean().default(true),
});

export const updateProfileSchema = z.object({ name: z.string().trim().min(1).max(255), locale: z.enum(["th", "en"]) });
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
export type TestSmtpInput = z.infer<typeof testSmtpSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

