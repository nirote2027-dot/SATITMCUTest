import { requirePermission, hasPermission } from "@/features/identity/server";
import { CURRICULUM_P } from "@/features/curriculum/permissions";
import { listCurricula } from "@/features/curriculum/server";
import { listDepartments } from "@/features/department/server";
import { CurriculumClient } from "./_components/curriculum-client";

export default async function CurriculumPage() {
  const ctx = await requirePermission(CURRICULUM_P.read);
  const [initialItems, departments] = await Promise.all([
    listCurricula(ctx.tenantId),
    listDepartments(ctx.tenantId),
  ]);

  return (
    <CurriculumClient
      initialItems={initialItems}
      departments={departments.map((d) => ({ id: d.id, name: d.name, code: d.code }))}
      canManage={hasPermission(ctx, CURRICULUM_P.manage)}
    />
  );
}

