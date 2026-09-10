import type { PermissionDef } from "@/shared/lib/permission-def";
import { IDENTITY_PERMISSIONS } from "@/features/identity/permissions";
import { SAMPLE_PERMISSIONS } from "@/features/sample/server";
import { NEWS_PERMISSIONS } from "@/features/news/server";
import { PERSONNEL_PERMISSIONS } from "@/features/personnel/server";
import { CURRICULUM_PERMISSIONS } from "@/features/curriculum/server";
import { DOCUMENT_PERMISSIONS } from "@/features/document/server";
import { FACILITY_PERMISSIONS } from "@/features/facility/server";

/** สิทธิ์ทั้งระบบ — feature ใหม่เพิ่มบรรทัดที่นี่ · seed เขียนลง permissions ทุกครั้ง */
export const ALL_PERMISSIONS: readonly PermissionDef[] = [
  ...IDENTITY_PERMISSIONS,
  ...SAMPLE_PERMISSIONS,
  ...NEWS_PERMISSIONS,
  ...PERSONNEL_PERMISSIONS,
  ...CURRICULUM_PERMISSIONS,
  ...DOCUMENT_PERMISSIONS,
  ...FACILITY_PERMISSIONS,
];

const codes = ALL_PERMISSIONS.map((p) => p.code);
if (new Set(codes).size !== codes.length) throw new Error("permission code ซ้ำใน ALL_PERMISSIONS");


