import type { SQLiteDatabase } from 'expo-sqlite'

import { kidsMock } from '@/mocks/kidsMocks'
import { vaccinationsMock } from '@/mocks/vaccinationsMock'
import { activitiesMock } from '@/mocks/activitiesMock'

import { kidsRepo } from './repositories/kidsRepo'
import { vaccinationsRepo } from './repositories/vaccinationsRepo'
import { activitiesRepo } from './repositories/activitiesRepo'

import { kidModelToRow } from './mappers/kids.mapper'
import { vaccinationToRowInput } from './mappers/vaccinations.mapper'
import { activityToRowInput } from './mappers/activities.mapper'

type SeedOptions = {
  reset?: boolean
}

export async function seedIfEmpty(db: SQLiteDatabase): Promise<void> {
  const count = await kidsRepo.count(db)
  if (count > 0) return
  await seedDB(db, { reset: false })
}

export async function resetAndSeed(db: SQLiteDatabase): Promise<void> {
  await seedDB(db, { reset: true })
}

async function seedDB(db: SQLiteDatabase, options: SeedOptions): Promise<void> {
  const { reset } = options

  await db.withTransactionAsync(async () => {
    if (reset) {
      await db.execAsync(`
        DELETE FROM vaccinations;
        DELETE FROM activities;
        DELETE FROM kids;
      `)
    }

    for (const kid of kidsMock) {
      await kidsRepo.upsert(db, kidModelToRow(kid))
    }

    for (const v of vaccinationsMock) {
      await vaccinationsRepo.upsert(db, vaccinationToRowInput(v))
    }

    for (const a of activitiesMock) {
      await activitiesRepo.upsert(db, activityToRowInput(a))
    }
  })
}
