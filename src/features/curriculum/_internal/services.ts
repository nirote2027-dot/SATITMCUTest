import { prisma } from "@/shared/lib/infra/prisma";
import type { CreateCurriculumInput, UpdateCurriculumInput } from "./validations";

export async function listCurricula(tenantId: string) {
  return prisma.curriculum.findMany({
    where: { tenantId },
    include: {
      department: {
        select: { id: true, name: true, code: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCurriculum(id: string, tenantId: string) {
  return prisma.curriculum.findUnique({
    where: { id, tenantId },
    include: {
      department: {
        select: { id: true, name: true, code: true },
      },
    },
  });
}

export async function createCurriculum(tenantId: string, data: CreateCurriculumInput) {
  return prisma.curriculum.create({
    data: {
      tenantId,
      code: data.code,
      name: data.name,
      degreeLevel: data.degreeLevel,
      departmentId: data.departmentId ?? null,
      totalCredits: data.totalCredits,
      description: data.description,
      imageUrl: data.imageUrl ?? null,
      isActive: data.isActive ?? true,
    },
    include: {
      department: {
        select: { id: true, name: true, code: true },
      },
    },
  });
}

export async function updateCurriculum(tenantId: string, data: UpdateCurriculumInput) {
  const { id, ...rest } = data;
  return prisma.curriculum.update({
    where: { id, tenantId },
    data: {
      ...rest,
      ...(rest.departmentId !== undefined && { departmentId: rest.departmentId || null }),
    },
    include: {
      department: {
        select: { id: true, name: true, code: true },
      },
    },
  });
}

export async function deleteCurriculum(id: string, tenantId: string) {
  return prisma.curriculum.delete({
    where: { id, tenantId },
  });
}

export type CurriculumDto = NonNullable<Awaited<ReturnType<typeof getCurriculum>>>;

