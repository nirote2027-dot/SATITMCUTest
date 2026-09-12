import { prisma } from "@/shared/lib/infra/prisma";
import type { CreateDepartmentInput, UpdateDepartmentInput } from "./validations";

export async function listDepartments(tenantId: string) {
  return prisma.department.findMany({
    where: { tenantId },
    include: {
      parent: {
        select: { id: true, name: true, code: true },
      },
      _count: {
        select: {
          curriculums: true,
          employees: true,
          children: true,
        },
      },
    },
    orderBy: [{ name: "asc" }],
  });
}

export async function getDepartment(id: string, tenantId: string) {
  return prisma.department.findUnique({
    where: { id, tenantId },
    include: {
      parent: {
        select: { id: true, name: true, code: true },
      },
      children: {
        select: { id: true, name: true, code: true },
      },
      curriculums: {
        select: { id: true, code: true, name: true, degreeLevel: true, isActive: true },
      },
      employees: {
        select: { id: true, employeeCode: true, firstName: true, lastName: true, position: true },
      },
      _count: {
        select: {
          curriculums: true,
          employees: true,
          children: true,
        },
      },
    },
  });
}

export async function createDepartment(tenantId: string, data: CreateDepartmentInput) {
  return prisma.department.create({
    data: {
      tenantId,
      code: data.code?.trim() || null,
      name: data.name.trim(),
      parentId: data.parentId || null,
      description: data.description?.trim() || null,
    },
    include: {
      parent: {
        select: { id: true, name: true, code: true },
      },
      _count: {
        select: {
          curriculums: true,
          employees: true,
          children: true,
        },
      },
    },
  });
}

export async function updateDepartment(tenantId: string, data: UpdateDepartmentInput) {
  const { id, ...rest } = data;
  return prisma.department.update({
    where: { id, tenantId },
    data: {
      ...(rest.code !== undefined && { code: rest.code?.trim() || null }),
      ...(rest.name !== undefined && { name: rest.name.trim() }),
      ...(rest.parentId !== undefined && { parentId: rest.parentId || null }),
      ...(rest.description !== undefined && { description: rest.description?.trim() || null }),
    },
    include: {
      parent: {
        select: { id: true, name: true, code: true },
      },
      _count: {
        select: {
          curriculums: true,
          employees: true,
          children: true,
        },
      },
    },
  });
}

export async function deleteDepartment(id: string, tenantId: string) {
  // Check if department has children
  const dept = await prisma.department.findUnique({
    where: { id, tenantId },
    include: {
      _count: {
        select: {
          children: true,
          curriculums: true,
          employees: true,
        },
      },
    },
  });

  if (!dept) {
    throw new Error("Department not found");
  }

  if (dept._count.children > 0) {
    throw new Error("Cannot delete department that has child departments");
  }

  return prisma.department.delete({
    where: { id, tenantId },
  });
}

export type DepartmentDto = NonNullable<Awaited<ReturnType<typeof getDepartment>>>;
export type DepartmentListItemDto = Awaited<ReturnType<typeof listDepartments>>[number];
