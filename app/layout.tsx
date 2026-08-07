import React from 'react';

export const metadata = {
  title: 'RecallFlow - Radical Practice Engine',
  description: 'AI-Powered Multilingual Practice Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#faf9f6' }}>
        {children}
      </body>
    </html>
  );
}
