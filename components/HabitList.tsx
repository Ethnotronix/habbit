'use client';
import { Habit, loadHabits, saveHabits, resetIfNeeded } from '../lib/storage';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const h = loadHabits();
    h.forEach(resetIfNeeded);
    saveHabits(h);
    setHabits([...h]);
  }, []);

  const update = (id: number, delta: number) => {
    const h = loadHabits();
    const habit = h.find(x => x.id === id);
    if (!habit) return;
    resetIfNeeded(habit);
    habit.count = Math.max(0, Math.min(habit.target, habit.count + delta));
    saveHabits(h);
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
        <div key={freq}>
          <h2 className="text-xl font-semibold mb-2">{titles[freq]}</h2>
          <div className="space-y-2">
            {groups[freq].map(h => (
              <div
                key={h.id}
                className="p-3 rounded-lg text-white flex justify-between items-center shadow"
                style={{ backgroundColor: h.color }}
              >
                <span className="font-medium">
                  {h.name} ({h.count}/{h.target})
                </span>
                <div className="space-x-1">
                  <Button
                    className="bg-black/30 hover:bg-black/40 px-2 py-1"
                    onClick={() => update(h.id, -1)}
                  >
                    -
                  </Button>
                  <Button
                    className="bg-black/30 hover:bg-black/40 px-2 py-1"
                    onClick={() => update(h.id, 1)}
                  >
                    +
                  </Button>
                  <Link
                    href={`/edit/${h.id}`}
                    className="bg-black/30 hover:bg-black/40 px-2 py-1 rounded transition-colors"
                  >
                    ✏️
                  </Link>
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
