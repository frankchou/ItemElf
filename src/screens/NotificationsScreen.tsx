import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, useLang } from '../context/AppContext';
import { IEElf } from '../components';
import { users } from '../data/mock';

interface Props { onOpenItem: (id: string) => void }

export function NotificationsScreen({ onOpenItem }: Props) {
  const t = useTheme();
  const lang = useLang();

  const feed = lang === 'en' ? [
    { group: 'Today', entries: [
      { actor: 'elf', text: '🥛 Fresh Milk 1L will expire in 6 days. Shelf 2 in the fridge.', time: '08:12', itemId: 'i01' },
      { actor: 'u2',  text: 'Added Fresh Milk 1L to Fridge · Shelf 2', time: '08:10', itemId: 'i01' },
      { actor: 'elf', text: '🍞 White bread has expired — please check if you should discard it.', time: '09:00', itemId: 'i06' },
    ]},
    { group: 'Yesterday', entries: [
      { actor: 'u3',     text: 'Added Yogurt drink x4 to Fridge · Lower shelf', time: '19:30', itemId: 'i08' },
      { actor: 'system', text: '陳阿姨 requested to join your family', time: '14:02', itemId: undefined },
    ]},
  ] : [
    { group: '今天', entries: [
      { actor: 'elf', text: '🥛 鮮奶 1L 還有 6 天就到期了，在冰箱第二層。', time: '08:12', itemId: 'i01' },
      { actor: 'u2',  text: '新增了「鮮奶 1L」到 冰箱 第二層', time: '08:10', itemId: 'i01' },
      { actor: 'elf', text: '🍞 白吐司已過期，請確認是否丟棄。', time: '09:00', itemId: 'i06' },
    ]},
    { group: '昨天', entries: [
      { actor: 'u3',     text: '新增了「優酪乳 四入」到 冰箱 下層', time: '19:30', itemId: 'i08' },
      { actor: 'system', text: '陳阿姨 申請加入家族', time: '14:02', itemId: undefined },
    ]},
  ];

  function actorInfo(id: string) {
    if (id === 'elf') return { name: 'ItemElf', color: t.primary };
    if (id === 'system') return { name: lang === 'en' ? 'System' : '系統', color: t.textMuted };
    const u = users.find(u => u.id === id);
    return u ? { name: u.name, color: u.avatar } : { name: '—', color: '#ccc' };
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={s.content}>
      {feed.map(g => (
        <View key={g.group} style={s.group}>
          <Text style={[s.groupLabel, { color: t.textMuted }]}>{g.group}</Text>
          <View style={{ gap: 10 }}>
            {g.entries.map((e, i) => {
              const a = actorInfo(e.actor);
              const isElf = e.actor === 'elf';
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => e.itemId && onOpenItem(e.itemId)}
                  disabled={!e.itemId}
                  activeOpacity={0.8}
                  style={s.entry}
                >
                  {isElf
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
                      <Text style={[s.time, { color: t.textMuted }]}>{e.time}</Text>
                    </View>
                    <View style={[
                      s.bubble,
                      { backgroundColor: isElf ? t.primarySoft : t.surface, borderColor: isElf ? 'transparent' : t.border, borderWidth: isElf ? 0 : 1 },
                    ]}>
                      <Text style={[s.bubbleText, { color: t.text }]}>{e.text}</Text>
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
});
