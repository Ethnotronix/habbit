import HabitForm from '../../components/HabitForm';
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Habit } from '../../lib/storage';

export default function AddPage({ searchParams }: { searchParams: { frequency?: Habit['frequency'] } }) {
  const freq = searchParams.frequency as Habit['frequency'] | undefined;
  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Alışkanlık Ekle</h1>
      <Card>
        <CardContent>
          <HabitForm initialFrequency={freq} />
        </CardContent>
      </Card>
      <Button asChild variant="link" className="w-full justify-center">
        <Link href="/">Geri</Link>
      </Button>
    </main>
  );
}
