import { notFound } from 'next/navigation';
import HabitForm from '../../../components/HabitForm';
import { loadHabits } from '../../../lib/storage';
import Link from 'next/link';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

export default function EditPage({ params }: { params: { id: string } }) {
  const habits = loadHabits();
  const habit = habits.find(h => h.id === Number(params.id));
  if (!habit) return notFound();

  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Alışkanlığı Düzenle</h1>
      <Card>
        <CardContent>
          <HabitForm habit={habit} />
        </CardContent>
      </Card>
      <Button asChild variant="link" className="w-full justify-center">
        <Link href="/">Geri</Link>
      </Button>
    </main>
  );
}
