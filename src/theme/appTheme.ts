import {
  MD3DarkTheme,
  MD3LightTheme,
  type MD3Theme,
  adaptNavigationTheme,
} from 'react-native-paper'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
})

export type AppThemePair = {
  paperTheme: MD3Theme
  navigationTheme: NavigationTheme
}

const lightPaper: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    /*
      colors config, for example - primary: '#...',
    */
  },
}

const darkPaper: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    /*
      colors config, for example - primary: '#...',
    */
  },
}

export function getAppTheme(colorScheme: 'light' | 'dark'): AppThemePair {
  if (colorScheme === 'dark') {
    return {
      paperTheme: { ...darkPaper, colors: { ...darkPaper.colors, ...DarkTheme.colors } },
      navigationTheme: DarkTheme,
    }
  }

  return {
    paperTheme: { ...lightPaper, colors: { ...lightPaper.colors, ...LightTheme.colors } },
    navigationTheme: LightTheme,
  }
}
