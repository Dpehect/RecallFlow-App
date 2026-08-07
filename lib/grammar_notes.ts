export interface GrammarFocusPoint {
  title: string;
  explanation: string;
  examples: string[];
}

export interface GrammarLevelInfo {
  id: string;
  cefr: string;
  title: string;
  description: string;
  focusPoints: GrammarFocusPoint[];
}

// Single source of truth for the difficulty -> grammar guidance mapping.
// Used by app/api/generate-prompt/route.ts (sent to the LLM prompt engine)
// and by components/sections/DilBilgisiSection.tsx (shown to the user).
//
// Her odak noktası artık gerçek bir açıklama + birden fazla örnek içerir
// (önceden sadece 3 kelimelik bir etiketti).
export const GRAMMAR_LEVELS: Record<string, GrammarLevelInfo> = {
  Kolay: {
    id: 'Kolay',
    cefr: 'A1-A2',
    title: 'Kolay (A1-A2)',
    description: 'Kısa, doğrudan, temel kelimeler ve basit zamanlar (Özne + Nesne + Fiil).',
    focusPoints: [
      {
        title: 'Şimdiki zaman (-yor)',
        explanation:
          'Şu anda olan veya sürmekte olan eylemleri anlatmak için fiile "-yor" eki eklenir. Ek, ünlü uyumuna göre -ıyor/-iyor/-uyor/-üyor biçimini alır ve kişi eki en sona gelir.',
        examples: [
          'Ben kahve içiyorum. (içmek + -iyor + -um)',
          'Sen kitap okuyorsun.',
          'O, akşam yemeğini hazırlıyor.',
        ],
      },
      {
        title: 'Basit özne-nesne-yüklem sırası',
        explanation:
          'Türkçede standart cümle sırası Özne + Nesne + Yüklem (fiil en sonda) şeklindedir. Yüklem neredeyse her zaman cümlenin son öğesidir.',
        examples: [
          'Ahmet (özne) kahvesini (nesne) içiyor (yüklem).',
          'Öğrenci ödevini teslim ediyor.',
          'Komşumuz bahçeyi suluyor.',
        ],
      },
      {
        title: 'Temel günlük kelime hazinesi',
        explanation:
          'A1-A2 seviyesinde ev, yemek, alışveriş ve günlük rutinlerle ilgili somut, yüksek frekanslı kelimeler öğrenilir. Soyut kavramlardan kaçınılır.',
        examples: [
          'market, kahvaltı, bulaşık, komşu, erken, yorgun',
          'Kelime tabında bu kategoriye göre pratik yapabilirsin.',
        ],
      },
    ],
  },
  Orta: {
    id: 'Orta',
    cefr: 'B1-B2',
    title: 'Orta (B1-B2)',
    description: 'Orta uzunlukta, zaman zarfları, edatlar ve bağlaçlar içeren cümleler.',
    focusPoints: [
      {
        title: 'Zaman zarfları (her hafta, akşamları...)',
        explanation:
          'Cümlenin başına eklenen zaman zarfları eylemin ne zaman/ne sıklıkta yapıldığını belirtir. Genellikle cümlenin en başında, virgülle ayrılarak kullanılır.',
        examples: [
          'Her hafta sonu, ailemle vakit geçiriyoruz.',
          'Akşamları iş çıkışında spor yapıyorum.',
          'Yaz aylarında sahilde yürüyüş yapmayı tercih ediyoruz.',
        ],
      },
      {
        title: 'Bağlaçlarla cümle bağlama',
        explanation:
          '"ve", "ama", "çünkü", "bu yüzden" gibi bağlaçlar iki cümleyi veya fikri birbirine bağlar. B1-B2 seviyesinde neden-sonuç ve zıtlık bağlaçları öne çıkar.',
        examples: [
          'Yorgundum ama toplantıya katıldım.',
          'Erken kalktım çünkü işe yetişmem gerekiyordu.',
          'Hava yağmurluydu, bu yüzden planı ertelemeye karar verdik.',
        ],
      },
      {
        title: 'Geniş ve geçmiş zaman çekimleri',
        explanation:
          'Geniş zaman (-r/-ar/-er) alışkanlıkları ve genel doğruları anlatır; geçmiş zaman (-dı/-di) tamamlanmış eylemleri anlatır. B seviyesinde ikisi arasında geçiş yapmak önemlidir.',
        examples: [
          'Genellikle sabah kahvesini içer. (geniş zaman)',
          'Dün akşam raporu tamamladı. (geçmiş zaman)',
          'Her yıl bütçe planlamasını Ocak ayında yapar.',
        ],
      },
    ],
  },
  Zor: {
    id: 'Zor',
    cefr: 'C1-C2',
    title: 'Zor (C1-C2)',
    description: 'Karmaşık yan cümleler, ileri düzey akademik/mesleki kelimeler ve soyut anlatım.',
    focusPoints: [
      {
        title: 'Yan cümlecikler ve bağımlı yapılar',
        explanation:
          '"-dığı", "-mesi", "-ması" gibi isim-fiil ekleriyle kurulan yan cümlecikler, ana cümleye bağımlı ek bilgi taşır. C1-C2 metinlerinde bu yapılar iç içe kullanılır.',
        examples: [
          'Uzmanların önerdiği önlemlerin hayata geçirilmesi bekleniyor.',
          'Araştırmanın ortaya koyduğu bulgular, politika yapıcıları harekete geçirdi.',
          'Şirketin büyüme stratejisini revize etmesi gerektiği rapor edildi.',
        ],
      },
      {
        title: 'Akademik / mesleki terminoloji',
        explanation:
          'İleri seviyede soyut, sektöre özgü terimler (ör. "ölçeklenebilirlik", "meta-analiz", "sermaye yapısı") sık karşılaşılan kelime dağarcığının yerini alır.',
        examples: [
          'Şirket sermaye yapısını yeniden düzenledi.',
          'Araştırmacılar kapsamlı bir meta-analiz gerçekleştirdi.',
          'Sistem mimarları ölçeklenebilirlik analizini tamamladı.',
        ],
      },
      {
        title: 'Soyut ve resmi anlatım',
        explanation:
          'C1-C2 metinlerinde kişisel/günlük ton yerine resmi, nesnel bir anlatım kullanılır; fiiller sıkça "-mıştır" gibi resmi geçmiş zaman ekleriyle çekimlenir.',
        examples: [
          'Komite, teklifi nihai olarak onaylamıştır.',
          'Kurul, konuyu stratejik öncelik haline getirmiştir.',
          'Araştırma ekibi bulguları bilimsel camiaya sunmuştur.',
        ],
      },
    ],
  },
};

export function getDifficultyGuide(difficulty: string): string {
  return (
    GRAMMAR_LEVELS[difficulty]?.description ||
    GRAMMAR_LEVELS.Kolay.description
  );
}
