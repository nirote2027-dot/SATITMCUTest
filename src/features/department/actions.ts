"use server";

import {
  getDepartmentsAction as _getDepartmentsAction,
  createDepartmentAction as _createDepartmentAction,
  updateDepartmentAction as _updateDepartmentAction,
  deleteDepartmentAction as _deleteDepartmentAction,
} from "./_internal/actions";
import type { CreateDepartmentInput, UpdateDepartmentInput } from "./_internal/validations";

export async function getDepartmentsAction() {
  return _getDepartmentsAction();
}

export async function createDepartmentAction(input: CreateDepartmentInput) {
  return _createDepartmentAction(input);
}

export async function updateDepartmentAction(input: UpdateDepartmentInput) {
  return _updateDepartmentAction(input);
}

export async function deleteDepartmentAction(id: string) {
  return _deleteDepartmentAction(id);
}
