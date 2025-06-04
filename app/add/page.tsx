import HabitForm from '../../components/HabitForm';
import Link from 'next/link';

export default function AddPage() {
  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Alışkanlık Ekle</h1>
      <HabitForm />
      <Link href="/" className="text-blue-600 block text-center">Geri</Link>
    </main>
  );
}
