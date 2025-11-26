import {COLOR_THEME} from '@/style/ColorTheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs} from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLOR_THEME.base.primary,
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          height: 60,
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          marginBottom: 10,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="History"
        options={{
          title: 'History',
          tabBarIcon: ({color}) => (
            <FontAwesome size={28} name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Report"
        options={{
          title: 'Report',
          tabBarIcon: ({color}) => (
            <FontAwesome size={28} name="database" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Account',
          tabBarIcon: ({color}) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
