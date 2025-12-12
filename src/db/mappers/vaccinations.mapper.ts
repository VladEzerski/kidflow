import type { Vaccination } from '@/types'
import type { VaccinationRow } from '@/db/repositories/vaccinationsRepo'

export function vaccinationFromRow(row: VaccinationRow): Vaccination {
  return {
    id: row.id,
    kidId: row.kidId,
    title: row.title,
    dueDate: row.dueDate,
    status: row.status,
    notes: row.notes ?? undefined,
    completedAt: row.completedAt ?? undefined,
  }
}

export function vaccinationToRowInput(
  v: Vaccination,
): Omit<VaccinationRow, 'createdAt' | 'updatedAt'> {
  return {
    id: v.id,
    kidId: v.kidId,
    title: v.title,
    dueDate: v.dueDate,
    status: v.status,
    notes: v.notes ?? null,
    completedAt: v.completedAt ?? null,
  }
}
