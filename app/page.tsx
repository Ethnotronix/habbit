import HabitList from '../components/HabitList';
import { Card, CardContent } from '../components/ui/card';

export default function Home() {
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
