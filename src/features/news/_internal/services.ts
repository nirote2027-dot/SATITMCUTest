import { prisma } from "@/shared/lib/infra/prisma";
import type { CreateArticleInput, UpdateArticleInput } from "./validations";

export interface ArticleDto {
  id: string;
  tenantId: string;
  title: string;
  titleEn?: string | null;
  content: string | null;
  contentEn?: string | null;
  coverImage: string | null;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function listArticles(tenantId: string): Promise<ArticleDto[]> {
  const items = await prisma.article.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
  return items.map((item) => ({
    id: item.id,
    tenantId: item.tenantId,
    title: item.title,
    titleEn: item.titleEn,
    content: item.content,
    contentEn: item.contentEn,
    coverImage: item.coverImage,
    status: item.status,
    publishedAt: item.publishedAt ? item.publishedAt.toISOString() : null,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
}

export async function createArticle(tenantId: string, authorId: string, input: CreateArticleInput): Promise<ArticleDto> {
  const created = await prisma.article.create({
    data: {
      tenantId,
      authorId,
      title: input.title,
      titleEn: input.titleEn ?? null,
      content: input.content ?? null,
      contentEn: input.contentEn ?? null,
      coverImage: input.coverImage ?? null,
      categoryId: input.categoryId ?? null,
      status: input.status,
      publishedAt: input.publishedAt ? new Date(input.publishedAt) : null,
    },
  });
  return {
    id: created.id,
    tenantId: created.tenantId,
    title: created.title,
    titleEn: created.titleEn,
    content: created.content,
    contentEn: created.contentEn,
    coverImage: created.coverImage,
    status: created.status,
    publishedAt: created.publishedAt ? created.publishedAt.toISOString() : null,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  };
}

export async function deleteArticle(tenantId: string, id: string): Promise<void> {
  await prisma.article.delete({ where: { id, tenantId } });
}

export async function updateArticle(tenantId: string, input: UpdateArticleInput): Promise<ArticleDto> {
  const updated = await prisma.article.update({
    where: { id: input.id, tenantId },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.titleEn !== undefined ? { titleEn: input.titleEn ?? null } : {}),
      ...(input.content !== undefined ? { content: input.content ?? null } : {}),
      ...(input.contentEn !== undefined ? { contentEn: input.contentEn ?? null } : {}),
      ...(input.coverImage !== undefined ? { coverImage: input.coverImage ?? null } : {}),
      ...(input.categoryId !== undefined ? { categoryId: input.categoryId ?? null } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.publishedAt !== undefined ? { publishedAt: input.publishedAt ? new Date(input.publishedAt) : null } : {}),
    },
  });
  return {
    id: updated.id,
    tenantId: updated.tenantId,
    title: updated.title,
    titleEn: updated.titleEn,
    content: updated.content,
    contentEn: updated.contentEn,
    coverImage: updated.coverImage,
    status: updated.status,
    publishedAt: updated.publishedAt ? updated.publishedAt.toISOString() : null,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}
