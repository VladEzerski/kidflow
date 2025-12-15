import { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'

import { Vaccination } from '@/types'

export const AddingVaccinationContent: FC = () => {
  const [text, setText] = useState('')

  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder="Add new vaccination name"
        value={text}
        onChangeText={text => setText(text)}
      />
      {text && <Text variant="titleSmall">{text}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({})
