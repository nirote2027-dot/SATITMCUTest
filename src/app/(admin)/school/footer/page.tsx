import { requirePermission, hasPermission } from "@/features/identity/server";
import { PERSONNEL_P } from "@/features/personnel/permissions";
import { getFooterSettings } from "@/features/school/footer-services";
import { FooterSettingsClient } from "./_components/footer-settings-client";

export default async function SchoolFooterPage() {
  const ctx = await requirePermission(PERSONNEL_P.read);
  const initialData = await getFooterSettings(ctx.tenantId);
  const canManage = hasPermission(ctx, PERSONNEL_P.manage);

  return (
    <FooterSettingsClient
      initialData={initialData}
      canManage={canManage}
    />
  );
}
