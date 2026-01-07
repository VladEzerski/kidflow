import { FC } from 'react'
import { View } from 'react-native'
import { Card, Text, Chip, useTheme } from 'react-native-paper'

import { Vaccination, VACCINATION_STATUS } from '@/types'

import styles from './styles'

type VaccinationCardProps = {
  vaccination: Vaccination
}

function formatDate(iso: string) {
  const d = iso.length === 10 ? new Date(`${iso}T00:00:00`) : new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(d)
}

export const VaccinationCard: FC<VaccinationCardProps> = ({ vaccination }) => {
  const theme = useTheme()
  const isCompleted = vaccination.status === VACCINATION_STATUS.COMPLETED

  const accentColor = isCompleted ? theme.colors.primary : theme.colors.tertiary
  const chipBg = isCompleted ? theme.colors.primaryContainer : theme.colors.tertiaryContainer
  const chipText = isCompleted ? theme.colors.onPrimaryContainer : theme.colors.onTertiaryContainer

  return (
    <Card mode="elevated" style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.accent, { backgroundColor: accentColor }]} />

        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
              {vaccination.title}
            </Text>

            <Chip
              compact
              style={[styles.chip, { backgroundColor: chipBg }]}
              textStyle={{ color: chipText }}
            >
              {isCompleted ? 'Completed' : 'Scheduled'}
            </Chip>
          </View>

          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Due {formatDate(vaccination.dueDate)}
          </Text>

          {!!vaccination.notes && (
            <Text
              variant="bodySmall"
              numberOfLines={2}
              style={[styles.notes, { color: theme.colors.onSurfaceVariant }]}
            >
              {vaccination.notes}
            </Text>
          )}
        </View>
      </View>
    </Card>
  )
}
