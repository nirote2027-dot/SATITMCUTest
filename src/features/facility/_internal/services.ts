import { prisma } from "@/shared/lib/infra/prisma";
import type { CreateFacilityInput, UpdateFacilityInput } from "./validations";

export interface FacilityDto {
  id: string;
  tenantId: string;
  type: "ROOM" | "VEHICLE";
  name: string;
  capacity: number | null;
  imageUrl: string | null;
  status: "AVAILABLE" | "MAINTENANCE";
  createdAt: string;
  updatedAt: string;
}

export async function listFacilities(tenantId: string): Promise<FacilityDto[]> {
  const items = await prisma.facility.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
  return items.map((item) => ({
    id: item.id,
    tenantId: item.tenantId,
    type: item.type as "ROOM" | "VEHICLE",
    name: item.name,
    capacity: item.capacity,
    imageUrl: item.imageUrl,
    status: item.status as "AVAILABLE" | "MAINTENANCE",
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
}

export async function createFacility(tenantId: string, input: CreateFacilityInput): Promise<FacilityDto> {
  const created = await prisma.facility.create({
    data: {
      tenantId,
      type: input.type,
      name: input.name,
      capacity: input.capacity ?? null,
      imageUrl: input.imageUrl ?? null,
      status: input.status,
    },
  });
  return {
    id: created.id,
    tenantId: created.tenantId,
    type: created.type as "ROOM" | "VEHICLE",
    name: created.name,
    capacity: created.capacity,
    imageUrl: created.imageUrl,
    status: created.status as "AVAILABLE" | "MAINTENANCE",
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  };
}

export async function updateFacility(tenantId: string, input: UpdateFacilityInput): Promise<FacilityDto> {
  const updated = await prisma.facility.update({
    where: { id: input.id, tenantId },
    data: {
      type: input.type,
      name: input.name,
      capacity: input.capacity ?? null,
      imageUrl: input.imageUrl !== undefined ? input.imageUrl : undefined,
      status: input.status,
    },
  });
  return {
    id: updated.id,
    tenantId: updated.tenantId,
    type: updated.type as "ROOM" | "VEHICLE",
    name: updated.name,
    capacity: updated.capacity,
    imageUrl: updated.imageUrl,
    status: updated.status as "AVAILABLE" | "MAINTENANCE",
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}

export async function deleteFacility(tenantId: string, id: string): Promise<void> {
  await prisma.facility.delete({
    where: { id, tenantId },
  });
}
