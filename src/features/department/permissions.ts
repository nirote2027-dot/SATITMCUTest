import type { PermissionDef } from "@/shared/lib/permission-def";

export const DEPARTMENT_P = {
  read: "department:read",
  manage: "department:manage",
} as const;

export const DEPARTMENT_PERMISSIONS: readonly PermissionDef[] = [
  { code: DEPARTMENT_P.read, module: "department", action: "read", description: "ดูข้อมูลภาควิชาและส่วนงาน" },
  { code: DEPARTMENT_P.manage, module: "department", action: "manage", description: "จัดการภาควิชาและส่วนงาน" },
];
