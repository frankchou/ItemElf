import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/AppContext';
import { ThemeTokens } from '../theme/tokens';

type Variant = 'primary' | 'ghost' | 'soft' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  full?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

function getVariantColors(t: ThemeTokens, v: Variant) {
  switch (v) {
    case 'primary': return { bg: t.primary, ink: t.primaryInk, border: t.primary };
    case 'ghost':   return { bg: 'transparent', ink: t.text, border: t.border };
    case 'soft':    return { bg: t.surface2, ink: t.text, border: 'transparent' };
    case 'danger':  return { bg: t.danger, ink: '#fff', border: 'transparent' };
  }
}

const SIZE = {
  sm: { paddingVertical: 8,  paddingHorizontal: 14, fontSize: 13, height: 36 },
  md: { paddingVertical: 11, paddingHorizontal: 18, fontSize: 15, height: 46 },
  lg: { paddingVertical: 14, paddingHorizontal: 22, fontSize: 16, height: 52 },
};

export function IEButton({ children, variant = 'primary', size = 'md', full, onPress, icon, disabled, style }: Props) {
  const t = useTheme();
  const vc = getVariantColors(t, variant);
  const sz = SIZE[size];
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      style={[
        s.btn,
        {
          backgroundColor: vc.bg,
          borderColor: vc.border,
          height: sz.height,
          paddingHorizontal: sz.paddingHorizontal,
          opacity: disabled ? 0.5 : 1,
          width: full ? '100%' : undefined,
        },
        style,
      ]}
    >
      {icon}
      <Text style={[s.label, { color: vc.ink, fontSize: sz.fontSize }]}>{children}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderRadius: 999, borderWidth: 1, gap: 8,
  },
  label: { fontWeight: '600' },
});
