import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, useLang, useApp } from '../context/AppContext';
import { IEElfBanner, IEStatusPill, IEImage } from '../components';
import { items, categoryById } from '../data/mock';
import { statusOfItem, daysLeft } from '../utils/date';

interface Props { onOpenItem: (id: string) => void }

export function ExpiringScreen({ onOpenItem }: Props) {
  const t = useTheme();
  const lang = useLang();
  const { state } = useApp();
  const variant = state.expiringVariant;

  const alertItems = items
    .filter(i => ['expiring', 'expired'].includes(statusOfItem(i)))
    .sort((a, b) => new Date(a.expireAt!).getTime() - new Date(b.expireAt!).getTime());
  const expired = alertItems.filter(i => (daysLeft(i.expireAt) ?? 0) < 0);
  const soon    = alertItems.filter(i => (daysLeft(i.expireAt) ?? 0) >= 0);

  const T = lang === 'en'
    ? { expired: 'Expired', expiring: 'Expiring soon', overdue: 'overdue', days: 'days' }
    : { expired: '已過期', expiring: '快到期', overdue: '天前過期', days: '天' };

  if (variant === 'badge') {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={s.pad}>
        <IEElfBanner>
          <Text style={{ fontSize: 13, lineHeight: 20, color: t.text }}>
            {lang === 'en'
              ? <Text>Hi! <Text style={{ fontWeight: '700' }}>{expired.length}</Text> expired · <Text style={{ fontWeight: '700' }}>{soon.length}</Text> expiring soon.</Text>
              : <Text>嗨！有 <Text style={{ fontWeight: '700' }}>{expired.length}</Text> 件過期、<Text style={{ fontWeight: '700' }}>{soon.length}</Text> 件快到期。</Text>
            }
          </Text>
        </IEElfBanner>
        <View style={[s.badgeGrid, { marginTop: 12 }]}>
          {alertItems.map(item => {
            const d = daysLeft(item.expireAt) ?? 0;
            const st = statusOfItem(item);
            const cat = categoryById(item.category);
            return (
              <TouchableOpacity key={item.id} onPress={() => onOpenItem(item.id)}
                style={[s.badgeCard, { backgroundColor: t.surface, borderColor: t.border }]}>
                <View style={[s.badgeBadge, { backgroundColor: d < 0 ? t.danger : t.warning }]}>
                  <Text style={s.badgeBadgeText}>{d < 0 ? `+${-d}d` : `${d}d`}</Text>
                </View>
                <IEImage label={cat?.icon} height={72} radius={10} />
                <Text style={[s.badgeName, { color: t.text }]} numberOfLines={1}>
                  {lang === 'en' ? item.nameEn : item.name}
                </Text>
                <Text style={[s.badgeLoc, { color: t.textMuted }]} numberOfLines={1}>
                  {lang === 'en' ? item.locationEn : item.location}
                </Text>
                <View style={{ marginTop: 6 }}><IEStatusPill status={st} size="sm" /></View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  // Timeline variant
  const sections = [
    { key: 'expired', label: T.expired, list: expired, color: t.danger },
    { key: 'soon',    label: T.expiring, list: soon,    color: t.warning },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={s.pad}>
      <IEElfBanner>
        <Text style={{ fontSize: 13, lineHeight: 20, color: t.text }}>
          {lang === 'en'
            ? <Text>Keep an eye on these <Text style={{ fontWeight: '700' }}>{alertItems.length}</Text> items today.</Text>
            : <Text>今天請幫我留意這 <Text style={{ fontWeight: '700' }}>{alertItems.length}</Text> 樣物品喔！</Text>
          }
        </Text>
      </IEElfBanner>

      {sections.map(({ key, label, list, color }) =>
        list.length > 0 && (
          <View key={key} style={{ marginTop: 20 }}>
            <View style={s.sectionHeader}>
              <View style={[s.dot, { backgroundColor: color }]} />
              <Text style={[s.sectionTitle, { color: t.text }]}>{label}</Text>
              <Text style={[s.sectionCount, { color: t.textMuted }]}>{list.length}</Text>
            </View>
            <View style={[s.timeline, { paddingLeft: 18 }]}>
              <View style={[s.timelineLine, { backgroundColor: t.border }]} />
              {list.map(item => {
                const d = daysLeft(item.expireAt) ?? 0;
                const cat = categoryById(item.category);
                return (
                  <TouchableOpacity key={item.id} onPress={() => onOpenItem(item.id)}
                    style={[s.timelineCard, { backgroundColor: t.surface, borderColor: t.border }]}>
                    <View style={[s.timelineDot, { backgroundColor: color, borderColor: t.bg }]} />
                    <IEImage label={cat?.icon} height={44} radius={10} style={{ width: 44 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={[s.tlName, { color: t.text }]} numberOfLines={1}>
                        {lang === 'en' ? item.nameEn : item.name}
                      </Text>
                      <Text style={[s.tlLoc, { color: t.textMuted }]} numberOfLines={1}>
                        {lang === 'en' ? item.locationEn : item.location}・{item.expireAt}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 16, fontWeight: '800', color, fontFamily: 'monospace' }}>
                        {d < 0 ? `+${-d}` : d}
                      </Text>
                      <Text style={{ fontSize: 10, color: t.textMuted }}>
                        {d < 0 ? T.overdue : T.days}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  pad:            { padding: 16, paddingBottom: 40 },
  badgeGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badgeCard:      { width: '47%', padding: 12, borderRadius: 14, borderWidth: 1, position: 'relative' },
  badgeBadge:     { position: 'absolute', top: -6, right: -6, minWidth: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, zIndex: 1 },
  badgeBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700', fontFamily: 'monospace' },
  badgeName:      { fontSize: 13, fontWeight: '700', marginTop: 8 },
  badgeLoc:       { fontSize: 11 },
  sectionHeader:  { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  dot:            { width: 8, height: 8, borderRadius: 4 },
  sectionTitle:   { fontSize: 13, fontWeight: '700' },
  sectionCount:   { fontSize: 11 },
  timeline:       { position: 'relative' },
  timelineLine:   { position: 'absolute', left: 3, top: 6, bottom: 6, width: 2 },
  timelineCard:   { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, marginBottom: 8, borderRadius: 14, borderWidth: 1, position: 'relative' },
  timelineDot:    { position: 'absolute', left: -19, width: 8, height: 8, borderRadius: 4, borderWidth: 2 },
  tlName:         { fontSize: 14, fontWeight: '700' },
  tlLoc:          { fontSize: 11 },
});
