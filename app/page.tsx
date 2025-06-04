'use client';
import HabitList from '../components/HabitList';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center">Alışkanlıklar</h1>
      <Card>
        <CardContent>
          <HabitList />
        </CardContent>
      </Card>
    </main>
  );
}
