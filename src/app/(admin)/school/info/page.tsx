import { requirePermission, hasPermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import { getSchoolInfo } from "@/features/school/services";
import { SchoolInfoClient } from "./_components/school-info-client";

export default async function SchoolInfoPage() {
  const ctx = await requirePermission(PERSONNEL_P.read);
  const initialData = await getSchoolInfo(ctx.tenantId);
  const canManage = hasPermission(ctx, PERSONNEL_P.manage);

  return (
    <SchoolInfoClient
      initialData={initialData}
      canManage={canManage}
    />
  );
}
