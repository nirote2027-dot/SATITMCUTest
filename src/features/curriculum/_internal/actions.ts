"use server";

import { requirePermission } from "@/features/identity/server";
import { CURRICULUM_P } from "../permissions";
import { getLocale } from "@/shared/lib/i18n/server";
import { revalidatePath } from "next/cache";
import {
  CreateCurriculumSchema,
  UpdateCurriculumSchema,
  type CreateCurriculumInput,
  type UpdateCurriculumInput,
} from "./validations";
import {
  listCurricula,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
} from "./services";

export async function getCurriculaAction() {
  const ctx = await requirePermission(CURRICULUM_P.read);
  try {
    const data = await listCurricula(ctx.tenantId);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "Failed to list curricula" };
  }
}

export async function createCurriculumAction(input: CreateCurriculumInput) {
  const ctx = await requirePermission(CURRICULUM_P.manage);
  const parsed = CreateCurriculumSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid input" };
  }
  
  try {
    const data = await createCurriculum(ctx.tenantId, parsed.data);
    revalidatePath("/curriculum");
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "Failed to create curriculum" };
  }
}

export async function updateCurriculumAction(input: UpdateCurriculumInput) {
  const ctx = await requirePermission(CURRICULUM_P.manage);
  const parsed = UpdateCurriculumSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid input" };
  }
  
  try {
    const data = await updateCurriculum(ctx.tenantId, parsed.data);
    revalidatePath("/curriculum");
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "Failed to update curriculum" };
  }
}

export async function deleteCurriculumAction(id: string) {
  const ctx = await requirePermission(CURRICULUM_P.manage);
  try {
    await deleteCurriculum(id, ctx.tenantId);
    revalidatePath("/curriculum");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: "Failed to delete curriculum" };
  }
}
