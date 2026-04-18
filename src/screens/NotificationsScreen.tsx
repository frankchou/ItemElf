import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, useLang } from '../context/AppContext';
import { IEElf } from '../components';
import { notifications, userById } from '../data/mock';

const TODAY = '2026-04-18';
const YESTERDAY = '2026-04-17';

interface Props { onOpenItem: (id: string) => void }

export function NotificationsScreen({ onOpenItem }: Props) {
  const t = useTheme();
  const lang = useLang();

  function dayLabel(date: string): string {
    if (date === TODAY) return lang === 'en' ? 'Today' : '今天';
    if (date === YESTERDAY) return lang === 'en' ? 'Yesterday' : '昨天';
    return date;
  }

  // Group notifications by date
  const grouped = notifications.reduce<Record<string, typeof notifications>>((acc, n) => {
    const key = n.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(n);
    return acc;
  }, {});

  const groups = Object.keys(grouped)
    .sort((a, b) => b.localeCompare(a))
    .map(date => ({ label: dayLabel(date), entries: grouped[date] }));

  function actorInfo(id: string) {
    if (id === 'elf' || id === 'system') return { name: 'ItemElf', color: t.primary, isElf: true };
    const u = userById(id);
    return { name: u.name || '—', color: u.avatar || '#ccc', isElf: false };
  }

  if (groups.length === 0) {
    return (
      <View style={[s.empty, { backgroundColor: t.bg }]}>
        <IEElf size={72} mood="sleepy" />
        <Text style={[s.emptyTitle, { color: t.text }]}>
          {lang === 'en' ? 'No notifications yet' : '目前沒有通知'}
        </Text>
        <Text style={[s.emptyBody, { color: t.textMuted }]}>
          {lang === 'en'
            ? "When items expire or family members make changes, you'll see updates here."
            : '當物品快到期或家族成員有異動時，通知會顯示在這裡。'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={s.content}>
      {groups.map(g => (
        <View key={g.label} style={s.group}>
          <Text style={[s.groupLabel, { color: t.textMuted }]}>{g.label}</Text>
          <View style={{ gap: 10 }}>
            {g.entries.map(n => {
              const a = actorInfo(n.actorId);
              return (
                <TouchableOpacity
                  key={n.id}
                  onPress={() => n.itemId && onOpenItem(n.itemId)}
                  disabled={!n.itemId}
                  activeOpacity={0.8}
                  style={s.entry}
                >
                  {a.isElf
                    ? <IEElf size={32} />
                    : (
                      <View style={[s.avatar, { backgroundColor: a.color }]}>
                        <Text style={s.avatarText}>{a.name[0]}</Text>
                      </View>
                    )
                  }
                  <View style={{ flex: 1 }}>
                    <View style={s.metaRow}>
                      <Text style={[s.actorName, { color: t.textMuted }]}>{a.name}</Text>
                      <Text style={[s.time, { color: t.textMuted }]}>{n.time}</Text>
                    </View>
                    <View style={[
                      s.bubble,
                      { backgroundColor: a.isElf ? t.primarySoft : t.surface, borderColor: a.isElf ? 'transparent' : t.border, borderWidth: a.isElf ? 0 : 1 },
                    ]}>
                      <Text style={[s.bubbleText, { color: t.text }]}>
                        {lang === 'en' ? n.textEn : n.text}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content:    { padding: 16, paddingBottom: 40 },
  group:      { marginBottom: 16 },
  groupLabel: { textAlign: 'center', fontSize: 11, fontWeight: '600', marginVertical: 12 },
  entry:      { flexDirection: 'row', gap: 10, alignItems: 'flex-end' },
  avatar:     { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  avatarText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  metaRow:    { flexDirection: 'row', gap: 6, marginBottom: 3 },
  actorName:  { fontSize: 11, fontWeight: '600' },
  time:       { fontSize: 11 },
  bubble:     { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 16, borderTopLeftRadius: 4, alignSelf: 'flex-start', maxWidth: '85%' },
  bubbleText: { fontSize: 13, lineHeight: 20 },
  empty:      { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12 },
  emptyTitle: { fontSize: 17, fontWeight: '700', textAlign: 'center' },
  emptyBody:  { fontSize: 14, lineHeight: 22, textAlign: 'center' },
});
