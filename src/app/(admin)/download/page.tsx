import { requirePermission, hasPermission } from "@/features/identity/server";
import { FACILITY_P } from "@/features/facility/server";
import { listDownloadDocuments } from "@/features/download/server";
import { DownloadClient } from "./_components/download-client";

export default async function DownloadPage() {
  const ctx = await requirePermission(FACILITY_P.read);
  const initialItems = await listDownloadDocuments();

  return (
    <DownloadClient
      initialItems={initialItems}
      canManage={hasPermission(ctx, FACILITY_P.manage) || ctx.isSuperAdmin}
    />
  );
}
