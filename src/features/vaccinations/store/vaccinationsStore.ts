import { create } from 'zustand'

import { Vaccination, VACCINATION_STATUS } from '@/types'
import { getDb } from '@/db'
import { vaccinationsRepo } from '@/db/repositories/vaccinationsRepo'
import { vaccinationFromRow, vaccinationToRowInput } from '@/db/mappers/vaccinations.mapper'

export type VaccinationState = {
  vaccinations: Vaccination[]
  isLoading: boolean

  loadByKid: (kidId: string) => Promise<void>

  addVaccination: (item: Vaccination) => void
  updateVaccination: (id: string, updates: Partial<Vaccination>) => void
  removeVaccination: (id: string) => void

  markVaccinationDone: (id: string, doneDate?: string) => void
}

export const useVaccinationStore = create<VaccinationState>((set, get) => ({
  vaccinations: [],
  isLoading: false,

  loadByKid: async kidId => {
    set({ isLoading: true })

    try {
      const db = await getDb()
      const rows = await vaccinationsRepo.listByKid(db, kidId)
      set({ vaccinations: rows.map(row => vaccinationFromRow(row)) })
    } finally {
      set({ isLoading: false })
    }
  },

  addVaccination: async item => {
    const db = await getDb()
    await vaccinationsRepo.upsert(db, vaccinationToRowInput(item))

    set(state => ({
      vaccinations: [...state.vaccinations, item],
    }))
  },

  updateVaccination: async (id, updates) => {
    const existing = get().vaccinations.find(v => v.id === id)
    if (!existing) return

    const updated: Vaccination = { ...existing, ...updates }

    const db = await getDb()
    await vaccinationsRepo.upsert(db, vaccinationToRowInput(updated))

    set(state => ({
      vaccinations: state.vaccinations.map(vac => (vac.id === id ? updated : vac)),
    }))
  },

  removeVaccination: async id => {
    const db = await getDb()
    await vaccinationsRepo.remove(db, id)

    set(state => ({
      vaccinations: state.vaccinations.filter(vac => vac.id !== id),
    }))
  },

  markVaccinationDone: async (id, doneDate) => {
    const existing = get().vaccinations.find(v => v.id === id)
    if (!existing) return

    const updated: Vaccination = {
      ...existing,
      status: VACCINATION_STATUS.COMPLETED,
      completedAt: doneDate ?? new Date().toISOString(),
    }

    const db = await getDb()
    await vaccinationsRepo.upsert(db, vaccinationToRowInput(updated))

    set(state => ({
      vaccinations: state.vaccinations.map(vac => (vac.id === id ? updated : vac)),
    }))
  },
}))
