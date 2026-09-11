import { auth } from "@/features/identity/server";
import { prisma } from "@/shared/lib/infra/prisma";
import { AdminClientLayout } from "./_components/admin-client-layout";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth().catch(() => null);
  const tenant = await (session?.tenantId
    ? prisma.tenant.findUnique({ where: { id: session.tenantId }, select: { logoUrl: true, nameTh: true, nameEn: true } })
    : prisma.tenant.findFirst({ where: { isActive: true }, orderBy: { updatedAt: "desc" }, select: { logoUrl: true, nameTh: true, nameEn: true } })
  ).catch(() => null);

  return (
    <AdminClientLayout
      logoUrl={tenant?.logoUrl ?? null}
      nameTh={tenant?.nameTh ?? null}
      nameEn={tenant?.nameEn ?? null}
    >
      {children}
    </AdminClientLayout>
  );
}

