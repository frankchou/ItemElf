// ItemElf — Screens B: detail, add, expiring, family, join, manage, settings, notifs

// ── SCREEN: DETAIL ───────────────────────────────────────
function IEDetailScreen({ itemId, lang, onBack, onEdit }) {
  const item = IE_MOCK.items.find(i => i.id === itemId) || IE_MOCK.items[0];
  const st = ie_fmt.statusOfItem(item);
  const editor = ie_fmt.userById(item.editorId);
  const creator = ie_fmt.userById(item.creatorId);
  const cat = IE_MOCK.categories.find(c => c.id === item.category);
  const days = ie_fmt.daysLeft(item.expireAt);

  const lifecycle = [
    { s: 'new',       label: lang === 'en' ? 'Added' : '新增',   time: item.purchasedAt || item.updatedAt.slice(0,10) },
    { s: 'active',    label: lang === 'en' ? 'Active' : '使用中', time: item.purchasedAt },
    { s: 'expiring',  label: lang === 'en' ? 'Expiring' : '快到期', time: item.expireAt ? item.expireAt : null },
    { s: 'expired',   label: lang === 'en' ? 'Expired' : '過期', time: item.expireAt },
    { s: 'finished',  label: lang === 'en' ? 'Finished' : '用完', time: null },
    { s: 'discarded', label: lang === 'en' ? 'Discarded' : '丟棄', time: null },
  ];
  const order = ['new', 'active', 'expiring', 'expired', 'finished', 'discarded'];
  const currentIdx = order.indexOf(st);

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* Hero photo */}
      <div style={{ position: 'relative', height: 240, background: 'var(--ie-surface-2)' }}>
        <IEImage label={cat?.icon + ' · hero photo'} w="100%" h={240} radius={0} />
        <button onClick={onBack} style={{
          position: 'absolute', top: 14, left: 14,
          width: 40, height: 40, borderRadius: 999,
          background: 'var(--ie-surface)', border: '1px solid var(--ie-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <IEIcon name="back" size={18} />
        </button>
        <button onClick={onEdit} style={{
          position: 'absolute', top: 14, right: 14,
          padding: '8px 14px', borderRadius: 999,
          background: 'var(--ie-surface)', border: '1px solid var(--ie-border)',
          fontSize: 13, fontWeight: 600, fontFamily: 'var(--ie-font)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ie-text)',
        }}>
          <IEIcon name="edit" size={14} />{lang === 'en' ? 'Edit' : '編輯'}
        </button>
      </div>

      {/* Title block */}
      <div style={{ padding: '18px 20px 12px' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
          <IEStatusPill status={st} lang={lang} />
          <IETag tone="primary">{cat?.[lang] || cat?.zh}</IETag>
          <IETag>{item.scope === 'personal' ? (lang === 'en' ? 'Personal' : '個人') : (lang === 'en' ? 'Family' : '家庭')}</IETag>
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ie-text)' }}>
          {lang === 'en' ? item.nameEn || item.name : item.name}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ie-text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
          <IEIcon name="pin" size={14} />
          {lang === 'en' ? item.locationEn || item.location : item.location}
        </div>
      </div>

      {/* Location photo strip */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ fontSize: 12, color: 'var(--ie-text-muted)', marginBottom: 6, fontWeight: 600 }}>
          {lang === 'en' ? 'LOCATION PHOTO' : '放置位置'}
        </div>
        <IEImage label={lang === 'en' ? 'where it lives' : '實地拍照'} h={140} />
      </div>

      {/* Lifecycle timeline */}
      <div style={{ padding: '8px 16px' }}>
        <div style={{ fontSize: 12, color: 'var(--ie-text-muted)', marginBottom: 10, fontWeight: 600, letterSpacing: 0.5 }}>
          {lang === 'en' ? 'LIFECYCLE' : '生命週期'}
        </div>
        <IECard padding={14}>
          {lifecycle.map((l, i) => {
            const passed = order.indexOf(l.s) <= currentIdx;
            const current = l.s === st;
            const s = IE_STATUS[l.s];
            return (
              <div key={l.s} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: passed ? s.bg : 'var(--ie-surface-2)',
                    border: current ? `2px solid ${s.ink}` : '2px solid var(--ie-border)',
                  }} />
                  {i < lifecycle.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 24, background: passed && order.indexOf(lifecycle[i+1].s) <= currentIdx ? s.bg : 'var(--ie-border)' }} />
                  )}
                </div>
                <div style={{ flex: 1, paddingBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: current ? 700 : 500, color: passed ? 'var(--ie-text)' : 'var(--ie-text-subtle)' }}>
                    {l.label}{current && <span style={{ color: s.ink, marginLeft: 6, fontSize: 11 }}>● {lang === 'en' ? 'current' : '目前'}</span>}
                  </div>
                  {l.time && passed && (
                    <div style={{ fontSize: 11, color: 'var(--ie-text-muted)', fontFamily: 'var(--ie-font-mono)' }}>{l.time}</div>
                  )}
                </div>
              </div>
            );
          })}
        </IECard>
      </div>

      {/* Meta */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 12, color: 'var(--ie-text-muted)', marginBottom: 10, fontWeight: 600, letterSpacing: 0.5 }}>
          {lang === 'en' ? 'INFO' : '詳細資訊'}
        </div>
        <IECard padding={0}>
          {[
            [lang === 'en' ? 'Purchased' : '購買日', item.purchasedAt || '—'],
            [lang === 'en' ? 'Expires' : '有效期限', item.expireAt ? `${item.expireAt} (${days >= 0 ? 'D-' + days : 'D+' + -days})` : (lang === 'en' ? 'No expiry' : '無期限')],
            [lang === 'en' ? 'Creator' : '新增者', creator.name + (item.creatorId === IE_MOCK.me.id ? (lang === 'en' ? ' (me)' : '（我）') : '')],
            [lang === 'en' ? 'Last editor' : '最後編輯', editor.name + '・' + item.updatedAt.replace('T', ' ')],
          ].map(([k, v], i, arr) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between', gap: 12,
              padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--ie-border)' : 0,
              fontSize: 13,
            }}>
              <span style={{ color: 'var(--ie-text-muted)' }}>{k}</span>
              <span style={{ color: 'var(--ie-text)', fontWeight: 500, textAlign: 'right' }}>{v}</span>
            </div>
          ))}
        </IECard>
      </div>

      {item.note && (
        <div style={{ padding: '16px 16px 0' }}>
          <IECard padding={14} style={{ background: 'var(--ie-primary-soft)', borderColor: 'transparent' }}>
            <div style={{ fontSize: 12, color: 'var(--ie-primary)', fontWeight: 700, marginBottom: 4 }}>
              {lang === 'en' ? 'NOTE' : '備註'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ie-text)', lineHeight: 1.5 }}>{item.note}</div>
          </IECard>
        </div>
      )}

      {/* Quick actions */}
      <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <IEButton variant="soft">{lang === 'en' ? 'Mark finished' : '標為使用完畢'}</IEButton>
        <IEButton variant="soft">{lang === 'en' ? 'Discard' : '丟棄'}</IEButton>
      </div>
    </div>
  );
}

// ── SCREEN: ADD ITEM (single-page variant) ────────────
function IEAddScreen({ lang, onDone, onBack, variant = 'single' }) {
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [cat, setCat] = React.useState('food');
  const [scope, setScope] = React.useState('family');
  const t = lang === 'en' ? {
    name: 'Item name', nameHint: 'e.g. Fresh milk 1L',
    photo: 'Item photo', locPhoto: 'Location photo', loc: 'Location',
    locHint: 'e.g. Fridge · Shelf 2', exp: 'Expires on',
    purchased: 'Purchased on', cat: 'Category', scope: 'Scope',
    family: 'Family', personal: 'Personal only', note: 'Note (optional)',
    save: 'Save item', next: 'Next', back: 'Back',
  } : {
    name: '品名', nameHint: '例：鮮奶 1L',
    photo: '物品照片', locPhoto: '放置位置照片', loc: '放置位置',
    locHint: '例：冰箱 第二層', exp: '有效期限',
    purchased: '購買日期', cat: '物品分類', scope: '通知範圍',
    family: '家庭共用', personal: '僅個人可見', note: '備註（可選）',
    save: '儲存', next: '下一步', back: '上一步',
  };

  const inputStyle = {
    display: 'block', width: '100%', padding: '12px 14px',
    border: '1px solid var(--ie-border)', borderRadius: 12,
    background: 'var(--ie-surface)', fontSize: 15, color: 'var(--ie-text)',
    fontFamily: 'var(--ie-font)',
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: 'var(--ie-text-muted)', marginBottom: 6, display: 'block' };

  const steps = [
    // Step 0: photos
    <div key="s0" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <label style={labelStyle}>{t.photo}</label>
        <button style={{ width: '100%', padding: 0, border: 0, background: 'transparent', cursor: 'pointer' }}>
          <div style={{
            height: 200, borderRadius: 16,
            background: 'var(--ie-surface-2)', border: '2px dashed var(--ie-border)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: 'var(--ie-text-muted)',
          }}>
            <IEIcon name="camera" size={32} /><span style={{ fontSize: 13 }}>{lang === 'en' ? 'Tap to take photo' : '點擊拍照'}</span>
          </div>
        </button>
      </div>
      <div>
        <label style={labelStyle}>{t.locPhoto}</label>
        <button style={{ width: '100%', padding: 0, border: 0, background: 'transparent', cursor: 'pointer' }}>
          <div style={{
            height: 140, borderRadius: 16,
            background: 'var(--ie-surface-2)', border: '2px dashed var(--ie-border)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: 'var(--ie-text-muted)',
          }}>
            <IEIcon name="pin" size={24} /><span style={{ fontSize: 13 }}>{lang === 'en' ? 'Add location photo' : '加入位置照片'}</span>
          </div>
        </button>
      </div>
    </div>,
    // Step 1: basics
    <div key="s1" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div><label style={labelStyle}>{t.name}</label>
        <input style={inputStyle} placeholder={t.nameHint} value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div><label style={labelStyle}>{t.loc}</label>
        <input style={inputStyle} placeholder={t.locHint} />
      </div>
      <div><label style={labelStyle}>{t.cat}</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
          {IE_MOCK.categories.slice(0,8).map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              padding: '10px 6px', borderRadius: 10,
              background: cat === c.id ? 'var(--ie-primary-soft)' : 'var(--ie-surface)',
              border: '1px solid ' + (cat === c.id ? 'var(--ie-primary)' : 'var(--ie-border)'),
              fontSize: 11, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              fontFamily: 'var(--ie-font)', color: 'var(--ie-text)',
            }}>
              <span style={{ fontSize: 20 }}>{c.icon}</span>
              <span>{c[lang] || c.zh}</span>
            </button>
          ))}
        </div>
      </div>
    </div>,
    // Step 2: dates + scope
    <div key="s2" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div><label style={labelStyle}>{t.purchased}</label>
        <input style={inputStyle} type="date" defaultValue="2026-04-18" />
      </div>
      <div><label style={labelStyle}>{t.exp}</label>
        <input style={inputStyle} type="date" defaultValue="2026-05-01" />
      </div>
      <div><label style={labelStyle}>{t.scope}</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['family', t.family, '家中成員都看得到'], ['personal', t.personal, '僅本人可見']].map(([v, lbl, desc]) => (
            <button key={v} onClick={() => setScope(v)} style={{
              padding: 14, borderRadius: 12, textAlign: 'left',
              background: scope === v ? 'var(--ie-primary-soft)' : 'var(--ie-surface)',
              border: '1px solid ' + (scope === v ? 'var(--ie-primary)' : 'var(--ie-border)'),
              cursor: 'pointer', fontFamily: 'var(--ie-font)',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ie-text)' }}>{lbl}</div>
              <div style={{ fontSize: 11, color: 'var(--ie-text-muted)', marginTop: 4 }}>
                {lang === 'en' ? (v === 'family' ? 'Visible to all family' : 'Only you') : desc}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div><label style={labelStyle}>{t.note}</label>
        <textarea rows={3} style={{ ...inputStyle, resize: 'none', fontFamily: 'var(--ie-font)' }} />
      </div>
    </div>,
  ];

  if (variant === 'single') {
    return (
      <div style={{ padding: '16px 16px 140px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {steps.map((s, i) => <React.Fragment key={i}>{s}</React.Fragment>)}
        <IEButton variant="primary" full size="lg" onClick={onDone}>{t.save}</IEButton>
      </div>
    );
  }

  // Stepper variant
  return (
    <div style={{ padding: '0 0 140px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ padding: '8px 16px', display: 'flex', gap: 4 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= step ? 'var(--ie-primary)' : 'var(--ie-border)',
          }} />
        ))}
      </div>
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 11, color: 'var(--ie-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6 }}>
          {lang === 'en' ? `Step ${step + 1} of 3` : `步驟 ${step + 1} / 3`}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ie-text)', marginTop: 2 }}>
          {[lang === 'en' ? 'Photos' : '拍照', lang === 'en' ? 'Basics' : '基本資料', lang === 'en' ? 'Dates & scope' : '日期與範圍'][step]}
        </div>
      </div>
      <div style={{ padding: '0 16px' }}>{steps[step]}</div>
      <div style={{ padding: 16, display: 'flex', gap: 10 }}>
        {step > 0 && <IEButton variant="soft" size="lg" onClick={() => setStep(step - 1)}>{t.back}</IEButton>}
        <div style={{ flex: 1 }}>
          <IEButton variant="primary" full size="lg" onClick={() => step < 2 ? setStep(step + 1) : onDone()}>
            {step < 2 ? t.next : t.save}
          </IEButton>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { IEDetailScreen, IEAddScreen });
