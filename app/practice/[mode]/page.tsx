import { PRACTICE_METHODS } from "../../../lib/practice";
import MethodRoom from "../../../components/practice/MethodRoom";
import { Suspense } from "react";

export function generateStaticParams(){return PRACTICE_METHODS.map(method=>({mode:method.id}))}
export default function PracticeMethodPage(){return <Suspense fallback={<div className="room-loading">Çalışma odası hazırlanıyor…</div>}><MethodRoom/></Suspense>}
