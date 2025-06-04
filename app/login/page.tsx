'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/');
    }
  };

  const signUp = async () => {
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <main className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Giriş Yap</h1>
      <Card>
        <CardContent className="space-y-3 py-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-2">
            <Button className="flex-1" onClick={signIn}>Giriş</Button>
            <Button className="flex-1" variant="secondary" onClick={signUp}>Kayıt</Button>
          </div>
        </CardContent>
      </Card>
      <Button asChild variant="link" className="w-full justify-center">
        <Link href="/">Geri</Link>
      </Button>
    </main>
  );
}
