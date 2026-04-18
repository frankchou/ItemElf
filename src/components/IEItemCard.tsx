import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, useLang } from '../context/AppContext';
import { Item } from '../data/types';
import { categoryById } from '../data/mock';
import { statusOfItem, daysLeft } from '../utils/date';
import { IEImage } from './IEImage';
import { IEStatusPill } from './IEStatusPill';

interface Props { item: Item; onPress?: () => void }

export function IEItemCard({ item, onPress }: Props) {
  const t = useTheme();
  const lang = useLang();
  const st = statusOfItem(item);
  const cat = categoryById(item.category);
  const days = daysLeft(item.expireAt);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}
      style={[s.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <IEImage label={cat?.icon ?? '📦'} height={88} radius={10} />
      <Text style={[s.name, { color: t.text }]} numberOfLines={1}>
        {lang === 'en' ? (item.nameEn || item.name) : item.name}
      </Text>
      <Text style={[s.loc, { color: t.textMuted }]} numberOfLines={1}>
        {lang === 'en' ? (item.locationEn || item.location) : item.location}
      </Text>
      <View style={s.footer}>
        <IEStatusPill status={st} size="sm" />
        {days !== null && st !== 'expired' && (
          <Text style={[s.days, { color: t.textMuted }]}>
            {days >= 0 ? `D-${days}` : `D+${-days}`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card:   { padding: 10, borderRadius: 14, borderWidth: 1, gap: 8 },
  name:   { fontWeight: '700', fontSize: 13 },
  loc:    { fontSize: 11 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  days:   { fontSize: 10, fontFamily: 'monospace' },
});
