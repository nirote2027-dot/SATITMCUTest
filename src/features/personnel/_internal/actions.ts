"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { requirePermission } from "@/features/identity/server";
import { PERSONNEL_P } from "../permissions";
import { createEmployeeSchema, updateEmployeeSchema } from "./validations";
import { createEmployee, updateEmployee, deleteEmployee, listEmployees, type EmployeeDto } from "./services";

export async function getEmployeesAction(): Promise<ActionResult<EmployeeDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(PERSONNEL_P.read);
    return listEmployees(ctx.tenantId);
  });
}

export async function createEmployeeAction(input: unknown): Promise<ActionResult<EmployeeDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(PERSONNEL_P.manage);
    const parsed = createEmployeeSchema.parse(input, { error: zodErrorMap(await getLocale()) });
    const result = await createEmployee(ctx.tenantId, parsed);
    revalidatePath("/personnel");
    return result;
  });
}

export async function updateEmployeeAction(input: unknown): Promise<ActionResult<EmployeeDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(PERSONNEL_P.manage);
    const parsed = updateEmployeeSchema.parse(input, { error: zodErrorMap(await getLocale()) });
    const result = await updateEmployee(ctx.tenantId, parsed);
    revalidatePath("/personnel");
    return result;
  });
}

export async function deleteEmployeeAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(PERSONNEL_P.manage);
    await deleteEmployee(ctx.tenantId, id);
    revalidatePath("/personnel");
  });
}
