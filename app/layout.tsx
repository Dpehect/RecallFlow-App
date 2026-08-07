import './app/globals.css';
import React from 'react';

export const metadata = {
  title: 'RecallFlow - Listen. Read. Master.',
  description: 'Interactive vocabulary, listening labs, and immersive reading stories for rapid language fluency.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#eef4fb] text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
