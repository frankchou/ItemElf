import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/AppContext';

interface Props {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function IESection({ title, action, children, style }: Props) {
  const t = useTheme();
  return (
    <View style={[s.wrap, style]}>
      {(title || action) && (
        <View style={s.header}>
          {title && <Text style={[s.title, { color: t.textMuted }]}>{title}</Text>}
          {action}
        </View>
      )}
      {children}
    </View>
  );
}

const s = StyleSheet.create({
  wrap:   { paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 4 },
  title:  { fontSize: 13, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
});
