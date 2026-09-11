import type { PermissionDef } from "@/shared/lib/permission-def";
export const DOCUMENT_P = {
  read: "DOCUMENT_READ",
  manage: "DOCUMENT_MANAGE",
  documentRead: "DOCUMENT_READ",
  documentManage: "DOCUMENT_MANAGE",
} as const;
export const DOCUMENT_PERMISSIONS: readonly PermissionDef[] = [
  { code: DOCUMENT_P.documentRead, module: "document", action: "read", description: "Read document" },
  { code: DOCUMENT_P.documentManage, module: "document", action: "manage", description: "Manage document" },
];

