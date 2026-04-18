// ItemElf — Screens C: expiring, family, join, manage, settings, notifs

// ── SCREEN: EXPIRING (notification/reminder center) ────
function IEExpiringScreen({ lang, onOpen, variant = 'timeline' }) {
  const items = IE_MOCK.items
    .filter(i => ['expiring', 'expired'].includes(ie_fmt.statusOfItem(i)))
    .sort((a,b) => new Date(a.expireAt) - new Date(b.expireAt));

  const t = lang === 'en'
    ? { title: 'Needs attention', expired: 'Expired', expiring: 'Expiring soon', days: 'days', overdue: 'overdue' }
    : { title: '需要注意', expired: '已過期', expiring: '快到期', days: '天', overdue: '天前過期' };

  const expired = items.filter(i => ie_fmt.daysLeft(i.expireAt) < 0);
  const soon = items.filter(i => ie_fmt.daysLeft(i.expireAt) >= 0);

  if (variant === 'badge') {
    return (
      <div style={{ padding: '0 16px 120px' }}>
        <div style={{ marginBottom: 12 }}>
          <IEElfBanner>
            {lang === 'en'
              ? <>Hi! <b>{expired.length}</b> expired · <b>{soon.length}</b> expiring soon.</>
              : <>嗨！有 <b>{expired.length}</b> 件過期、<b>{soon.length}</b> 件快到期。</>}
          </IEElfBanner>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {items.map(i => {
            const d = ie_fmt.daysLeft(i.expireAt);
            const st = ie_fmt.statusOfItem(i);
            const cat = IE_MOCK.categories.find(c => c.id === i.category);
            return (
              <button key={i.id} onClick={() => onOpen(i.id)} style={{
                padding: 12, borderRadius: 14,
                background: 'var(--ie-surface)', border: '1px solid var(--ie-border)',
                cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--ie-font)',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: -6, right: -6,
                  minWidth: 28, height: 28, borderRadius: 14,
                  background: d < 0 ? 'var(--ie-danger)' : 'var(--ie-warning)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, padding: '0 6px',
                  fontFamily: 'var(--ie-font-mono)',
                }}>{d < 0 ? `+${-d}d` : `${d}d`}</div>
                <IEImage label={cat?.icon} h={72} radius={10} />
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 8, color: 'var(--ie-text)' }}>
                  {lang === 'en' ? i.nameEn : i.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ie-text-muted)' }}>{lang === 'en' ? i.locationEn : i.location}</div>
                <div style={{ marginTop: 6 }}><IEStatusPill status={st} lang={lang} size="sm" /></div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Timeline variant
  return (
    <div style={{ padding: '0 16px 120px' }}>
      <div style={{ marginBottom: 14 }}>
        <IEElfBanner>
          {lang === 'en'
            ? <>Keep an eye on these <b>{items.length}</b> items today.</>
            : <>今天請幫我留意這 <b>{items.length}</b> 樣物品喔！</>}
        </IEElfBanner>
      </div>

      {[['expired', t.expired, expired, 'var(--ie-danger)'], ['soon', t.expiring, soon, 'var(--ie-warning)']].map(([k, title, list, color]) => (
        list.length > 0 && (
          <div key={k} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: color }} />
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ie-text)' }}>{title}</div>
              <div style={{ fontSize: 11, color: 'var(--ie-text-muted)' }}>{list.length}</div>
            </div>
            <div style={{ position: 'relative', paddingLeft: 18 }}>
              <div style={{ position: 'absolute', left: 3, top: 6, bottom: 6, width: 2, background: 'var(--ie-border)' }} />
              {list.map(i => {
                const d = ie_fmt.daysLeft(i.expireAt);
                const st = ie_fmt.statusOfItem(i);
                const cat = IE_MOCK.categories.find(c => c.id === i.category);
                return (
                  <button key={i.id} onClick={() => onOpen(i.id)} style={{
                    display: 'flex', gap: 12, alignItems: 'center', width: '100%',
                    padding: 12, marginBottom: 8, borderRadius: 14,
                    background: 'var(--ie-surface)', border: '1px solid var(--ie-border)',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--ie-font)',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', left: -19, top: '50%', transform: 'translateY(-50%)',
                      width: 8, height: 8, borderRadius: 4, background: color, border: '2px solid var(--ie-bg)',
                    }} />
                    <IEImage label={cat?.icon} w={44} h={44} radius={10} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ie-text)' }}>
                        {lang === 'en' ? i.nameEn : i.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--ie-text-muted)' }}>
                        {lang === 'en' ? i.locationEn : i.location}・{i.expireAt}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: color, fontFamily: 'var(--ie-font-mono)' }}>
                        {d < 0 ? `+${-d}` : d}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--ie-text-muted)' }}>
                        {d < 0 ? t.overdue : t.days}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )
      ))}
    </div>
  );
}

// ── SCREEN: FAMILY ────────────────────────────────────
function IEFamilyScreen({ lang, onInvite, onApprove, app }) {
  const isOwner = app.role === 'owner';
  const t = lang === 'en' ? {
    members: 'Members', pending: 'Pending approval', invite: 'Invite', approve: 'Approve', reject: 'Reject',
    roleOwner: 'Owner', roleMember: 'Member', famId: 'Family ID',
    policies: 'Permissions', invitePolicy: 'Who can invite', approvePolicy: 'Who can approve',
    ownerOnly: 'Owner only', any: 'Any member',
  } : {
    members: '家族成員', pending: '待審核申請', invite: '邀請', approve: '同意', reject: '拒絕',
    roleOwner: '創立者', roleMember: '成員', famId: '家族編號',
    policies: '權限設定', invitePolicy: '誰能邀請', approvePolicy: '誰能審核',
    ownerOnly: '僅創立者', any: '任何成員',
  };

  const pending = [
    { name: '陳阿姨', email: 'auntie@family.tw', time: '2 小時前' },
  ];

  return (
    <div style={{ padding: '0 0 120px' }}>
      {/* Family header card */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          padding: 20, borderRadius: 20,
          background: 'linear-gradient(135deg, var(--ie-primary-soft), var(--ie-accent-soft))',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <IEElf size={52} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ie-text)' }}>{IE_MOCK.family.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ie-text-muted)', fontFamily: 'var(--ie-font-mono)', marginTop: 2 }}>
                {t.famId} · {IE_MOCK.family.id}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <IEButton variant="primary" size="sm" onClick={onInvite} icon={<IEIcon name="qr" size={14} />}>
              {t.invite}
            </IEButton>
            <IEButton variant="soft" size="sm">{lang === 'en' ? 'Share link' : '分享連結'}</IEButton>
          </div>
        </div>
      </div>

      {/* Pending approvals */}
      {pending.length > 0 && (
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ie-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {t.pending} ({pending.length})
          </div>
          {pending.map(p => (
            <IECard key={p.email} padding={14} style={{ marginBottom: 8, borderColor: 'var(--ie-warning)', borderLeftWidth: 3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: 'var(--ie-warning)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700 }}>
                  {p.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ie-text)' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ie-text-muted)' }}>{p.email} · {p.time}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1 }}><IEButton variant="primary" size="sm" full onClick={onApprove}>{t.approve}</IEButton></div>
                <div style={{ flex: 1 }}><IEButton variant="soft" size="sm" full>{t.reject}</IEButton></div>
              </div>
            </IECard>
          ))}
        </div>
      )}

      {/* Members */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ie-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {t.members} ({IE_MOCK.users.length})
        </div>
        <IECard padding={0}>
          {IE_MOCK.users.map((u, i) => (
            <div key={u.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
              borderBottom: i < IE_MOCK.users.length - 1 ? '1px solid var(--ie-border)' : 0,
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: u.avatar, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700 }}>
                {u.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ie-text)' }}>
                  {u.name}{u.id === IE_MOCK.me.id && <span style={{ color: 'var(--ie-text-muted)', fontWeight: 400 }}> · {lang === 'en' ? '(you)' : '（你）'}</span>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ie-text-muted)' }}>{u.email}</div>
              </div>
              <IETag tone={u.role === 'owner' ? 'primary' : 'neutral'}>
                {u.role === 'owner' ? t.roleOwner : t.roleMember}
              </IETag>
            </div>
          ))}
        </IECard>
      </div>

      {/* Permissions */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ie-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {t.policies}
        </div>
        <IECard padding={0}>
          {[
            [t.invitePolicy, IE_MOCK.family.memberInvitePolicy === 'owner-only' ? t.ownerOnly : t.any],
            [t.approvePolicy, IE_MOCK.family.memberApprovePolicy === 'owner-only' ? t.ownerOnly : t.any],
          ].map(([k, v], i, arr) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--ie-border)' : 0, fontSize: 14,
            }}>
              <div>
                <div style={{ color: 'var(--ie-text)' }}>{k}</div>
                {!isOwner && <div style={{ fontSize: 10, color: 'var(--ie-text-subtle)', marginTop: 2 }}>{lang === 'en' ? 'Owner only' : '僅創立者可調'}</div>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ie-text-muted)' }}>
                {v}<IEIcon name="back" size={14} color="var(--ie-text-subtle)" />
              </div>
            </div>
          ))}
        </IECard>
      </div>
    </div>
  );
}

// ── SCREEN: INVITE / QR ───────────────────────────────
function IEInviteSheet({ lang, onClose }) {
  const t = lang === 'en'
    ? { title: 'Invite to family', scan: 'Scan to join', id: 'Family ID', copy: 'Copy link', close: 'Done' }
    : { title: '邀請加入家族', scan: '掃描加入家族', id: '家族編號', copy: '複製連結', close: '完成' };

  return (
    <div style={{ padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ie-border)', margin: '0 auto 10px' }} />
      <div style={{ fontSize: 20, fontWeight: 700 }}>{t.title}</div>
      <div style={{ fontSize: 13, color: 'var(--ie-text-muted)' }}>{t.scan}</div>

      {/* Decorative QR */}
      <div style={{ padding: 20, background: '#fff', borderRadius: 20, border: '1px solid var(--ie-border)' }}>
        <div style={{
          width: 200, height: 200,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E${
            Array.from({ length: 36 * 36 }, (_, i) => {
              const x = i % 36, y = Math.floor(i / 36);
              const on = (((x * 7 + y * 13 + x * y) % 5) < 2) || (x < 7 && y < 7) || (x > 28 && y < 7) || (x < 7 && y > 28);
              return on ? `%3Crect x='${x + 2}' y='${y + 2}' width='1' height='1' fill='black'/%3E` : '';
            }).join('')
          }%3C/svg%3E")`,
          backgroundSize: 'contain',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', inset: '40% 40%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IEElf size={40} />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'var(--ie-text-muted)', marginBottom: 4 }}>{t.id}</div>
        <div style={{ fontFamily: 'var(--ie-font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--ie-text)', letterSpacing: 2 }}>
          {IE_MOCK.family.id}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, width: '100%' }}>
        <IEButton variant="soft" full size="md">{t.copy}</IEButton>
        <IEButton variant="primary" full size="md" onClick={onClose}>{t.close}</IEButton>
      </div>
    </div>
  );
}

// ── SCREEN: JOIN FAMILY ───────────────────────────────
function IEJoinScreen({ lang, onSubmit, onBack }) {
  const [mode, setMode] = React.useState('id');
  const t = lang === 'en' ? {
    title: 'Join a family', sub: 'Enter a family ID or scan a QR',
    byId: 'By ID', byQr: 'By QR', idHint: 'e.g. FM-7X4K-2P', submit: 'Request to join',
    scanHint: 'Point camera at QR', or: 'or',
  } : {
    title: '加入家族', sub: '輸入家族編號或掃描 QR code',
    byId: '輸入編號', byQr: '掃描 QR', idHint: '例：FM-7X4K-2P', submit: '送出申請',
    scanHint: '請將相機對準 QR code', or: '或',
  };

  return (
    <div style={{ padding: '24px 20px 120px' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <IEElf size={72} />
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 12 }}>{t.title}</div>
        <div style={{ fontSize: 13, color: 'var(--ie-text-muted)', marginTop: 4 }}>{t.sub}</div>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--ie-surface-2)', borderRadius: 999, marginBottom: 20 }}>
        {[['id', t.byId], ['qr', t.byQr]].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)} style={{
            flex: 1, padding: '10px 14px', borderRadius: 999, border: 0,
            background: mode === v ? 'var(--ie-surface)' : 'transparent',
            fontSize: 13, fontWeight: 600, color: 'var(--ie-text)', cursor: 'pointer',
            boxShadow: mode === v ? 'var(--ie-shadow-sm)' : 'none',
            fontFamily: 'var(--ie-font)',
          }}>{l}</button>
        ))}
      </div>

      {mode === 'id' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input placeholder={t.idHint} style={{
            width: '100%', padding: '18px 16px', borderRadius: 14,
            border: '1px solid var(--ie-border)', background: 'var(--ie-surface)',
            fontSize: 18, letterSpacing: 2, textAlign: 'center',
            fontFamily: 'var(--ie-font-mono)', color: 'var(--ie-text)',
          }} defaultValue="FM-7X4K-2P" />
          <IEButton variant="primary" full size="lg" onClick={onSubmit}>{t.submit}</IEButton>
        </div>
      ) : (
        <div style={{
          height: 300, borderRadius: 20, background: '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: 200, height: 200, border: '2px solid #fff', borderRadius: 16,
            position: 'relative',
          }}>
            {['top: -2px; left: -2px; border-right: 0; border-bottom: 0;',
              'top: -2px; right: -2px; border-left: 0; border-bottom: 0;',
              'bottom: -2px; left: -2px; border-right: 0; border-top: 0;',
              'bottom: -2px; right: -2px; border-left: 0; border-top: 0;'].map((s, i) => (
              <div key={i} style={Object.fromEntries(s.split(';').filter(Boolean).map(p => p.trim().split(':').map(x => x.trim())).map(([k,v]) => [k.replace(/-([a-z])/g, (_,c) => c.toUpperCase()), v]))
                } style={{ position: 'absolute', width: 28, height: 28, border: '4px solid var(--ie-primary)', ...(i === 0 ? { top: -2, left: -2, borderRight: 0, borderBottom: 0 } : i === 1 ? { top: -2, right: -2, borderLeft: 0, borderBottom: 0 } : i === 2 ? { bottom: -2, left: -2, borderRight: 0, borderTop: 0 } : { bottom: -2, right: -2, borderLeft: 0, borderTop: 0 }) }} />
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', color: '#fff', fontSize: 12 }}>
            {t.scanHint}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { IEExpiringScreen, IEFamilyScreen, IEInviteSheet, IEJoinScreen });
