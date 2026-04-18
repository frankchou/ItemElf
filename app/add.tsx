import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useLang, useApp } from '../src/context/AppContext';
import { AddItemScreen } from '../src/screens/AddItemScreen';
import { IEIcon } from '../src/components';

export default function AddRoute() {
  const router = useRouter();
  const t = useTheme();
  const lang = useLang();
  const { state, set } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity onPress={() => router.back()}
          style={[s.closeBtn, { backgroundColor: t.surface2 }]}>
          <IEIcon name="close" size={18} color={t.text} />
        </TouchableOpacity>
        <Text style={[s.title, { color: t.text }]}>{lang === 'en' ? 'Add item' : '新增物品'}</Text>
        {/* Variant toggle */}
        <View style={[s.toggle, { backgroundColor: t.surface2 }]}>
          {(['single', 'step'] as const).map(v => (
            <TouchableOpacity key={v} onPress={() => set({ addVariant: v })}
              style={[s.toggleBtn, { backgroundColor: state.addVariant === v ? t.surface : 'transparent' }]}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: t.text }}>
                {v === 'single' ? (lang === 'en' ? 'Single' : '單頁') : (lang === 'en' ? 'Steps' : '分步')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <AddItemScreen
        onDone={() => router.back()}
        onBack={() => router.back()}
      />
    </View>
  );
}

const s = StyleSheet.create({
  header:    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  closeBtn:  { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  title:     { flex: 1, fontSize: 17, fontWeight: '600' },
  toggle:    { flexDirection: 'row', padding: 3, borderRadius: 999 },
  toggleBtn: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 },
});
