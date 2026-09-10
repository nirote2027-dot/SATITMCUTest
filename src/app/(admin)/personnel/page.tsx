import { requirePermission, hasPermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import { listEmployees } from "@/features/personnel/_internal/services";
import { PersonnelClient } from "./_components/personnel-client";

export default async function PersonnelPage() {
  const ctx = await requirePermission(PERSONNEL_P.read);
  const initialItems = await listEmployees(ctx.tenantId);
  return (
    <PersonnelClient
      initialItems={initialItems}
      canManage={hasPermission(ctx, PERSONNEL_P.manage)}
    />
  );
}
