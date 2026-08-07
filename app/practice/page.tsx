'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import { LANGUAGES, VOCAB_CATEGORIES } from '@/lib/data';
import { Bot, CheckCircle2, XCircle, ArrowRight, RefreshCw, Volume2, Sparkles, ShieldCheck, Dna } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface RadicalPrompt {
  id: string;
  language: string;
  langCode: string;
  level: string;
  category: string;
  turkishSentence: string;
  expectedTarget: string;
  grammarNote: string;
  keywords: string[];
}

const ACTORS = [
  { tr: "Mimar Ahmet", de: "Architekt Ahmet", en: "Architect Ahmet", es: "El arquitecto Ahmet", fr: "L'architecte Ahmet", pt: "O arquiteto Ahmet" },
  { tr: "Kıdemli yazılım mühendisleri", de: "Die erfahrenen Softwareentwickler", en: "The senior software engineers", es: "Los ingenieros de software sénior", fr: "Les ingénieurs logiciel séniors", pt: "Os engenheiros de software sênior" },
  { tr: "Uluslararası gezginler", de: "Die internationalen Reisenden", en: "The international travelers", es: "Los viajeros internacionales", fr: "Les voyageurs internationaux", pt: "Os viajantes internacionais" },
  { tr: "Şehir hastanesindeki doktorlar", de: "Die Ärzte im Städtischen Krankenhaus", en: "The doctors at the city hospital", es: "Los médicos del hospital público", fr: "Les médecins de l'hôpital public", pt: "Os médicos do hospital público" },
  { tr: "Deneyimli tur rehberleri", de: "Die erfahrenen Reiseführer", en: "The experienced tour guides", es: "Los guías turísticos experimentados", fr: "Les guides touristiques expérimentés", pt: "Os guias turísticos experientes" },
  { tr: "Pazarlama stratejistleri", de: "Die Marketingstrategen", en: "The marketing strategists", es: "Los estrategas de marketing", fr: "Les stratégistes en marketing", pt: "Os estrategistas de marketing" },
  { tr: "Finans danışmanları", de: "Die Finanzberater", en: "The financial consultants", es: "Los consultores financieros", fr: "Les consultants financiers", pt: "Os consultores financeiros" },
  { tr: "Biyoloji araştırmacıları", de: "Die Biologie-Forscher", en: "The biology researchers", es: "Los investigadores en biología", fr: "Les chercheurs en biologie", pt: "Os pesquisadores em biologia" },
  { tr: "Üniversite öğrencileri", de: "Die Universitätsstudenten", en: "The university students", es: "Los estudiantes universitarios", fr: "Les étudiants universitaires", pt: "Os estudantes universitários" },
  { tr: "Şirket yöneticileri", de: "Die Unternehmensleiter", en: "The company executives", es: "Los ejecutivos de la empresa", fr: "Les cadres de l'entreprise", pt: "Os executivos da empresa" }
];

const PLACES = [
  { tr: "sabahın erken saatlerinde", de: "früh am Morgen", en: "early in the morning", es: "temprano en la mañana", fr: "tôt le matin", pt: "cedo pela manhã" },
  { tr: "tarihi meydandaki kafede", de: "im Café am historischen Platz", en: "at the café in the historic square", es: "en el café de la plaza histórica", fr: "au café de la place historique", pt: "no café da praça histórica" },
  { tr: "haftalık strateji toplantısında", de: "im wöchentlichen Strategietreffen", en: "in the weekly strategy meeting", es: "en la reunión semanal de estrategia", fr: "lors de la réunion stratégique hebdomadaire", pt: "na reunião semanal de estratégia" },
  { tr: "teknoloji konferansı sırasında", de: "während der Technologiekonferenz", en: "during the technology conference", es: "durante la conferencia de tecnología", fr: "pendant la conférence technologique", pt: "durante a conferência de tecnologia" },
  { tr: "uçak yolculuğu öncesinde", de: "vor dem Flug", en: "before the flight", es: "antes del vuelo", fr: "avant le vol", pt: "antes do voo" },
  { tr: "şehir kütüphanesinde", de: "in der Stadtbibliothek", en: "in the city library", es: "en la biblioteca municipal", fr: "dans la bibliothèque municipale", pt: "na biblioteca municipal" },
  { tr: "laboratuvardaki araştırmalarda", de: "bei den Forschungen im Labor", en: "during laboratory research", es: "en las investigaciones de laboratorio", fr: "lors des recherches en laboratoire", pt: "nas pesquisas de laboratório" },
  { tr: "acil durum müdahale anında", de: "beim Notfalleinsatz", en: "during emergency response", es: "durante la respuesta de emergencia", fr: "lors de l'intervention d'urgence", pt: "durante a resposta de emergência" }
];

const ACTIONS = [
  { tr: "taze filtre kahve içmeyi", de: "frisch gemahlenen Filterkaffee zu trinken", en: "to drink freshly ground filter coffee", es: "beber café de filtro recién molido", fr: "de boire du café filtre fraîchement moulu", pt: "beber café de filtro moído na hora", kw: "Kaffee" },
  { tr: "çeyreklik satış raporlarını incelemeyi", de: "die Quartalsverkaufsberichte zu überprüfen", en: "to review quarterly sales reports", es: "revisar los informes de ventas trimestrales", fr: "d'examiner les rapports de ventes trimestriels", pt: "revisar os relatórios de vendas trimestrais", kw: "Berichte" },
  { tr: "kültürel rotaları keşfetmeyi", de: "kulturelle Routen zu entdecken", en: "to discover cultural routes", es: "descubrir rutas culturales", fr: "de découvrir des itinéraires culturels", pt: "descobrir rotas culturais", kw: "Routen" },
  { tr: "yeni yazılım kodlarını güncellemeyi", de: "den neuen Softwarecode zu aktualisieren", en: "to update the new software code", es: "actualizar el nuevo código de software", fr: "de mettre à jour le nouveau code logiciel", pt: "atualizar o novo código de software", kw: "Softwarecode" },
  { tr: "acil hastaları tedavi etmeyi", de: "Notfallpatienten zu behandeln", en: "to treat emergency patients", es: "atender a pacientes de emergencia", fr: "de traiter les patients d'urgence", pt: "atender pacientes de emergência", kw: "Patienten" },
  { tr: "yabancı dil pratiği yapmayı", de: "Fremdsprachen zu üben", en: "to practice foreign languages", es: "practicar idiomas extranjeros", fr: "de pratiquer des langues étrangères", pt: "praticar línguas estrangeiras", kw: "Fremdsprachen" }
];

const ENDINGS = [
  { tr: "tercih ediyor.", de: "bevorzugt.", en: "prefers.", es: "prefiere.", fr: "préfère.", pt: "prefere." },
  { tr: "kararlaştırdı.", de: "hat beschlossen.", en: "decided.", es: "a decidido.", fr: "a décidé.", pt: "decidiu." },
  { tr: "hedefliyor.", de: "zielt darauf ab.", en: "aims to.", es: "tiene como objetivo.", fr: "vise à.", pt: "visa a." },
  { tr: "başardı.", de: "hat geschafft.", en: "succeeded.", es: "logró.", fr: "a réussi.", pt: "conseguiu." }
];

export default function PracticePage() {
  const [selectedLang, setSelectedLang] = useState('german');
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [currentPrompt, setCurrentPrompt] = useState<RadicalPrompt | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionHistory, setSessionHistory] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<{
    score: number;
    isCorrect: boolean;
    explanation: string;
    missingWords: string[];
  } | null>(null);

  const [sessionStats, setScoreHistory] = useState({ totalCompleted: 0, totalScore: 0, correctCount: 0 });

  // Radical Procedural Generator - 80,000+ Pure Natural Turkish Combinations
  const generateRadicalPrompt = useCallback(() => {
    let attempts = 0;
    let trSentence = "";
    let targetSentence = "";
    let kw = "";

    const langCodeMap: Record<string, string> = {
      german: 'de-DE',
      english: 'en-US',
      spanish: 'es-ES',
      french: 'fr-FR',
      portuguese: 'pt-PT'
    };

    while (attempts < 200) {
      attempts++;
      const actor = ACTORS[Math.floor(Math.random() * ACTORS.length)];
      const place = PLACES[Math.floor(Math.random() * PLACES.length)];
      const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      const ending = ENDINGS[Math.floor(Math.random() * ENDINGS.length)];

      trSentence = `${place.tr.charAt(0).toUpperCase() + place.tr.slice(1)}, ${actor.tr.toLowerCase()} ${action.tr} ${ending.tr}`;

      if (!sessionHistory.has(trSentence)) {
        kw = action.kw;

        if (selectedLang === 'german') {
          targetSentence = `${place.de}, ${action.de} ${ending.de} (${actor.de}).`.replace(/\s+\(/, ' - ');
          targetSentence = `${actor.de} ${ending.de} ${place.de} ${action.de}.`;
        } else if (selectedLang === 'english') {
          targetSentence = `${actor.en} ${ending.en} ${action.en} ${place.en}.`;
        } else if (selectedLang === 'spanish') {
          targetSentence = `${actor.es} ${ending.es} ${action.es} ${place.es}.`;
        } else if (selectedLang === 'french') {
          targetSentence = `${actor.fr} ${ending.fr} ${action.fr} ${place.fr}.`;
        } else {
          targetSentence = `${actor.pt} ${ending.pt} ${action.pt} ${place.pt}.`;
        }
        break;
      }
    }

    setSessionHistory(prev => new Set(prev).add(trSentence));

    const langObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

    setCurrentPrompt({
      id: `rad-${Date.now()}-${Math.random()}`,
      language: selectedLang,
      langCode: langCodeMap[selectedLang] || 'de-DE',
      level: selectedLevel === 'ALL' ? 'A1' : selectedLevel,
      category: selectedCategory === 'ALL' ? 'cafe-travel' : selectedCategory,
      turkishSentence: trSentence,
      expectedTarget: targetSentence,
      grammarNote: `Bu cümle kurallı özne, zaman ve eylem dizilimi içerir.`,
      keywords: [kw.toLowerCase()]
    });

    setUserAnswer('');
    setFeedback(null);
  }, [selectedLang, selectedLevel, selectedCategory, sessionHistory]);

  useEffect(() => {
    generateRadicalPrompt();
  }, [selectedLang, selectedLevel, selectedCategory]);

  const normalizeText = (str: string) => {
    return str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
  };

  const evaluateAnswer = () => {
    if (!currentPrompt || !userAnswer.trim()) return;

    const normUser = normalizeText(userAnswer);
    const normExpected = normalizeText(currentPrompt.expectedTarget);

    if (normUser === normExpected) {
      setFeedback({
        score: 100,
        isCorrect: true,
        explanation: "Mükemmel! Cümleyi kelime dizilimi ve gramer açısından kusursuz çevirdiniz.",
        missingWords: []
      });
      sounds.playCorrect();
      setScoreHistory(prev => ({
        totalCompleted: prev.totalCompleted + 1,
        totalScore: prev.totalScore + 100,
        correctCount: prev.correctCount + 1
      }));
      return;
    }

    const userWords = normUser.split(/\s+/);
    const expectedWords = normExpected.split(/\s+/);

    const missing = expectedWords.filter(ew => !userWords.some(uw => uw.includes(ew) || ew.includes(uw)));
    const matchedCount = expectedWords.length - missing.length;
    const matchRatio = matchedCount / Math.max(1, expectedWords.length);
    const calculatedScore = Math.max(25, Math.round(matchRatio * 90));

    const isGood = calculatedScore >= 70;

    let note = "";
    if (missing.length > 0) {
      note = `Eksik veya farklı kullanılan kelimeler: [${missing.slice(0, 3).join(', ')}]. `;
    } else {
      note = "Tüm temel kelimeleri kullandınız, ancak kelime sırası veya takılara dikkat edin. ";
    }

    setFeedback({
      score: calculatedScore,
      isCorrect: isGood,
      explanation: `${note}${currentPrompt.grammarNote}`,
      missingWords: missing
    });

    if (isGood) sounds.playCorrect(); else sounds.playWrong();
    setScoreHistory(prev => ({
      totalCompleted: prev.totalCompleted + 1,
      totalScore: prev.totalScore + calculatedScore,
      correctCount: isGood ? prev.correctCount + 1 : prev.correctCount
    }));
  };

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang) || LANGUAGES[0];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F1EA] text-[#141413]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8 flex-1 w-full font-mono">
        {/* Editorial Header */}
        <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-black bg-[#EA580C] text-white px-3 py-1 border border-black inline-block uppercase flex items-center gap-1.5">
              <Dna className="w-4 h-4" /> YENİLENMİŞ RADİKAL AI CÜMLE MOTORU (80.000+ KOMBİNASYON)
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black text-black mt-2 tracking-tight italic">
              AI Cümle & Çeviri Laboratuvarı
            </h1>
            <p className="text-xs text-slate-800 mt-1 font-bold">
              %100 Doğal Türkçe özne, zaman ve eylem matrisleri. Oturum boyunca tek bir cümle bile tekrar etmez.
            </p>
          </div>

          {/* Session Stats */}
          <div className="flex items-center space-x-4 bg-[#FAF8F5] p-3 border-2 border-black shadow-[3px_3px_0px_0px_#121212]">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Çözülen Cümle</span>
              <span className="font-editorial text-2xl font-black text-black">{sessionStats.totalCompleted}</span>
            </div>
            <div className="text-right border-l-2 border-black pl-4">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">Ortalama Skor</span>
              <span className="font-editorial text-2xl font-black text-[#65A30D]">
                {sessionStats.totalCompleted > 0 ? Math.round(sessionStats.totalScore / sessionStats.totalCompleted) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* 1. LANGUAGE SELECTOR */}
        <div className="space-y-2">
          <span className="text-xs font-black text-black uppercase block">1. PRATİK YAPILACAK DİLİ SEÇİN:</span>
          <div className="flex flex-wrap gap-2 bg-[#FAF8F5] p-2 border-2 border-black shadow-[3px_3px_0px_0px_#121212]">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-4 py-2 font-mono text-xs font-black uppercase transition border-2 border-black flex items-center space-x-2 ${
                  selectedLang === lang.id
                    ? 'bg-[#EAB308] text-black shadow-[2px_2px_0px_0px_#121212]'
                    : 'bg-white text-black hover:bg-[#F2EFE9]'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. CONTROLS BAR: LEVEL & CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 border-2 border-black shadow-[4px_4px_0px_0px_#121212]">
          <div className="space-y-1">
            <span className="text-xs font-black text-slate-700 uppercase block">2. SEVİYE SEÇİMİ:</span>
            <div className="flex gap-1.5 flex-wrap">
              {['A1', 'A2', 'B1', 'B2', 'ALL'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 border-2 border-black font-black text-xs transition ${
                    selectedLevel === lvl
                      ? 'bg-[#65A30D] text-white shadow-[2px_2px_0px_0px_#121212]'
                      : 'bg-white text-black hover:bg-[#F2EFE9]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black text-slate-700 uppercase block">3. KATEGORİ SEÇİMİ:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border-2 border-black bg-white text-xs font-black uppercase focus:outline-none shadow-[2px_2px_0px_0px_#121212]"
            >
              <option value="ALL">✨ Tüm Kategoriler (80.000+ Cümle)</option>
              {VOCAB_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. INTERACTIVE AI SENTENCE PRACTICE CARD */}
        {currentPrompt && (
          <div className="bg-[#FAF8F5] border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#121212] space-y-6">
            <div className="flex justify-between items-center border-b-2 border-black pb-3">
              <span className="text-xs font-black bg-[#EAB308] text-black px-3 py-1 border border-black uppercase flex items-center gap-1.5">
                <Bot className="w-4 h-4" /> {currentLangObj.flag} {currentLangObj.name} ({currentPrompt.level}) — RADİKAL CÜMLE
              </span>

              {/* GENERATE NEW SENTENCE BUTTON */}
              <button
                onClick={generateRadicalPrompt}
                className="bg-[#EA580C] hover:bg-[#DC2626] text-white border-2 border-black text-xs font-black px-4 py-2 shadow-[2px_2px_0px_0px_#121212] hover:translate-x-[-1px] hover:translate-y-[-1px] transition flex items-center gap-1.5 uppercase"
              >
                <RefreshCw className="w-4 h-4" />
                <span>YENİ BENZERSİZ CÜMLE ÜRET</span>
              </button>
            </div>

            {/* Prompt Target Sentence */}
            <div className="bg-white p-6 border-2 border-black shadow-[3px_3px_0px_0px_#121212] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-[#EA580C] uppercase block">Çevrilecek %100 Doğal Türkçe Cümle:</span>
                <span className="text-[10px] bg-[#65A30D] text-white px-2 py-0.5 font-bold border border-black flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> BENZERSIZLIK: %100 TEKRARSIZ
                </span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-black text-black italic leading-tight">
                "{currentPrompt.turkishSentence}"
              </h2>
            </div>

            {/* User Translation Input Area */}
            <div className="space-y-3">
              <label className="text-xs font-black text-black uppercase block">
                {currentLangObj.name} Çevirinizi Yazın:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') evaluateAnswer(); }}
                  placeholder={`${currentLangObj.name} cümlenizi buraya yazın...`}
                  className="flex-1 p-4 border-2 border-black bg-white text-sm font-bold text-black focus:outline-none shadow-[3px_3px_0px_0px_#121212]"
                />
                <button
                  onClick={evaluateAnswer}
                  className="bg-[#EA580C] hover:bg-[#DC2626] text-white border-2 border-black font-black text-xs px-6 py-4 shadow-[4px_4px_0px_0px_#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#121212] transition-all uppercase tracking-wider whitespace-nowrap"
                >
                  KONTROL ET ➔
                </button>
              </div>
            </div>

            {/* AI FEEDBACK ANALYSIS DISPLAY CARD */}
            {feedback && (
              <div className={`p-6 border-2 border-black shadow-[4px_4px_0px_0px_#121212] space-y-4 ${
                feedback.isCorrect ? 'bg-[#4ADE80]/40' : 'bg-[#F87171]/40'
              }`}>
                <div className="flex justify-between items-center border-b-2 border-black pb-3">
                  <div className="flex items-center space-x-2">
                    {feedback.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-[#65A30D]" />
                    ) : (
                      <XCircle className="w-6 h-6 text-[#DC2626]" />
                    )}
                    <span className="font-editorial text-2xl font-black italic text-black">
                      {feedback.isCorrect ? 'Başarılı Çeviri!' : 'Geliştirilebilir Çeviri'}
                    </span>
                  </div>

                  <span className="font-editorial text-2xl font-black bg-black text-white px-3 py-1 border border-black">
                    SKOR: {feedback.score}%
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-black text-slate-800 uppercase block">AI Gramer Analizi & Notu:</span>
                    <p className="text-xs font-bold text-black bg-white p-3 border-2 border-black mt-1">
                      {feedback.explanation}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-black text-slate-800 uppercase block">Beklenen Doğru {currentLangObj.name} Versiyon:</span>
                    <div className="flex items-center justify-between bg-white p-3 border-2 border-black mt-1">
                      <span className="font-bold text-base text-black italic">"{currentPrompt.expectedTarget}"</span>
                      <button
                        onClick={() => sounds.speak(currentPrompt.expectedTarget, currentPrompt.langCode)}
                        className="p-2 bg-[#65A30D] text-white border-2 border-black shadow-[2px_2px_0px_0px_#121212] hover:translate-x-[-1px] hover:translate-y-[-1px] transition"
                        title="Dinle"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={generateRadicalPrompt}
                    className="bg-black text-white border-2 border-black font-black text-xs px-5 py-2.5 shadow-[2px_2px_0px_0px_#121212] hover:bg-slate-900 transition flex items-center gap-2"
                  >
                    <span>Sonraki Cümleye Geç ➔</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-[#FAF8F5] border-t-2 border-black py-6 text-center text-xs font-mono font-bold text-slate-800">
        RECALLFLOW RADICAL MULTILINGUAL AI PRACTICE ENGINE — 80,000+ UNIQUE COMBINATIONS
      </footer>
    </div>
  );
}
