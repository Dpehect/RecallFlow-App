import React from 'react';
import './globals.css';

export const metadata = {
  title: 'RecallFlow — Karakterli Dil Pratiği Motoru',
  description:
    'Almanca, İngilizce, Portekizce, İspanyolca ve Fransızca için tekrar etmeyen, AI destekli cümle üretimiyle çalışan dil pratiği motoru.',
  metadataBase: new URL('https://recallflow.app'),
  openGraph: {
    title: 'RecallFlow — Karakterli Dil Pratiği Motoru',
    description:
      'Kelime, dil bilgisi, reading, listening ve AI pratik robotuyla beş dilde tekrar etmeyen pratik.',
    type: 'website',
    locale: 'tr_TR',
  },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FAF6EE'/%3E%3Crect x='3' y='3' width='26' height='26' fill='%23C6440C' stroke='%2317140F' stroke-width='2'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-paper text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
