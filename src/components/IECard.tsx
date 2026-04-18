import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../context/AppContext';

interface Props {
  children: React.ReactNode;
  padding?: number;
  style?: ViewStyle;
  interactive?: boolean;
  onPress?: () => void;
}

export function IECard({ children, padding = 16, style, interactive, onPress }: Props) {
  const t = useTheme();
  const base: ViewStyle = {
    backgroundColor: t.surface,
    borderWidth: 1,
    borderColor: t.border,
    borderRadius: t.radius,
    padding,
    shadowColor: t.isDark ? '#000' : '#462d19',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: t.isDark ? 0.4 : 0.05,
    shadowRadius: 2,
    elevation: 1,
  };
  if (interactive || onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[base, style]}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[base, style]}>{children}</View>;
}
