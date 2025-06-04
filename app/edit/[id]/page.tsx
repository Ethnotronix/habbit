import { notFound } from 'next/navigation';
import HabitForm from '../../../components/HabitForm';
import { loadHabits } from '../../../lib/storage';
import Link from 'next/link';

export default function EditPage({ params }: { params: { id: string } }) {
  const habits = loadHabits();
  const habit = habits.find(h => h.id === Number(params.id));
  if (!habit) return notFound();

  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Alışkanlığı Düzenle</h1>
      <HabitForm habit={habit} />
      <Link href="/" className="text-blue-600 block text-center">Geri</Link>
    </main>
  );
}
