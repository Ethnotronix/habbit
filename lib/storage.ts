export type Habit = {
  id: number;
  name: string;
  color: string;
  target: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  count: number;
  lastReset: number;
};

export function loadHabits(): Habit[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('habits');
  return data ? JSON.parse(data) : [];
}

export function saveHabits(habits: Habit[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('habits', JSON.stringify(habits));
}

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
