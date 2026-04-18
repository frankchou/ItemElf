import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useTheme, useApp } from '../src/context/AppContext';
import { AuthScreen } from '../src/screens/AuthScreen';

export default function AuthRoute() {
  const router = useRouter();
  const { set } = useApp();
  const t = useTheme();
  const insets = useSafeAreaInsets();

  function handleDone() {
    set({ isLoggedIn: true });
    router.replace('/(tabs)');
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <AuthScreen onDone={handleDone} />
    </View>
  );
}
