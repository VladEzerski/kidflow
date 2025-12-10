import { View } from 'react-native'
import { Avatar } from 'react-native-paper'

import { useKidsStore } from '@/features/kids/store/kidsStore'

export default function HomeScreen() {
  const kids = useKidsStore(s => s.kids)
  const activeKidId = useKidsStore(s => s.activeKidId)
  const activeKid = kids.find(k => k.id === activeKidId) || kids[0]

  return (
    <View style={{ flex: 1, padding: 64, alignItems: 'center' }}>
      <Avatar.Text
        label={activeKid.name[0]}
        style={{ backgroundColor: activeKid.avatarColor }}
      ></Avatar.Text>
    </View>
  )
}
