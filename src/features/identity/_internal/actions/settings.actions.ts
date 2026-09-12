"use server";
import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { P } from "../../permissions";
import { requirePermission } from "../rbac";
import { updateSettingsSchema, testSmtpSchema } from "../validations/settings";
import { getTenantSettings, updateTenantSettings, type TenantSettings } from "../services/tenant.service";
import { testSmtpConnection } from "@/shared/lib/infra/mailer";
import { errors } from "@/shared/lib/errors";

export async function getSettingsAction(): Promise<ActionResult<TenantSettings>> {
  return runAction(async () => getTenantSettings((await requirePermission(P.settingsManage)).tenantId));
}

export async function getBrandingAction(): Promise<ActionResult<{ logoUrl: string | null; nameTh: string; nameEn: string }>> {
  return runAction(async () => {
    const { prisma } = await import("@/shared/lib/infra/prisma");
    const { auth } = await import("../auth");
    const session = await auth().catch(() => null);
    let tenantId = session?.tenantId;
    if (!tenantId) {
      const first = await prisma.tenant.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" }, select: { id: true } });
      tenantId = first?.id;
    }
    if (!tenantId) return { logoUrl: null, nameTh: "", nameEn: "" };
    const t = await prisma.tenant.findUnique({ where: { id: tenantId }, select: { logoUrl: true, nameTh: true, nameEn: true } });
    return { logoUrl: t?.logoUrl ?? null, nameTh: t?.nameTh ?? "", nameEn: t?.nameEn ?? "" };
  });
}

export async function updateSettingsAction(input: unknown): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(P.settingsManage);
    await updateTenantSettings({ tenantId: ctx.tenantId, actorId: ctx.userId, ...updateSettingsSchema.parse(input, { error: zodErrorMap(await getLocale()) }) });
    revalidatePath("/", "layout"); // data-palette บน <html> อ่านใหม่
    revalidatePath("/", "page");
    revalidatePath("/dashboard", "layout");
    revalidatePath("/settings", "page");
  });
}

export async function testSmtpAction(input: unknown): Promise<ActionResult<{ success: boolean; message: string }>> {
  return runAction(async () => {
    await requirePermission(P.settingsManage);
    const parsed = testSmtpSchema.parse(input, { error: zodErrorMap(await getLocale()) });
    const res = await testSmtpConnection({
      host: parsed.smtpHost,
      port: parsed.smtpPort,
      secure: parsed.smtpSecure,
      user: parsed.smtpUser,
      pass: parsed.smtpPass,
      from: parsed.smtpFrom || parsed.smtpUser,
      to: parsed.to,
    });
    if (!res.success) {
      throw errors.validation(res.message || "Failed to connect to SMTP server");
    }
    return { success: true, message: "เชื่อมต่อและส่งอีเมลทดสอบสำเร็จ" };
  });
}

export async function testGeminiAction(apiKeyInput?: string): Promise<ActionResult<{ success: boolean; message: string; model: string }>> {
  return runAction(async () => {
    const ctx = await requirePermission(P.settingsManage);
    const apiKey = (apiKeyInput && apiKeyInput.trim()) || (await getTenantSettings(ctx.tenantId)).geminiApiKey || process.env.GEMINI_API_KEY || "";
    if (!apiKey) {
      throw errors.validation("กรุณาระบุ Gemini API Key ก่อนทำการทดสอบ");
    }

    const model = "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Ping test: Reply with 'OK' and nothing else." }] }],
          generationConfig: { maxOutputTokens: 10 },
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errorMsg = data?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw errors.validation(`เชื่อมต่อ Gemini ไม่สำเร็จ: ${errorMsg}`);
      }

      return {
        success: true,
        message: "เชื่อมต่อกับ Google Gemini API สำเร็จเรียบร้อยแล้ว! AI พร้อมให้บริการ",
        model,
      };
    } catch (err: unknown) {
      if (err && typeof err === "object" && "code" in err) throw err;
      throw errors.validation(`ไม่สามารถเชื่อมต่อ Gemini API ได้: ${err instanceof Error ? err.message : String(err)}`);
    }
  });
}


