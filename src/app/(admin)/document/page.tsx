import { requirePermission, hasPermission } from "@/features/identity/server";
import { DOCUMENT_P, listDocuments } from "@/features/document/server";
import { DocumentClient } from "./_components/document-client";

export default async function DocumentPage() {
  const ctx = await requirePermission(DOCUMENT_P.documentRead);
  const initialItems = await listDocuments(ctx.tenantId);
  return (
    <DocumentClient
      initialItems={initialItems}
      canManage={hasPermission(ctx, DOCUMENT_P.documentManage)}
    />
  );
}
