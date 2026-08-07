import type { Metadata } from "next";
import "./studio.css";
export const metadata:Metadata={title:"RecallFlow — Language as Practice",description:"An editorial language learning studio."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}
