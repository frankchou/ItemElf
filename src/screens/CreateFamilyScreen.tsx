import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme, useLang, useApp } from '../context/AppContext';
import { IEElf, IEButton, IEInput } from '../components';
import { Family } from '../data/types';

interface Props { onDone: () => void }

function generateFamilyId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    if (i === 2 || i === 5) id += '-';
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function CreateFamilyScreen({ onDone }: Props) {
  const t = useTheme();
  const lang = useLang();
  const { state, set } = useApp();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const T = lang === 'en' ? {
    heading: 'Create a family',
    sub: 'Give your family group a name to get started.',
    label: 'Family name',
    placeholder: 'e.g. Chen Family Home',
    create: 'Create family',
    errName: 'Please enter a family name',
  } : {
    heading: '建立家族群組',
    sub: '幫你的家族取個名字，就可以開始使用囉。',
    label: '家族名稱',
    placeholder: '例如：陳家小窩',
    create: '建立家族',
    errName: '請輸入家族名稱',
  };

  function handleCreate() {
    if (!name.trim()) {
      Alert.alert('', T.errName);
      return;
    }
    setLoading(true);
    const newFamily: Family = {
      id: generateFamilyId(),
      name: name.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
      ownerId: state.currentUser?.id ?? 'u1',
      memberInvitePolicy: 'owner-only',
      memberApprovePolicy: 'owner-only',
      expireNoticeDays: 7,
    };
    set({ family: newFamily });
    setLoading(false);
    onDone();
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={s.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={s.hero}>
        <IEElf size={88} mood="happy" />
        <Text style={[s.heading, { color: t.text }]}>{T.heading}</Text>
        <Text style={[s.sub, { color: t.textMuted }]}>{T.sub}</Text>
      </View>

      <View style={s.form}>
        <Text style={[s.label, { color: t.textMuted }]}>{T.label}</Text>
        <IEInput
          placeholder={T.placeholder}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <IEButton variant="primary" full size="lg" onPress={handleCreate} disabled={loading}>
          {loading ? '…' : T.create}
        </IEButton>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 48 },
  hero:      { alignItems: 'center', gap: 12, marginBottom: 40 },
  heading:   { fontSize: 24, fontWeight: '700' },
  sub:       { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  form:      { gap: 10 },
  label:     { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
});
