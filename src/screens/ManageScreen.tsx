import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useTheme, useLang } from '../context/AppContext';
import { IEElf, IEButton, IECard, IEItemRow, IEIcon } from '../components';
import { items, categories, categoryById } from '../data/mock';

interface Props { onOpenItem: (id: string) => void; onAdd: () => void }

type Tab = 'family' | 'personal' | 'custom';

export function ManageScreen({ onOpenItem, onAdd }: Props) {
  const t = useTheme();
  const lang = useLang();
  const [tab, setTab] = useState<Tab>('family');

  const T = lang === 'en'
    ? { family: 'Family', personal: 'Personal', custom: 'Custom', addCat: 'New category', items: 'items' }
    : { family: '家庭', personal: '個人', custom: '自訂分類', addCat: '新增分類', items: '件' };

  const tabs = [
    { id: 'family'   as Tab, label: T.family,   count: items.filter(i => i.scope === 'family').length },
    { id: 'personal' as Tab, label: T.personal,  count: items.filter(i => i.scope === 'personal').length },
    { id: 'custom'   as Tab, label: T.custom,    count: 0 },
  ];

  const scopeItems = tab === 'custom' ? [] : items.filter(i => i.scope === tab);
  const grouped = scopeItems.reduce<Record<string, typeof items>>((acc, i) => {
    if (!acc[i.category]) acc[i.category] = [];
    acc[i.category].push(i);
    return acc;
  }, {});

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={s.content}>
        {/* Tabs */}
        <View style={s.tabs}>
          {tabs.map(x => (
            <TouchableOpacity key={x.id} onPress={() => setTab(x.id)}
              style={[s.tabBtn, { backgroundColor: tab === x.id ? t.primary : t.surface, borderColor: tab === x.id ? t.primary : t.border }]}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: tab === x.id ? t.primaryInk : t.text }}>{x.label}</Text>
              <Text style={{ fontSize: 11, opacity: 0.8, color: tab === x.id ? t.primaryInk : t.textMuted }}>{x.count} {T.items}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'custom' ? (
          <IECard padding={20} style={s.emptyCard}>
            <IEElf size={56} mood="sleepy" />
            <Text style={[s.emptyTitle, { color: t.text }]}>
              {lang === 'en' ? 'No custom categories yet' : '尚未建立自訂分類'}
            </Text>
            <Text style={[s.emptySub, { color: t.textMuted }]}>
              {lang === 'en' ? 'Organize items your way.' : '用你自己的方式管理物品'}
            </Text>
            <IEButton variant="primary" size="sm" icon={<IEIcon name="plus" size={14} color={t.primaryInk} />}>
              {T.addCat}
            </IEButton>
          </IECard>
        ) : (
          <View style={{ gap: 16 }}>
            {Object.entries(grouped).map(([catId, list]) => {
              const cat = categoryById(catId);
              return (
                <View key={catId}>
                  <View style={s.catHeader}>
                    <View style={[s.catIcon, { backgroundColor: t.surface2 }]}>
                      <Text style={{ fontSize: 16 }}>{cat?.icon}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[s.catName, { color: t.text }]}>{lang === 'en' ? cat?.en : cat?.zh}</Text>
                      <Text style={{ fontSize: 11, color: t.textMuted }}>{list.length} {T.items}</Text>
                    </View>
                    <TouchableOpacity><IEIcon name="forward" size={16} color={t.textSubtle} /></TouchableOpacity>
                  </View>
                  <View style={{ gap: 6 }}>
                    {list.slice(0, 3).map(i => <IEItemRow key={i.id} item={i} onPress={() => onOpenItem(i.id)} />)}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity onPress={onAdd}
        style={[s.fab, { backgroundColor: t.primary, shadowColor: t.primary }]}>
        <IEIcon name="plus" size={26} color={t.primaryInk} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  content:    { padding: 16, paddingBottom: 120, gap: 16 },
  tabs:       { flexDirection: 'row', gap: 8 },
  tabBtn:     { flex: 1, padding: 14, borderRadius: 14, borderWidth: 1, alignItems: 'center', gap: 2 },
  emptyCard:  { alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 14, fontWeight: '600', marginTop: 4 },
  emptySub:   { fontSize: 12, marginBottom: 6, textAlign: 'center' },
  catHeader:  { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4, paddingBottom: 8 },
  catIcon:    { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  catName:    { fontSize: 14, fontWeight: '700' },
  fab: {
    position: 'absolute', right: 20, bottom: 100,
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
  },
});
