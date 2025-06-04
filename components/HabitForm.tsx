'use client';
import { useState } from 'react';
import { Habit, loadHabits, saveHabits, getPeriodStart } from '../lib/storage';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';

export default function HabitForm({ habit }: { habit?: Habit }) {
  const router = useRouter();
  const [name, setName] = useState(habit?.name || '');
  const [color, setColor] = useState(habit?.color || '#3498db');
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
      <div>
        <label className="block mb-1">İsim</label>
        <Input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label className="block mb-1">Renk</label>
        <Input type="color" className="w-16 h-10" value={color} onChange={e => setColor(e.target.value)} />
      </div>
      <div>
        <label className="block mb-1">Tekrar Sayısı</label>
        <Input type="number" min="1" value={target} onChange={e => setTarget(parseInt(e.target.value))} />
      </div>
      <div>
        <label className="block mb-1">Aralık</label>
        <Select value={frequency} onChange={e => setFrequency(e.target.value as any)}>
          <option value="daily">Günlük</option>
          <option value="weekly">Haftalık</option>
          <option value="monthly">Aylık</option>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button onClick={save}>Kaydet</Button>
        {habit && (
          <Button className="bg-red-600 hover:bg-red-700" onClick={deleteHabit}>Sil</Button>
        )}
      </div>
    </div>
  );
}
