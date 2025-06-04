import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import UserMenu from '../components/UserMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Habit Tracker',
  description: 'Basit Next.js alışkanlık takip uygulaması',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} text-gray-900`}>
        <Providers>
          <header className="max-w-xl mx-auto p-4 flex justify-end">
            <UserMenu />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
