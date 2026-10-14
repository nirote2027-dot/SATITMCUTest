"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import { getHeroSettings, updateHeroSettings } from "./hero-services";
import type { HeroSettings } from "./hero-types";

export async function getHeroSettingsAction() {
  const ctx = await requirePermission(PERSONNEL_P.read);
  return getHeroSettings(ctx.tenantId);
}

export async function updateHeroSettingsAction(input: HeroSettings) {
  const ctx = await requirePermission(PERSONNEL_P.manage);
  const result = await updateHeroSettings(ctx.tenantId, input);

  // Revalidate home page and admin page
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  revalidatePath("/school/hero");

  return { ok: true, data: result };
}
