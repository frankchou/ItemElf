import React, { createContext, useContext, useState } from 'react';
import { ThemeName, ThemeTokens, themes } from '../theme/tokens';

export type Lang = 'zh' | 'en';
export type UserRole = 'owner' | 'member';
export type ViewScope = 'family' | 'personal';
export type SearchVariant = 'list' | 'card';
export type AddVariant = 'single' | 'step';
export type ExpiringVariant = 'timeline' | 'badge';

export interface AppState {
  theme: ThemeName;
  lang: Lang;
  role: UserRole;
  view: ViewScope;
  searchVariant: SearchVariant;
  addVariant: AddVariant;
  expiringVariant: ExpiringVariant;
  isLoggedIn: boolean;
}

interface AppContextType {
  state: AppState;
  t: ThemeTokens;
  set: (patch: Partial<AppState>) => void;
}

const defaultState: AppState = {
  theme: 'warm',
  lang: 'zh',
  role: 'owner',
  view: 'family',
  searchVariant: 'list',
  addVariant: 'single',
  expiringVariant: 'timeline',
  isLoggedIn: false,
};

const AppContext = createContext<AppContextType>({
  state: defaultState,
  t: themes.warm,
  set: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const set = (patch: Partial<AppState>) =>
    setState(prev => ({ ...prev, ...patch }));
  return (
    <AppContext.Provider value={{ state, t: themes[state.theme], set }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
export const useTheme = () => useContext(AppContext).t;
export const useLang = () => useContext(AppContext).state.lang;
