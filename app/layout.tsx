import './globals.css';
import type { Metadata } from 'next';
import { Kumbh_Sans, Roboto_Slab, Space_Mono } from 'next/font/google';
import DataProvider from '@/app/_providers/DataContext';

import { ReactNode } from 'react';

const kumbhSans = Kumbh_Sans({
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kumbh-sans',
  subsets: ['latin'],
});
const robotoSlab = Roboto_Slab({
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-roboto-slab',
  subsets: ['latin'],
});

const spaceMono = Space_Mono({
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-space-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pomodoro app',
  description: 'Pomodoro app',
  applicationName: 'Pomodoro app',
} as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="hidden" lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <meta property="og:image" content={undefined} />
      </head>
      <body className={`${kumbhSans.variable} ${robotoSlab.variable} ${spaceMono.variable} bg-[#1E213F]`}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
