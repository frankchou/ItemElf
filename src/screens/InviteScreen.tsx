import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTheme, useLang } from '../context/AppContext';
import { IEElf, IEButton } from '../components';
import { family } from '../data/mock';

interface Props { onClose: () => void }

export function InviteScreen({ onClose }: Props) {
  const t = useTheme();
  const lang = useLang();

  const T = lang === 'en'
    ? { title: 'Invite to family', scan: 'Scan to join', id: 'Family ID', copy: 'Copy link', close: 'Done' }
    : { title: '邀請加入家族', scan: '掃描加入家族', id: '家族編號', copy: '複製連結', close: '完成' };

  const qrValue = `itemelf://join?id=${family.id}`;

  return (
    <View style={[s.container, { backgroundColor: t.bg }]}>
      <View style={[s.handle, { backgroundColor: t.border }]} />
      <Text style={[s.title, { color: t.text }]}>{T.title}</Text>
      <Text style={[s.sub, { color: t.textMuted }]}>{T.scan}</Text>

      <View style={[s.qrWrap, { backgroundColor: '#fff', borderColor: t.border }]}>
        <QRCode
          value={qrValue}
          size={200}
          color="#000"
          backgroundColor="#fff"
          logo={{ uri: '' }}
        />
        <View style={s.qrOverlay}>
          <IEElf size={40} />
        </View>
      </View>

      <View style={s.idBlock}>
        <Text style={[s.idLabel, { color: t.textMuted }]}>{T.id}</Text>
        <Text style={[s.idValue, { color: t.text }]}>{family.id}</Text>
      </View>

      <View style={s.actions}>
        <IEButton variant="soft" full size="md">{T.copy}</IEButton>
        <IEButton variant="primary" full size="md" onPress={onClose}>{T.close}</IEButton>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { padding: 24, paddingBottom: 40, alignItems: 'center', gap: 16 },
  handle:    { width: 40, height: 4, borderRadius: 2, marginBottom: 10 },
  title:     { fontSize: 20, fontWeight: '700' },
  sub:       { fontSize: 13 },
  qrWrap:    { padding: 20, borderRadius: 20, borderWidth: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  qrOverlay: { position: 'absolute', backgroundColor: '#fff', padding: 4, borderRadius: 8 },
  idBlock:   { alignItems: 'center', gap: 4 },
  idLabel:   { fontSize: 11 },
  idValue:   { fontSize: 22, fontWeight: '700', fontFamily: 'monospace', letterSpacing: 2 },
  actions:   { flexDirection: 'row', gap: 10, width: '100%' },
});
