// ItemElf — Shared UI components
// Depends on design-system/tokens.css being loaded.

const IE_STATUS = {
  new:       { zh: '新增',   en: 'New',       dot: 'var(--ie-status-new-ink)',       bg: 'var(--ie-status-new-bg)',       ink: 'var(--ie-status-new-ink)' },
  active:    { zh: '使用中', en: 'Active',    dot: 'var(--ie-status-active-ink)',    bg: 'var(--ie-status-active-bg)',    ink: 'var(--ie-status-active-ink)' },
  expiring:  { zh: '快到期', en: 'Expiring',  dot: 'var(--ie-status-expiring-ink)',  bg: 'var(--ie-status-expiring-bg)',  ink: 'var(--ie-status-expiring-ink)' },
  expired:   { zh: '過期',   en: 'Expired',   dot: 'var(--ie-status-expired-ink)',   bg: 'var(--ie-status-expired-bg)',   ink: 'var(--ie-status-expired-ink)' },
  finished:  { zh: '用完',   en: 'Finished',  dot: 'var(--ie-status-finished-ink)',  bg: 'var(--ie-status-finished-bg)',  ink: 'var(--ie-status-finished-ink)' },
  discarded: { zh: '丟棄',   en: 'Discarded', dot: 'var(--ie-status-discarded-ink)', bg: 'var(--ie-status-discarded-bg)', ink: 'var(--ie-status-discarded-ink)' },
  paused:    { zh: '暫停',   en: 'Paused',    dot: 'var(--ie-status-paused-ink)',    bg: 'var(--ie-status-paused-bg)',    ink: 'var(--ie-status-paused-ink)' },
};

// ── Status pill ─────────────────────────────────────────────
function IEStatusPill({ status, lang = 'zh', size = 'md' }) {
  const s = IE_STATUS[status] || IE_STATUS.new;
  const pad = size === 'sm' ? '2px 8px' : '4px 10px';
  const fs  = size === 'sm' ? 11 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: pad, borderRadius: 999,
      background: s.bg, color: s.ink,
      fontSize: fs, fontWeight: 600, lineHeight: 1.2,
      fontFamily: 'var(--ie-font)',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
      {s[lang] || s.zh}
    </span>
  );
}

// ── Category tag ────────────────────────────────────────────
function IETag({ children, tone = 'neutral' }) {
  const tones = {
    neutral:{ bg: 'var(--ie-surface-2)', ink: 'var(--ie-text-muted)' },
    primary:{ bg: 'var(--ie-primary-soft)', ink: 'var(--ie-primary)' },
    accent: { bg: 'var(--ie-accent-soft)', ink: 'var(--ie-accent)' },
    warn:   { bg: 'var(--ie-status-expiring-bg)', ink: 'var(--ie-status-expiring-ink)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 8px', borderRadius: 6,
      background: t.bg, color: t.ink,
      fontSize: 11, fontWeight: 500,
      fontFamily: 'var(--ie-font)',
    }}>{children}</span>
  );
}

// ── Elf mascot placeholder ─────────────────────────────────
function IEElf({ size = 64, mood = 'happy' }) {
  const ear = { happy: 0, alert: -10, sleepy: 6 }[mood] || 0;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'var(--ie-elf-bg)', color: 'var(--ie-elf-ink)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', flexShrink: 0,
    }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 40 40" fill="none">
        {/* hat */}
        <path d={`M20 3 L${28 + ear/3} 14 L${12 - ear/3} 14 Z`} fill="currentColor" />
        <circle cx="20" cy="3.5" r="1.6" fill="currentColor" opacity="0.7"/>
        {/* face */}
        <circle cx="20" cy="22" r="9" fill="currentColor" opacity="0.18"/>
        {/* eyes */}
        <circle cx="16.5" cy="21" r="1.3" fill="currentColor" />
        <circle cx="23.5" cy="21" r="1.3" fill="currentColor" />
        {/* smile */}
        <path d="M16 25 Q20 28 24 25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        {/* ears */}
        <path d={`M11 19 Q${7 + ear} 17 10 22`} stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d={`M29 19 Q${33 - ear} 17 30 22`} stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      </svg>
      <span style={{
        position: 'absolute', bottom: -4, right: -4,
        fontFamily: 'var(--ie-font-mono)', fontSize: 8,
        color: 'var(--ie-text-subtle)', background: 'var(--ie-surface)',
        padding: '1px 4px', borderRadius: 4,
      }}>elf</span>
    </div>
  );
}

// ── Image placeholder (striped) ────────────────────────────
function IEImage({ label = 'photo', w = '100%', h = 120, radius = 12 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      background: `repeating-linear-gradient(135deg,
        var(--ie-surface-2) 0 12px,
        color-mix(in oklch, var(--ie-surface-2) 70%, var(--ie-border)) 12px 24px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--ie-font-mono)', fontSize: 11,
      color: 'var(--ie-text-subtle)', overflow: 'hidden',
      border: '1px solid var(--ie-border)',
    }}>{label}</div>
  );
}

// ── Button ────────────────────────────────────────────────
function IEButton({ children, variant = 'primary', full = false, size = 'md', onClick, icon }) {
  const sizes = {
    sm: { p: '8px 14px', fs: 13, h: 36 },
    md: { p: '11px 18px', fs: 15, h: 46 },
    lg: { p: '14px 22px', fs: 16, h: 52 },
  };
  const variants = {
    primary: { bg: 'var(--ie-primary)', ink: 'var(--ie-primary-ink)', bd: 'transparent' },
    ghost:   { bg: 'transparent', ink: 'var(--ie-text)', bd: 'var(--ie-border)' },
    soft:    { bg: 'var(--ie-surface-2)', ink: 'var(--ie-text)', bd: 'transparent' },
    danger:  { bg: 'var(--ie-danger)', ink: '#fff', bd: 'transparent' },
  };
  const s = sizes[size]; const v = variants[variant];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: s.p, height: s.h,
      borderRadius: 999, border: `1px solid ${v.bd}`,
      background: v.bg, color: v.ink,
      fontSize: s.fs, fontWeight: 600,
      fontFamily: 'var(--ie-font)', cursor: 'pointer',
      width: full ? '100%' : undefined,
      transition: 'transform 120ms ease, filter 120ms ease',
    }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
       onMouseUp={(e) => e.currentTarget.style.transform = ''}
       onMouseLeave={(e) => e.currentTarget.style.transform = ''}>
      {icon}{children}
    </button>
  );
}

// ── Input ────────────────────────────────────────────────
function IEInput({ placeholder, value, onChange, icon, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 16px', borderRadius: 14,
      background: 'var(--ie-surface-2)',
      border: '1px solid transparent',
      ...style,
    }}>
      {icon && <span style={{ color: 'var(--ie-text-muted)', display: 'flex' }}>{icon}</span>}
      <input
        value={value} onChange={onChange} placeholder={placeholder}
        style={{
          flex: 1, border: 0, outline: 0, background: 'transparent',
          fontSize: 15, color: 'var(--ie-text)',
          fontFamily: 'var(--ie-font)',
        }}
      />
    </div>
  );
}

// ── Tab bar (bottom nav) ─────────────────────────────────
function IETabBar({ active, onChange, lang = 'zh' }) {
  const t = {
    search:   { zh: '搜尋',   en: 'Search',   icon: 'search' },
    family:   { zh: '家族',   en: 'Family',   icon: 'users' },
    manage:   { zh: '物品',   en: 'Items',    icon: 'box' },
    settings: { zh: '設定',   en: 'Settings', icon: 'gear' },
  };
  const order = ['search', 'family', 'manage', 'settings'];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      background: 'color-mix(in oklch, var(--ie-surface) 85%, transparent)',
      backdropFilter: 'blur(18px) saturate(160%)',
      WebkitBackdropFilter: 'blur(18px) saturate(160%)',
      borderTop: '1px solid var(--ie-border)',
      paddingTop: 8, paddingBottom: 28,
      display: 'flex',
    }}>
      {order.map(k => {
        const isActive = active === k;
        const tint = isActive ? 'var(--ie-tab-active)' : 'var(--ie-text-subtle)';
        return (
          <button key={k} onClick={() => onChange && onChange(k)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 4, padding: '6px 0',
            background: 'transparent', border: 0, cursor: 'pointer',
            color: tint,
          }}>
            <IETabIcon name={t[k].icon} />
            <span style={{ fontSize: 10.5, fontWeight: isActive ? 700 : 500, fontFamily: 'var(--ie-font)' }}>
              {t[k][lang] || t[k].zh}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function IETabIcon({ name }) {
  const common = { width: 24, height: 24, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'search': return (
      <svg viewBox="0 0 24 24" {...common}>
        <circle cx="11" cy="11" r="7"/>
        <path d="m20 20-3.5-3.5"/>
      </svg>);
    case 'users': return (
      <svg viewBox="0 0 24 24" {...common}>
        <circle cx="9" cy="8" r="3.2"/>
        <path d="M3.5 19c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2"/>
        <circle cx="17" cy="7" r="2.6"/>
        <path d="M15 13.5c1-0.5 1.8-0.7 2.8-0.7 2.2 0 3.7 1.4 3.7 3.4"/>
      </svg>);
    case 'box': return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M3.5 7.2 12 3l8.5 4.2v9.6L12 21l-8.5-4.2z"/>
        <path d="M3.5 7.2 12 11.5l8.5-4.3M12 21v-9.5"/>
      </svg>);
    case 'gear': return (
      <svg viewBox="0 0 24 24" {...common}>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v2m0 16v2M4 12H2m20 0h-2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M5.6 18.4l1.4-1.4m10-10 1.4-1.4"/>
      </svg>);
    default: return null;
  }
}

// ── Card container ─────────────────────────────────────
function IECard({ children, style = {}, padding = 16, interactive = false }) {
  return (
    <div style={{
      background: 'var(--ie-surface)',
      border: '1px solid var(--ie-border)',
      borderRadius: 'var(--ie-radius)',
      padding,
      boxShadow: 'var(--ie-shadow-sm)',
      cursor: interactive ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// ── Section header (within a screen) ────────────────────
function IESection({ title, action, children, style = {} }) {
  return (
    <div style={{ padding: '0 16px', ...style }}>
      {(title || action) && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 10, marginTop: 4,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ie-text-muted)', letterSpacing: 0.5, textTransform: 'uppercase' }}>{title}</div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// ── Icon set (inline SVG, stroke) ─────────────────────
function IEIcon({ name, size = 20, color = 'currentColor' }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    plus: <><path d="M12 5v14M5 12h14"/></>,
    back: <><path d="m15 6-6 6 6 6"/></>,
    close: <><path d="M6 6l12 12M18 6 6 18"/></>,
    check: <><path d="m5 12 5 5L20 7"/></>,
    bell: <><path d="M6 8a6 6 0 1 1 12 0c0 7 3 6 3 9H3c0-3 3-2 3-9z"/><path d="M10 19a2 2 0 0 0 4 0"/></>,
    camera: <><path d="M4 7h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="12.5" r="3.5"/></>,
    pin: <><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    filter: <><path d="M4 5h16M7 12h10M10 19h4"/></>,
    qr: <><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2M20 14v2m-6 4h2v-2m4-2v6"/></>,
    edit: <><path d="M4 20h4l10-10-4-4L4 16z"/></>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></>,
    face: <><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><path d="M9 15c1 1 2 1.5 3 1.5s2-0.5 3-1.5"/></>,
    finger: <><path d="M10 14V5a2 2 0 1 1 4 0v6"/><path d="M14 11V4a2 2 0 1 1 4 0v11c0 3-3 6-6 6s-6-2-6-5l-2-4 3-1 3 4"/></>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
}

// ── Elf speech/bubble card ─────────────────────────────
function IEElfBanner({ children, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 14, borderRadius: 18,
      background: 'var(--ie-surface)',
      border: '1px solid var(--ie-border)',
      boxShadow: 'var(--ie-shadow-sm)',
    }}>
      <IEElf size={44} />
      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.5, color: 'var(--ie-text)' }}>{children}</div>
      {action}
    </div>
  );
}

Object.assign(window, {
  IE_STATUS, IEStatusPill, IETag, IEElf, IEImage, IEButton, IEInput,
  IETabBar, IECard, IESection, IEIcon, IEElfBanner,
});
