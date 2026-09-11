import type { PermissionDef } from "@/shared/lib/permission-def";
export const PERSONNEL_P = { read: "personnel.read", manage: "personnel.manage" } as const;
export const PERSONNEL_PERMISSIONS: readonly PermissionDef[] = [
  { code: PERSONNEL_P.read, module: "personnel", action: "read", description: "Read personnel" },
  { code: PERSONNEL_P.manage, module: "personnel", action: "manage", description: "Manage personnel" },
];
