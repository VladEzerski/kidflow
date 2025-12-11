import { FlatList } from 'react-native'
import { Text } from 'react-native-paper'

import { useKidsStore } from '@/features/kids/store/kidsStore'
import { KidCard } from '@/features/kids/components/KidCard'
import { Screen } from '@/layouts/Screen'

export default function KidsScreen() {
  const kids = useKidsStore(s => s.kids)
  const activeKidId = useKidsStore(s => s.activeKidId)
  const setActiveKid = useKidsStore(s => s.setActiveKid)

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
