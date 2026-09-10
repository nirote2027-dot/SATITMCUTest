"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { requirePermission } from "@/features/identity/server";
import { DOCUMENT_P } from "../permissions";
import { createDocumentSchema, updateDocumentSchema } from "./validations";
import { createDocument, updateDocument, deleteDocument, listDocuments, type DocumentDto } from "./services";

export async function getDocumentsAction(): Promise<ActionResult<DocumentDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentRead);
    return listDocuments(ctx.tenantId);
  });
}

export async function createDocumentAction(input: unknown): Promise<ActionResult<DocumentDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const parsed = createDocumentSchema.parse(input, { error: zodErrorMap(await getLocale()) });
    const result = await createDocument(ctx.tenantId, ctx.userId, parsed);
    revalidatePath("/document");
    return result;
  });
}

export async function updateDocumentAction(input: unknown): Promise<ActionResult<DocumentDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    const parsed = updateDocumentSchema.parse(input, { error: zodErrorMap(await getLocale()) });
    const result = await updateDocument(ctx.tenantId, parsed);
    revalidatePath("/document");
    return result;
  });
}

export async function deleteDocumentAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(DOCUMENT_P.documentManage);
    await deleteDocument(ctx.tenantId, id);
    revalidatePath("/document");
  });
}
