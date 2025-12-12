export const VACCINATION_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
}
export type VaccinationStatus = (typeof VACCINATION_STATUS)[keyof typeof VACCINATION_STATUS]

export type Vaccination = {
  id: string
  kidId: string
  title: string
  dueDate: string
  status: VaccinationStatus
  notes?: string
  completedAt?: string
}
