import * as SQLite from 'expo-sqlite'
import type { SQLiteDatabase } from 'expo-sqlite'

let db: SQLiteDatabase | null = null

export async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('kidflow.db')
  }
  return db
}

export async function configureDb(db: SQLiteDatabase) {
  await db.execAsync('PRAGMA foreign_keys = ON;')
  await db.execAsync('PRAGMA journal_mode = WAL;')
}
