import Link from 'next/link';
import HabitList from '../components/HabitList';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Alışkanlıklar</h1>
      <Button asChild className="bg-green-600 hover:bg-green-700 w-full">
        <Link href="/add">Yeni Alışkanlık Ekle</Link>
      </Button>
      <Card>
        <CardContent>
          <HabitList />
        </CardContent>
      </Card>
    </main>
  );
}
