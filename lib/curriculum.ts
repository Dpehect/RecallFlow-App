export const LANGUAGES = [
  { id: "en", code: "EN", label: "İngilizce", locale: "en-US" },
  { id: "de", code: "DE", label: "Almanca", locale: "de-DE" },
  { id: "fr", code: "FR", label: "Fransızca", locale: "fr-FR" },
  { id: "es", code: "ES", label: "İspanyolca", locale: "es-ES" },
  { id: "pt", code: "PT", label: "Portekizce", locale: "pt-PT" },
] as const;

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export const CATEGORIES = [
  { id: "daily", label: "Günlük Hayat", icon: "◒" },
  { id: "people", label: "İnsan & Duygu", icon: "◉" },
  { id: "food", label: "Yemek", icon: "✦" },
  { id: "travel", label: "Seyahat", icon: "↗" },
  { id: "work", label: "İş & Eğitim", icon: "▰" },
  { id: "nature", label: "Doğa & Kent", icon: "≈" },
] as const;

export type LanguageId = typeof LANGUAGES[number]["id"];
export type Level = typeof LEVELS[number];
export type CategoryId = typeof CATEGORIES[number]["id"];
export const LEVEL_CATEGORIES: Record<Level, ReadonlyArray<{ id: CategoryId; label: string; icon: string }>> = {
  A1: [{id:"daily",label:"Günlük Temeller",icon:"◒"},{id:"people",label:"Aile & Arkadaşlar",icon:"◉"},{id:"food",label:"Yiyecek & İçecek",icon:"✦"},{id:"travel",label:"Şehir & Ulaşım",icon:"↗"},{id:"work",label:"Okul & İş",icon:"▰"},{id:"nature",label:"Hava & Doğa",icon:"≈"}],
  A2: [{id:"daily",label:"Rutinler & Alışkanlıklar",icon:"◒"},{id:"people",label:"Duygular & İlişkiler",icon:"◉"},{id:"food",label:"Kafe & Alışveriş",icon:"✦"},{id:"travel",label:"Seyahat Planları",icon:"↗"},{id:"work",label:"Görevler & Beceriler",icon:"▰"},{id:"nature",label:"Kent & Çevre",icon:"≈"}],
  B1: [{id:"daily",label:"Yaşam Deneyimleri",icon:"◒"},{id:"people",label:"Kişilik & Davranış",icon:"◉"},{id:"food",label:"Beslenme & Mutfak",icon:"✦"},{id:"travel",label:"Rotalar & Deneyimler",icon:"↗"},{id:"work",label:"Eğitim & Kariyer",icon:"▰"},{id:"nature",label:"Çevre & Yaşam",icon:"≈"}],
  B2: [{id:"daily",label:"Yaşam Biçimleri",icon:"◒"},{id:"people",label:"İnsan İlişkileri",icon:"◉"},{id:"food",label:"Yemek Kültürü",icon:"✦"},{id:"travel",label:"Hareketlilik & Kültür",icon:"↗"},{id:"work",label:"Profesyonel İletişim",icon:"▰"},{id:"nature",label:"İklim & Kentleşme",icon:"≈"}],
  C1: [{id:"daily",label:"Toplumsal Gündelik Hayat",icon:"◒"},{id:"people",label:"Psikoloji & Kimlik",icon:"◉"},{id:"food",label:"Gastronomi & Toplum",icon:"✦"},{id:"travel",label:"Göç & Coğrafya",icon:"↗"},{id:"work",label:"Akademi & Kurumlar",icon:"▰"},{id:"nature",label:"Ekoloji & Sürdürülebilirlik",icon:"≈"}],
  C2: [{id:"daily",label:"Gündelik Yaşam Söylemi",icon:"◒"},{id:"people",label:"İnsanlık & Öznellik",icon:"◉"},{id:"food",label:"Yemek Söylemi & Etik",icon:"✦"},{id:"travel",label:"Küresel Hareketlilik",icon:"↗"},{id:"work",label:"Bilgi Üretimi",icon:"▰"},{id:"nature",label:"İnsan–Doğa İlişkisi",icon:"≈"}],
};
export function getCategories(level: Level) { return LEVEL_CATEGORIES[level]; }
type Translation = Record<LanguageId, string> & { tr: string };

export type WordCard = {
  id: string; language: LanguageId; level: Level; category: CategoryId; categoryLabel: string;
  index: number; term: string; turkish: string; example: string; exampleTr: string;
};

const roots: Record<CategoryId, Translation[]> = {
  daily: [
    ["morning","Morgen","matin","mañana","manhã","sabah"],["home","Zuhause","maison","casa","casa","ev"],["door","Tür","porte","puerta","porta","kapı"],["window","Fenster","fenêtre","ventana","janela","pencere"],["street","Straße","rue","calle","rua","sokak"],
    ["time","Zeit","temps","tiempo","tempo","zaman"],["today","heute","aujourd'hui","hoy","hoje","bugün"],["evening","Abend","soir","tarde","noite","akşam"],["sleep","Schlaf","sommeil","sueño","sono","uyku"],["key","Schlüssel","clé","llave","chave","anahtar"],
    ["phone","Telefon","téléphone","teléfono","telefone","telefon"],["table","Tisch","table","mesa","mesa","masa"],["chair","Stuhl","chaise","silla","cadeira","sandalye"],["light","Licht","lumière","luz","luz","ışık"],["water","Wasser","eau","agua","água","su"],
    ["money","Geld","argent","dinero","dinheiro","para"],["shop","Laden","magasin","tienda","loja","mağaza"],["bag","Tasche","sac","bolsa","saco","çanta"],["clothes","Kleidung","vêtements","ropa","roupa","kıyafet"],["habit","Gewohnheit","habitude","hábito","hábito","alışkanlık"],
  ].map(row),
  people: [
    ["friend","Freund","ami","amigo","amigo","arkadaş"],["family","Familie","famille","familia","família","aile"],["child","Kind","enfant","niño","criança","çocuk"],["mother","Mutter","mère","madre","mãe","anne"],["father","Vater","père","padre","pai","baba"],
    ["smile","Lächeln","sourire","sonrisa","sorriso","gülümseme"],["joy","Freude","joie","alegría","alegria","neşe"],["fear","Angst","peur","miedo","medo","korku"],["hope","Hoffnung","espoir","esperanza","esperança","umut"],["love","Liebe","amour","amor","amor","sevgi"],
    ["voice","Stimme","voix","voz","voz","ses"],["face","Gesicht","visage","rostro","rosto","yüz"],["heart","Herz","cœur","corazón","coração","kalp"],["mind","Geist","esprit","mente","mente","zihin"],["memory","Erinnerung","mémoire","recuerdo","memória","anı"],
    ["trust","Vertrauen","confiance","confianza","confiança","güven"],["anger","Wut","colère","ira","raiva","öfke"],["calm","Ruhe","calme","calma","calma","sakinlik"],["guest","Gast","invité","invitado","convidado","misafir"],["neighbor","Nachbar","voisin","vecino","vizinho","komşu"],
  ].map(row),
  food: [
    ["bread","Brot","pain","pan","pão","ekmek"],["cheese","Käse","fromage","queso","queijo","peynir"],["apple","Apfel","pomme","manzana","maçã","elma"],["coffee","Kaffee","café","café","café","kahve"],["tea","Tee","thé","té","chá","çay"],
    ["breakfast","Frühstück","petit-déjeuner","desayuno","pequeno-almoço","kahvaltı"],["dinner","Abendessen","dîner","cena","jantar","akşam yemeği"],["kitchen","Küche","cuisine","cocina","cozinha","mutfak"],["plate","Teller","assiette","plato","prato","tabak"],["spoon","Löffel","cuillère","cuchara","colher","kaşık"],
    ["salt","Salz","sel","sal","sal","tuz"],["sugar","Zucker","sucre","azúcar","açúcar","şeker"],["fruit","Obst","fruit","fruta","fruta","meyve"],["vegetable","Gemüse","légume","verdura","legume","sebze"],["soup","Suppe","soupe","sopa","sopa","çorba"],
    ["taste","Geschmack","goût","sabor","sabor","tat"],["menu","Speisekarte","menu","menú","menu","menü"],["market","Markt","marché","mercado","mercado","pazar"],["bottle","Flasche","bouteille","botella","garrafa","şişe"],["meal","Mahlzeit","repas","comida","refeição","öğün"],
  ].map(row),
  travel: [
    ["journey","Reise","voyage","viaje","viagem","yolculuk"],["train","Zug","train","tren","comboio","tren"],["airport","Flughafen","aéroport","aeropuerto","aeroporto","havaalanı"],["ticket","Fahrkarte","billet","billete","bilhete","bilet"],["map","Karte","carte","mapa","mapa","harita"],
    ["hotel","Hotel","hôtel","hotel","hotel","otel"],["room","Zimmer","chambre","habitación","quarto","oda"],["passport","Reisepass","passeport","pasaporte","passaporte","pasaport"],["suitcase","Koffer","valise","maleta","mala","bavul"],["station","Bahnhof","gare","estación","estação","istasyon"],
    ["road","Weg","route","carretera","estrada","yol"],["bridge","Brücke","pont","puente","ponte","köprü"],["sea","Meer","mer","mar","mar","deniz"],["island","Insel","île","isla","ilha","ada"],["border","Grenze","frontière","frontera","fronteira","sınır"],
    ["arrival","Ankunft","arrivée","llegada","chegada","varış"],["departure","Abfahrt","départ","salida","partida","kalkış"],["guide","Reiseführer","guide","guía","guia","rehber"],["route","Route","itinéraire","ruta","rota","rota"],["adventure","Abenteuer","aventure","aventura","aventura","macera"],
  ].map(row),
  work: [
    ["work","Arbeit","travail","trabajo","trabalho","iş"],["school","Schule","école","escuela","escola","okul"],["book","Buch","livre","libro","livro","kitap"],["lesson","Unterricht","leçon","lección","lição","ders"],["question","Frage","question","pregunta","pergunta","soru"],
    ["answer","Antwort","réponse","respuesta","resposta","cevap"],["office","Büro","bureau","oficina","escritório","ofis"],["meeting","Besprechung","réunion","reunión","reunião","toplantı"],["project","Projekt","projet","proyecto","projeto","proje"],["team","Team","équipe","equipo","equipa","ekip"],
    ["idea","Idee","idée","idea","ideia","fikir"],["goal","Ziel","objectif","meta","objetivo","hedef"],["skill","Fähigkeit","compétence","habilidad","competência","beceri"],["practice","Übung","pratique","práctica","prática","pratik"],["focus","Fokus","concentration","enfoque","foco","odak"],
    ["result","Ergebnis","résultat","resultado","resultado","sonuç"],["career","Karriere","carrière","carrera","carreira","kariyer"],["research","Forschung","recherche","investigación","pesquisa","araştırma"],["knowledge","Wissen","savoir","conocimiento","conhecimento","bilgi"],["progress","Fortschritt","progrès","progreso","progresso","ilerleme"],
  ].map(row),
  nature: [
    ["tree","Baum","arbre","árbol","árvore","ağaç"],["flower","Blume","fleur","flor","flor","çiçek"],["sky","Himmel","ciel","cielo","céu","gökyüzü"],["rain","Regen","pluie","lluvia","chuva","yağmur"],["sun","Sonne","soleil","sol","sol","güneş"],
    ["moon","Mond","lune","luna","lua","ay"],["river","Fluss","rivière","río","rio","nehir"],["mountain","Berg","montagne","montaña","montanha","dağ"],["forest","Wald","forêt","bosque","floresta","orman"],["wind","Wind","vent","viento","vento","rüzgâr"],
    ["city","Stadt","ville","ciudad","cidade","şehir"],["square","Platz","place","plaza","praça","meydan"],["building","Gebäude","bâtiment","edificio","edifício","bina"],["garden","Garten","jardin","jardín","jardim","bahçe"],["park","Park","parc","parque","parque","park"],
    ["season","Jahreszeit","saison","estación","estação","mevsim"],["earth","Erde","terre","tierra","terra","yeryüzü"],["cloud","Wolke","nuage","nube","nuvem","bulut"],["stone","Stein","pierre","piedra","pedra","taş"],["path","Pfad","sentier","sendero","caminho","patika"],
  ].map(row),
};

function row(values: string[]): Translation {
  const [en, de, fr, es, pt, tr] = values;
  return { en, de, fr, es, pt, tr };
}

const frames: Record<Level, Record<LanguageId | "tr", string[]>> = {
  A1: { en:["{word}","say: {word}","hear: {word}","read: {word}","write: {word}"],de:["{word}","sagen: {word}","hören: {word}","lesen: {word}","schreiben: {word}"],fr:["{word}","dire : {word}","écouter : {word}","lire : {word}","écrire : {word}"],es:["{word}","decir: {word}","oír: {word}","leer: {word}","escribir: {word}"],pt:["{word}","dizer: {word}","ouvir: {word}","ler: {word}","escrever: {word}"],tr:["{word}","söyle: {word}","duy: {word}","oku: {word}","yaz: {word}"] },
  A2: { en:["{word} in daily life","using {word}","topic: {word}","with {word}","without {word}"],de:["{word} im Alltag","{word} verwenden","Thema: {word}","mit {word}","ohne {word}"],fr:["{word} au quotidien","utiliser : {word}","thème : {word}","avec : {word}","sans : {word}"],es:["{word} en la vida diaria","usar: {word}","tema: {word}","con: {word}","sin: {word}"],pt:["{word} no dia a dia","usar: {word}","tema: {word}","com: {word}","sem: {word}"],tr:["günlük hayatta {word}","{word} kullanımı","konu: {word}","{word} ile","{word} olmadan"] },
  B1: { en:["context: {word}","example of {word}","situation: {word}","connection: {word}","contrast: {word}"],de:["Kontext: {word}","Beispiel für {word}","Situation: {word}","Zusammenhang: {word}","Kontrast: {word}"],fr:["contexte : {word}","exemple : {word}","situation : {word}","lien : {word}","contraste : {word}"],es:["contexto: {word}","ejemplo: {word}","situación: {word}","conexión: {word}","contraste: {word}"],pt:["contexto: {word}","exemplo: {word}","situação: {word}","ligação: {word}","contraste: {word}"],tr:["bağlam: {word}","{word} örneği","durum: {word}","bağlantı: {word}","karşıtlık: {word}"] },
  B2: { en:["precise use: {word}","subtle meaning: {word}","abstract use: {word}","formal context: {word}","figurative use: {word}"],de:["präziser Gebrauch: {word}","feine Bedeutung: {word}","abstrakter Gebrauch: {word}","formeller Kontext: {word}","bildlicher Gebrauch: {word}"],fr:["usage précis : {word}","sens subtil : {word}","usage abstrait : {word}","contexte formel : {word}","sens figuré : {word}"],es:["uso preciso: {word}","sentido sutil: {word}","uso abstracto: {word}","contexto formal: {word}","sentido figurado: {word}"],pt:["uso preciso: {word}","sentido subtil: {word}","uso abstrato: {word}","contexto formal: {word}","sentido figurado: {word}"],tr:["kesin kullanım: {word}","ince anlam: {word}","soyut kullanım: {word}","resmî bağlam: {word}","mecaz kullanım: {word}"] },
  C1: { en:["nuanced use: {word}","underlying idea: {word}","critical view: {word}","cultural layer: {word}","semantic range: {word}"],de:["nuancierter Gebrauch: {word}","Grundidee: {word}","kritische Sicht: {word}","kulturelle Ebene: {word}","Bedeutungsspektrum: {word}"],fr:["usage nuancé : {word}","idée sous-jacente : {word}","regard critique : {word}","dimension culturelle : {word}","champ sémantique : {word}"],es:["uso matizado: {word}","idea subyacente: {word}","visión crítica: {word}","dimensión cultural: {word}","campo semántico: {word}"],pt:["uso matizado: {word}","ideia subjacente: {word}","visão crítica: {word}","dimensão cultural: {word}","campo semântico: {word}"],tr:["nüanslı kullanım: {word}","alt fikir: {word}","eleştirel bakış: {word}","kültürel katman: {word}","anlam alanı: {word}"] },
  C2: { en:["critical reading: {word}","conceptual frame: {word}","discursive use: {word}","ambiguous layer: {word}","advanced analysis: {word}"],de:["kritische Lesart: {word}","Begriffsrahmen: {word}","diskursiver Gebrauch: {word}","mehrdeutige Ebene: {word}","vertiefte Analyse: {word}"],fr:["lecture critique : {word}","cadre conceptuel : {word}","usage discursif : {word}","niveau ambigu : {word}","analyse approfondie : {word}"],es:["lectura crítica: {word}","marco conceptual: {word}","uso discursivo: {word}","nivel ambiguo: {word}","análisis avanzado: {word}"],pt:["leitura crítica: {word}","quadro conceptual: {word}","uso discursivo: {word}","camada ambígua: {word}","análise avançada: {word}"],tr:["eleştirel okuma: {word}","kavramsal çerçeve: {word}","söylemsel kullanım: {word}","belirsiz katman: {word}","ileri analiz: {word}"] },
};
const exampleTemplates: Record<LanguageId, string> = {
  en: "I use “{term}” in a sentence.", de: "Ich verwende „{term}“ in einem Satz.",
  fr: "J’utilise « {term} » dans une phrase.", es: "Uso «{term}» en una frase.",
  pt: "Uso «{term}» numa frase.",
};

export function buildDeck(language: LanguageId, level: Level, category: CategoryId): WordCard[] {
  const categoryLabel = getCategories(level).find((item) => item.id === category)!.label;
  return Array.from({ length: 100 }, (_, index) => {
    const root = roots[category][index % roots[category].length];
    const variation = Math.floor(index / roots[category].length);
    const term = frames[level][language][variation].replace("{word}", root[language]);
    const turkish = frames[level].tr[variation].replace("{word}", root.tr);
    return {
      id: `${language}-${level}-${category}-${index}`, language, level, category, categoryLabel, index, term, turkish,
      example: exampleTemplates[language].replace("{term}", term), exampleTr: `“${turkish}” ifadesini bir cümlede kullanıyorum.`,
    };
  });
}

export function normalizeAnswer(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,!?;:'’\-"]/g, "").replace(/\s+/g, " ");
}

export function validateCurriculum() {
  return auditCurriculum().length === 0;
}

export function auditCurriculum() {
  const errors: string[] = [];
  const categorySignatures = new Set<string>();
  for (const level of LEVELS) {
    const labels = getCategories(level).map(({ label }) => label);
    if (labels.length !== 6 || new Set(labels).size !== 6) errors.push(`${level}: category set is incomplete or duplicated`);
    const signature = labels.join("|");
    if (categorySignatures.has(signature)) errors.push(`${level}: category set repeats another level`);
    categorySignatures.add(signature);
  }
  for (const { id: language } of LANGUAGES) for (const { id: category } of CATEGORIES) {
    const acrossLevels = new Set<string>();
    for (const level of LEVELS) {
      const deck = buildDeck(language, level, category);
      if (deck.length !== 100) errors.push(`${language}/${level}/${category}: count ${deck.length}`);
      const terms = deck.map(({ term }) => normalizeAnswer(term));
      if (new Set(terms).size !== 100) errors.push(`${language}/${level}/${category}: duplicate terms`);
      for (const term of terms) { if (acrossLevels.has(term)) errors.push(`${language}/${category}: repeated across levels: ${term}`); acrossLevels.add(term); }
    }
  }
  return errors;
}
