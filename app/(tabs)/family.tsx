import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useLang } from '../../src/context/AppContext';
import { FamilyScreen } from '../../src/screens/FamilyScreen';
import { IEIcon } from '../../src/components';

export default function FamilyTab() {
  const router = useRouter();
  const t = useTheme();
  const lang = useLang();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[s.header, { paddingTop: insets.top + 10, backgroundColor: t.bg }]}>
        <Text style={[s.title, { color: t.text }]}>{lang === 'en' ? 'Family' : '家族'}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity onPress={() => router.push('/invite')}
            style={[s.circleBtn, { backgroundColor: t.surface, borderColor: t.border }]}>
            <IEIcon name="plus" size={18} color={t.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/notifications')}
            style={[s.circleBtn, { backgroundColor: t.surface, borderColor: t.border }]}>
            <IEIcon name="bell" size={18} color={t.text} />
          </TouchableOpacity>
        </View>
      </View>
      <FamilyScreen
        onInvite={() => router.push('/invite')}
        onApprove={() => {}}
      />
    </View>
  );
}

const s = StyleSheet.create({
  header:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 10 },
  title:     { fontSize: 28, fontWeight: '700', letterSpacing: -0.4 },
  circleBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
