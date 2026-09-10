import { prisma } from "@/shared/lib/infra/prisma";
import type { CreateCurriculumInput, UpdateCurriculumInput } from "./validations";

export async function listCurricula(tenantId: string) {
  return prisma.curriculum.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCurriculum(id: string, tenantId: string) {
  return prisma.curriculum.findUnique({
    where: { id, tenantId },
  });
}

export async function createCurriculum(tenantId: string, data: CreateCurriculumInput) {
  return prisma.curriculum.create({
    data: {
      tenantId,
      code: data.code,
      name: data.name,
      degreeLevel: data.degreeLevel,
      totalCredits: data.totalCredits,
      description: data.description,
      imageUrl: data.imageUrl ?? null,
      isActive: data.isActive ?? true,
    },
  });
}

export async function updateCurriculum(tenantId: string, data: UpdateCurriculumInput) {
  const { id, ...rest } = data;
  return prisma.curriculum.update({
    where: { id, tenantId },
    data: rest,
  });
}

export async function deleteCurriculum(id: string, tenantId: string) {
  return prisma.curriculum.delete({
    where: { id, tenantId },
  });
}
