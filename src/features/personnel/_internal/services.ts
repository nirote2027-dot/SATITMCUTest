import { prisma } from "@/shared/lib/infra/prisma";
import type { Prisma } from "@/generated/prisma";
import type { CreateEmployeeInput, UpdateEmployeeInput } from "./validations";

export interface EmployeeDto {
  id: string;
  tenantId: string;
  userId: string | null;
  departmentId: string | null;
  employeeCode: string;
  firstName: string;
  lastName: string;
  position: string | null;
  imageUrl: string | null;
  contactInfo: Prisma.JsonValue;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  department?: {
    id: string;
    name: string;
  } | null;
}

export async function listEmployees(tenantId: string): Promise<EmployeeDto[]> {
  const items = await prisma.employee.findMany({
    where: { tenantId },
    include: { department: true },
    orderBy: { createdAt: "desc" },
  });
  return items.map((item) => ({
    id: item.id,
    tenantId: item.tenantId,
    userId: item.userId,
    departmentId: item.departmentId,
    employeeCode: item.employeeCode,
    firstName: item.firstName,
    lastName: item.lastName,
    position: item.position,
    imageUrl: item.imageUrl,
    contactInfo: item.contactInfo,
    isActive: item.isActive,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    department: item.department ? { id: item.department.id, name: item.department.name } : null,
  }));
}

export async function createEmployee(tenantId: string, input: CreateEmployeeInput): Promise<EmployeeDto> {
  const created = await prisma.employee.create({
    data: {
      tenantId,
      employeeCode: input.employeeCode,
      firstName: input.firstName,
      lastName: input.lastName,
      position: input.position,
      imageUrl: input.imageUrl ?? null,
      departmentId: input.departmentId,
      userId: input.userId,
      contactInfo: (input.contactInfo as Prisma.InputJsonValue) ?? undefined,
      isActive: input.isActive,
    },
    include: { department: true },
  });
  return {
    id: created.id,
    tenantId: created.tenantId,
    userId: created.userId,
    departmentId: created.departmentId,
    employeeCode: created.employeeCode,
    firstName: created.firstName,
    lastName: created.lastName,
    position: created.position,
    imageUrl: created.imageUrl,
    contactInfo: created.contactInfo,
    isActive: created.isActive,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
    department: created.department ? { id: created.department.id, name: created.department.name } : null,
  };
}

export async function getEmployee(id: string, tenantId: string): Promise<EmployeeDto | null> {
  const item = await prisma.employee.findUnique({
    where: { id, tenantId },
    include: { department: true },
  });
  if (!item) return null;
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    department: item.department ? { id: item.department.id, name: item.department.name } : null,
  };
}

export async function updateEmployee(tenantId: string, input: UpdateEmployeeInput): Promise<EmployeeDto> {
  const updated = await prisma.employee.update({
    where: { id: input.id, tenantId },
    data: {
      employeeCode: input.employeeCode,
      firstName: input.firstName,
      lastName: input.lastName,
      position: input.position,
      imageUrl: input.imageUrl !== undefined ? input.imageUrl : undefined,
      departmentId: input.departmentId,
      userId: input.userId,
      contactInfo: (input.contactInfo as Prisma.InputJsonValue) ?? undefined,
      isActive: input.isActive,
    },
    include: { department: true },
  });
  return {
    id: updated.id,
    tenantId: updated.tenantId,
    userId: updated.userId,
    departmentId: updated.departmentId,
    employeeCode: updated.employeeCode,
    firstName: updated.firstName,
    lastName: updated.lastName,
    position: updated.position,
    imageUrl: updated.imageUrl,
    contactInfo: updated.contactInfo,
    isActive: updated.isActive,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
    department: updated.department ? { id: updated.department.id, name: updated.department.name } : null,
  };
}

export async function deleteEmployee(tenantId: string, id: string): Promise<void> {
  await prisma.employee.delete({
    where: { id, tenantId },
  });
}
