import React, { FC } from 'react'
import { Card, Text } from 'react-native-paper'

import { Vaccination } from '@/types'

type VaccinationCardProps = {
  vaccination: Vaccination
}

export const VaccinationCard: FC<VaccinationCardProps> = ({ vaccination }) => {
  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Title title={vaccination.title} subtitle={vaccination.dueDate} />
      <Card.Content>
        <Text>Kid ID: {vaccination.kidId}</Text>
        <Text>Status: {vaccination.status}</Text>
      </Card.Content>
    </Card>
  )
}
