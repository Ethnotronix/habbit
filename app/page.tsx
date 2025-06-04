import Link from 'next/link';
import HabitList from '../components/HabitList';

export default function Home() {
  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Alışkanlıklar</h1>
      <Link href="/add" className="bg-green-600 text-white px-4 py-2 block text-center rounded">
        Yeni Alışkanlık Ekle
      </Link>
      <HabitList />
    </main>
  );
}
