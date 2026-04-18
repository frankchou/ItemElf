import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useLang, useApp } from '../src/context/AppContext';
import { ExpiringScreen } from '../src/screens/ExpiringScreen';
import { IEIcon } from '../src/components';

export default function ExpiringRoute() {
  const router = useRouter();
  const t = useTheme();
  const lang = useLang();
  const { state, set } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={[s.backBtn, { backgroundColor: t.surface, borderColor: t.border }]}>
          <IEIcon name="back" size={18} color={t.text} />
        </TouchableOpacity>
        <Text style={[s.title, { color: t.text }]}>{lang === 'en' ? 'Needs attention' : '到期提醒'}</Text>
        {/* Variant toggle */}
        <View style={[s.toggle, { backgroundColor: t.surface2 }]}>
          {(['timeline', 'badge'] as const).map(v => (
            <TouchableOpacity key={v} onPress={() => set({ expiringVariant: v })}
              style={[s.toggleBtn, { backgroundColor: state.expiringVariant === v ? t.surface : 'transparent' }]}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: t.text }}>
                {v === 'timeline' ? (lang === 'en' ? 'Timeline' : '時間軸') : (lang === 'en' ? 'Badge' : 'Badge')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ExpiringScreen onOpenItem={(id) => router.push(`/item/${id}`)} />
    </View>
  );
}

const s = StyleSheet.create({
  header:    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  backBtn:   { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  title:     { flex: 1, fontSize: 20, fontWeight: '700' },
  toggle:    { flexDirection: 'row', padding: 3, borderRadius: 999 },
  toggleBtn: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 },
});
