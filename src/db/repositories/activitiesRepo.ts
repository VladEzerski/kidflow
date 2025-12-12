import type { SQLiteDatabase } from 'expo-sqlite'

export type ActivityRow = {
  id: string
  kidId: string
  title: string
  weekdaysJson: string // JSON.stringify(number[])
  time: string // "18:30"
  nextPaymentDate?: string | null
  notes?: string | null
  createdAt: string
  updatedAt: string
}

export const activitiesRepo = {
  async listByKid(db: SQLiteDatabase, kidId: string): Promise<ActivityRow[]> {
    return db.getAllAsync<ActivityRow>(
      `SELECT id, kidId, title, weekdaysJson, time, nextPaymentDate, notes, createdAt, updatedAt
       FROM activities
       WHERE kidId = ?
       ORDER BY title COLLATE NOCASE ASC;`,
      [kidId],
    )
  },

  async upsert(
    db: SQLiteDatabase,
    input: Omit<ActivityRow, 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    const now = new Date().toISOString()
    await db.runAsync(
      `INSERT INTO activities (
          id, kidId, title, weekdaysJson, time, nextPaymentDate, notes, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         kidId = excluded.kidId,
         title = excluded.title,
         weekdaysJson = excluded.weekdaysJson,
         time = excluded.time,
         nextPaymentDate = excluded.nextPaymentDate,
         notes = excluded.notes,
         updatedAt = excluded.updatedAt;`,
      [
        input.id,
        input.kidId,
        input.title,
        input.weekdaysJson,
        input.time,
        input.nextPaymentDate ?? null,
        input.notes ?? null,
        now,
        now,
      ],
    )
  },

  async remove(db: SQLiteDatabase, id: string): Promise<void> {
    await db.runAsync(`DELETE FROM activities WHERE id = ?;`, [id])
  },
} as const
