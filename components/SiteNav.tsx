"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [{ href: "/learn", label: "Çalış" }, { href: "/vocabulary", label: "Kelimeler" }, { href: "/progress", label: "İlerleme" }, { href: "/method", label: "Metot" }];
export function SiteNav() {
  const pathname = usePathname();
  return <nav className="site-nav"><Link className="logo" href="/">RECALL<i>FLOW</i></Link><div className="nav-links">{links.map(link => <Link className={pathname === link.href ? "active" : ""} key={link.href} href={link.href}>{link.label}</Link>)}</div><Link className="nav-cta" href="/learn">10 KART BAŞLAT ↗</Link></nav>;
}
