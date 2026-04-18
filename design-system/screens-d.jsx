// ItemElf — Screens D: manage, settings, notifications

// ── SCREEN: MANAGE ────────────────────────────────
function IEManageScreen({ lang, onOpen, onAdd }) {
  const [tab, setTab] = React.useState('family');
  const t = lang === 'en'
    ? { family: 'Family', personal: 'Personal', custom: 'Custom', addCat: 'New category', items: 'items' }
    : { family: '家庭', personal: '個人', custom: '自訂分類', addCat: '新增分類', items: '件' };

  const tabs = [
    { id: 'family', label: t.family, count: IE_MOCK.items.filter(i => i.scope === 'family').length },
    { id: 'personal', label: t.personal, count: IE_MOCK.items.filter(i => i.scope === 'personal').length },
    { id: 'custom', label: t.custom, count: 0 },
  ];

  const scopeItems = IE_MOCK.items.filter(i => tab === 'personal' ? i.scope === 'personal' : tab === 'family' ? i.scope === 'family' : false);
  const grouped = {};
  scopeItems.forEach(i => {
    if (!grouped[i.category]) grouped[i.category] = [];
    grouped[i.category].push(i);
  });

  return (
    <div style={{ padding: '0 0 120px' }}>
      {/* Tabs */}
      <div style={{ padding: '0 16px 16px', display: 'flex', gap: 8 }}>
        {tabs.map(x => (
          <button key={x.id} onClick={() => setTab(x.id)} style={{
            flex: 1, padding: 14, borderRadius: 14,
            background: tab === x.id ? 'var(--ie-primary)' : 'var(--ie-surface)',
            color: tab === x.id ? 'var(--ie-primary-ink)' : 'var(--ie-text)',
            border: '1px solid ' + (tab === x.id ? 'var(--ie-primary)' : 'var(--ie-border)'),
            fontFamily: 'var(--ie-font)', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{x.label}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>{x.count} {t.items}</div>
          </button>
        ))}
      </div>

      {tab === 'custom' ? (
        <div style={{ padding: '0 16px' }}>
          <IECard padding={20} style={{ textAlign: 'center' }}>
            <IEElf size={56} mood="sleepy" />
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 12, color: 'var(--ie-text)' }}>
              {lang === 'en' ? 'No custom categories yet' : '尚未建立自訂分類'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ie-text-muted)', marginTop: 4, marginBottom: 14 }}>
              {lang === 'en' ? 'Organize items your way.' : '用你自己的方式管理物品'}
            </div>
            <IEButton variant="primary" size="sm" icon={<IEIcon name="plus" size={14} />}>{t.addCat}</IEButton>
          </IECard>
        </div>
      ) : (
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(grouped).map(([catId, list]) => {
            const cat = IE_MOCK.categories.find(c => c.id === catId);
            return (
              <div key={catId}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px 8px',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: 'var(--ie-surface-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>{cat?.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ie-text)' }}>{cat?.[lang] || cat?.zh}</div>
                    <div style={{ fontSize: 11, color: 'var(--ie-text-muted)' }}>{list.length} {t.items}</div>
                  </div>
                  <button style={{ background: 'transparent', border: 0, color: 'var(--ie-text-subtle)', cursor: 'pointer' }}>
                    <IEIcon name="back" size={16} />
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {list.slice(0, 3).map(i => <IEItemRow key={i.id} item={i} lang={lang} onClick={() => onOpen(i.id)} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating add button */}
      <button onClick={onAdd} style={{
        position: 'absolute', right: 20, bottom: 100, zIndex: 30,
        width: 56, height: 56, borderRadius: 28,
        background: 'var(--ie-primary)', color: 'var(--ie-primary-ink)',
        border: 0, cursor: 'pointer',
        boxShadow: 'var(--ie-shadow-lg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <IEIcon name="plus" size={26} />
      </button>
    </div>
  );
}

// ── SCREEN: SETTINGS ─────────────────────────────
function IESettingsScreen({ lang, app, set }) {
  const t = lang === 'en' ? {
    profile: 'Profile', edit: 'Edit profile',
    prefs: 'Preferences', notif: 'Notifications', expireDays: 'Expiry alert', days: 'days ahead',
    security: 'Security', biometric: 'Biometric unlock', password: 'Change password',
    about: 'About', version: 'Version', privacy: 'Privacy policy',
    logout: 'Sign out',
  } : {
    profile: '個人資料', edit: '編輯個人檔案',
    prefs: '偏好設定', notif: '通知', expireDays: '到期提醒', days: '天前通知',
    security: '安全', biometric: '生物辨識登入', password: '變更密碼',
    about: '關於', version: '版本', privacy: '隱私權政策',
    logout: '登出',
  };

  const row = (label, right, i, last) => (
    <div key={label} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
      borderBottom: last ? 0 : '1px solid var(--ie-border)', fontSize: 14,
    }}>
      <div style={{ flex: 1, color: 'var(--ie-text)' }}>{label}</div>
      {right}
    </div>
  );

  const Toggle = ({ on, onChange }) => (
    <button onClick={() => onChange && onChange(!on)} style={{
      width: 44, height: 26, borderRadius: 999, border: 0, cursor: 'pointer',
      background: on ? 'var(--ie-primary)' : 'var(--ie-surface-2)', position: 'relative',
      transition: 'background 150ms',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 2, left: on ? 20 : 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 150ms',
      }} />
    </button>
  );

  return (
    <div style={{ padding: '0 16px 120px' }}>
      {/* Profile card */}
      <IECard padding={16} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: IE_MOCK.me.avatar, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>
            {IE_MOCK.me.name[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ie-text)' }}>{IE_MOCK.me.name}</div>
            <div style={{ fontSize: 12, color: 'var(--ie-text-muted)' }}>{IE_MOCK.me.email}</div>
          </div>
          <IEButton variant="soft" size="sm">{t.edit}</IEButton>
        </div>
      </IECard>

      {/* Prefs */}
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ie-text-muted)', margin: '8px 4px 8px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t.prefs}
      </div>
      <IECard padding={0} style={{ marginBottom: 16 }}>
        {row(t.notif, <Toggle on={true} />, 0)}
        {row(t.expireDays,
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ie-text-muted)' }}>
            7 {t.days}<IEIcon name="back" size={14} color="var(--ie-text-subtle)" />
          </div>, 1)}
        {row(lang === 'en' ? 'Language' : '語言',
          <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--ie-surface-2)', borderRadius: 999 }}>
            {['zh', 'en'].map(l => (
              <button key={l} onClick={() => set({ lang: l })} style={{
                padding: '4px 10px', borderRadius: 999, border: 0,
                background: app.lang === l ? 'var(--ie-surface)' : 'transparent',
                fontSize: 11, fontWeight: 600, color: 'var(--ie-text)', cursor: 'pointer',
                fontFamily: 'var(--ie-font)',
              }}>{l === 'zh' ? '中' : 'EN'}</button>
            ))}
          </div>, 2)}
        {row(lang === 'en' ? 'Theme' : '主題',
          <div style={{ display: 'flex', gap: 4 }}>
            {[['warm','🔆'],['playful','🌸'],['minimal','⚪'],['tech','🌙']].map(([v,i]) => (
              <button key={v} onClick={() => set({ theme: v })} style={{
                width: 28, height: 28, borderRadius: 8, border: '1px solid ' + (app.theme === v ? 'var(--ie-primary)' : 'var(--ie-border)'),
                background: app.theme === v ? 'var(--ie-primary-soft)' : 'var(--ie-surface)',
                fontSize: 13, cursor: 'pointer',
              }}>{i}</button>
            ))}
          </div>, 3, true)}
      </IECard>

      {/* Security */}
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ie-text-muted)', margin: '8px 4px 8px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t.security}
      </div>
      <IECard padding={0} style={{ marginBottom: 16 }}>
        {row(t.biometric, <Toggle on={true} />, 0)}
        {row(t.password, <IEIcon name="back" size={14} color="var(--ie-text-subtle)" />, 1, true)}
      </IECard>

      {/* About */}
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ie-text-muted)', margin: '8px 4px 8px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t.about}
      </div>
      <IECard padding={0} style={{ marginBottom: 16 }}>
        {row(t.version, <span style={{ color: 'var(--ie-text-muted)', fontFamily: 'var(--ie-font-mono)', fontSize: 12 }}>1.0.0</span>, 0)}
        {row(t.privacy, <IEIcon name="back" size={14} color="var(--ie-text-subtle)" />, 1, true)}
      </IECard>

      <IEButton variant="ghost" full size="md">{t.logout}</IEButton>
    </div>
  );
}

// ── SCREEN: NOTIFICATIONS (chat-style) ─────────────
function IENotificationsScreen({ lang, onOpen }) {
  const t = lang === 'en'
    ? { today: 'Today', yesterday: 'Yesterday', title: 'Family feed' }
    : { today: '今天', yesterday: '昨天', title: '家族動態' };

  const feed = [
    { group: t.today, entries: [
      { type: 'expiring', actor: 'elf', text: lang === 'en' ? '🥛 Fresh Milk 1L will expire in 6 days. Shelf 2 in the fridge.' : '🥛 鮮奶 1L 還有 6 天就到期了，在冰箱第二層。', time: '08:12', itemId: 'i01' },
      { type: 'added', actor: 'u2', text: lang === 'en' ? 'Added Fresh Milk 1L to Fridge · Shelf 2' : '新增了「鮮奶 1L」到 冰箱 第二層', time: '08:10', itemId: 'i01' },
      { type: 'expired', actor: 'elf', text: lang === 'en' ? '🍞 White bread has expired — please check.' : '🍞 白吐司已過期，請確認是否丟棄。', time: '09:00', itemId: 'i06' },
    ]},
    { group: t.yesterday, entries: [
      { type: 'added', actor: 'u3', text: lang === 'en' ? 'Added Yogurt drink x4' : '新增了「優酪乳 四入」', time: '19:30', itemId: 'i08' },
      { type: 'join', actor: 'system', text: lang === 'en' ? '陳阿姨 requested to join your family' : '陳阿姨 申請加入家族', time: '14:02' },
    ]},
  ];

  const actorOf = (id) => id === 'elf' ? { name: 'ItemElf', avatar: 'var(--ie-primary)' }
    : id === 'system' ? { name: lang === 'en' ? 'System' : '系統', avatar: 'var(--ie-text-muted)' }
    : IE_MOCK.users.find(u => u.id === id) || { name: '—', avatar: '#ccc' };

  return (
    <div style={{ padding: '0 16px 120px' }}>
      {feed.map(g => (
        <div key={g.group} style={{ marginBottom: 16 }}>
          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ie-text-muted)', margin: '12px 0', fontWeight: 600 }}>
            {g.group}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {g.entries.map((e, i) => {
              const a = actorOf(e.actor);
              const isElf = e.actor === 'elf';
              return (
                <button key={i} onClick={() => e.itemId && onOpen(e.itemId)} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-end',
                  padding: 0, border: 0, background: 'transparent',
                  cursor: e.itemId ? 'pointer' : 'default', fontFamily: 'var(--ie-font)',
                }}>
                  {isElf ? (
                    <IEElf size={32} />
                  ) : (
                    <div style={{ width: 32, height: 32, borderRadius: 16, background: a.avatar, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                      {a.name[0]}
                    </div>
                  )}
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: 11, color: 'var(--ie-text-muted)', marginBottom: 3, display: 'flex', gap: 6 }}>
                      <span style={{ fontWeight: 600 }}>{a.name}</span>
                      <span>{e.time}</span>
                    </div>
                    <div style={{
                      display: 'inline-block', padding: '10px 14px',
                      borderRadius: 16, borderTopLeftRadius: 4,
                      background: isElf ? 'var(--ie-primary-soft)' : 'var(--ie-surface)',
                      color: 'var(--ie-text)', fontSize: 13, lineHeight: 1.5,
                      border: isElf ? 0 : '1px solid var(--ie-border)',
                      maxWidth: '85%',
                    }}>{e.text}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { IEManageScreen, IESettingsScreen, IENotificationsScreen });
