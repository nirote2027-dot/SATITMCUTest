import type { PermissionDef } from "@/shared/lib/permission-def";
export const FACILITY_P = { read: "facility:read", manage: "facility:manage" } as const;
export const FACILITY_PERMISSIONS: readonly PermissionDef[] = [
  { code: FACILITY_P.read, module: "facility", action: "read", description: "Read facility" },
  { code: FACILITY_P.manage, module: "facility", action: "manage", description: "Manage facility" },
];
