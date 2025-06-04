'use client';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';

export default function UserMenu() {
  const { user } = useAuth();

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <Button asChild variant="link" className="p-0 h-auto">
        <Link href="/login">Giriş</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{user.email}</span>
      <Button size="sm" variant="secondary" onClick={logout}>
        Çıkış
      </Button>
    </div>
  );
}
