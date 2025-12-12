import type { SQLiteDatabase } from 'expo-sqlite'

import { VaccinationStatus, VACCINATION_STATUS } from '@/types'

export type VaccinationRow = {
  id: string
  kidId: string
  title: string
  dueDate: string
  status: VaccinationStatus
  notes?: string | null
  completedAt?: string | null
  createdAt: string
  updatedAt: string
}

export const vaccinationsRepo = {
  async listByKid(db: SQLiteDatabase, kidId: string): Promise<VaccinationRow[]> {
    return db.getAllAsync<VaccinationRow>(
      `SELECT id, kidId, title, dueDate, status, notes, completedAt, createdAt, updatedAt
       FROM vaccinations
       WHERE kidId = ?
       ORDER BY dueDate ASC;`,
      [kidId],
    )
  },

  async upsert(
    db: SQLiteDatabase,
    input: Omit<VaccinationRow, 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    const now = new Date().toISOString()
    await db.runAsync(
      `INSERT INTO vaccinations (
          id, kidId, title, dueDate, status, notes, completedAt, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         kidId = excluded.kidId,
         title = excluded.title,
         dueDate = excluded.dueDate,
         status = excluded.status,
         notes = excluded.notes,
         completedAt = excluded.completedAt,
         updatedAt = excluded.updatedAt;`,
      [
        input.id,
        input.kidId,
        input.title,
        input.dueDate,
        input.status,
        input.notes ?? null,
        input.completedAt ?? null,
        now,
        now,
      ],
    )
  },

  async remove(db: SQLiteDatabase, id: string): Promise<void> {
    await db.runAsync(`DELETE FROM vaccinations WHERE id = ?;`, [id])
  },

  async markCompleted(db: SQLiteDatabase, id: string, completedAt?: string): Promise<void> {
    const now = new Date().toISOString()
    await db.runAsync(
      `UPDATE vaccinations
       SET status = ${VACCINATION_STATUS.COMPLETED},
           completedAt = ?,
           updatedAt = ?
       WHERE kidId = ?;`,
      [completedAt ?? now, now, id],
    )
  },
} as const
