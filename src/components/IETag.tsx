import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/AppContext';

type Tone = 'neutral' | 'primary' | 'accent' | 'warn';

interface Props { children: React.ReactNode; tone?: Tone }

export function IETag({ children, tone = 'neutral' }: Props) {
  const t = useTheme();
  const colors = {
    neutral: { bg: t.surface2,    ink: t.textMuted },
    primary: { bg: t.primarySoft, ink: t.primary },
    accent:  { bg: t.accentSoft,  ink: t.accent },
    warn:    { bg: t.statusExpiring.bg, ink: t.statusExpiring.ink },
  };
  const c = colors[tone];
  return (
    <View style={[s.tag, { backgroundColor: c.bg }]}>
      <Text style={[s.text, { color: c.ink }]}>{children}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  tag:  { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 6 },
  text: { fontSize: 11, fontWeight: '500' },
});
