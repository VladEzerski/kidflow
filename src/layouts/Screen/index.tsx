import { FC, ReactNode } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ScreenHeader } from './ScreenHeader'

type ScreenProps = {
  title: string
  children: ReactNode
}

export const Screen: FC<ScreenProps> = ({ title, children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader title={title} />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  )
}
