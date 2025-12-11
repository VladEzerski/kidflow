import React, { FC } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

import styles from './styles'

type ScreenHeaderProps = {
  title: string
}

export const ScreenHeader: FC<ScreenHeaderProps> = ({ title }) => {
  return (
    <View style={styles.root}>
      <Text variant="titleLarge">{title}</Text>
    </View>
  )
}
