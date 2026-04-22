import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useLang, useApp } from '../../src/context/AppContext';
import { SearchScreen } from '../../src/screens/SearchScreen';
import { IEIcon } from '../../src/components';

export default function SearchTab() {
  const router = useRouter();
  const t = useTheme();
  const lang = useLang();
  const { state } = useApp();
  const insets = useSafeAreaInsets();

  const userName = state.currentUser?.name ?? '';
  const titles = {
    zh: userName ? `哈囉 ${userName}` : '哈囉！',
    en: userName ? `Hi, ${userName}` : 'Hi there!',
  };
  const subs = { zh: '今天要找什麼呢？', en: 'What are you looking for today?' };

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* Screen header */}
      <View style={[s.header, { paddingTop: insets.top + 10, backgroundColor: t.bg }]}>
        <View>
          <Text style={[s.title, { color: t.text }]}>{titles[lang]}</Text>
          <Text style={[s.sub, { color: t.textMuted }]}>{subs[lang]}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/notifications')}
          style={[s.circleBtn, { backgroundColor: t.surface, borderColor: t.border }]}>
          <IEIcon name="bell" size={18} color={t.text} />
          <View style={[s.badge, { backgroundColor: t.danger, borderColor: t.surface }]} />
        </TouchableOpacity>
      </View>

      <SearchScreen onOpenItem={(id) => router.push(`/item/${id}`)} />
    </View>
  );
}

const s = StyleSheet.create({
  header:    { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 10 },
  title:     { fontSize: 28, fontWeight: '700', letterSpacing: -0.4 },
  sub:       { fontSize: 12, marginTop: 2 },
  circleBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  badge:     { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, borderWidth: 2 },
});
