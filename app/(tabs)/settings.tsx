import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useLang, useApp } from '../../src/context/AppContext';
import { SettingsScreen } from '../../src/screens/SettingsScreen';
import { IEIcon } from '../../src/components';

export default function SettingsTab() {
  const router = useRouter();
  const t = useTheme();
  const lang = useLang();
  const { set } = useApp();
  const insets = useSafeAreaInsets();

  function handleLogout() {
    set({ isLoggedIn: false });
    router.replace('/auth');
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[s.header, { paddingTop: insets.top + 10, backgroundColor: t.bg }]}>
        <Text style={[s.title, { color: t.text }]}>{lang === 'en' ? 'Settings' : '設定'}</Text>
        <TouchableOpacity onPress={() => router.push('/notifications')}
          style={[s.circleBtn, { backgroundColor: t.surface, borderColor: t.border }]}>
          <IEIcon name="bell" size={18} color={t.text} />
        </TouchableOpacity>
      </View>
      <SettingsScreen onLogout={handleLogout} />
    </View>
  );
}

const s = StyleSheet.create({
  header:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 10 },
  title:     { fontSize: 28, fontWeight: '700', letterSpacing: -0.4 },
  circleBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
