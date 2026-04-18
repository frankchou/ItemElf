import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/AppContext';
import { useLang } from '../context/AppContext';
import { StatusKey, STATUS_LABELS, getStatusColor } from '../theme/tokens';

interface Props { status: string; size?: 'sm' | 'md' }

export function IEStatusPill({ status, size = 'md' }: Props) {
  const t = useTheme();
  const lang = useLang();
  const key = status as StatusKey;
  const sc = getStatusColor(t, key);
  const label = STATUS_LABELS[key]?.[lang] ?? status;
  const isSm = size === 'sm';
  return (
    <View style={[s.pill, { backgroundColor: sc.bg, paddingVertical: isSm ? 2 : 4, paddingHorizontal: isSm ? 8 : 10 }]}>
      <View style={[s.dot, { backgroundColor: sc.ink }]} />
      <Text style={[s.text, { color: sc.ink, fontSize: isSm ? 11 : 12 }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 999 },
  dot:  { width: 6, height: 6, borderRadius: 3 },
  text: { fontWeight: '600', lineHeight: 16 },
});
