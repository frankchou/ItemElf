import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch,
} from 'react-native';
import { useTheme, useLang, useApp } from '../context/AppContext';
import { IEButton, IECard, IEIcon } from '../components';

interface Props { onLogout: () => void }

export function SettingsScreen({ onLogout }: Props) {
  const t = useTheme();
  const lang = useLang();
  const { state, set } = useApp();
  const [notifOn, setNotifOn] = useState(true);
  const [bioOn, setBioOn] = useState(true);

  const T = lang === 'en' ? {
    profile: 'Profile', edit: 'Edit',
    prefs: 'Preferences', notif: 'Notifications', expireDays: 'Expiry alert', daysAhead: 'days ahead',
    language: 'Language', theme: 'Theme',
    security: 'Security', biometric: 'Biometric unlock', changePassword: 'Change password',
    about: 'About', version: 'Version', privacy: 'Privacy policy',
    logout: 'Sign out',
  } : {
    profile: '個人資料', edit: '編輯',
    prefs: '偏好設定', notif: '通知', expireDays: '到期提醒', daysAhead: '天前通知',
    language: '語言', theme: '主題',
    security: '安全', biometric: '生物辨識登入', changePassword: '變更密碼',
    about: '關於', version: '版本', privacy: '隱私權政策',
    logout: '登出',
  };

  const themeIcons: [typeof state.theme, string][] = [
    ['warm', '🔆'], ['playful', '🌸'], ['minimal', '⚪'], ['tech', '🌙'],
  ];

  function Row({ label, right, isLast }: { label: string; right: React.ReactNode; isLast?: boolean }) {
    return (
      <View style={[s.row, { borderBottomWidth: isLast ? 0 : 1, borderBottomColor: t.border }]}>
        <Text style={[s.rowLabel, { color: t.text }]}>{label}</Text>
        {right}
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={s.content}>
      {/* Profile */}
      <IECard padding={16} style={s.profileCard}>
        <View style={s.profileRow}>
          <View style={[s.profileAvatar, { backgroundColor: state.currentUser?.avatar ?? t.primary }]}>
            <Text style={s.profileInitial}>{(state.currentUser?.name ?? '?')[0]}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[s.profileName, { color: t.text }]}>{state.currentUser?.name ?? '—'}</Text>
            <Text style={[s.profileEmail, { color: t.textMuted }]}>{state.currentUser?.email ?? '—'}</Text>
          </View>
          <IEButton variant="soft" size="sm">{T.edit}</IEButton>
        </View>
      </IECard>

      <Text style={[s.sectionLabel, { color: t.textMuted }]}>{T.prefs}</Text>
      <IECard padding={0} style={s.cardGroup}>
        <Row label={T.notif}
          right={<Switch value={notifOn} onValueChange={setNotifOn} trackColor={{ true: t.primary }} />}
        />
        <Row label={T.expireDays}
          right={
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ color: t.textMuted, fontSize: 14 }}>7 {T.daysAhead}</Text>
              <IEIcon name="forward" size={14} color={t.textSubtle} />
            </View>
          }
        />
        <Row label={T.language}
          right={
            <View style={[s.toggle, { backgroundColor: t.surface2 }]}>
              {(['zh', 'en'] as const).map(l => (
                <TouchableOpacity key={l} onPress={() => set({ lang: l })}
                  style={[s.toggleBtn, { backgroundColor: state.lang === l ? t.surface : 'transparent' }]}>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: t.text }}>{l === 'zh' ? '中' : 'EN'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          }
        />
        <Row label={T.theme} isLast
          right={
            <View style={s.themeRow}>
              {themeIcons.map(([v, icon]) => (
                <TouchableOpacity key={v} onPress={() => set({ theme: v })}
                  style={[s.themeBtn, { borderColor: state.theme === v ? t.primary : t.border, backgroundColor: state.theme === v ? t.primarySoft : t.surface }]}>
                  <Text style={{ fontSize: 13 }}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
          }
        />
      </IECard>

      <Text style={[s.sectionLabel, { color: t.textMuted }]}>{T.security}</Text>
      <IECard padding={0} style={s.cardGroup}>
        <Row label={T.biometric}
          right={<Switch value={bioOn} onValueChange={setBioOn} trackColor={{ true: t.primary }} />}
        />
        <Row label={T.changePassword} isLast
          right={<IEIcon name="forward" size={14} color={t.textSubtle} />}
        />
      </IECard>

      <Text style={[s.sectionLabel, { color: t.textMuted }]}>{T.about}</Text>
      <IECard padding={0} style={s.cardGroup}>
        <Row label={T.version}
          right={<Text style={{ color: t.textMuted, fontSize: 12, fontFamily: 'monospace' }}>1.0.0</Text>}
        />
        <Row label={T.privacy} isLast
          right={<IEIcon name="forward" size={14} color={t.textSubtle} />}
        />
      </IECard>

      <IEButton variant="ghost" full size="md" onPress={onLogout}>{T.logout}</IEButton>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content:        { padding: 16, paddingBottom: 60, gap: 8 },
  profileCard:    { marginBottom: 8 },
  profileRow:     { flexDirection: 'row', alignItems: 'center', gap: 14 },
  profileAvatar:  { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  profileInitial: { color: '#fff', fontSize: 22, fontWeight: '700' },
  profileName:    { fontSize: 16, fontWeight: '700' },
  profileEmail:   { fontSize: 12 },
  sectionLabel:   { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 8, marginLeft: 4 },
  cardGroup:      { marginBottom: 8 },
  row:            { flexDirection: 'row', alignItems: 'center', padding: 14, paddingHorizontal: 16 },
  rowLabel:       { flex: 1, fontSize: 14 },
  toggle:         { flexDirection: 'row', padding: 3, borderRadius: 999 },
  toggleBtn:      { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 },
  themeRow:       { flexDirection: 'row', gap: 4 },
  themeBtn:       { width: 28, height: 28, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
