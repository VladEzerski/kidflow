import { Activity } from '@/types'

export const activitiesMock: Activity[] = [
  {
    id: 'activity_1',
    kidId: 'kid_1',
    title: 'Swimming',
    schedules: [
      { weekday: 1, time: '17:00' },
      { weekday: 3, time: '17:00' },
    ],
    nextPaymentDate: '2025-02-01',
  },
]
