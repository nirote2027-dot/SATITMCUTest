"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import {
  getSchoolInfo,
  updateSchoolInfo,
  listExecutives,
  createExecutive,
  updateExecutive,
  deleteExecutive,
  reorderExecutives,
} from "./services";
import {
  updateSchoolInfoSchema,
  createExecutiveSchema,
  updateExecutiveSchema,
  type UpdateSchoolInfoInput,
  type CreateExecutiveInput,
  type UpdateExecutiveInput,
} from "./validations";

export async function getSchoolInfoAction() {
  const ctx = await requirePermission(PERSONNEL_P.read);
  return getSchoolInfo(ctx.tenantId);
}

export async function updateSchoolInfoAction(input: UpdateSchoolInfoInput) {
  const ctx = await requirePermission(PERSONNEL_P.manage);
  const validated = updateSchoolInfoSchema.parse(input);
  const result = await updateSchoolInfo(ctx.tenantId, validated);
  revalidatePath("/school/info");
  revalidatePath("/dashboard");
  revalidatePath("/");
  return { ok: true, data: result };
}

export async function getExecutivesAction() {
  const ctx = await requirePermission(PERSONNEL_P.read);
  return listExecutives(ctx.tenantId);
}

export async function createExecutiveAction(input: CreateExecutiveInput) {
  const ctx = await requirePermission(PERSONNEL_P.manage);
  const validated = createExecutiveSchema.parse(input);
  const result = await createExecutive(ctx.tenantId, validated);
  revalidatePath("/school/executives");
  revalidatePath("/");
  return { ok: true, data: result };
}

export async function updateExecutiveAction(input: UpdateExecutiveInput) {
  const ctx = await requirePermission(PERSONNEL_P.manage);
  const validated = updateExecutiveSchema.parse(input);
  const result = await updateExecutive(ctx.tenantId, validated);
  revalidatePath("/school/executives");
  revalidatePath("/");
  return { ok: true, data: result };
}

export async function deleteExecutiveAction(id: string) {
  const ctx = await requirePermission(PERSONNEL_P.manage);
  await deleteExecutive(ctx.tenantId, id);
  revalidatePath("/school/executives");
  revalidatePath("/");
  return { ok: true };
}

export async function reorderExecutivesAction(orderedIds: string[]) {
  const ctx = await requirePermission(PERSONNEL_P.manage);
  const result = await reorderExecutives(ctx.tenantId, orderedIds);
  revalidatePath("/school/executives");
  revalidatePath("/");
  return { ok: true, data: result };
}
