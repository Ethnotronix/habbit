'use client';
import { useState } from 'react';
import { Habit, loadHabits, saveHabits, getPeriodStart } from '../lib/storage';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function HabitForm({ habit }: { habit?: Habit }) {
  const router = useRouter();
  const [name, setName] = useState(habit?.name || '');
  const [color, setColor] = useState(habit?.color || '#3498db');
  const colors = [
    '#3498db',
    '#e74c3c',
    '#2ecc71',
    '#f1c40f',
    '#9b59b6',
    '#1abc9c',
    '#e67e22',
    '#95a5a6',
  ];
  const [target, setTarget] = useState(habit?.target || 1);
  const [frequency, setFrequency] = useState<Habit['frequency']>(habit?.frequency || 'daily');

  const save = () => {
    const habits = loadHabits();
    if (habit) {
      const h = habits.find(h => h.id === habit.id);
      if (h) {
        h.name = name;
        h.color = color;
        h.target = target;
        h.frequency = frequency;
      }
    } else {
      habits.push({
        id: Date.now(),
        name,
        color,
        target,
        frequency,
        count: 0,
        lastReset: getPeriodStart(Date.now(), frequency),
      });
    }
    saveHabits(habits);
    router.push('/');
  };

  const deleteHabit = () => {
    if (!habit) return;
    const habits = loadHabits().filter(h => h.id !== habit.id);
    saveHabits(habits);
    router.push('/');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label>İsim</Label>
        <Input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label>Renk</Label>
        <div className="flex flex-wrap gap-2">
          {colors.map(c => (
            <button
              key={c}
              type="button"
              className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-black' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <Label>Tekrar Sayısı</Label>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setTarget(n)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm ${target === n ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <Label>Periyot</Label>
        <div className="flex gap-2">
          {(
            [
              { value: 'daily', label: 'Günlük' },
              { value: 'weekly', label: 'Haftalık' },
              { value: 'monthly', label: 'Aylık' },
            ] as { value: Habit['frequency']; label: string }[]
          ).map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFrequency(opt.value)}
              className={`px-3 py-1 rounded border text-sm ${frequency === opt.value ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={save}>Kaydet</Button>
        {habit && (
          <Button variant="destructive" onClick={deleteHabit}>Sil</Button>
        )}
      </div>
    </div>
  );
}
