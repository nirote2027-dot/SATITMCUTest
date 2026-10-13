"use server";

import {
  listDownloadDocuments,
  createDownloadDocument,
  updateDownloadDocument,
  deleteDownloadDocument,
  incrementDownloadCount,
} from "./server";
import type {
  DownloadDocumentDto,
  CreateDownloadDocumentInput,
  UpdateDownloadDocumentInput,
} from "./types";

export async function getDownloadDocumentsAction(): Promise<{
  ok: boolean;
  data: DownloadDocumentDto[];
}> {
  try {
    const data = await listDownloadDocuments();
    return { ok: true, data };
  } catch (error) {
    console.error("getDownloadDocumentsAction error:", error);
    return { ok: false, data: [] };
  }
}

export async function createDownloadDocumentAction(
  input: CreateDownloadDocumentInput,
): Promise<{ ok: boolean; data?: DownloadDocumentDto; error?: string }> {
  try {
    const data = await createDownloadDocument(input);
    return { ok: true, data };
  } catch (error: any) {
    console.error("createDownloadDocumentAction error:", error);
    return { ok: false, error: error?.message || "Failed to create document" };
  }
}

export async function updateDownloadDocumentAction(
  input: UpdateDownloadDocumentInput,
): Promise<{ ok: boolean; data?: DownloadDocumentDto; error?: string }> {
  try {
    const data = await updateDownloadDocument(input);
    if (!data) return { ok: false, error: "Document not found" };
    return { ok: true, data };
  } catch (error: any) {
    console.error("updateDownloadDocumentAction error:", error);
    return { ok: false, error: error?.message || "Failed to update document" };
  }
}

export async function deleteDownloadDocumentAction(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const success = await deleteDownloadDocument(id);
    return { ok: success };
  } catch (error: any) {
    console.error("deleteDownloadDocumentAction error:", error);
    return { ok: false, error: error?.message || "Failed to delete document" };
  }
}

export async function recordDownloadCountAction(
  id: string,
): Promise<{ ok: boolean; count: number }> {
  try {
    const count = await incrementDownloadCount(id);
    return { ok: true, count };
  } catch (error) {
    return { ok: false, count: 0 };
  }
}
