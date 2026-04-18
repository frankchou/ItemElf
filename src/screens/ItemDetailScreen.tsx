import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useTheme, useLang } from '../context/AppContext';
import {
  IEImage, IEStatusPill, IETag, IECard, IEButton, IEIcon,
} from '../components';
import { itemById, categoryById, userById, me } from '../data/mock';
import { statusOfItem, daysLeft } from '../utils/date';
import { getStatusColor } from '../theme/tokens';

const ORDER = ['new', 'active', 'expiring', 'expired', 'finished', 'discarded'] as const;

interface Props { itemId: string; onBack: () => void; onEdit?: () => void }

export function ItemDetailScreen({ itemId, onBack, onEdit }: Props) {
  const t = useTheme();
  const lang = useLang();
  const item = itemById(itemId) ?? itemById('i01')!;
  const st = statusOfItem(item);
  const editor = userById(item.editorId);
  const creator = userById(item.creatorId);
  const cat = categoryById(item.category);
  const days = daysLeft(item.expireAt);
  const currentIdx = ORDER.indexOf(st as typeof ORDER[number]);

  const lifecycle = [
    { s: 'new',       label: lang === 'en' ? 'Added'     : '新增',   time: item.purchasedAt ?? item.updatedAt.slice(0, 10) },
    { s: 'active',    label: lang === 'en' ? 'Active'    : '使用中', time: item.purchasedAt },
    { s: 'expiring',  label: lang === 'en' ? 'Expiring'  : '快到期', time: item.expireAt },
    { s: 'expired',   label: lang === 'en' ? 'Expired'   : '過期',   time: item.expireAt },
    { s: 'finished',  label: lang === 'en' ? 'Finished'  : '用完',   time: null },
    { s: 'discarded', label: lang === 'en' ? 'Discarded' : '丟棄',   time: null },
  ];

  const infoRows = [
    [lang === 'en' ? 'Purchased' : '購買日',     item.purchasedAt ?? '—'],
    [lang === 'en' ? 'Expires'   : '有效期限',
      item.expireAt
        ? `${item.expireAt} (${days !== null ? (days >= 0 ? 'D-' + days : 'D+' + (-days)) : ''})`
        : (lang === 'en' ? 'No expiry' : '無期限')],
    [lang === 'en' ? 'Creator'    : '新增者',
      creator.name + (item.creatorId === me.id ? (lang === 'en' ? ' (me)' : '（我）') : '')],
    [lang === 'en' ? 'Last edited' : '最後編輯',
      editor.name + '・' + item.updatedAt.replace('T', ' ')],
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Hero */}
      <View style={s.hero}>
        <IEImage label={(cat?.icon ?? '📦') + ' · hero photo'} height={240} radius={0} />
        <TouchableOpacity onPress={onBack} style={[s.heroBtn, s.heroLeft, { backgroundColor: t.surface, borderColor: t.border }]}>
          <IEIcon name="back" size={18} color={t.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={[s.heroBtn, s.heroRight, { backgroundColor: t.surface, borderColor: t.border }]}>
          <IEIcon name="edit" size={14} color={t.text} />
          <Text style={{ fontSize: 13, fontWeight: '600', color: t.text }}>{lang === 'en' ? 'Edit' : '編輯'}</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={s.titleBlock}>
        <View style={s.tagsRow}>
          <IEStatusPill status={st} />
          <IETag tone="primary">{lang === 'en' ? cat?.en : cat?.zh}</IETag>
          <IETag>{item.scope === 'personal' ? (lang === 'en' ? 'Personal' : '個人') : (lang === 'en' ? 'Family' : '家庭')}</IETag>
        </View>
        <Text style={[s.title, { color: t.text }]}>
          {lang === 'en' ? (item.nameEn || item.name) : item.name}
        </Text>
        <View style={s.locRow}>
          <IEIcon name="pin" size={14} color={t.textMuted} />
          <Text style={[s.loc, { color: t.textMuted }]}>
            {lang === 'en' ? (item.locationEn || item.location) : item.location}
          </Text>
        </View>
      </View>

      {/* Location photo */}
      <View style={s.pad}>
        <Text style={[s.sectionLabel, { color: t.textMuted }]}>{lang === 'en' ? 'LOCATION PHOTO' : '放置位置'}</Text>
        <IEImage label={lang === 'en' ? 'where it lives' : '實地拍照'} height={140} />
      </View>

      {/* Lifecycle */}
      <View style={s.pad}>
        <Text style={[s.sectionLabel, { color: t.textMuted }]}>{lang === 'en' ? 'LIFECYCLE' : '生命週期'}</Text>
        <IECard padding={14}>
          {lifecycle.map((l, i) => {
            const passed = ORDER.indexOf(l.s as typeof ORDER[number]) <= currentIdx;
            const isCurrent = l.s === st;
            const sc = getStatusColor(t, l.s as any);
            return (
              <View key={l.s} style={s.lcRow}>
                <View style={s.lcLeft}>
                  <View style={[s.lcDot, {
                    backgroundColor: passed ? sc.bg : t.surface2,
                    borderColor: isCurrent ? sc.ink : t.border,
                  }]} />
                  {i < lifecycle.length - 1 && (
                    <View style={[s.lcLine, { backgroundColor: passed ? sc.bg : t.border }]} />
                  )}
                </View>
                <View style={s.lcBody}>
                  <Text style={{ fontSize: 14, fontWeight: isCurrent ? '700' : '500', color: passed ? t.text : t.textSubtle }}>
                    {l.label}
                    {isCurrent && <Text style={{ color: sc.ink, fontSize: 11 }}> ● {lang === 'en' ? 'current' : '目前'}</Text>}
                  </Text>
                  {l.time && passed && (
                    <Text style={{ fontSize: 11, color: t.textMuted, fontFamily: 'monospace' }}>{l.time}</Text>
                  )}
                </View>
              </View>
            );
          })}
        </IECard>
      </View>

      {/* Meta info */}
      <View style={s.pad}>
        <Text style={[s.sectionLabel, { color: t.textMuted }]}>{lang === 'en' ? 'INFO' : '詳細資訊'}</Text>
        <IECard padding={0}>
          {infoRows.map(([k, v], i) => (
            <View key={String(k)} style={[s.infoRow, { borderBottomWidth: i < infoRows.length - 1 ? 1 : 0, borderBottomColor: t.border }]}>
              <Text style={[s.infoKey, { color: t.textMuted }]}>{k}</Text>
              <Text style={[s.infoVal, { color: t.text }]} numberOfLines={2}>{v}</Text>
            </View>
          ))}
        </IECard>
      </View>

      {/* Note */}
      {item.note && (
        <View style={s.pad}>
          <IECard padding={14} style={{ backgroundColor: t.primarySoft, borderColor: 'transparent' }}>
            <Text style={{ fontSize: 12, color: t.primary, fontWeight: '700', marginBottom: 4 }}>
              {lang === 'en' ? 'NOTE' : '備註'}
            </Text>
            <Text style={{ fontSize: 13, color: t.text, lineHeight: 20 }}>{item.note}</Text>
          </IECard>
        </View>
      )}

      {/* Actions */}
      <View style={[s.pad, s.actions]}>
        <IEButton variant="soft" style={{ flex: 1 }}>
          {lang === 'en' ? 'Mark finished' : '標為使用完畢'}
        </IEButton>
        <IEButton variant="soft" style={{ flex: 1 }}>
          {lang === 'en' ? 'Discard' : '丟棄'}
        </IEButton>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero:         { height: 240, position: 'relative' },
  heroBtn:      { position: 'absolute', top: 14, width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6, paddingHorizontal: 6 },
  heroLeft:     { left: 14 },
  heroRight:    { right: 14, width: 'auto' as any },
  titleBlock:   { padding: 18, paddingBottom: 12 },
  tagsRow:      { flexDirection: 'row', gap: 6, marginBottom: 6, flexWrap: 'wrap' },
  title:        { fontSize: 24, fontWeight: '700' },
  locRow:       { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  loc:          { fontSize: 13 },
  pad:          { paddingHorizontal: 16, paddingBottom: 12 },
  sectionLabel: { fontSize: 12, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 },
  lcRow:        { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  lcLeft:       { alignItems: 'center', paddingTop: 2 },
  lcDot:        { width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
  lcLine:       { width: 2, flex: 1, minHeight: 24 },
  lcBody:       { flex: 1, paddingBottom: 14 },
  infoRow:      { flexDirection: 'row', justifyContent: 'space-between', gap: 12, padding: 14 },
  infoKey:      { fontSize: 13 },
  infoVal:      { fontSize: 13, fontWeight: '500', flex: 1, textAlign: 'right' },
  actions:      { flexDirection: 'row', gap: 8, paddingTop: 4 },
});
