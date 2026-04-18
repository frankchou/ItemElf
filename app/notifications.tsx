import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useLang } from '../src/context/AppContext';
import { NotificationsScreen } from '../src/screens/NotificationsScreen';
import { IEIcon } from '../src/components';

export default function NotificationsRoute() {
  const router = useRouter();
  const t = useTheme();
  const lang = useLang();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={[s.backBtn, { backgroundColor: t.surface, borderColor: t.border }]}>
          <IEIcon name="back" size={18} color={t.text} />
        </TouchableOpacity>
        <Text style={[s.title, { color: t.text }]}>{lang === 'en' ? 'Activity' : '動態通知'}</Text>
      </View>
      <NotificationsScreen onOpenItem={(id) => router.push(`/item/${id}`)} />
    </View>
  );
}

const s = StyleSheet.create({
  header:  { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  title:   { fontSize: 20, fontWeight: '700' },
});
