import type { PermissionDef } from "@/shared/lib/permission-def";
export const DOCUMENT_P = {
  read: "document:read",
  manage: "document:manage",
  documentRead: "document:read",
  documentManage: "document:manage",
} as const;
export const DOCUMENT_PERMISSIONS: readonly PermissionDef[] = [
  { code: DOCUMENT_P.documentRead, module: "document", action: "read", description: "Read document" },
  { code: DOCUMENT_P.documentManage, module: "document", action: "manage", description: "Manage document" },
];

