import { requirePermission, hasPermission } from "@/features/identity/server";
import { NEWS_P, listArticles } from "@/features/news/server";
import { NewsClient } from "./_components/news-client";

export default async function NewsPage() {
  const ctx = await requirePermission(NEWS_P.read);
  const initialItems = await listArticles(ctx.tenantId);
  return (
    <NewsClient
      initialItems={initialItems}
      canManage={hasPermission(ctx, NEWS_P.manage)}
    />
  );
}
