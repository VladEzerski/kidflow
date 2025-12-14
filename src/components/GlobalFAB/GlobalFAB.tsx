import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'

import { useAddAction } from '@/features/addAction'

export const GlobalFAB = () => {
  const { open, hasAction } = useAddAction()

  if (!hasAction) return null

  return <FAB icon="plus" variant="secondary" onPress={open} style={styles.fab} />
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 100,
  },
})
