export type ThemeName = 'warm' | 'playful' | 'minimal' | 'tech';

export interface StatusColor { bg: string; ink: string }

export interface ThemeTokens {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  primary: string;
  primaryInk: string;
  primarySoft: string;
  accent: string;
  accentSoft: string;
  danger: string;
  warning: string;
  success: string;
  info: string;
  tabActive: string;
  elfBg: string;
  elfInk: string;
  statusNew: StatusColor;
  statusActive: StatusColor;
  statusExpiring: StatusColor;
  statusExpired: StatusColor;
  statusFinished: StatusColor;
  statusDiscarded: StatusColor;
  statusPaused: StatusColor;
  radiusSm: number;
  radius: number;
  radiusLg: number;
  radiusXl: number;
  isDark: boolean;
}

export const themes: Record<ThemeName, ThemeTokens> = {
  warm: {
    bg: '#faf6f1', surface: '#ffffff', surface2: '#f3ece3', border: '#e9dfd1',
    text: '#2a211a', textMuted: '#7a6a5c', textSubtle: '#a8978a',
    primary: '#b8764a', primaryInk: '#ffffff', primarySoft: '#f3e3d2',
    accent: '#6b8e5a', accentSoft: '#e3ecd9',
    danger: '#c25a45', warning: '#d99b4a', success: '#6b8e5a', info: '#5a80a3',
    tabActive: '#b8764a', elfBg: '#f3e3d2', elfInk: '#b8764a',
    statusNew:       { bg: '#e8f0f8', ink: '#5a80a3' },
    statusActive:    { bg: '#e3ede8', ink: '#6b8e5a' },
    statusExpiring:  { bg: '#f8f0dd', ink: '#d99b4a' },
    statusExpired:   { bg: '#f5e8e5', ink: '#c25a45' },
    statusFinished:  { bg: '#f3ece3', ink: '#7a6a5c' },
    statusDiscarded: { bg: '#f3ece3', ink: '#a8978a' },
    statusPaused:    { bg: '#f3ece3', ink: '#7a6a5c' },
    radiusSm: 8, radius: 14, radiusLg: 22, radiusXl: 28, isDark: false,
  },
  playful: {
    bg: '#fdf9f5', surface: '#ffffff', surface2: '#fff2ea', border: '#f5dccb',
    text: '#2a1d23', textMuted: '#7a5a63', textSubtle: '#b99ca5',
    primary: '#e97a6a', primaryInk: '#ffffff', primarySoft: '#ffe1d9',
    accent: '#72b8a3', accentSoft: '#d6ede5',
    danger: '#d94a6a', warning: '#f2b23a', success: '#72b8a3', info: '#6a9ad9',
    tabActive: '#e97a6a', elfBg: '#ffe1d9', elfInk: '#e97a6a',
    statusNew:       { bg: '#e8effa', ink: '#6a9ad9' },
    statusActive:    { bg: '#d6ede5', ink: '#72b8a3' },
    statusExpiring:  { bg: '#fef4df', ink: '#f2b23a' },
    statusExpired:   { bg: '#fde8ee', ink: '#d94a6a' },
    statusFinished:  { bg: '#fff2ea', ink: '#7a5a63' },
    statusDiscarded: { bg: '#fff2ea', ink: '#b99ca5' },
    statusPaused:    { bg: '#fff2ea', ink: '#7a5a63' },
    radiusSm: 8, radius: 14, radiusLg: 22, radiusXl: 28, isDark: false,
  },
  minimal: {
    bg: '#f5f5f7', surface: '#ffffff', surface2: '#ededef', border: '#e2e2e6',
    text: '#1c1c1e', textMuted: '#636366', textSubtle: '#a8a8aa',
    primary: '#1c1c1e', primaryInk: '#ffffff', primarySoft: '#e6e6e8',
    accent: '#0a84ff', accentSoft: '#d6e9ff',
    danger: '#d0342c', warning: '#e89a1e', success: '#2f9e66', info: '#0a84ff',
    tabActive: '#1c1c1e', elfBg: '#e6e6e8', elfInk: '#1c1c1e',
    statusNew:       { bg: '#d6e9ff', ink: '#0a84ff' },
    statusActive:    { bg: '#d4ede2', ink: '#2f9e66' },
    statusExpiring:  { bg: '#fef4e0', ink: '#e89a1e' },
    statusExpired:   { bg: '#fde8e7', ink: '#d0342c' },
    statusFinished:  { bg: '#ededef', ink: '#636366' },
    statusDiscarded: { bg: '#ededef', ink: '#a8a8aa' },
    statusPaused:    { bg: '#ededef', ink: '#636366' },
    radiusSm: 8, radius: 14, radiusLg: 22, radiusXl: 28, isDark: false,
  },
  tech: {
    bg: '#0d0f14', surface: '#161a23', surface2: '#1f2432', border: '#2a3040',
    text: '#e7ecf3', textMuted: '#9aa3b2', textSubtle: '#5a6272',
    primary: '#6ce3b8', primaryInk: '#0d0f14', primarySoft: '#1f3a32',
    accent: '#7ab8ff', accentSoft: '#1c2a3e',
    danger: '#ff6a6a', warning: '#ffc56a', success: '#6ce3b8', info: '#7ab8ff',
    tabActive: '#6ce3b8', elfBg: '#1f3a32', elfInk: '#6ce3b8',
    statusNew:       { bg: '#1c2a3e', ink: '#7ab8ff' },
    statusActive:    { bg: '#1f3a32', ink: '#6ce3b8' },
    statusExpiring:  { bg: '#332b15', ink: '#ffc56a' },
    statusExpired:   { bg: '#331515', ink: '#ff6a6a' },
    statusFinished:  { bg: '#1f2432', ink: '#9aa3b2' },
    statusDiscarded: { bg: '#1f2432', ink: '#5a6272' },
    statusPaused:    { bg: '#1f2432', ink: '#9aa3b2' },
    radiusSm: 8, radius: 14, radiusLg: 22, radiusXl: 28, isDark: true,
  },
};

export type StatusKey = 'new' | 'active' | 'expiring' | 'expired' | 'finished' | 'discarded' | 'paused';

export const STATUS_LABELS: Record<StatusKey, { zh: string; en: string }> = {
  new:       { zh: '新增',   en: 'New' },
  active:    { zh: '使用中', en: 'Active' },
  expiring:  { zh: '快到期', en: 'Expiring' },
  expired:   { zh: '過期',   en: 'Expired' },
  finished:  { zh: '用完',   en: 'Finished' },
  discarded: { zh: '丟棄',   en: 'Discarded' },
  paused:    { zh: '暫停',   en: 'Paused' },
};

export function getStatusColor(t: ThemeTokens, status: StatusKey): StatusColor {
  const map: Record<StatusKey, StatusColor> = {
    new:       t.statusNew,
    active:    t.statusActive,
    expiring:  t.statusExpiring,
    expired:   t.statusExpired,
    finished:  t.statusFinished,
    discarded: t.statusDiscarded,
    paused:    t.statusPaused,
  };
  return map[status] || t.statusActive;
}
