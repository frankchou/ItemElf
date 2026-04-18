// ItemElf — Screens (search, detail, add, expiring, family, join, manage, settings, auth)
// All screens receive {app, set, lang} where app is global app state.

// Utilities
const ie_fmt = {
  daysLeft: (date) => {
    if (!date) return null;
    const d = Math.ceil((new Date(date) - new Date('2026-04-18')) / 86400000);
    return d;
  },
  statusOfItem: (it) => {
    if (['discarded', 'finished', 'paused'].includes(it.status)) return it.status;
    const d = ie_fmt.daysLeft(it.expireAt);
    if (d === null) return it.status === 'new' ? 'new' : 'active';
    if (d < 0) return 'expired';
    if (d <= 7) return 'expiring';
    return it.status === 'new' ? 'new' : 'active';
  },
  userById: (id) => IE_MOCK.users.find(u => u.id === id) || { name: '—', avatar: '#ccc' },
};

// ── SCREEN: AUTH (login / signup / biometric) ─────────────
function IEAuthScreen({ mode = 'login', lang, onDone, onSwitch }) {
  const [step, setStep] = React.useState(mode);
  const txt = lang === 'en' ? {
    welcome: 'Welcome back', tagline: 'Your family item finder',
    email: 'Email', password: 'Password', login: 'Sign in',
    bio: 'Use Face ID', or: 'or', signup: 'Create account',
    switchToSignup: "Don't have an account? Sign up",
    switchToLogin: 'Already have an account? Sign in',
    name: 'Name', confirm: 'Confirm',
  } : {
    welcome: '歡迎回來', tagline: '你的家庭尋物小精靈',
    email: '電子郵件', password: '密碼', login: '登入',
    bio: '使用 Face ID', or: '或', signup: '建立帳號',
    switchToSignup: '還沒有帳號？立即註冊',
    switchToLogin: '已經有帳號？直接登入',
    name: '姓名', confirm: '確認',
  };

  return (
    <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <IEElf size={112} />
        <div style={{ fontSize: 26, fontWeight: 700, marginTop: 20, color: 'var(--ie-text)' }}>ItemElf</div>
        <div style={{ fontSize: 14, color: 'var(--ie-text-muted)' }}>{txt.tagline}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {step === 'signup' && (
          <IEInput placeholder={txt.name} value="陳大華" icon={<IEIcon name="face" size={18} />} onChange={() => {}} />
        )}
        <IEInput placeholder={txt.email} value="dahua@family.tw" icon={<span style={{ fontSize: 14 }}>@</span>} onChange={() => {}} />
        <IEInput placeholder={txt.password} value="••••••••" icon={<span style={{ fontSize: 14 }}>🔒</span>} onChange={() => {}} />

        <IEButton variant="primary" full size="lg" onClick={onDone}>
          {step === 'signup' ? txt.confirm : txt.login}
        </IEButton>

        {step === 'login' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '6px 0', color: 'var(--ie-text-subtle)', fontSize: 12 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--ie-border)' }} />
              {txt.or}
              <div style={{ flex: 1, height: 1, background: 'var(--ie-border)' }} />
            </div>
            <IEButton variant="soft" full size="lg" icon={<IEIcon name="face" size={20} />} onClick={onDone}>
              {txt.bio}
            </IEButton>
          </>
        )}

        <button onClick={() => setStep(step === 'login' ? 'signup' : 'login')} style={{
          marginTop: 10, background: 'transparent', border: 0, color: 'var(--ie-primary)',
          fontSize: 13, fontFamily: 'var(--ie-font)', cursor: 'pointer', padding: 8,
        }}>
          {step === 'login' ? txt.switchToSignup : txt.switchToLogin}
        </button>
      </div>
    </div>
  );
}

// ── SCREEN: SEARCH ────────────────────────────────────────
function IESearchScreen({ lang, app, set, variant = 'list' }) {
  const [q, setQ] = React.useState('');
  const [activeCat, setActiveCat] = React.useState('all');
  const scopeItems = IE_MOCK.items.filter(i => app.view === 'personal' ? i.scope === 'personal' : true);
  const filtered = scopeItems.filter(i => {
    const matchCat = activeCat === 'all' || i.category === activeCat;
    const s = q.toLowerCase();
    const matchQ = !s || i.name.toLowerCase().includes(s) || (i.nameEn||'').toLowerCase().includes(s) || i.location.toLowerCase().includes(s);
    return matchCat && matchQ;
  });
  const expiring = scopeItems.filter(i => ie_fmt.statusOfItem(i) === 'expiring' || ie_fmt.statusOfItem(i) === 'expired');

  const cats = [{ id: 'all', zh: '全部', en: 'All', icon: '✦' }, ...IE_MOCK.categories];
  const t = lang === 'en'
    ? { search: 'Search items, locations…', alerts: 'Needs attention', recent: 'All items', nothing: 'No matches' }
    : { search: '搜尋物品、位置⋯', alerts: '需要注意', recent: '全部物品', nothing: '沒有相符結果' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 120 }}>
      {/* Elf banner */}
      <div style={{ padding: '0 16px' }}>
        <IEElfBanner action={
          <button style={{ background: 'transparent', border: 0, color: 'var(--ie-primary)', fontSize: 13, fontWeight: 600 }}>
            {lang === 'en' ? 'View' : '查看'}
          </button>
        }>
          {lang === 'en'
            ? <>You have <b>{expiring.length}</b> item(s) needing attention today.</>
            : <>今天有 <b>{expiring.length}</b> 樣物品需要注意喔。</>}
        </IEElfBanner>
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 16px' }}>
        <IEInput
          icon={<IEIcon name="search" size={18} />}
          placeholder={t.search}
          value={q} onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto' }}>
        {cats.map(c => {
          const isActive = activeCat === c.id;
          return (
            <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
              whiteSpace: 'nowrap', padding: '8px 14px', borderRadius: 999,
              background: isActive ? 'var(--ie-primary)' : 'var(--ie-surface)',
              color: isActive ? 'var(--ie-primary-ink)' : 'var(--ie-text)',
              border: '1px solid ' + (isActive ? 'var(--ie-primary)' : 'var(--ie-border)'),
              fontSize: 13, fontWeight: 600, fontFamily: 'var(--ie-font)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>{c.icon}</span>{c[lang] || c.zh}
            </button>
          );
        })}
      </div>

      {/* View switcher */}
      <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, color: 'var(--ie-text-muted)', fontWeight: 600 }}>
          {filtered.length} {lang === 'en' ? 'items' : '件物品'}
        </div>
        <div style={{ display: 'flex', gap: 4, padding: 3, background: 'var(--ie-surface-2)', borderRadius: 999 }}>
          {['list', 'card'].map(v => (
            <button key={v} onClick={() => set({ searchVariant: v })} style={{
              padding: '5px 12px', borderRadius: 999, border: 0,
              background: (app.searchVariant || variant) === v ? 'var(--ie-surface)' : 'transparent',
              fontSize: 11, fontWeight: 600, color: 'var(--ie-text)', cursor: 'pointer',
              boxShadow: (app.searchVariant || variant) === v ? 'var(--ie-shadow-sm)' : 'none',
              fontFamily: 'var(--ie-font)',
            }}>{v === 'list' ? (lang === 'en' ? 'List' : '列表') : (lang === 'en' ? 'Card' : '卡片')}</button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div style={{ padding: '0 16px' }}>
        {(app.searchVariant || variant) === 'list' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(i => <IEItemRow key={i.id} item={i} lang={lang} onClick={() => set({ detailId: i.id })} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {filtered.map(i => <IEItemCard key={i.id} item={i} lang={lang} onClick={() => set({ detailId: i.id })} />)}
          </div>
        )}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--ie-text-muted)' }}>
            <IEElf size={72} mood="sleepy" /><div style={{ marginTop: 10, fontSize: 14 }}>{t.nothing}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Item row (list variant) ──────────────────────────────
function IEItemRow({ item, lang, onClick }) {
  const st = ie_fmt.statusOfItem(item);
  const editor = ie_fmt.userById(item.editorId);
  const cat = IE_MOCK.categories.find(c => c.id === item.category);
  return (
    <button onClick={onClick} style={{
      display: 'flex', gap: 12, alignItems: 'center',
      padding: 12, borderRadius: 14,
      background: 'var(--ie-surface)', border: '1px solid var(--ie-border)',
      textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--ie-font)',
    }}>
      <IEImage label={cat?.icon || 'photo'} w={56} h={56} radius={10} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--ie-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {lang === 'en' ? item.nameEn || item.name : item.name}
          </div>
          {item.private && <IEIcon name="pin" size={12} color="var(--ie-text-subtle)" />}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ie-text-muted)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <IEIcon name="pin" size={12} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {lang === 'en' ? item.locationEn || item.location : item.location}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <IEStatusPill status={st} lang={lang} size="sm" />
          <IETag>{cat?.[lang] || cat?.zh}</IETag>
          <span style={{ fontSize: 10, color: 'var(--ie-text-subtle)', marginLeft: 'auto' }}>
            {editor.name.slice(0,1)}・{item.updatedAt.slice(5,10)}
          </span>
        </div>
      </div>
    </button>
  );
}

// ── Item card (card grid variant) ──────────────────────
function IEItemCard({ item, lang, onClick }) {
  const st = ie_fmt.statusOfItem(item);
  const cat = IE_MOCK.categories.find(c => c.id === item.category);
  const days = ie_fmt.daysLeft(item.expireAt);
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      padding: 10, borderRadius: 14,
      background: 'var(--ie-surface)', border: '1px solid var(--ie-border)',
      textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--ie-font)',
    }}>
      <IEImage label={cat?.icon || 'photo'} h={88} radius={10} />
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ie-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {lang === 'en' ? item.nameEn || item.name : item.name}
      </div>
      <div style={{ fontSize: 11, color: 'var(--ie-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {lang === 'en' ? item.locationEn || item.location : item.location}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IEStatusPill status={st} lang={lang} size="sm" />
        {days !== null && st !== 'expired' && (
          <span style={{ fontSize: 10, color: 'var(--ie-text-muted)', fontFamily: 'var(--ie-font-mono)' }}>
            {days >= 0 ? `D-${days}` : `D+${-days}`}
          </span>
        )}
      </div>
    </button>
  );
}

Object.assign(window, { IEAuthScreen, IESearchScreen, IEItemRow, IEItemCard, ie_fmt });
