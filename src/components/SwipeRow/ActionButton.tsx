import { StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, SharedValue } from 'react-native-reanimated'
import { IconButton } from 'react-native-paper'

export type ActionButtonProps = {
  progress: SharedValue<number>
  index: number
  actionWidth: number
  icon: string
  onPress: () => void
  backgroundColor: string
  iconColor: string
  isDisabled?: boolean
}

export const ActionButton = ({
  progress,
  index,
  actionWidth,
  icon,
  onPress,
  backgroundColor,
  iconColor,
  isDisabled = false,
}: ActionButtonProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const delay = index * 0.06
    const t = interpolate(progress.value, [0 + delay, 1], [0.2, 1], 'clamp')
    const disabledOpacity = isDisabled ? 0.35 : 1

    return {
      opacity: t * disabledOpacity,
      transform: [{ scale: t }],
    }
  }, [index, isDisabled])

  return (
    <Animated.View style={[styles.action, { width: actionWidth, backgroundColor }, animatedStyle]}>
      <IconButton
        icon={icon}
        iconColor={iconColor}
        size={22}
        onPress={isDisabled ? undefined : onPress}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
})
