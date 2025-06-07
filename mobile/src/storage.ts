import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export type Habit = {
  id: number;
  name: string;
  color: string;
  target: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  count: number;
  lastReset: number;
};

export function getPeriodStart(date: number, freq: Habit['frequency']) {
  const d = new Date(date);
  if (freq === 'daily') {
    d.setHours(0, 0, 0, 0);
  } else if (freq === 'weekly') {
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
  } else {
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
  }
  return d.getTime();
}

export function resetIfNeeded(habit: Habit) {
  const now = Date.now();
  const start = getPeriodStart(now, habit.frequency);
  if (habit.lastReset !== start) {
    habit.count = 0;
    habit.lastReset = start;
  }
}

export async function syncFromCloud(user: User): Promise<Habit[]> {
  const { data } = await supabase
    .from('habits')
    .select('id, name, color, target, frequency, count, lastReset')
    .eq('user_id', user.id);
  return (
    (data as any[])?.map(row => ({
      id: row.id,
      name: row.name,
      color: row.color,
      target: row.target,
      frequency: row.frequency,
      count: row.count,
      lastReset: row.lastReset,
    })) || []
  );
}

export async function syncToCloud(user: User, habits: Habit[]) {
  await supabase.from('habits').delete().eq('user_id', user.id);
  if (habits.length > 0) {
    const rows = habits.map(h => ({
      id: h.id,
      name: h.name,
      color: h.color,
      target: h.target,
      frequency: h.frequency,
      count: h.count,
      lastReset: h.lastReset,
      user_id: user.id,
    }));
    await supabase.from('habits').insert(rows);
  }
}
