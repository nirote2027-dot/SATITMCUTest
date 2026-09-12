"use server";

import { requirePermission } from "@/features/identity/server";
import { DEPARTMENT_P } from "../permissions";
import { revalidatePath } from "next/cache";
import {
  CreateDepartmentSchema,
  UpdateDepartmentSchema,
  type CreateDepartmentInput,
  type UpdateDepartmentInput,
} from "./validations";
import {
  listDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "./services";

export async function getDepartmentsAction() {
  const ctx = await requirePermission(DEPARTMENT_P.read);
  try {
    const data = await listDepartments(ctx.tenantId);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "Failed to list departments" };
  }
}

export async function createDepartmentAction(input: CreateDepartmentInput) {
  const ctx = await requirePermission(DEPARTMENT_P.manage);
  const parsed = CreateDepartmentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid input" };
  }

  try {
    const data = await createDepartment(ctx.tenantId, parsed.data);
    revalidatePath("/department");
    revalidatePath("/curriculum");
    revalidatePath("/personnel");
    revalidatePath("/");
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "Failed to create department" };
  }
}

export async function updateDepartmentAction(input: UpdateDepartmentInput) {
  const ctx = await requirePermission(DEPARTMENT_P.manage);
  const parsed = UpdateDepartmentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid input" };
  }

  try {
    const data = await updateDepartment(ctx.tenantId, parsed.data);
    revalidatePath("/department");
    revalidatePath("/curriculum");
    revalidatePath("/personnel");
    revalidatePath("/");
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: "Failed to update department" };
  }
}

export async function deleteDepartmentAction(id: string) {
  const ctx = await requirePermission(DEPARTMENT_P.manage);
  try {
    await deleteDepartment(id, ctx.tenantId);
    revalidatePath("/department");
    revalidatePath("/curriculum");
    revalidatePath("/personnel");
    revalidatePath("/");
    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || "Failed to delete department" };
  }
}
