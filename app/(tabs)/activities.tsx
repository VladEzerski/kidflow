import { useCallback, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Screen } from '@/layouts/Screen'
import { useKidsStore } from '@/features/kids/store/kidsStore'
import { ActivityCard } from '@/features/activities/components/ActivityCard'
import { useActivityStore } from '@/features/activities/store/activitiesStore'
import { useAddAction } from '@/features/addAction'
import { useFocusEffect } from 'expo-router'

export default function ActivitiesScreen() {
  const activeKidId = useKidsStore(s => s.activeKidId)
  const { activities, loadByKid } = useActivityStore()

  const { register } = useAddAction()

  useEffect(() => {
    if (activeKidId) {
      loadByKid(activeKidId)
    }
  }, [activeKidId, loadByKid])

  useFocusEffect(
    useCallback(() => {
      console.log('ACtivities screen focused')
      const unregister = register({
        key: 'activities',
        title: 'Add new activity',
        render: () => (
          <View>
            <Text variant="titleMedium">Render activities content...</Text>
          </View>
        ),
      })

      return () => {
        console.log('ACtivities screen unfocused')
        unregister()
      }
    }, [register]),
  )

  return (
    <Screen title={'Activities'}>
      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ActivityCard activity={item} />}
      />
    </Screen>
  )
}
