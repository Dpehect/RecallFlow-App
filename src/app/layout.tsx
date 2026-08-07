import './globals.css';
import React from 'react';

export const metadata = {
  title: 'E-Lab - Learn. Grow. Succeed.',
  description: 'Learn from industry experts and gain the skills to advance your career.',
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
