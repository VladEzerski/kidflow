import { useEffect } from 'react'
import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { PaperProvider } from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/use-color-scheme'
import { getDb, configureDb, migrate, seedIfEmpty } from '@/db'
import { getAppTheme } from '@/theme/appTheme'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const scheme = colorScheme === 'dark' ? 'dark' : 'light'
  const { paperTheme, navigationTheme } = getAppTheme(scheme)

  useEffect(() => {
    async function initDb() {
      try {
        const db = await getDb()
        await configureDb(db)
        await migrate(db)
        await seedIfEmpty(db)
      } catch (e) {
        console.error('DB INIT FAILED', e)
      }
    }

    initDb()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={navigationTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  )
}
