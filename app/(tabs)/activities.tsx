import { View, FlatList } from 'react-native'

import { useKidsStore } from '@/features/kids/store/kidsStore'
import { ActivityCard } from '@/features/activities/components/ActivityCard'
import { useActivityStore } from '@/features/activities/store/activitiesStore'

export default function ActivitiesScreen() {
  const activeKidId = useKidsStore(s => s.activeKidId)
  const getActivitiesByKid = useActivityStore(s => s.getActivitiesByKid)

  const activities = getActivitiesByKid(activeKidId)

  return (
    <View style={{ flex: 1, padding: 48 }}>
      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ActivityCard activity={item} />}
      />
    </View>
  )
}
