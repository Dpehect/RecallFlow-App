import {
  ArrowRight,
  BookOpen,
  Headphones,
  Robot,
  Stack,
} from "@phosphor-icons/react";
import type { Lang } from "@/types/domain";
import { languages } from "@/content/curriculum";
import type { View } from "@/components/layout/Header";
function Module({
  number,
  icon,
  title,
  text,
  onClick,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button className="module card" onClick={onClick}>
      <span>{number}</span>
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
      <ArrowRight className="arr" aria-hidden />
    </button>
  );
}
export function Home({
  go,
  lang,
  mastered,
}: {
  go: (v: View) => void;
  lang: Lang;
  mastered: number;
}) {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden /> TÜRKÇE KONUŞANLAR İÇİN
          </p>
          <h1>
            Bir dili
            <br />
            <em>hatırlamak</em> değil,
            <br />
            yaşamak için.
          </h1>
          <p className="lede">
            Okurken yakala, dinlerken tanı, konuşurken kendiliğinden gelsin.
            Kısa ve odaklı seanslarla gerçek ilerleme.
          </p>
          <div className="actions">
            <button className="primary" onClick={() => go("vocab")}>
              Yolculuğa başla <ArrowRight aria-hidden />
            </button>
            <button
              className="circle"
              aria-label="Dinleme laboratuvarını aç"
              onClick={() => go("listening")}
            >
              <Headphones aria-hidden />
            </button>
            <span>
              Bugünün
              <br />
              sesini dinle
            </span>
          </div>
        </div>
        <div
          className="orbit"
          aria-label={`${languages[lang].name} öğrenme akışı`}
        >
          <div className="orbital one">
            READING <BookOpen aria-hidden />
          </div>
          <div className="orbital two">
            LISTENING <Headphones aria-hidden />
          </div>
          <div className="core">
            <span>{languages[lang].flag}</span>
            <b>
              AKIŞTA
              <br />
              ÖĞREN
            </b>
            <small>01 — 05</small>
          </div>
          <div className="word w1">bonjour</div>
          <div className="word w2">erinnern</div>
          <div className="word w3">curiosity</div>
        </div>
      </div>
      <div className="ticker" aria-hidden>
        <span>OKU ✦ DİNLE ✦ HATIRLA ✦ KONUŞ ✦</span>
        <span>OKU ✦ DİNLE ✦ HATIRLA ✦ KONUŞ ✦</span>
      </div>
      <div className="modules">
        <div className="module intro">
          <p>BUGÜNKÜ AKIŞ</p>
          <h2>
            12 dakika.
            <br />
            Tek bir ritim.
          </h2>
          <small>Kaldığın yer cihazında saklanır.</small>
        </div>
        <Module
          number="01"
          icon={<Stack />}
          title="Kelime Atlası"
          text="Kategorize edilmiş alıştırma kartları"
          onClick={() => go("vocab")}
        />
        <Module
          number="02"
          icon={<BookOpen />}
          title="Okuma Stüdyosu"
          text="Her seviyeye özel kısa metinler"
          onClick={() => go("reading")}
        />
        <Module
          number="03"
          icon={<Robot />}
          title="Çeviri Robotu"
          text="Türkçeden anlık çeviri"
          onClick={() => go("robot")}
        />
      </div>
      <div className="progress-strip">
        <span>ÖĞRENİLEN</span>
        <strong>{mastered}</strong>
        <div
          aria-label={`İlerleme yüzde ${Math.min(100, Math.round(mastered / 6))}`}
        >
          <i style={{ width: `${Math.min(100, mastered / 6)}%` }} />
        </div>
        <small>İlk 600 karta doğru</small>
      </div>
    </div>
  );
}
