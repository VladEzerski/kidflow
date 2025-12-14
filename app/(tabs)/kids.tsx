import { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native-paper'

import { useKidsStore } from '@/features/kids/store/kidsStore'
import { KidCard } from '@/features/kids/components/KidCard'
import { Screen } from '@/layouts/Screen'
import { useAddAction } from '@/features/addAction'

export default function KidsScreen() {
  const kids = useKidsStore(s => s.kids)
  const activeKidId = useKidsStore(s => s.activeKidId)
  const setActiveKid = useKidsStore(s => s.setActiveKid)

  const { register } = useAddAction()

  useEffect(() => {
    const unregister = register({
      key: 'kids',
      title: 'Add new kid',
      render: () => (
        <View>
          <Text variant="titleMedium">Render kids content...</Text>
        </View>
      ),
    })

    return unregister
  }, [register])

  return (
    <Screen title={'Kids'}>
      <FlatList
        data={kids}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <KidCard
            kid={item}
            isActive={item.id === activeKidId}
            onPress={() => setActiveKid(item.id)}
          />
        )}
        ListHeaderComponent={
          <Text variant="titleLarge" style={{ marginHorizontal: 16, marginBottom: 8 }}>
            Kids
          </Text>
        }
      />
    </Screen>
  )
}
