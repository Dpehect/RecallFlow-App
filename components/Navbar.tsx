'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/vocab', label: '1. Kelime' },
    { href: '/grammar', label: '2. Dil Bilgisi' },
    { href: '/reading', label: '3. Reading' },
    { href: '/listening', label: '4. Listening' },
  ];

  return (
    <header className="w-full border-b-2 border-black bg-[#FAF8F5] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="w-4 h-4 bg-[#EAB308] border-2 border-black inline-block group-hover:rotate-45 transition-transform"></span>
          <span className="font-editorial font-black text-2xl tracking-tight text-black italic">
            RECALLFLOW
          </span>
        </Link>

        {/* Editorial Brutalist Navigation Links */}
        <nav className="hidden md:flex items-center space-x-4 font-mono text-xs font-bold uppercase tracking-wider">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 border-2 border-black transition ${
                  isActive
                    ? 'bg-[#EAB308] text-black shadow-brutal-sm font-black'
                    : 'bg-white text-black hover:bg-[#F2EFE9] shadow-brutal-sm'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Brutalist Action Button */}
        <div className="flex items-center space-x-3">
          <Link
            href="/vocab"
            className="bg-[#65A30D] text-white border-2 border-black font-mono font-black text-xs px-5 py-2.5 shadow-brutal hover-brutal uppercase tracking-wider inline-block"
          >
            ÖĞRENMEYE BAŞLA ➔
          </Link>
        </div>
      </div>
    </header>
  );
}
