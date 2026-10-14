import { requirePermission, hasPermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import { listExecutives } from "@/features/school/services";
import { ExecutivesClient } from "./_components/executives-client";

export default async function ExecutivesPage() {
  const ctx = await requirePermission(PERSONNEL_P.read);
  const initialItems = await listExecutives(ctx.tenantId);
  const canManage = hasPermission(ctx, PERSONNEL_P.manage);

  return (
    <ExecutivesClient
      initialItems={initialItems}
      canManage={canManage}
    />
  );
}
