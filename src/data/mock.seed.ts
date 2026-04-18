import { User, Category, Item, Family, AppNotification } from './types';

export const users: User[] = [
  { id: 'u1', name: '', role: 'owner', avatar: '#b8764a', email: '' },
];

export const me = users[0];

export const categories: Category[] = [
  { id: 'food',     zh: '食物',     en: 'Food',          icon: '🍎', scope: 'family' },
  { id: 'med',      zh: '藥品',     en: 'Medicine',      icon: '💊', scope: 'family' },
  { id: 'clean',    zh: '清潔',     en: 'Cleaning',      icon: '🧴', scope: 'family' },
  { id: '3c',       zh: '3C',       en: 'Tech',          icon: '💻', scope: 'family' },
  { id: 'doc',      zh: '文件',     en: 'Docs',          icon: '📄', scope: 'family' },
  { id: 'cloth',    zh: '衣物',     en: 'Clothing',      icon: '👕', scope: 'family' },
  { id: 'personal', zh: '個人保養', en: 'Personal Care', icon: '🧖', scope: 'personal' },
  { id: 'diary',    zh: '私人日誌', en: 'Diary',         icon: '📓', scope: 'personal' },
];

export const items: Item[] = [];

export const family: Family = {
  id: '',
  name: '',
  createdAt: '',
  ownerId: 'u1',
  memberInvitePolicy: 'owner-only',
  memberApprovePolicy: 'owner-only',
  expireNoticeDays: 7,
};

export const notifications: AppNotification[] = [];

export function userById(id: string): User {
  return users.find(u => u.id === id) ?? { id: '?', name: '—', role: 'member', avatar: '#ccc', email: '' };
}
export function categoryById(id: string) {
  return categories.find(c => c.id === id);
}
export function itemById(id: string) {
  return items.find(i => i.id === id);
}
