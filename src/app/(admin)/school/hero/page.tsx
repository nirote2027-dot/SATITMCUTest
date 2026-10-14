import { requirePermission, hasPermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import { getHeroSettings } from "@/features/school/hero-services";
import { HeroSettingsClient } from "./_components/hero-settings-client";

export default async function SchoolHeroPage() {
  const ctx = await requirePermission(PERSONNEL_P.read);
  const initialData = await getHeroSettings(ctx.tenantId);
  const canManage = hasPermission(ctx, PERSONNEL_P.manage);

  return (
    <HeroSettingsClient
      initialData={initialData}
      canManage={canManage}
    />
  );
}
