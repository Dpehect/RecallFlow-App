import '@/styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'RecallFlow - Refactored Edition',
  description: 'Modern, high-performance language learning app architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="min-h-screen bg-[#090D16] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
