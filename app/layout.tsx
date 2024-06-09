import './globals.css';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import DataProvider from '@/app/_providers/DataContext';
import { ReactNode } from 'react';

const ubuntu = Ubuntu({
  display: 'swap',
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Multi-step form',
  description: 'Multi-step form',
  applicationName: 'Multi-step form',
} as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <meta property="og:image" content={undefined} />
      </head>
      <body className={`${ubuntu.variable} bg-[#EFF5FF]`}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
