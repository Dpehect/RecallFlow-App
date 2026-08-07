import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecallFlow - German Fluency. Minimal Effort.",
  description: "Interactive German language learning platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
