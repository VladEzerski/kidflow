import { useCallback, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { useFocusEffect } from 'expo-router'

import { Screen } from '@/layouts/Screen'
import { useKidsStore } from '@/features/kids/store/kidsStore'
import { VaccinationCard } from '@/features/vaccinations/components/VaccinationCard'
import { AddVaccinationSheetContent } from '@/features/vaccinations/components/AddVaccinationSheetContent/AddVaccinationSheetContent'
import { useVaccinationStore } from '@/features/vaccinations/store/vaccinationsStore'
import { useAddAction } from '@/features/addAction'

export default function HealthScreen() {
  const activeKidId = useKidsStore(s => s.activeKidId)
  const { vaccinations, loadByKid } = useVaccinationStore()
  const { register, close } = useAddAction()

  useEffect(() => {
    if (activeKidId) {
      loadByKid(activeKidId)
    }
  }, [activeKidId, loadByKid])

  useFocusEffect(
    useCallback(() => {
      console.log('Healh screen focused')
      const unregister = register({
        key: 'health',
        title: 'Add vaccination',
        render: () => <AddVaccinationSheetContent onClose={close} />,
      })

      return () => {
        console.log('Healh screen unfocused')
        unregister()
      }
    }, [register, close]),
  )

  return (
    <Screen title={'Health'}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={vaccinations}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <VaccinationCard vaccination={item} />}
        />
      </View>
    </Screen>
  )
}
