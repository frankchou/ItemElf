import { Item } from '../data/types';

const TODAY = new Date('2026-04-18');

export function daysLeft(date: string | null): number | null {
  if (!date) return null;
  return Math.ceil((new Date(date).getTime() - TODAY.getTime()) / 86400000);
}

export function statusOfItem(item: Pick<Item, 'status' | 'expireAt'>): string {
  if (['discarded', 'finished', 'paused'].includes(item.status)) return item.status;
  const d = daysLeft(item.expireAt);
  if (d === null) return item.status === 'new' ? 'new' : 'active';
  if (d < 0) return 'expired';
  if (d <= 7) return 'expiring';
  return item.status === 'new' ? 'new' : 'active';
}
