import { Activity, ACTIVITY_WEEKDAY } from '@/types'

export const activitiesMock: Activity[] = [
  {
    id: 'act_1',
    kidId: 'kid_1',
    title: 'Swimming',
    weekdays: [ACTIVITY_WEEKDAY.Tuesday, ACTIVITY_WEEKDAY.Thursday],
    time: '17:00',
    nextPaymentDate: '2025-02-10',
  },
  {
    id: 'act_2',
    kidId: 'kid_1',
    title: 'Drawing Class',
    weekdays: [ACTIVITY_WEEKDAY.Saturday],
    time: '10:00',
  },
  {
    id: 'act_3',
    kidId: 'kid_1',
    title: 'Speech Therapy',
    weekdays: [ACTIVITY_WEEKDAY.Monday],
    time: '15:00',
    nextPaymentDate: '2025-01-20',
  },
  {
    id: 'act_4',
    kidId: 'kid_2',
    title: 'Football',
    weekdays: [ACTIVITY_WEEKDAY.Wednesday, ACTIVITY_WEEKDAY.Friday],
    time: '18:15',
  },
  {
    id: 'act_5',
    kidId: 'kid_2',
    title: 'Music School',
    weekdays: [ACTIVITY_WEEKDAY.Sunday],
    time: '11:00',
  },
]
