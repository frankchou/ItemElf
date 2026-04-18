import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/AppContext';
import { ItemDetailScreen } from '../../src/screens/ItemDetailScreen';

export default function ItemDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <ItemDetailScreen
        itemId={id ?? 'i01'}
        onBack={() => router.back()}
        onEdit={() => {}}
      />
    </View>
  );
}
