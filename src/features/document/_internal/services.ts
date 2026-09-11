import { prisma } from "@/shared/lib/infra/prisma";
import type { CreateDocumentInput, UpdateDocumentInput } from "./validations";

export interface DocumentDto {
  id: string;
  tenantId: string;
  requesterId: string;
  docNo: string;
  title: string;
  docType: string;
  fileUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function listDocuments(tenantId: string): Promise<DocumentDto[]> {
  const items = await prisma.document.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
  return items.map((item) => ({
    id: item.id,
    tenantId: item.tenantId,
    requesterId: item.requesterId,
    docNo: item.docNo,
    title: item.title,
    docType: item.docType,
    fileUrl: item.fileUrl,
    status: item.status,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
}

export async function createDocument(tenantId: string, requesterId: string, input: CreateDocumentInput): Promise<DocumentDto> {
  const created = await prisma.document.create({
    data: {
      tenantId,
      requesterId,
      docNo: input.docNo,
      title: input.title,
      docType: input.docType,
      fileUrl: input.fileUrl ?? null,
      status: input.status,
    },
  });
  return {
    id: created.id,
    tenantId: created.tenantId,
    requesterId: created.requesterId,
    docNo: created.docNo,
    title: created.title,
    docType: created.docType,
    fileUrl: created.fileUrl,
    status: created.status,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  };
}

export async function updateDocument(tenantId: string, input: UpdateDocumentInput): Promise<DocumentDto> {
  const updated = await prisma.document.update({
    where: { id: input.id, tenantId },
    data: {
      docNo: input.docNo,
      title: input.title,
      docType: input.docType,
      fileUrl: input.fileUrl ?? null,
      status: input.status,
    },
  });
  return {
    id: updated.id,
    tenantId: updated.tenantId,
    requesterId: updated.requesterId,
    docNo: updated.docNo,
    title: updated.title,
    docType: updated.docType,
    fileUrl: updated.fileUrl,
    status: updated.status,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}

export async function deleteDocument(tenantId: string, id: string): Promise<void> {
  await prisma.document.delete({
    where: { id, tenantId },
  });
}
