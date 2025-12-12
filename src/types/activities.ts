export const ACTIVITY_WEEKDAY = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
} as const

export type ActivityWeekday = (typeof ACTIVITY_WEEKDAY)[keyof typeof ACTIVITY_WEEKDAY]

export const ACTIVITY_WEEKDAY_LABELS: Record<ActivityWeekday, string> = {
  [ACTIVITY_WEEKDAY.Monday]: 'Monday',
  [ACTIVITY_WEEKDAY.Tuesday]: 'Tuesday',
  [ACTIVITY_WEEKDAY.Wednesday]: 'Wednesday',
  [ACTIVITY_WEEKDAY.Thursday]: 'Thursday',
  [ACTIVITY_WEEKDAY.Friday]: 'Friday',
  [ACTIVITY_WEEKDAY.Saturday]: 'Saturday',
  [ACTIVITY_WEEKDAY.Sunday]: 'Sunday',
} as const

export type Activity = {
  id: string
  kidId: string
  title: string
  weekdays: ActivityWeekday[]
  time: string
  nextPaymentDate?: string
  notes?: string
}
