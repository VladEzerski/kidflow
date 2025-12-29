import { RefObject, ReactNode, useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable'
import { SharedValue } from 'react-native-reanimated'
import { useTheme } from 'react-native-paper'

import { ActionButton } from './ActionButton'

export type SwipeRowAction = {
  key: string
  icon: string
  onPress: () => void
  variant?: 'default' | 'danger'
}

type SwipeRowProps = {
  children: ReactNode
  rightActions: SwipeRowAction[]
  actionWidth?: number
  swipeRef?: RefObject<SwipeableMethods | null>
}

export const SwipeRow = ({ children, rightActions, actionWidth = 72, swipeRef }: SwipeRowProps) => {
  const theme = useTheme()

  const totalWidth = useMemo(
    () => rightActions.length * actionWidth,
    [rightActions.length, actionWidth],
  )

  const renderRightActions = useCallback(
    (progress: SharedValue<number>) => {
      return (
        <View style={[styles.actions, { width: totalWidth }]}>
          {rightActions.map((action, idx) => (
            <ActionButton
              key={action.key}
              progress={progress}
              index={idx}
              actionWidth={actionWidth}
              icon={action.icon}
              onPress={action.onPress}
              backgroundColor={
                action.variant === 'danger'
                  ? theme.colors.errorContainer
                  : theme.colors.secondaryContainer
              }
              iconColor={
                action.variant === 'danger'
                  ? theme.colors.onErrorContainer
                  : theme.colors.onSecondaryContainer
              }
            />
          ))}
        </View>
      )
    },
    [rightActions, totalWidth, actionWidth, theme.colors],
  )

  return (
    <ReanimatedSwipeable
      ref={swipeRef}
      friction={1.5}
      rightThreshold={24}
      overshootRight={false}
      renderRightActions={renderRightActions}
    >
      {children}
    </ReanimatedSwipeable>
  )
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
})
