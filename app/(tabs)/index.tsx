import { useEffect } from 'react'
import { View } from 'react-native'
import { Avatar } from 'react-native-paper'

import { Screen } from '@/layouts/Screen'

import { useKidsStore } from '@/features/kids/store/kidsStore'

export default function HomeScreen() {
  const kids = useKidsStore(s => s.kids)
  const activeKidId = useKidsStore(s => s.activeKidId)
  const activeKid = kids.find(k => k.id === activeKidId)
  const loadKids = useKidsStore(s => s.loadKids)

  useEffect(() => {
    loadKids()
  }, [loadKids])

  return (
    <Screen title={'Home'}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {activeKid && (
          <Avatar.Text
            label={activeKid.name[0]}
            style={{ backgroundColor: activeKid?.avatarColor ?? '#fff' }}
          ></Avatar.Text>
        )}
      </View>
    </Screen>
  )
}
