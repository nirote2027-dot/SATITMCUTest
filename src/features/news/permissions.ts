import type { PermissionDef } from "@/shared/lib/permission-def";

export const NEWS_P = {
  read: "news:read",
  manage: "news:manage",
} as const;

export const NEWS_PERMISSIONS: readonly PermissionDef[] = [
  { code: NEWS_P.read, module: "news", action: "read", description: "อ่านข่าวสาร" },
  { code: NEWS_P.manage, module: "news", action: "manage", description: "จัดการข่าวสาร (เพิ่ม/ลบ/แก้ไข)" },
];
