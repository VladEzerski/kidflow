import { useCallback, useEffect, useMemo } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { useFocusEffect } from 'expo-router'

import { Screen } from '@/layouts/Screen'
import { useKidsStore } from '@/features/kids/store/kidsStore'
import { VaccinationCard } from '@/features/vaccinations/components/VaccinationCard'
import { AddVaccinationSheetContent } from '@/features/vaccinations/components/AddVaccinationSheetContent/AddVaccinationSheetContent'
import { useVaccinationStore } from '@/features/vaccinations/store/vaccinationsStore'
import { useAddAction } from '@/features/addAction'
import { SwipeRow } from '@/components/SwipeRow/SwipeRow'
import { Vaccination, VACCINATION_STATUS } from '@/types'

export default function HealthScreen() {
  const activeKidId = useKidsStore(s => s.activeKidId)
  const { vaccinations, loadByKid, markVaccinationDone, removeVaccination } = useVaccinationStore()
  const { register, close } = useAddAction()

  const rightActions = useCallback(
    (item: Vaccination) => {
      return [
        {
          key: 'done',
          icon: 'check',
          isDisabled: item.status === VACCINATION_STATUS.COMPLETED,
          onPress: () => markVaccinationDone(item.id),
        },
        {
          key: 'delete',
          icon: 'trash-can-outline',
          onPress: () => removeVaccination(item.id),
        },
      ]
    },
    [markVaccinationDone, removeVaccination],
  )

  useEffect(() => {
    if (activeKidId) {
      loadByKid(activeKidId)
    }
  }, [activeKidId, loadByKid])

  useFocusEffect(
    useCallback(() => {
      const unregister = register({
        key: 'health',
        title: 'Add vaccination',
        render: () => <AddVaccinationSheetContent onClose={close} />,
      })

      return () => {
        unregister()
      }
    }, [register, close]),
  )

  const keyExtractor = useCallback((item: Vaccination) => item.id, [])

  const renderItem = useCallback(
    ({ item }: { item: Vaccination }) => (
      <SwipeRow rightActions={rightActions(item)}>
        <VaccinationCard vaccination={item} />
      </SwipeRow>
    ),
    [rightActions],
  )

  return (
    <Screen title={'Health'}>
      <View style={styles.container}>
        <FlatList data={vaccinations} keyExtractor={keyExtractor} renderItem={renderItem} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
