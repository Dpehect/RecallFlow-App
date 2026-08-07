import type { Metadata } from 'next';
import './manifest.css';
export const metadata: Metadata={title:'RecallFlow / Language has a pulse',description:'A radical study interface for people who refuse to memorize mechanically.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}
