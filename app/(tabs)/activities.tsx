import { ThemedText } from "@/components/themed-text"
import { ThemedView } from "@/components/themed-view"

export default function ActivitiesScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <ThemedText style={{ fontSize: 20, fontWeight: "600" }}>
        Activities Screen
      </ThemedText>
      <ThemedText style={{ marginTop: 8 }}>
        There will be training sessions, classes, and payments for clubs here.
      </ThemedText>
    </ThemedView>
  )
}
