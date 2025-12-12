import type { Activity, ActivityWeekday } from '@/types'
import type { ActivityRow } from '@/db/repositories/activitiesRepo'

function parseWeekdaysJson(json: string): ActivityWeekday[] {
  try {
    const arr = JSON.parse(json)
    if (!Array.isArray(arr)) return []

    return arr.filter((x): x is ActivityWeekday => typeof x === 'number') as ActivityWeekday[]
  } catch {
    return []
  }
}

export function activityFromRow(row: ActivityRow): Activity {
  return {
    id: row.id,
    kidId: row.kidId,
    title: row.title,
    weekdays: parseWeekdaysJson(row.weekdaysJson),
    time: row.time,
    nextPaymentDate: row.nextPaymentDate ?? undefined,
    notes: row.notes ?? undefined,
  }
}

export function activityToRowInput(
  activity: Activity,
): Omit<ActivityRow, 'createdAt' | 'updatedAt'> {
  return {
    id: activity.id,
    kidId: activity.kidId,
    title: activity.title,
    weekdaysJson: JSON.stringify(activity.weekdays),
    time: activity.time,
    nextPaymentDate: activity.nextPaymentDate ?? null,
    notes: activity.notes ?? null,
  }
}
