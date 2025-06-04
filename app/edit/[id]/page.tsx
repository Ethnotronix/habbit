'use client';
import HabitForm from '../../../components/HabitForm';
import { Habit, syncFromCloud } from '../../../lib/storage';
import Link from 'next/link';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/AuthProvider';

export default function EditPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [habit, setHabit] = useState<Habit | null>(null);

  useEffect(() => {
    async function init() {
      if (!user) {
        router.replace('/login');
        return;
      }
      const habits = await syncFromCloud(user);
      const h = habits.find(x => x.id === Number(params.id));
      if (!h) {
        router.replace('/');
      } else {
        setHabit(h);
      }
    }
    void init();
  }, [params.id, router, user]);

  if (!user || !habit) return <p>Yükleniyor...</p>;

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
