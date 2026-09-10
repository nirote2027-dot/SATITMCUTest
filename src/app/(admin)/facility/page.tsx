import { requirePermission, hasPermission } from "@/features/identity/server";
import { FACILITY_P, listFacilities } from "@/features/facility/server";
import { FacilityClient } from "./_components/facility-client";

export default async function FacilityPage() {
  const ctx = await requirePermission(FACILITY_P.read);
  const initialItems = await listFacilities(ctx.tenantId);
  return (
    <FacilityClient
      initialItems={initialItems}
      canManage={hasPermission(ctx, FACILITY_P.manage)}
    />
  );
}
