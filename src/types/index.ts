export type Kid = {
  id: string
  name: string
  birthDate: string
  avatarColor: string
}

export type ActivitySchedule = {
  weekday: number
  time: string
}

export type Activity = {
  id: string
  kidId: string
  title: string
  schedules: ActivitySchedule[]
  nextPaymentDate?: string
}
