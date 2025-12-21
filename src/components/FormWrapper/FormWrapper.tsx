import { ReactNode } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native'

export const FormWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  )
}
