import { create } from 'zustand'

import { Kid } from '@/types'
import { getDb } from '@/db'
import { kidsRepo } from '@/db/repositories/kidsRepo'
import { kidModelToRow, kidRowToModel } from '@/db/mappers/kids.mapper'

export type KidState = {
  kids: Kid[]
  activeKidId: string | null
  isLoading: boolean
  error?: string

  loadKids: () => Promise<void>
  addKid: (kid: Kid) => Promise<void>
  setActiveKid: (kidId: string) => void
}

export const useKidsStore = create<KidState>((set, get) => ({
  kids: [],
  activeKidId: null,
  isLoading: false,

  loadKids: async () => {
    set({ isLoading: true, error: undefined })

    try {
      const db = await getDb()
      const rows = await kidsRepo.list(db)
      const kids = rows.map(row => kidRowToModel(row))

      set({
        kids,
        activeKidId: kids[0]?.id ?? null,
        isLoading: false,
      })
    } catch (e) {
      console.error(e)
      set({
        isLoading: false,
        error: 'Failed to load kids from DB',
      })
    }
  },

  addKid: async kid => {
    try {
      const db = await getDb()
      await kidsRepo.upsert(db, kidModelToRow(kid))

      await get().loadKids()
    } catch (e) {
      console.error(e)
      set({ error: 'Failed to add kid to DB' })
    }
  },

  setActiveKid: kidId => set({ activeKidId: kidId }),
}))
