import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../src/context/AppContext';
import { CreateFamilyScreen } from '../src/screens/CreateFamilyScreen';

export default function CreateFamilyRoute() {
  const router = useRouter();
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <CreateFamilyScreen onDone={() => router.back()} />
    </View>
  );
}
