export type Status = 'new' | 'active' | 'expiring' | 'expired' | 'finished' | 'discarded' | 'paused';
export type Scope = 'family' | 'personal';
export type UserRole = 'owner' | 'member';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
}

export interface Category {
  id: string;
  zh: string;
  en: string;
  icon: string;
  scope: Scope;
}

export interface Item {
  id: string;
  name: string;
  nameEn: string;
  scope: Scope;
  category: string;
  location: string;
  locationEn: string;
  status: Status;
  expireAt: string | null;
  purchasedAt: string | null;
  updatedAt: string;
  editorId: string;
  creatorId: string;
  note?: string;
  private?: boolean;
}

export interface Family {
  id: string;
  name: string;
  createdAt: string;
  ownerId: string;
  memberInvitePolicy: 'owner-only' | 'any-member';
  memberApprovePolicy: 'owner-only' | 'any-member';
  expireNoticeDays: number;
}

export interface AppNotification {
  id: string;
  type: 'expiring' | 'added' | 'expired' | 'join';
  itemId?: string;
  text: string;
  time: string;
  actorId: string;
}
