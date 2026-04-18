import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, useLang } from '../context/AppContext';
import { Item } from '../data/types';
import { categoryById, userById } from '../data/mock';
import { statusOfItem } from '../utils/date';
import { IEImage } from './IEImage';
import { IEStatusPill } from './IEStatusPill';
import { IETag } from './IETag';
import { IEIcon } from './IEIcon';

interface Props { item: Item; onPress?: () => void }

export function IEItemRow({ item, onPress }: Props) {
  const t = useTheme();
  const lang = useLang();
  const st = statusOfItem(item);
  const editor = userById(item.editorId);
  const cat = categoryById(item.category);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}
      style={[s.row, { backgroundColor: t.surface, borderColor: t.border }]}>
      <IEImage label={cat?.icon ?? '📦'} height={56} radius={10} style={s.thumb} />
      <View style={s.body}>
        <View style={s.nameRow}>
          <Text style={[s.name, { color: t.text }]} numberOfLines={1}>
            {lang === 'en' ? (item.nameEn || item.name) : item.name}
          </Text>
          {item.private && <IEIcon name="lock" size={12} color={t.textSubtle} />}
        </View>
        <View style={s.locRow}>
          <IEIcon name="pin" size={12} color={t.textMuted} />
          <Text style={[s.loc, { color: t.textMuted }]} numberOfLines={1}>
            {lang === 'en' ? (item.locationEn || item.location) : item.location}
          </Text>
        </View>
        <View style={s.metaRow}>
          <IEStatusPill status={st} size="sm" />
          <IETag>{lang === 'en' ? (cat?.en ?? cat?.zh) : cat?.zh}</IETag>
          <Text style={[s.editor, { color: t.textSubtle }]}>
            {editor.name.slice(0, 1)}・{item.updatedAt.slice(5, 10)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  row:     { flexDirection: 'row', gap: 12, alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 1 },
  thumb:   { width: 56, flexShrink: 0 },
  body:    { flex: 1, minWidth: 0 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  name:    { fontWeight: '600', fontSize: 15, flex: 1 },
  locRow:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  loc:     { fontSize: 12, flex: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  editor:  { fontSize: 10, marginLeft: 'auto' },
});
