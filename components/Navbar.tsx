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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <span className="w-4 h-4 bg-[#EA580C] border-2 border-black inline-block group-hover:rotate-45 transition-transform"></span>
          <span className="font-editorial font-black text-2xl tracking-tight text-black italic">
            RECALLFLOW
          </span>
        </Link>

        {/* Editorial Navigation Links */}
        <nav className="hidden md:flex items-center space-x-3 font-mono text-xs font-bold uppercase tracking-wider">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 border-2 border-black transition ${
                  isActive
                    ? 'bg-[#EAB308] text-black shadow-[3px_3px_0px_0px_#121212] font-black'
                    : 'bg-white text-black hover:bg-[#F2EFE9] shadow-[2px_2px_0px_0px_#121212]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* HIGH-CONTRAST PUNCHY TERRACOTTA / ORANGE CTA BUTTON */}
        <div className="flex items-center space-x-3">
          <Link
            href="/vocab"
            className="bg-[#EA580C] hover:bg-[#DC2626] text-white border-2 border-black font-mono font-black text-xs px-5 py-2.5 shadow-[4px_4px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#121212] transition-all uppercase tracking-wider inline-block"
          >
            ÖĞRENMEYE BAŞLA ➔
          </Link>
        </div>
      </div>
    </header>
  );
}
