import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../src/context/AppContext';
import { InviteScreen } from '../src/screens/InviteScreen';

export default function InviteRoute() {
  const router = useRouter();
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <InviteScreen onClose={() => router.back()} />
    </View>
  );
}
