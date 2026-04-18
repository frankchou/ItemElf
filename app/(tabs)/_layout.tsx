import { Tabs } from 'expo-router';
import { IETabBar } from '../../src/components/IETabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <IETabBar {...(props as any)} />}
    >
      <Tabs.Screen name="index"    options={{ title: 'Search' }} />
      <Tabs.Screen name="family"   options={{ title: 'Family' }} />
      <Tabs.Screen name="manage"   options={{ title: 'Manage' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
