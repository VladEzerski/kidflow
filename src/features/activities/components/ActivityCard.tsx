import React, { FC } from 'react'
import { Card, Text } from 'react-native-paper'

import { Activity, ACTIVITY_WEEKDAY_LABELS } from '@/types'

type ActivityCardProps = {
  activity: Activity
}

export const ActivityCard: FC<ActivityCardProps> = ({ activity }) => {
  const formattedWeekdays = activity.weekdays.map(day => ACTIVITY_WEEKDAY_LABELS[day]).join(', ')

  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Title title={activity.title} />

      <Card.Content>
        <Text>Child: {activity.kidId}</Text>
        <Text>Days: {formattedWeekdays}</Text>
        <Text>Time: {activity.time}</Text>
        {activity.nextPaymentDate && <Text>Next payment: {activity.nextPaymentDate}</Text>}
        {activity.notes && <Text>Notes: {activity.notes}</Text>}
      </Card.Content>
    </Card>
  )
}
