import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'RecallFlow — Dili Yaşa', description:'İngilizce, Almanca ve Fransızcayı okuma, dinleme ve akıllı kelime pratikleriyle öğren.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}
