import { create } from 'zustand'

import { kidsMock } from '@/mocks/kidsMocks'
import { Kid } from '@/types'

export type KidState = {
  kids: Kid[]
  activeKidId: string | null
  setKids: (kids: Kid[]) => void
  setActiveKid: (kidId: string) => void
}

export const useKidsStore = create<KidState>(set => ({
  kids: kidsMock,
  activeKidId: kidsMock[0]?.id ?? null,
  setKids: kids => set({ kids }),
  setActiveKid: kidId => set({ activeKidId: kidId }),
}))
