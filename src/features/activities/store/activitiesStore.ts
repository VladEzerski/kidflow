import { create } from 'zustand'

import { activitiesMock } from '@/mocks/activitiesMock'
import { Activity } from '@/types'

export type VaccinationState = {
  activities: Activity[]
  getActivitiesByKid: (kidId: string) => Activity[]
  addActivity: (activity: Activity) => void
  updateActivity: (id: string, updates: Partial<Activity>) => void
  removeActivity: (id: string) => void
}

export const useActivityStore = create<VaccinationState>((set, get) => ({
  activities: activitiesMock,

  getActivitiesByKid: kidId => {
    const { activities } = get()
    return activities.filter(act => act.kidId === kidId)
  },

  addActivity: activity =>
    set(state => ({
      activities: [...state.activities, activity],
    })),

  updateActivity: (id, updates) =>
    set(state => ({
      activities: state.activities.map(act => (act.id === id ? { ...act, ...updates } : act)),
    })),

  removeActivity: id =>
    set(state => ({
      activities: state.activities.filter(act => act.id !== id),
    })),
}))
