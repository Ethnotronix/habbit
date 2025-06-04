'use client';
import {
  Habit,
  resetIfNeeded,
  syncFromCloud,
  syncToCloud,
} from '../lib/storage';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useAuth } from './AuthProvider';

export default function HabitList() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    async function init() {
      if (!user) return;
      const h = await syncFromCloud(user);
      h.forEach(resetIfNeeded);
      await syncToCloud(user, h);
      setHabits([...h]);
    }
    void init();
  }, [user]);

  const update = async (id: number, delta: number) => {
    if (!user) return;
    const h = [...habits];
    const habit = h.find(x => x.id === id);
    if (!habit) return;
    resetIfNeeded(habit);
    habit.count = Math.max(0, Math.min(habit.target, habit.count + delta));
    await syncToCloud(user, h);
    setHabits([...h]);
  };

  const moveHabit = async (id: number, freq: Habit['frequency']) => {
    if (!user) return;
    const h = [...habits];
    const habit = h.find(x => x.id === id);
    if (!habit) return;
    habit.frequency = freq;
    await syncToCloud(user, h);
    setHabits([...h]);
  };

  const groups: Record<Habit['frequency'], Habit[]> = {
    daily: [],
    weekly: [],
    monthly: [],
  };
  habits.forEach(h => groups[h.frequency].push(h));

  const titles: Record<Habit['frequency'], string> = {
    daily: 'Günlük',
    weekly: 'Haftalık',
    monthly: 'Aylık',
  };

  return (
    <div className="space-y-6">
      {(['daily', 'weekly', 'monthly'] as Habit['frequency'][]).map(freq => (
        <div
          key={freq}
          onDragOver={e => e.preventDefault()}
          onDrop={async e => {
            const id = Number(e.dataTransfer.getData('id'));
            if (id) await moveHabit(id, freq);
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{titles[freq]}</h2>
            <Button asChild size="sm" variant="secondary">
              <Link href={`/add?frequency=${freq}`}>+</Link>
            </Button>
          </div>
          <div className="space-y-2">
            {groups[freq].map(h => (
              <div
                key={h.id}
                draggable
                onDragStart={e => e.dataTransfer.setData('id', String(h.id))}
                className="p-3 rounded-lg text-white flex justify-between items-center shadow"
                style={{ backgroundColor: h.color }}
              >
                <span className="font-medium">
                  {h.name} ({h.count}/{h.target})
                </span>
                <div className="space-x-1">
                  <Button variant="outline" className="px-2 py-1" onClick={() => void update(h.id, -1)}>
                    -
                  </Button>
                  <Button variant="outline" className="px-2 py-1" onClick={() => void update(h.id, 1)}>
                    +
                  </Button>
                  <Button asChild variant="outline" className="px-2 py-1">
                    <Link href={`/edit/${h.id}`}>✏️</Link>
                  </Button>
                </div>
              </div>
            ))}
            {groups[freq].length === 0 && (
              <p className="text-gray-500">Alışkanlık yok</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
