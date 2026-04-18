import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import { useTheme, useLang } from '../context/AppContext';
import { IEElf, IEButton } from '../components';

interface Props { onSubmit: () => void; onBack: () => void }

export function JoinScreen({ onSubmit, onBack }: Props) {
  const t = useTheme();
  const lang = useLang();
  const [mode, setMode] = useState<'id' | 'qr'>('id');
  const [familyId, setFamilyId] = useState('');

  const T = lang === 'en' ? {
    title: 'Join a family', sub: 'Enter a family ID or scan a QR code',
    byId: 'By ID', byQr: 'By QR', idHint: 'e.g. FM-7X4K-2P',
    submit: 'Request to join', scanHint: 'Point camera at the QR code',
  } : {
    title: '加入家族', sub: '輸入家族編號或掃描 QR code',
    byId: '輸入編號', byQr: '掃描 QR', idHint: '例：FM-7X4K-2P',
    submit: '送出申請', scanHint: '請將相機對準 QR code',
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, padding: 20 }}>
      <View style={s.hero}>
        <IEElf size={72} />
        <Text style={[s.title, { color: t.text }]}>{T.title}</Text>
        <Text style={[s.sub, { color: t.textMuted }]}>{T.sub}</Text>
      </View>

      {/* Mode toggle */}
      <View style={[s.modeBar, { backgroundColor: t.surface2 }]}>
        {(['id', 'qr'] as const).map(m => (
          <TouchableOpacity key={m} onPress={() => setMode(m)}
            style={[s.modeBtn, { backgroundColor: mode === m ? t.surface : 'transparent' }]}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: t.text }}>
              {m === 'id' ? T.byId : T.byQr}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {mode === 'id' ? (
        <View style={{ gap: 16, marginTop: 4 }}>
          <TextInput
            placeholder={T.idHint}
            placeholderTextColor={t.textSubtle}
            value={familyId}
            onChangeText={setFamilyId}
            autoCapitalize="characters"
            style={[s.idInput, { color: t.text, borderColor: t.border, backgroundColor: t.surface }]}
          />
          <IEButton variant="primary" full size="lg" onPress={onSubmit}>{T.submit}</IEButton>
        </View>
      ) : (
        <View style={[s.camera, { backgroundColor: '#000' }]}>
          {/* Camera placeholder — integrate expo-camera BarCodeScanner for real scanning */}
          <View style={s.scanFrame}>
            {[
              { top: -2, left: -2, borderRightWidth: 0, borderBottomWidth: 0 },
              { top: -2, right: -2, borderLeftWidth: 0, borderBottomWidth: 0 },
              { bottom: -2, left: -2, borderRightWidth: 0, borderTopWidth: 0 },
              { bottom: -2, right: -2, borderLeftWidth: 0, borderTopWidth: 0 },
            ].map((corner, i) => (
              <View key={i} style={[s.corner, { borderColor: t.primary }, corner]} />
            ))}
          </View>
          <Text style={s.scanHint}>{T.scanHint}</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  hero:     { alignItems: 'center', gap: 8, marginBottom: 20 },
  title:    { fontSize: 22, fontWeight: '700', marginTop: 12 },
  sub:      { fontSize: 13, textAlign: 'center' },
  modeBar:  { flexDirection: 'row', padding: 4, borderRadius: 999, marginBottom: 20 },
  modeBtn:  { flex: 1, padding: 10, borderRadius: 999, alignItems: 'center' },
  idInput:  { width: '100%', padding: 18, borderRadius: 14, borderWidth: 1, fontSize: 18, letterSpacing: 2, textAlign: 'center', fontFamily: 'monospace' },
  camera:   { height: 300, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  scanFrame:{ width: 200, height: 200, borderWidth: 2, borderColor: '#fff', borderRadius: 16, position: 'relative' },
  corner:   { position: 'absolute', width: 28, height: 28, borderWidth: 4 },
  scanHint: { position: 'absolute', bottom: 16, color: '#fff', fontSize: 12 },
});
