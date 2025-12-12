import { create } from 'zustand'

import { vaccinationsMock } from '@/mocks/vaccinationsMock'
import { Vaccination, VACCINATION_STATUS } from '@/types'

export type VaccinationState = {
  vaccinations: Vaccination[]
  setVaccinations: (items: Vaccination[]) => void

  addVaccination: (item: Vaccination) => void
  updateVaccination: (id: string, updates: Partial<Vaccination>) => void
  removeVaccination: (id: string) => void

  markVaccinationDone: (id: string, doneDate?: string) => void
  getVaccitinationsByKid: (kidId: string) => Vaccination[]
}

export const useVaccinationStore = create<VaccinationState>((set, get) => ({
  vaccinations: vaccinationsMock,

  setVaccinations: items => set({ vaccinations: items }),

  addVaccination: item =>
    set(state => ({
      vaccinations: [...state.vaccinations, item],
    })),

  updateVaccination: (id, updates) =>
    set(state => ({
      vaccinations: state.vaccinations.map(vac => (vac.id === id ? { ...vac, ...updates } : vac)),
    })),

  removeVaccination: id =>
    set(state => ({
      vaccinations: state.vaccinations.filter(vac => vac.id !== id),
    })),

  markVaccinationDone: (id, doneDate) =>
    set(state => ({
      vaccinations: state.vaccinations.map(vac =>
        vac.id === id
          ? { ...vac, status: VACCINATION_STATUS.COMPLETED, date: doneDate ?? vac.dueDate }
          : vac,
      ),
    })),

  getVaccitinationsByKid: kidId => {
    const { vaccinations } = get()
    return vaccinations.filter(vac => vac.kidId === kidId)
  },
}))
