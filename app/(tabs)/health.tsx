import { View, FlatList } from 'react-native'

import { useKidsStore } from '@/features/kids/store/kidsStore'
import { VaccinationCard } from '@/features/vaccinations/components/VaccinationCard'
import { useVaccinationStore } from '@/features/vaccinations/store/vaccinationsStore'

export default function HealthScreen() {
  const activeKidId = useKidsStore(s => s.activeKidId)
  const getVaccinationsByKid = useVaccinationStore(s => s.getVaccitinationsByKid)

  const vaccinations = getVaccinationsByKid(activeKidId)

  return (
    <View style={{ flex: 1, padding: 48 }}>
      <FlatList
        data={vaccinations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <VaccinationCard vaccination={item} />}
      />
    </View>
  )
}
