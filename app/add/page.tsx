import HabitForm from '../../components/HabitForm';
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/card';

export default function AddPage() {
  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Alışkanlık Ekle</h1>
      <Card>
        <CardContent>
          <HabitForm />
        </CardContent>
      </Card>
      <Link href="/" className="text-blue-600 block text-center hover:underline">Geri</Link>
    </main>
  );
}
