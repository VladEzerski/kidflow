import { Vaccination, VACCINATION_STATUS } from '@/types'

export const vaccinationsMock: Vaccination[] = [
  {
    id: 'vac_1',
    kidId: 'kid_1',
    title: 'MMR (Measles, Mumps, Rubella)',
    dueDate: '2025-02-10',
    status: VACCINATION_STATUS.SCHEDULED,
    notes: 'Booster needed next year',
  },
  {
    id: 'vac_2',
    kidId: 'kid_2',
    title: 'DTP Booster',
    dueDate: '2025-03-05',
    status: VACCINATION_STATUS.SCHEDULED,
    notes: 'Clinic requires appointment',
  },
  {
    id: 'vac_3',
    kidId: 'kid_1',
    title: 'Polio Vaccine',
    dueDate: '2024-10-15',
    status: VACCINATION_STATUS.COMPLETED,
  },
  {
    id: 'vac_4',
    kidId: 'kid_2',
    title: 'Hepatitis B – Dose 2',
    dueDate: '2025-01-20',
    status: VACCINATION_STATUS.SCHEDULED,
  },
  {
    id: 'vac_5',
    kidId: 'kid_1',
    title: 'Rotavirus',
    dueDate: '2024-09-12',
    status: VACCINATION_STATUS.COMPLETED,
  },
]
