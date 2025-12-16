import { ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'

import { AddActionContext } from './AddActionContext'
import { AddActionConfig } from './types'

export const AddActionProvider = ({ children }: { children: ReactNode }) => {
  const sheetRef = useRef<BottomSheet>(null)
  const [current, setCurrent] = useState<AddActionConfig | null>(null)

  console.log('AddActionProvider current: ', current, sheetRef)

  const register = useCallback((config: AddActionConfig) => {
    setCurrent(config)

    return () => {
      setCurrent(prev => (prev?.key === config.key ? null : prev))
    }
  }, [])

  const open = useCallback(() => {
    if (!current) return
    sheetRef.current?.expand()
  }, [current])

  const close = useCallback(() => {
    sheetRef.current?.close()
  }, [])

  const hasAction = !!current

  const snapPoints = useMemo(() => ['35%', '70%'], [])

  const value = useMemo(
    () => ({
      register,
      open,
      close,
      hasAction,
    }),
    [register, open, close, hasAction],
  )

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  )

  return (
    <AddActionContext.Provider value={value}>
      {children}

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.sheetContainer}
        handleIndicatorStyle={{ backgroundColor: '#9CA3AF' }}
        style={styles.sheetContainer}
      >
        <BottomSheetView style={styles.sheetContent}>
          {current?.title && (
            <Text variant="titleLarge" style={styles.sheetTitle}>
              {current.title}
            </Text>
          )}
          {current?.render?.() ?? <View />}
        </BottomSheetView>
      </BottomSheet>
    </AddActionContext.Provider>
  )
}

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#3c3939',
    borderRadius: 16,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 8,
  },
  sheetTitle: {
    backgroundColor: '#3c3939',
    textAlign: 'center',
    borderBottomColor: '#9CA3AF',
    borderBottomWidth: 0.2,
    marginBottom: 16,
  },
})
