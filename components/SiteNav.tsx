"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [{ href: "/learn", label: "Çalış" }, { href: "/vocabulary", label: "Kelimeler" }, { href: "/progress", label: "İlerleme" }, { href: "/method", label: "Metot" }];
export function SiteNav() {
  const pathname = usePathname();
  const [open,setOpen]=useState(false);
  return <nav className={`site-nav ${open?"menu-open":""}`}><Link className="logo" href="/">RECALL<i>FLOW</i></Link><div className="nav-links">{links.map(link => <Link onClick={()=>setOpen(false)} className={pathname === link.href ? "active" : ""} key={link.href} href={link.href}>{link.label}</Link>)}</div><Link className="nav-cta" href="/learn">10 KART BAŞLAT ↗</Link><button className="menu-button" onClick={()=>setOpen(x=>!x)} aria-expanded={open} aria-label="Menüyü aç">{open?"KAPAT ×":"MENÜ +"}</button></nav>;
}
