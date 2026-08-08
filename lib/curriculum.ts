export const LANGUAGES = [
  { id: "en", code: "EN", label: "İngilizce", locale: "en-US" },
  { id: "de", code: "DE", label: "Almanca", locale: "de-DE" },
  { id: "fr", code: "FR", label: "Fransızca", locale: "fr-FR" },
  { id: "es", code: "ES", label: "İspanyolca", locale: "es-ES" },
  { id: "pt", code: "PT", label: "Portekizce", locale: "pt-PT" },
] as const;

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export const CATEGORIES = [
  { id: "daily", label: "Günlük Hayat", icon: "◒" }, { id: "people", label: "İnsan & Duygu", icon: "◉" },
  { id: "food", label: "Yemek", icon: "✦" }, { id: "travel", label: "Seyahat", icon: "↗" },
  { id: "work", label: "İş & Eğitim", icon: "▰" }, { id: "nature", label: "Doğa & Kent", icon: "≈" },
] as const;
export type LanguageId = typeof LANGUAGES[number]["id"];
export type Level = typeof LEVELS[number];
export type CategoryId = typeof CATEGORIES[number]["id"];
export type PartOfSpeech = "isim" | "fiil" | "sıfat" | "zarf" | "ifade";
export type ExamSkill = "okuma" | "dinleme" | "yazma" | "konuşma";

export const LEVEL_CATEGORIES: Record<Level, ReadonlyArray<{ id: CategoryId; label: string; icon: string }>> = {
  A1: [{id:"daily",label:"Ev & Günlük Temeller",icon:"◒"},{id:"people",label:"Aile & Tanışma",icon:"◉"},{id:"food",label:"Temel Yiyecekler",icon:"✦"},{id:"travel",label:"Şehirde Yön Bulma",icon:"↗"},{id:"work",label:"Okul & Meslekler",icon:"▰"},{id:"nature",label:"Hava & Mevsimler",icon:"≈"}],
  A2: [{id:"daily",label:"Rutinler & Hizmetler",icon:"◒"},{id:"people",label:"Duygular & Davranış",icon:"◉"},{id:"food",label:"Restoran & Alışveriş",icon:"✦"},{id:"travel",label:"Plan & Konaklama",icon:"↗"},{id:"work",label:"Görevler & Beceriler",icon:"▰"},{id:"nature",label:"Mahalle & Çevre",icon:"≈"}],
  B1: [{id:"daily",label:"Deneyim & Değişim",icon:"◒"},{id:"people",label:"İlişkiler & Görüşler",icon:"◉"},{id:"food",label:"Beslenme & Sağlık",icon:"✦"},{id:"travel",label:"Sorunlar & Çözümler",icon:"↗"},{id:"work",label:"Eğitim & Kariyer",icon:"▰"},{id:"nature",label:"Çevre & Yaşam",icon:"≈"}],
  B2: [{id:"daily",label:"Yaşam Biçimleri",icon:"◒"},{id:"people",label:"Toplum & Etkileşim",icon:"◉"},{id:"food",label:"Tüketim & Yemek Kültürü",icon:"✦"},{id:"travel",label:"Hareketlilik & Kültür",icon:"↗"},{id:"work",label:"Profesyonel İletişim",icon:"▰"},{id:"nature",label:"İklim & Kentleşme",icon:"≈"}],
  C1: [{id:"daily",label:"Kamusal & Özel Alan",icon:"◒"},{id:"people",label:"Kimlik & Psikoloji",icon:"◉"},{id:"food",label:"Gastronomi & Politika",icon:"✦"},{id:"travel",label:"Göç & Aidiyet",icon:"↗"},{id:"work",label:"Akademi & Kurumlar",icon:"▰"},{id:"nature",label:"Ekoloji & Sürdürülebilirlik",icon:"≈"}],
  C2: [{id:"daily",label:"Gündelik Söylem",icon:"◒"},{id:"people",label:"Öznellik & Etik",icon:"◉"},{id:"food",label:"Gıda Etiği & Söylem",icon:"✦"},{id:"travel",label:"Küresel Hareketlilik",icon:"↗"},{id:"work",label:"Bilgi & İktidar",icon:"▰"},{id:"nature",label:"İnsan–Doğa İlişkisi",icon:"≈"}],
};
export function getCategories(level: Level) { return LEVEL_CATEGORIES[level]; }

export const EXAM_PROFILES: Record<LanguageId, Record<Level, string>> = {
  en:{A1:"Cambridge Pre-A1/A1",A2:"A2 Key",B1:"B1 Preliminary",B2:"B2 First",C1:"C1 Advanced",C2:"C2 Proficiency"},
  de:{A1:"Goethe-Zertifikat A1",A2:"Goethe-Zertifikat A2",B1:"Goethe-Zertifikat B1",B2:"Goethe-Zertifikat B2",C1:"Goethe-Zertifikat C1",C2:"Goethe-Zertifikat C2"},
  fr:{A1:"DELF A1",A2:"DELF A2",B1:"DELF B1",B2:"DELF B2",C1:"DALF C1",C2:"DALF C2"},
  es:{A1:"DELE A1",A2:"DELE A2",B1:"DELE B1",B2:"DELE B2",C1:"DELE C1",C2:"DELE C2"},
  pt:{A1:"CAPLE A1 hazırlık",A2:"CIPLE A2",B1:"DEPLE B1",B2:"DIPLE B2",C1:"DAPLE C1",C2:"DUPLE C2"},
};

type Translation = Record<LanguageId, string> & { tr: string };
type Seed = Translation & { pos: PartOfSpeech };
export type WordCard = {
  id:string; language:LanguageId; level:Level; category:CategoryId; categoryLabel:string; index:number;
  term:string; lemma:string; turkish:string; partOfSpeech:PartOfSpeech; exam:string; skill:ExamSkill;
  example:string; exampleTr:string; reviewStatus:"editoryal çekirdek";
};

function parse(block:string): Seed[] {
  return block.trim().split("\n").map(line=>{const [pos,tr,en,de,fr,es,pt]=line.split("|");return {pos:pos as PartOfSpeech,tr,en,de,fr,es,pt};});
}

const bank: Record<Level, Record<CategoryId, Seed[]>> = {
 A1:{
  daily:parse(`isim|anahtar|key|Schlüssel|clé|llave|chave\nisim|pencere|window|Fenster|fenêtre|ventana|janela\nfiil|uyanmak|wake up|aufwachen|se réveiller|despertarse|acordar`),
  people:parse(`isim|soyadı|surname|Nachname|nom de famille|apellido|apelido\nifade|memnun oldum|nice to meet you|freut mich|enchanté|encantado|muito prazer\nisim|ebeveyn|parent|Elternteil|parent|progenitor|progenitor`),
  food:parse(`isim|ekmek|bread|Brot|pain|pan|pão\nisim|kahvaltı|breakfast|Frühstück|petit-déjeuner|desayuno|pequeno-almoço\nsıfat|susamış|thirsty|durstig|assoiffé|sediento|sedento`),
  travel:parse(`isim|bilet|ticket|Fahrkarte|billet|billete|bilhete\nifade|düz devam|straight ahead|geradeaus|tout droit|todo recto|sempre em frente\nisim|durak|stop|Haltestelle|arrêt|parada|paragem`),
  work:parse(`isim|ödev|homework|Hausaufgabe|devoirs|deberes|trabalho de casa\nisim|meslek|job|Beruf|métier|profesión|profissão\nfiil|tekrarlamak|repeat|wiederholen|répéter|repetir|repetir`),
  nature:parse(`isim|yağmur|rain|Regen|pluie|lluvia|chuva\nsıfat|bulutlu|cloudy|bewölkt|nuageux|nublado|nublado\nisim|ilkbahar|spring|Frühling|printemps|primavera|primavera`),
 },
 A2:{
  daily:parse(`isim|randevu|appointment|Termin|rendez-vous|cita|marcação\nfiil|ödünç almak|borrow|ausleihen|emprunter|pedir prestado|pedir emprestado\nisim|tamirat|repair|Reparatur|réparation|reparación|reparação`),
  people:parse(`sıfat|sabırlı|patient|geduldig|patient|paciente|paciente\nfiil|özlemek|miss|vermissen|manquer|echar de menos|sentir falta\nisim|davet|invitation|Einladung|invitation|invitación|convite`),
  food:parse(`isim|hesap|bill|Rechnung|addition|cuenta|conta\nsıfat|baharatlı|spicy|scharf|épicé|picante|picante\nfiil|sipariş vermek|order|bestellen|commander|pedir|pedir`),
  travel:parse(`isim|rezervasyon|reservation|Reservierung|réservation|reserva|reserva\nfiil|gecikmek|be delayed|sich verspäten|être en retard|retrasarse|atrasar-se\nisim|konaklama|accommodation|Unterkunft|hébergement|alojamiento|alojamento`),
  work:parse(`isim|vardiya|shift|Schicht|poste|turno|turno\nfiil|başvurmak|apply|sich bewerben|postuler|solicitar|candidatar-se\nisim|deneyim|experience|Erfahrung|expérience|experiencia|experiência`),
  nature:parse(`isim|geri dönüşüm|recycling|Recycling|recyclage|reciclaje|reciclagem\nisim|gürültü|noise|Lärm|bruit|ruido|ruído\nsıfat|kalabalık|crowded|überfüllt|bondé|abarrotado|lotado`),
 },
 B1:{
  daily:parse(`isim|alışkanlık|habit|Gewohnheit|habitude|hábito|hábito\nfiil|üstesinden gelmek|overcome|überwinden|surmonter|superar|superar\nisim|dönüm noktası|turning point|Wendepunkt|tournant|punto de inflexión|ponto de viragem`),
  people:parse(`isim|uzlaşma|compromise|Kompromiss|compromis|compromiso|compromisso\nfiil|ikna etmek|persuade|überzeugen|persuader|persuadir|persuadir\nsıfat|güvenilir|reliable|zuverlässig|fiable|fiable|fiável`),
  food:parse(`isim|besin|nutrient|Nährstoff|nutriment|nutriente|nutriente\nsıfat|dengeli|balanced|ausgewogen|équilibré|equilibrado|equilibrado\nisim|alerji|allergy|Allergie|allergie|alergia|alergia`),
  travel:parse(`isim|şikâyet|complaint|Beschwerde|réclamation|queja|reclamação\nfiil|iptal etmek|cancel|stornieren|annuler|cancelar|cancelar\nisim|aktarma|connection|Anschluss|correspondance|conexión|ligação`),
  work:parse(`isim|son teslim tarihi|deadline|Abgabetermin|date limite|fecha límite|prazo\nfiil|değerlendirmek|assess|beurteilen|évaluer|evaluar|avaliar\nisim|nitelik|qualification|Qualifikation|qualification|cualificación|qualificação`),
  nature:parse(`isim|kuraklık|drought|Dürre|sécheresse|sequía|seca\nfiil|korumak|preserve|bewahren|préserver|preservar|preservar\nisim|atık|waste|Abfall|déchet|residuo|resíduo`),
 },
 B2:{
  daily:parse(`isim|mahremiyet|privacy|Privatsphäre|vie privée|privacidad|privacidade\nfiil|önceliklendirmek|prioritise|priorisieren|prioriser|priorizar|priorizar\nsıfat|sürdürülebilir|sustainable|nachhaltig|durable|sostenible|sustentável`),
  people:parse(`isim|önyargı|bias|Voreingenommenheit|préjugé|sesgo|preconceito\nfiil|dışlamak|exclude|ausgrenzen|exclure|excluir|excluir\nisim|dayanışma|solidarity|Solidarität|solidarité|solidaridad|solidariedade`),
  food:parse(`isim|tüketim|consumption|Konsum|consommation|consumo|consumo\nisim|tedarik zinciri|supply chain|Lieferkette|chaîne d’approvisionnement|cadena de suministro|cadeia de abastecimento\nsıfat|mevsimlik|seasonal|saisonal|saisonnier|de temporada|sazonal`),
  travel:parse(`isim|kültür şoku|culture shock|Kulturschock|choc culturel|choque cultural|choque cultural\nfiil|uyum sağlamak|adapt|sich anpassen|s’adapter|adaptarse|adaptar-se\nisim|kitle turizmi|mass tourism|Massentourismus|tourisme de masse|turismo de masas|turismo de massas`),
  work:parse(`isim|geri bildirim|feedback|Rückmeldung|retour|retroalimentación|feedback\nfiil|müzakere etmek|negotiate|verhandeln|négocier|negociar|negociar\nisim|iş yükü|workload|Arbeitsbelastung|charge de travail|carga de trabajo|carga de trabalho`),
  nature:parse(`isim|karbon ayak izi|carbon footprint|CO₂-Fußabdruck|empreinte carbone|huella de carbono|pegada de carbono\nfiil|azaltmak|mitigate|mindern|atténuer|mitigar|mitigar\nisim|kentsel yayılma|urban sprawl|Zersiedelung|étalement urbain|expansión urbana|expansão urbana`),
 },
 C1:{
  daily:parse(`isim|yabancılaşma|alienation|Entfremdung|aliénation|alienación|alienação\nisim|görünmez emek|invisible labour|unsichtbare Arbeit|travail invisible|trabajo invisible|trabalho invisível\nfiil|içselleştirmek|internalise|verinnerlichen|intérioriser|interiorizar|interiorizar`),
  people:parse(`isim|aidiyet|belonging|Zugehörigkeit|appartenance|pertenencia|pertença\nisim|öz farkındalık|self-awareness|Selbstwahrnehmung|conscience de soi|autoconciencia|autoconsciência\nsıfat|çelişkili|ambivalent|ambivalent|ambivalent|ambivalente|ambivalente`),
  food:parse(`isim|gıda egemenliği|food sovereignty|Ernährungssouveränität|souveraineté alimentaire|soberanía alimentaria|soberania alimentar\nisim|israf|wastefulness|Verschwendung|gaspillage|despilfarro|desperdício\nsıfat|izlenebilir|traceable|rückverfolgbar|traçable|trazable|rastreável`),
  travel:parse(`isim|yerinden edilme|displacement|Vertreibung|déplacement forcé|desplazamiento|deslocação\nisim|diaspora|diaspora|Diaspora|diaspora|diáspora|diáspora\nfiil|bütünleşmek|integrate|sich integrieren|s’intégrer|integrarse|integrar-se`),
  work:parse(`isim|akran değerlendirmesi|peer review|Begutachtung|évaluation par les pairs|revisión por pares|revisão por pares\nisim|kurumsal yönetişim|governance|Governance|gouvernance|gobernanza|governação\nfiil|gerekçelendirmek|substantiate|begründen|étayer|fundamentar|fundamentar`),
  nature:parse(`isim|biyolojik çeşitlilik|biodiversity|Biodiversität|biodiversité|biodiversidad|biodiversidade\nisim|iklim direnci|climate resilience|Klimaresilienz|résilience climatique|resiliencia climática|resiliência climática\nfiil|yeniden canlandırmak|regenerate|regenerieren|régénérer|regenerar|regenerar`),
 },
 C2:{
  daily:parse(`isim|sıradanlığın politikası|politics of the ordinary|Politik des Alltäglichen|politique de l’ordinaire|política de lo cotidiano|política do quotidiano\nisim|zımni uzlaşım|tacit convention|stillschweigende Konvention|convention tacite|convención tácita|convenção tácita\nfiil|sorunsallaştırmak|problematise|problematisieren|problématiser|problematizar|problematizar`),
  people:parse(`isim|öznelerarasılık|intersubjectivity|Intersubjektivität|intersubjectivité|intersubjetividad|intersubjetividade\nisim|ahlaki fail|moral agent|moralischer Akteur|agent moral|agente moral|agente moral\nsıfat|indirgemeci|reductionist|reduktionistisch|réductionniste|reduccionista|reducionista`),
  food:parse(`isim|metalaşma|commodification|Kommodifizierung|marchandisation|mercantilización|mercantilização\nisim|dağıtım adaleti|distributive justice|Verteilungsgerechtigkeit|justice distributive|justicia distributiva|justiça distributiva\nsıfat|sömürücü|exploitative|ausbeuterisch|prédateur|explotador|exploratório`),
  travel:parse(`isim|ulusötesicilik|transnationalism|Transnationalismus|transnationalisme|transnacionalismo|transnacionalismo\nisim|sınır rejimi|border regime|Grenzregime|régime frontalier|régimen fronterizo|regime fronteiriço\nfiil|yersizyurtsuzlaştırmak|deterritorialise|deterritorialisieren|déterritorialiser|desterritorializar|desterritorializar`),
  work:parse(`isim|bilgi kuramı|epistemology|Erkenntnistheorie|épistémologie|epistemología|epistemologia\nisim|kurumsal atalet|institutional inertia|institutionelle Trägheit|inertie institutionnelle|inercia institucional|inércia institucional\nfiil|çürütmek|refute|widerlegen|réfuter|refutar|refutar`),
  nature:parse(`isim|insanmerkezcilik|anthropocentrism|Anthropozentrismus|anthropocentrisme|antropocentrismo|antropocentrismo\nisim|gezegensel sınır|planetary boundary|planetare Grenze|limite planétaire|límite planetario|limite planetário\nfiil|yeniden yabanlaştırmak|rewild|wiederverwildern|réensauvager|renaturalizar|renaturalizar`),
 }
};

const skills: Record<CategoryId, ExamSkill> = {daily:"dinleme",people:"konuşma",food:"dinleme",travel:"okuma",work:"yazma",nature:"okuma"};
const prompts: Record<ExamSkill,string> = {okuma:"Metinde eş anlamlı veya karşıt bağlamı bul.",dinleme:"Sözcüğü doğal hızda dinle ve ana fikri yakala.",yazma:"Sözcüğü gerekçeli bir cümlede kullan.",konuşma:"Sözcükle görüşünü açıklayıp bir örnek ver."};

export function buildDeck(language:LanguageId, level:Level, category:CategoryId): WordCard[] {
 const categoryLabel=getCategories(level).find(x=>x.id===category)!.label;
 return bank[level][category].map((seed,index)=>({id:`${language}-${level}-${category}-${index}`,language,level,category,categoryLabel,index,term:seed[language],lemma:seed[language],turkish:seed.tr,partOfSpeech:seed.pos,exam:EXAM_PROFILES[language][level],skill:skills[category],example:prompts[skills[category]],exampleTr:`Aktif görev: ${seed.tr} sözcüğünü ezberden üret.`,reviewStatus:"editoryal çekirdek"}));
}

export function normalizeAnswer(value:string){return value.trim().toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[.,!?;:'’\-"]/g,"").replace(/\s+/g," ");}
export function validateCurriculum(){return auditCurriculum().length===0;}
export function auditCurriculum(){
 const errors:string[]=[]; const signatures=new Set<string>();
 for(const level of LEVELS){const labels=getCategories(level).map(x=>x.label);const signature=labels.join("|");if(labels.length!==6||new Set(labels).size!==6)errors.push(`${level}: kategori seti eksik/tekrarlı`);if(signatures.has(signature))errors.push(`${level}: kategori seti başka seviyenin kopyası`);signatures.add(signature);}
 for(const {id:language} of LANGUAGES)for(const {id:category} of CATEGORIES){const seen=new Set<string>();for(const level of LEVELS){const deck=buildDeck(language,level,category);if(!deck.length)errors.push(`${language}/${level}/${category}: içerik yok`);for(const card of deck){const lemma=normalizeAnswer(card.lemma);if(seen.has(lemma))errors.push(`${language}/${category}: seviyeler arası tekrar: ${lemma}`);seen.add(lemma);if(!card.partOfSpeech||!card.exam||!card.skill)errors.push(`${card.id}: metadata eksik`);if(/nuanced use|critical reading|nuancierter gebrauch/i.test(card.term))errors.push(`${card.id}: yapay türetim`);}}}
 return errors;
}
