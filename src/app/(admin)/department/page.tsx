import { requirePermission, hasPermission } from "@/features/identity/server";
import { DEPARTMENT_P } from "@/features/department/permissions";
import { listDepartments } from "@/features/department/server";
import { DepartmentClient } from "./_components/department-client";

export default async function DepartmentPage() {
  const ctx = await requirePermission(DEPARTMENT_P.read);
  const initialItems = await listDepartments(ctx.tenantId);

  return (
    <DepartmentClient
      initialItems={initialItems}
      canManage={hasPermission(ctx, DEPARTMENT_P.manage)}
    />
  );
}
