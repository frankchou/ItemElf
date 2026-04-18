import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, useLang, useApp } from '../context/AppContext';
import { IEElf, IEButton, IECard, IETag, IEIcon } from '../components';
import { users, me, family } from '../data/mock';

interface Props { onInvite: () => void; onApprove?: () => void }

const PENDING = [{ name: '陳阿姨', email: 'auntie@family.tw', time: '2 小時前' }];

export function FamilyScreen({ onInvite, onApprove }: Props) {
  const t = useTheme();
  const lang = useLang();
  const { state } = useApp();
  const isOwner = state.role === 'owner';

  const T = lang === 'en' ? {
    members: 'Members', pending: 'Pending approval', invite: 'Invite', shareLink: 'Share link',
    approve: 'Approve', reject: 'Reject', roleOwner: 'Owner', roleMember: 'Member',
    famId: 'Family ID', policies: 'Permissions', invitePolicy: 'Who can invite',
    approvePolicy: 'Who can approve', ownerOnly: 'Owner only', any: 'Any member',
    ownerOnlyEdit: 'Owner only',
  } : {
    members: '家族成員', pending: '待審核申請', invite: '邀請', shareLink: '分享連結',
    approve: '同意', reject: '拒絕', roleOwner: '創立者', roleMember: '成員',
    famId: '家族編號', policies: '權限設定', invitePolicy: '誰能邀請',
    approvePolicy: '誰能審核', ownerOnly: '僅創立者', any: '任何成員',
    ownerOnlyEdit: '僅創立者可調',
  };

  const policies = [
    [T.invitePolicy, family.memberInvitePolicy === 'owner-only' ? T.ownerOnly : T.any],
    [T.approvePolicy, family.memberApprovePolicy === 'owner-only' ? T.ownerOnly : T.any],
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={s.content}>
      {/* Family header */}
      <View style={s.header}>
        <View style={[s.headerCard, { backgroundColor: t.primarySoft }]}>
          <View style={s.headerRow}>
            <IEElf size={52} />
            <View style={{ flex: 1 }}>
              <Text style={[s.famName, { color: t.text }]}>{family.name}</Text>
              <Text style={[s.famId, { color: t.textMuted }]}>{T.famId} · {family.id}</Text>
            </View>
          </View>
          <View style={s.headerActions}>
            <IEButton variant="primary" size="sm" onPress={onInvite} icon={<IEIcon name="qr" size={14} color={t.primaryInk} />}>
              {T.invite}
            </IEButton>
            <IEButton variant="soft" size="sm">{T.shareLink}</IEButton>
          </View>
        </View>
      </View>

      {/* Pending */}
      {PENDING.length > 0 && (
        <View style={s.section}>
          <Text style={[s.sectionLabel, { color: t.textMuted }]}>{T.pending} ({PENDING.length})</Text>
          {PENDING.map(p => (
            <IECard key={p.email} padding={14} style={{ marginBottom: 8, borderLeftWidth: 3, borderLeftColor: t.warning }}>
              <View style={s.memberRow}>
                <View style={[s.avatar, { backgroundColor: t.warning }]}>
                  <Text style={s.avatarText}>{p.name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[s.memberName, { color: t.text }]}>{p.name}</Text>
                  <Text style={[s.memberEmail, { color: t.textMuted }]}>{p.email} · {p.time}</Text>
                </View>
              </View>
              <View style={s.approveRow}>
                <View style={{ flex: 1 }}><IEButton variant="primary" size="sm" full onPress={onApprove}>{T.approve}</IEButton></View>
                <View style={{ flex: 1 }}><IEButton variant="soft" size="sm" full>{T.reject}</IEButton></View>
              </View>
            </IECard>
          ))}
        </View>
      )}

      {/* Members */}
      <View style={s.section}>
        <Text style={[s.sectionLabel, { color: t.textMuted }]}>{T.members} ({users.length})</Text>
        <IECard padding={0}>
          {users.map((u, i) => (
            <View key={u.id} style={[s.memberItem, { borderBottomWidth: i < users.length - 1 ? 1 : 0, borderBottomColor: t.border }]}>
              <View style={[s.avatar, { backgroundColor: u.avatar }]}>
                <Text style={s.avatarText}>{u.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.memberName, { color: t.text }]}>
                  {u.name}
                  {u.id === me.id && <Text style={{ color: t.textMuted, fontWeight: '400' }}> · {lang === 'en' ? '(you)' : '（你）'}</Text>}
                </Text>
                <Text style={[s.memberEmail, { color: t.textMuted }]}>{u.email}</Text>
              </View>
              <IETag tone={u.role === 'owner' ? 'primary' : 'neutral'}>
                {u.role === 'owner' ? T.roleOwner : T.roleMember}
              </IETag>
            </View>
          ))}
        </IECard>
      </View>

      {/* Permissions */}
      <View style={s.section}>
        <Text style={[s.sectionLabel, { color: t.textMuted }]}>{T.policies}</Text>
        <IECard padding={0}>
          {policies.map(([k, v], i) => (
            <View key={String(k)} style={[s.policyRow, { borderBottomWidth: i < policies.length - 1 ? 1 : 0, borderBottomColor: t.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, color: t.text }}>{k}</Text>
                {!isOwner && <Text style={{ fontSize: 10, color: t.textSubtle, marginTop: 2 }}>{T.ownerOnlyEdit}</Text>}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ color: t.textMuted, fontSize: 14 }}>{v}</Text>
                <IEIcon name="forward" size={14} color={t.textSubtle} />
              </View>
            </View>
          ))}
        </IECard>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content:      { paddingBottom: 40 },
  header:       { padding: 16, paddingBottom: 0 },
  headerCard:   { padding: 20, borderRadius: 20 },
  headerRow:    { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  headerActions:{ flexDirection: 'row', gap: 8 },
  famName:      { fontSize: 20, fontWeight: '700' },
  famId:        { fontSize: 12, fontFamily: 'monospace', marginTop: 2 },
  section:      { paddingHorizontal: 16, paddingTop: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  memberRow:    { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  memberItem:   { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingHorizontal: 16 },
  memberName:   { fontSize: 14, fontWeight: '600' },
  memberEmail:  { fontSize: 11 },
  approveRow:   { flexDirection: 'row', gap: 8 },
  avatar:       { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText:   { color: '#fff', fontSize: 15, fontWeight: '700' },
  policyRow:    { flexDirection: 'row', alignItems: 'center', padding: 14, paddingHorizontal: 16 },
});
