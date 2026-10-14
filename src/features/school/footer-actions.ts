"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import { getFooterSettings, updateFooterSettings } from "./footer-services";
import type { FooterSettings } from "./types";

export async function getFooterSettingsAction() {
  const ctx = await requirePermission(PERSONNEL_P.read);
  return getFooterSettings(ctx.tenantId);
}

export async function updateFooterSettingsAction(input: FooterSettings) {
  const ctx = await requirePermission(PERSONNEL_P.manage);
  const result = await updateFooterSettings(ctx.tenantId, input);

  // Revalidate layout and pages so data-palette on <html> and footer update immediately
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  revalidatePath("/dashboard", "layout");
  revalidatePath("/settings", "page");
  revalidatePath("/school/footer");

  return { ok: true, data: result };
}
