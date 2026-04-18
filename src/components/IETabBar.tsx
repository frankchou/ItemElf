import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useLang } from '../context/AppContext';
import { IEIcon } from './IEIcon';

const TABS = [
  { key: 'index',    icon: 'search', zh: '搜尋', en: 'Search' },
  { key: 'family',   icon: 'users',  zh: '家族', en: 'Family' },
  { key: 'manage',   icon: 'box',    zh: '物品', en: 'Items' },
  { key: 'settings', icon: 'gear',   zh: '設定', en: 'Settings' },
] as const;

interface Props {
  state: { index: number; routes: { name: string }[] };
  navigation: { navigate: (name: string) => void };
}

export function IETabBar({ state, navigation }: Props) {
  const t = useTheme();
  const lang = useLang();
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index]?.name ?? 'index';

  return (
    <View style={[
      s.bar,
      {
        backgroundColor: t.surface + 'ee',
        borderTopColor: t.border,
        paddingBottom: insets.bottom + 8,
      },
    ]}>
      {TABS.map(tab => {
        const isActive = activeRoute === tab.key;
        const color = isActive ? t.tabActive : t.textSubtle;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => navigation.navigate(tab.key)}
            style={s.item}
            activeOpacity={0.7}
          >
            <IEIcon name={tab.icon} size={24} color={color} />
            <Text style={[s.label, { color, fontWeight: isActive ? '700' : '500' }]}>
              {lang === 'en' ? tab.en : tab.zh}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.04, shadowRadius: 8 },
      android: { elevation: 8 },
    }),
  },
  item:  { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 6 },
  label: { fontSize: 10.5 },
});
