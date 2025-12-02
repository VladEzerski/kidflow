import React, { FC } from 'react'
import { View } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'

import type { Kid } from '@/types'

import styles from './styles'

type KidCardProps = {
  kid: Kid
  isActive: boolean
  onPress: () => void
}

export const KidCard: FC<KidCardProps> = ({ kid, isActive, onPress }) => {
  return (
    <TouchableRipple onPress={onPress} borderless>
      <Card style={[styles.card, isActive && styles.cardActive]}>
        <View style={styles.row}>
          <View style={[styles.avatar, { backgroundColor: kid.avatarColor }]} />
          <View style={styles.textContainer}>
            <Text variant="titleMedium">{kid.name}</Text>
            {kid.birthDate && (
              <Text variant="bodySmall" style={styles.secondary}>
                Born: {kid.birthDate}
              </Text>
            )}
            {isActive && (
              <Text variant="labelSmall" style={styles.activeLabel}>
                Active
              </Text>
            )}
          </View>
        </View>
      </Card>
    </TouchableRipple>
  )
}
