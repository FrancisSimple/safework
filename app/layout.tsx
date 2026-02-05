import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext'; // 👈 IMPORT THIS

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Francis Sewor | Portfolio',
  description: 'Software Engineer & Innovator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 👇 WRAP CHILDREN WITH AUTH PROVIDER */}
        <AuthProvider>
           {children}
        </AuthProvider>
      </body>
    </html>
  );
}