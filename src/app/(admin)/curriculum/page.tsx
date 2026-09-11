import { requirePermission, hasPermission } from "@/features/identity/server";
import { CURRICULUM_P } from "@/features/curriculum/permissions";
import { listCurricula } from "@/features/curriculum/server";
import { CurriculumClient } from "./_components/curriculum-client";

export default async function CurriculumPage() {
  const ctx = await requirePermission(CURRICULUM_P.read);
  const initialItems = await listCurricula(ctx.tenantId);
  return (
    <CurriculumClient
      initialItems={initialItems}
      canManage={hasPermission(ctx, CURRICULUM_P.manage)}
    />
  );
}
