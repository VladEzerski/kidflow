import * as SQLite from 'expo-sqlite'

export const db = await SQLite.openDatabaseAsync('kidflow.db')

export function configureDb() {
  db.execAsync('PRAGMA foreign_keys = ON;')
  db.execAsync('PRAGMA journal_mode = WAL;')
}
