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
      <body className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
