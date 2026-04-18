import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../context/AppContext';

interface Props { size?: number; mood?: 'happy' | 'alert' | 'sleepy' }

export function IEElf({ size = 64, mood = 'happy' }: Props) {
  const t = useTheme();
  const ear = mood === 'alert' ? -10 : mood === 'sleepy' ? 6 : 0;
  const svgSize = size * 0.62;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: t.elfBg, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={svgSize} height={svgSize} viewBox="0 0 40 40" fill="none">
        <Path d={`M20 3 L${28 + ear / 3} 14 L${12 - ear / 3} 14 Z`} fill={t.elfInk} />
        <Circle cx={20} cy={3.5} r={1.6} fill={t.elfInk} opacity={0.7} />
        <Circle cx={20} cy={22} r={9} fill={t.elfInk} opacity={0.18} />
        <Circle cx={16.5} cy={21} r={1.3} fill={t.elfInk} />
        <Circle cx={23.5} cy={21} r={1.3} fill={t.elfInk} />
        <Path d="M16 25 Q20 28 24 25" stroke={t.elfInk} strokeWidth={1.4} strokeLinecap="round" fill="none" />
        <Path d={`M11 19 Q${7 + ear} 17 10 22`} stroke={t.elfInk} strokeWidth={1.4} fill="none" strokeLinecap="round" />
        <Path d={`M29 19 Q${33 - ear} 17 30 22`} stroke={t.elfInk} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      </Svg>
      <View style={[s.badge, { backgroundColor: t.surface }]}>
        <Text style={[s.badgeText, { color: t.textSubtle }]}>elf</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  badge: { position: 'absolute', bottom: -4, right: -4, paddingHorizontal: 4, paddingVertical: 1, borderRadius: 4 },
  badgeText: { fontSize: 8, fontFamily: 'monospace' },
});
