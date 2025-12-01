import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

export default function MoreScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
      <ThemedText style={{ fontSize: 20, fontWeight: '600' }}>More / Settings Screen</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>Here are the settings, experiments, etc.</ThemedText>
    </ThemedView>
  )
}
