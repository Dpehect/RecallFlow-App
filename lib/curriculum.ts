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

const contexts: Record<LanguageId, string[]> = {
  en: ["this", "my", "new", "first", "every"], de: ["dieses", "mein", "neu", "erstes", "jedes"],
  fr: ["ce", "mon", "nouveau", "premier", "chaque"], es: ["este", "mi", "nuevo", "primer", "cada"],
  pt: ["este", "meu", "novo", "primeiro", "cada"],
};
const contextTr = ["bu", "benim", "yeni", "ilk", "her"];
const lead: Record<LanguageId, string[]> = {
  en: ["I notice", "I remember", "We discuss", "I describe", "I choose", "I compare"],
  de: ["Ich bemerke", "Ich erinnere mich an", "Wir besprechen", "Ich beschreibe", "Ich wähle", "Ich vergleiche"],
  fr: ["Je remarque", "Je me souviens de", "Nous discutons", "Je décris", "Je choisis", "Je compare"],
  es: ["Noto", "Recuerdo", "Hablamos de", "Describo", "Elijo", "Comparo"],
  pt: ["Noto", "Lembro-me de", "Falamos de", "Descrevo", "Escolho", "Comparo"],
};
const leadTr = ["Fark ediyorum", "Hatırlıyorum", "Konuşuyoruz", "Betimliyorum", "Seçiyorum", "Karşılaştırıyorum"];

export function buildDeck(language: LanguageId, level: Level, category: CategoryId): WordCard[] {
  const categoryLabel = CATEGORIES.find((item) => item.id === category)!.label;
  const levelIndex = LEVELS.indexOf(level);
  return Array.from({ length: 100 }, (_, index) => {
    const root = roots[category][index % roots[category].length];
    const variation = Math.floor(index / roots[category].length);
    const term = `${contexts[language][variation]} ${root[language]}`;
    const turkish = `${contextTr[variation]} ${root.tr}`;
    const verb = lead[language][levelIndex];
    return {
      id: `${language}-${level}-${category}-${index}`, language, level, category, categoryLabel, index, term, turkish,
      example: `${verb} ${term}.`, exampleTr: `${leadTr[levelIndex]}: ${turkish}.`,
    };
  });
}

export function normalizeAnswer(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,!?;:'’\-"]/g, "").replace(/\s+/g, " ");
}

export function validateCurriculum() {
  return LANGUAGES.every(({ id }) => LEVELS.every((level) => CATEGORIES.every(({ id: category }) => buildDeck(id, level, category).length === 100)));
}
