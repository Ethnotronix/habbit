import HabitForm from '../../components/HabitForm';
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function AddPage() {
  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Alışkanlık Ekle</h1>
      <Card>
        <CardContent>
          <HabitForm />
        </CardContent>
      </Card>
      <Button asChild variant="link" className="w-full justify-center">
        <Link href="/">Geri</Link>
      </Button>
    </main>
  );
}
