import { SQLiteDatabase } from 'expo-sqlite'

export type KidRow = {
  id: string
  name: string
  birthDate: string
  avatarColor: string
  createdAt: string
  updatedAt: string
}

export const kidsRepo = {
  async list(db: SQLiteDatabase): Promise<KidRow[]> {
    const res = await db.getAllAsync<KidRow>(
      `SELECT id, name, birthDate, createdAt, updatedAt
       FROM kids
       ORDER BY createdAt DESC;`,
    )
    return res
  },

  async getById(db: SQLiteDatabase, id: string): Promise<KidRow | null> {
    const row = await db.getFirstAsync<KidRow>(
      `SELECT id, name, birthDate, createdAt, updatedAt
       FROM kids
       WHERE id = ?;`,
      [id],
    )
    return row ?? null
  },

  async upsert(db: SQLiteDatabase, input: Omit<KidRow, 'createdAt' | 'updatedAt'>): Promise<void> {
    const now = new Date().toISOString()
    await db.runAsync(
      `INSERT INTO kids (id, name, birtDate, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         name = excluded.name,
         birtDate = excluded.birtDate,
         updatedAt = excluded.updatedAt;`,
      [input.id, input.name, input.birthDate, now, now],
    )
  },

  async remove(db: SQLiteDatabase, id: string): Promise<void> {
    await db.runAsync(`DELETE FROM kids WHERE id = ?;`, [id])
  },

  async count(db: SQLiteDatabase): Promise<number> {
    const row = await db.getFirstAsync<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM kids;`)
    return row?.cnt ?? 0
  },
} as const
