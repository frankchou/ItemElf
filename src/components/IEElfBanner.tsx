import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/AppContext';
import { IEElf } from './IEElf';

interface Props {
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function IEElfBanner({ children, action }: Props) {
  const t = useTheme();
  return (
    <View style={[s.banner, { backgroundColor: t.surface, borderColor: t.border }]}>
      <IEElf size={44} />
      <View style={s.body}>{children}</View>
      {action}
    </View>
  );
}

const s = StyleSheet.create({
  banner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 18, borderWidth: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 2, elevation: 1,
  },
  body: { flex: 1 },
});
