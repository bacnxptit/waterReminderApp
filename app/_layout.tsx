import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import {useColorScheme} from '@/hooks/useColorScheme';
import FontThemeContext from '@/context/FontThemeContext';
import UserAuthContext from '@/context/UserAuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <UserAuthContext>
      <FontThemeContext>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
            <Stack.Screen
              name="(routes)/onBoarding/index"
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="(routes)/userInfo/index"
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="(routes)/drinkReminder/index"
              options={{headerShown: false}}
            />
          </Stack>
        </ThemeProvider>
      </FontThemeContext>
    </UserAuthContext>
  );
}
