import { create } from 'zustand'

import { Activity } from '@/types'
import { getDb } from '@/db'
import { activitiesRepo } from '@/db/repositories/activitiesRepo'
import { activityFromRow, activityToRowInput } from '@/db/mappers/activities.mapper'

export type VaccinationState = {
  activities: Activity[]
  isLoading: boolean

  loadByKid: (kidId: string) => Promise<void>

  addActivity: (activity: Activity) => void
  updateActivity: (id: string, updates: Partial<Activity>) => void
  removeActivity: (id: string) => void
}

export const useActivityStore = create<VaccinationState>((set, get) => ({
  activities: [],
  isLoading: false,

  loadByKid: async kidId => {
    set({ isLoading: true })

    try {
      const db = await getDb()
      const rows = await activitiesRepo.listByKid(db, kidId)
      set({ activities: rows.map(row => activityFromRow(row)) })
    } finally {
      set({ isLoading: false })
    }
  },

  addActivity: async activity => {
    const db = await getDb()
    await activitiesRepo.upsert(db, activityToRowInput(activity))

    set(state => ({
      activities: [...state.activities, activity],
    }))
  },

  updateActivity: async (id, updates) => {
    const existing = get().activities.find(a => a.id === id)
    if (!existing) return

    const updated: Activity = { ...existing, ...updates }

    const db = await getDb()
    await activitiesRepo.upsert(db, activityToRowInput(updated))

    set(state => ({
      activities: state.activities.map(act => (act.id === id ? updated : act)),
    }))
  },

  removeActivity: async id => {
    const db = await getDb()
    await activitiesRepo.remove(db, id)

    set(state => ({
      activities: state.activities.filter(act => act.id !== id),
    }))
  },
}))
