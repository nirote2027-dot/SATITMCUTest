"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { requirePermission } from "@/features/identity/server";
import { FACILITY_P } from "../permissions";
import { createFacilitySchema, updateFacilitySchema } from "./validations";
import { createFacility, updateFacility, deleteFacility, listFacilities, type FacilityDto } from "./services";

export async function getFacilitiesAction(): Promise<ActionResult<FacilityDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(FACILITY_P.read);
    return listFacilities(ctx.tenantId);
  });
}

export async function createFacilityAction(input: unknown): Promise<ActionResult<FacilityDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(FACILITY_P.manage);
    const parsed = createFacilitySchema.parse(input, { error: zodErrorMap(await getLocale()) });
    const result = await createFacility(ctx.tenantId, parsed);
    revalidatePath("/download");
    return result;
  });
}

export async function updateFacilityAction(input: unknown): Promise<ActionResult<FacilityDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(FACILITY_P.manage);
    const parsed = updateFacilitySchema.parse(input, { error: zodErrorMap(await getLocale()) });
    const result = await updateFacility(ctx.tenantId, parsed);
    revalidatePath("/download");
    return result;
  });
}

export async function deleteFacilityAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(FACILITY_P.manage);
    await deleteFacility(ctx.tenantId, id);
    revalidatePath("/download");
  });
}
