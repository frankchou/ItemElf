import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList,
} from 'react-native';
import { useTheme, useLang, useApp } from '../context/AppContext';
import {
  IEElfBanner, IEInput, IEItemRow, IEItemCard, IEElf, IEIcon, IEButton,
} from '../components';
import { items, categories } from '../data/mock';
import { statusOfItem } from '../utils/date';

interface Props { onOpenItem: (id: string) => void }

const ALL_CATS = [{ id: 'all', zh: '全部', en: 'All', icon: '✦' }, ...categories];

export function SearchScreen({ onOpenItem }: Props) {
  const t = useTheme();
  const lang = useLang();
  const { state, set } = useApp();
  const [q, setQ] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const scoped = state.view === 'personal' ? items.filter(i => i.scope === 'personal') : items;
  const filtered = scoped.filter(i => {
    const matchCat = activeCat === 'all' || i.category === activeCat;
    const s = q.toLowerCase();
    const matchQ = !s
      || i.name.toLowerCase().includes(s)
      || (i.nameEn ?? '').toLowerCase().includes(s)
      || i.location.toLowerCase().includes(s);
    return matchCat && matchQ;
  });
  const alertCount = scoped.filter(i => ['expiring', 'expired'].includes(statusOfItem(i))).length;

  const placeholder = lang === 'en' ? 'Search items, locations…' : '搜尋物品、位置⋯';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={s.content}>
      {/* Elf banner */}
      <View style={s.section}>
        <IEElfBanner
          action={
            <TouchableOpacity>
              <Text style={{ color: t.primary, fontSize: 13, fontWeight: '600' }}>
                {lang === 'en' ? 'View' : '查看'}
              </Text>
            </TouchableOpacity>
          }
        >
          <Text style={{ fontSize: 13, lineHeight: 20, color: t.text }}>
            {lang === 'en'
              ? <Text>You have <Text style={{ fontWeight: '700' }}>{alertCount}</Text> item(s) needing attention.</Text>
              : <Text>今天有 <Text style={{ fontWeight: '700' }}>{alertCount}</Text> 樣物品需要注意喔。</Text>
            }
          </Text>
        </IEElfBanner>
      </View>

      {/* Search */}
      <View style={s.section}>
        <IEInput
          placeholder={placeholder}
          value={q}
          onChangeText={setQ}
          icon={<IEIcon name="search" size={18} color={t.textMuted} />}
        />
      </View>

      {/* Category chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.chips} contentContainerStyle={s.chipsContent}>
        {ALL_CATS.map(c => {
          const active = activeCat === c.id;
          return (
            <TouchableOpacity
              key={c.id}
              onPress={() => setActiveCat(c.id)}
              style={[s.chip, { backgroundColor: active ? t.primary : t.surface, borderColor: active ? t.primary : t.border }]}
            >
              <Text>{c.icon}</Text>
              <Text style={{ fontSize: 13, fontWeight: '600', color: active ? t.primaryInk : t.text }}>
                {lang === 'en' ? c.en ?? c.zh : c.zh}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Count + view toggle */}
      <View style={[s.section, s.row]}>
        <Text style={{ fontSize: 13, color: t.textMuted, fontWeight: '600' }}>
          {filtered.length} {lang === 'en' ? 'items' : '件物品'}
        </Text>
        <View style={[s.toggle, { backgroundColor: t.surface2 }]}>
          {(['list', 'card'] as const).map(v => (
            <TouchableOpacity
              key={v}
              onPress={() => set({ searchVariant: v })}
              style={[s.toggleBtn, { backgroundColor: state.searchVariant === v ? t.surface : 'transparent' }]}
            >
              <Text style={{ fontSize: 11, fontWeight: '600', color: t.text }}>
                {v === 'list' ? (lang === 'en' ? 'List' : '列表') : (lang === 'en' ? 'Card' : '卡片')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Results */}
      <View style={s.section}>
        {state.searchVariant === 'list' ? (
          <View style={{ gap: 8 }}>
            {filtered.map(i => <IEItemRow key={i.id} item={i} onPress={() => onOpenItem(i.id)} />)}
          </View>
        ) : (
          <View style={s.grid}>
            {filtered.map(i => <IEItemCard key={i.id} item={i} onPress={() => onOpenItem(i.id)} />)}
          </View>
        )}
        {filtered.length === 0 && (
          <View style={s.empty}>
            <IEElf size={72} mood="sleepy" />
            <Text style={{ marginTop: 10, fontSize: 14, color: t.textMuted }}>
              {lang === 'en' ? 'No matches' : '沒有相符結果'}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content:      { gap: 14, paddingBottom: 40 },
  section:      { paddingHorizontal: 16 },
  chips:        { marginHorizontal: 0 },
  chipsContent: { paddingHorizontal: 16, gap: 8 },
  chip:         { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1 },
  row:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggle:       { flexDirection: 'row', padding: 3, borderRadius: 999 },
  toggleBtn:    { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 999 },
  grid:         { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  empty:        { alignItems: 'center', paddingVertical: 40 },
});
