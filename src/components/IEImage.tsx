import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/AppContext';

interface Props {
  label?: string;
  width?: number | string;
  height?: number;
  radius?: number;
  style?: ViewStyle;
}

export function IEImage({ label = 'photo', height = 120, radius = 12, style }: Props) {
  const t = useTheme();
  return (
    <View style={[
      s.box,
      {
        height,
        borderRadius: radius,
        backgroundColor: t.surface2,
        borderColor: t.border,
      },
      style,
    ]}>
      <Text style={[s.label, { color: t.textSubtle }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  box: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  label: { fontSize: 11, fontFamily: 'monospace' },
});
