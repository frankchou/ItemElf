import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, KeyboardTypeOptions } from 'react-native';
import { useTheme } from '../context/AppContext';

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (v: string) => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export function IEInput({
  placeholder, value, onChangeText, icon, style,
  secureTextEntry, keyboardType, editable = true, multiline, numberOfLines, autoCapitalize,
}: Props) {
  const t = useTheme();
  return (
    <View style={[s.wrap, { backgroundColor: t.surface2, borderColor: t.border }, style]}>
      {icon}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={t.textSubtle}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        autoCapitalize={autoCapitalize ?? 'none'}
        style={[s.input, { color: t.text }]}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 12,
    borderRadius: 14, borderWidth: 1,
  },
  input: { flex: 1, fontSize: 15, padding: 0 },
});
