import type { SQLiteDatabase } from 'expo-sqlite'

const MIGRATIONS: { id: number; sql: string[] }[] = [
  {
    id: 1,
    sql: [
      `PRAGMA foreign_keys = ON;`,
      `CREATE TABLE IF NOT EXISTS kids (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        birthDate TEXT NOT NULL,
        avatarColor TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );`,
      `CREATE TABLE IF NOT EXISTS vaccinations(
        id TEXT PRIMARY KEY NOT NULL,
        kidId TEXT NOT NULL,
        title TEXT NOT NULL,
        dueDate TEXT NOT NULL,
        status TEXT NOT NULL,
        completedAt TEXT,
        notes TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (kidId) REFERENCES kids(id) ON DELETE CASCADE
      );`,
      `CREATE TABLE IF NOT EXISTS activities(
        id TEXT PRIMARY KEY NOT NULL,
        kidId TEXT NOT NULL,
        title TEXT NOT NULL,
        time TEXT NOT NULL,
        weekdaysJson TEXT NOT NULL,
        nextPaymentDate TEXT,
        notes TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (kidId) REFERENCES kids(id) ON DELETE CASCADE
      );`,

      `CREATE INDEX IF NOT EXISTS idx_vaccinations_kidId_dueDate ON vaccinations(kidId, dueDate);`,
      `CREATE INDEX IF NOT EXISTS idx_activities_kidId_title ON activities(kidId, title);`,
    ],
  },
]

export async function migrate(db: SQLiteDatabase) {
  const row = await db.getFirstAsync<{ user_version: number }>(`PRAGMA user_version;`)
  const current = row?.user_version ?? 0

  const pending = MIGRATIONS.filter(m => m.id > current).sort((a, b) => a.id - b.id)
  if (!pending.length) return

  await db.withTransactionAsync(async () => {
    for (const m of pending) {
      for (const statement of m.sql) {
        try {
          console.log('[MIGRATE]', statement)
          await db.execAsync(statement)
        } catch (e) {
          console.error('[MIGRATE FAILED]', statement, e)
          throw e
        }
      }
      await db.execAsync(`PRAGMA user_version = ${m.id};`)
    }
  })
}
