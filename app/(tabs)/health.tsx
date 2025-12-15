import { useEffect } from 'react'
import { View, FlatList } from 'react-native'

import { Screen } from '@/layouts/Screen'
import { useKidsStore } from '@/features/kids/store/kidsStore'
import { VaccinationCard } from '@/features/vaccinations/components/VaccinationCard'
import { AddingVaccinationContent } from '@/features/vaccinations/components/AddingVaccinationContent/AddingVaccinationContent'
import { useVaccinationStore } from '@/features/vaccinations/store/vaccinationsStore'
import { useAddAction } from '@/features/addAction'

export default function HealthScreen() {
  const activeKidId = useKidsStore(s => s.activeKidId)
  const { vaccinations, loadByKid } = useVaccinationStore()
  const { register } = useAddAction()

  useEffect(() => {
    if (activeKidId) {
      loadByKid(activeKidId)
    }
  }, [activeKidId, loadByKid])

  useEffect(() => {
    const unregister = register({
      key: 'health',
      title: 'Add vaccination',
      render: () => <AddingVaccinationContent />,
    })

    return unregister
  }, [register])

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
