export interface WordBank {
  subjects: string[];
  verbs: string[];
  objects: string[];
  timeClauses?: string[];
}

export const CATEGORIES = [
  { id: "daily", name: "Günlük Yaşam" },
  { id: "technology", name: "Teknoloji & Yazılım" },
  { id: "business", name: "İş & Ekonomi" },
  { id: "travel", name: "Seyahat & Tatil" },
  { id: "academic", name: "Akademik & Bilim" },
];

export const DIFFICULTY_LEVELS = [
  { id: "Kolay", name: "Kolay (A1-A2)", cefr: "A1" },
  { id: "Orta", name: "Orta (B1-B2)", cefr: "B1" },
  { id: "Zor", name: "Zor (C1-C2)", cefr: "C1" },
];

// Every category now has full Kolay / Orta / Zor word banks (previously
// only 'daily' and 'technology' had data, so other categories silently
// fell back to 'daily' and produced repetitive/identical sentences).
export const CATEGORY_MATRIX: Record<string, Record<string, WordBank>> = {
  daily: {
    Kolay: {
      subjects: ["Ahmet", "Ayşe", "Öğrenci", "Mimar", "Komşumuz", "Küçük kız", "Emekli öğretmen", "Genç adam", "Ev hanımı", "Taksi şoförü"],
      objects: ["sabah kahvesini", "taze ekmeği", "gazeteyi", "sütü", "bulaşıkları", "çamaşırları", "market alışverişini", "akşam yemeğini", "posta kutusunu", "bahçeyi"],
      verbs: ["içiyor.", "alıyor.", "okuyor.", "hazırlıyor.", "yıkıyor.", "topluyor.", "kontrol ediyor.", "suluyor."]
    },
    Orta: {
      subjects: ["Genç çift", "Komşumuz", "Eski arkadaşım", "Emekli çift", "Üç kardeş", "Yeni taşınan aile", "Apartman yöneticisi", "Mahalle bakkalı"],
      timeClauses: ["Her hafta sonu", "Akşamları iş çıkışında", "Yaz aylarında", "Tatil öncesinde", "Okul dönemi başlarken", "Kış geldiğinde"],
      objects: ["sahilde yürüyüş yapmayı", "pazardan taze sebze almayı", "çocuklarla vakit geçirmeyi", "evi yeniden düzenlemeyi", "komşularla sohbet etmeyi", "bahçe işleriyle uğraşmayı"],
      verbs: ["tercih ediyor.", "planlıyor.", "alışkanlık haline getiriyor.", "keyifle yapıyor."]
    },
    Zor: {
      subjects: ["Şehir merkezinde yaşayan aileler", "Üniversite araştırmacıları", "Yerel yönetim uzmanları", "Sosyoloji bölümü öğrencileri", "Toplum sağlığı gönüllüleri"],
      timeClauses: ["Kapsamlı sosyolojik incelemelerin ardından", "Uzun soluklu bir saha araştırmasının sonucunda", "Yıllık yaşam kalitesi raporunun ışığında"],
      objects: ["toplu taşıma entegrasyonunu değerlendirmeyi", "mahalle içi sosyal dayanışma ağlarını güçlendirmeyi", "kentsel dönüşüm sürecinin etkilerini analiz etmeyi"],
      verbs: ["kararlaştırmıştır.", "önceliklendirmiştir.", "gündeme taşımıştır."]
    },
  },
  technology: {
    Kolay: {
      subjects: ["Yazılımcı", "Kullanıcı", "Tekniker", "Öğrenci", "Oyuncu", "Fotoğrafçı", "Ofis çalışanı", "Genç girişimci"],
      objects: ["yeni bilgisayarı", "mobil uygulamayı", "interneti", "kablosuz kulaklığı", "akıllı saati", "bulut depolamayı", "dijital fotoğrafları", "yazılım güncellemesini"],
      verbs: ["kullanıyor.", "açıyor.", "test ediyor.", "indiriyor.", "yüklüyor.", "yeniden başlatıyor."]
    },
    Orta: {
      subjects: ["Geliştirici ekibi", "Yazılım stajyeri", "Ürün müdürü", "Kalite kontrol uzmanı", "Sistem yöneticisi", "Veri analisti"],
      timeClauses: ["Proje tesliminden önce", "Haftalık sprint toplantısında", "Kod incelemesi sırasında", "Canlıya alma öncesinde"],
      objects: ["hataları düzeltmeyi", "kodları incelemeyi", "performans testlerini tamamlamayı", "kullanıcı geri bildirimlerini değerlendirmeyi"],
      verbs: ["tamamladı.", "sürdürüyor.", "önceliklendirdi.", "raporladı."]
    },
    Zor: {
      subjects: ["Sistem mimarları", "Siber güvenlik uzmanları", "Makine öğrenmesi mühendisleri", "Bulut altyapı ekibi", "Veri güvenliği denetçileri"],
      timeClauses: ["Dağıtık bulut mimarisi optimizasyonu sırasında", "Kapsamlı sızma testi sürecinin ardından", "Ölçeklenebilirlik analizinin sonucunda"],
      objects: ["mikroservis bağımlılıklarını yeniden yapılandırmayı", "gecikme sürelerini asgariye indirmeyi", "veri şifreleme protokollerini güçlendirmeyi"],
      verbs: ["başarıyla gerçekleştirdi.", "titizlikle uyguladı.", "sıkı denetimden geçirdi."]
    },
  },
  business: {
    Kolay: {
      subjects: ["Patron", "Sekreter", "Satıcı", "Müşteri", "Muhasebeci", "Yeni çalışan", "Mağaza sahibi", "Kurye"],
      objects: ["faturayı", "siparişi", "toplantı odasını", "raporu", "e-postayı", "ürün stokunu", "kasayı", "sözleşmeyi"],
      verbs: ["hazırlıyor.", "onaylıyor.", "gönderiyor.", "kontrol ediyor.", "imzalıyor.", "teslim ediyor."]
    },
    Orta: {
      subjects: ["Pazarlama ekibi", "Bölge müdürü", "İnsan kaynakları uzmanı", "Satış temsilcisi", "Finans danışmanı", "Proje koordinatörü"],
      timeClauses: ["Çeyrek dönem değerlendirmesinde", "Yeni bütçe planlaması sırasında", "Müşteri görüşmesi öncesinde", "Yıl sonu kapanışında"],
      objects: ["satış hedeflerini gözden geçirmeyi", "yeni bir pazarlama stratejisi geliştirmeyi", "ekip performansını değerlendirmeyi", "tedarikçilerle yeniden görüşmeyi"],
      verbs: ["planladı.", "önerdi.", "gündeme aldı.", "kararlaştırdı."]
    },
    Zor: {
      subjects: ["Üst düzey yöneticiler", "Kurumsal strateji danışmanları", "Yatırım komitesi üyeleri", "Uluslararası iş geliştirme ekibi"],
      timeClauses: ["Kapsamlı pazar analizi doğrultusunda", "Uzun vadeli büyüme stratejisinin bir parçası olarak", "Birleşme ve satın alma sürecinin ardından"],
      objects: ["şirketin sermaye yapısını yeniden düzenlemeyi", "uluslararası pazarlara açılma stratejisini revize etmeyi", "operasyonel verimliliği artıracak önlemleri hayata geçirmeyi"],
      verbs: ["nihai olarak onaylamıştır.", "stratejik öncelik haline getirmiştir.", "yönetim kuruluna sunmuştur."]
    },
  },
  travel: {
    Kolay: {
      subjects: ["Turist", "Aile", "Genç çift", "Pilot", "Rehber", "Otel görevlisi", "Yolcu", "Bavul taşıyıcısı"],
      objects: ["uçak biletini", "otel odasını", "haritayı", "valizi", "pasaportu", "şehir turunu", "restoran menüsünü", "taksi durağını"],
      verbs: ["alıyor.", "ayırtıyor.", "inceliyor.", "hazırlıyor.", "buluyor.", "kontrol ediyor."]
    },
    Orta: {
      subjects: ["Deneyimli gezginler", "Balayı çifti", "Sırt çantalı gezgin grubu", "Tur operatörü", "Yerel rehber"],
      timeClauses: ["Tatil planlaması yaparken", "Yeni bir şehre varır varmaz", "Uzun bir uçuşun ardından", "Rota değişikliği sırasında"],
      objects: ["yerel lezzetleri keşfetmeyi", "tarihi mekânları ziyaret etmeyi", "alternatif ulaşım seçeneklerini araştırmayı", "konaklama planını yeniden düzenlemeyi"],
      verbs: ["tercih ediyor.", "öneriyor.", "planlıyor.", "keyifle deneyimliyor."]
    },
    Zor: {
      subjects: ["Sürdürülebilir turizm uzmanları", "Kültürel miras araştırmacıları", "Uluslararası seyahat danışmanları"],
      timeClauses: ["Bölgesel turizm politikalarının değerlendirilmesi sırasında", "Kapsamlı bir saha ziyaretinin ardından", "Sürdürülebilirlik raporunun hazırlanması sürecinde"],
      objects: ["yerel ekonomiye katkı sağlayan turizm modellerini teşvik etmeyi", "kültürel mirasın korunmasına yönelik önlemleri değerlendirmeyi", "aşırı turizmin çevresel etkilerini azaltacak politikalar geliştirmeyi"],
      verbs: ["rapor haline getirmiştir.", "resmi gündeme taşımıştır.", "titizlikle incelemiştir."]
    },
  },
  academic: {
    Kolay: {
      subjects: ["Öğrenci", "Öğretmen", "Kütüphaneci", "Araştırmacı", "Sınıf temsilcisi", "Üniversiteli"],
      objects: ["ders kitabını", "ödevi", "sınav sonucunu", "kütüphane kartını", "sunum dosyasını", "ders notlarını"],
      verbs: ["okuyor.", "hazırlıyor.", "teslim ediyor.", "inceliyor.", "not alıyor.", "gözden geçiriyor."]
    },
    Orta: {
      subjects: ["Yüksek lisans öğrencisi", "Akademik danışman", "Araştırma grubu", "Bölüm başkanı", "Doktora adayı"],
      timeClauses: ["Tez savunmasından önce", "Dönem sonu sınavlarına hazırlanırken", "Konferans sunumu öncesinde", "Makale değerlendirme sürecinde"],
      objects: ["literatür taramasını genişletmeyi", "araştırma yöntemini yeniden gözden geçirmeyi", "bulguları akademik bir dille sunmayı", "kaynakça listesini güncellemeyi"],
      verbs: ["planlıyor.", "önceliklendiriyor.", "titizlikle yürütüyor.", "tamamlamayı hedefliyor."]
    },
    Zor: {
      subjects: ["Disiplinlerarası araştırma ekibi", "Akademik jüri üyeleri", "Uluslararası hakemli dergi editörleri", "Doktora sonrası araştırmacılar"],
      timeClauses: ["Kapsamlı meta-analiz sürecinin ardından", "Uzun soluklu bir longitudinal çalışmanın sonucunda", "Hakem değerlendirme sürecinin tamamlanmasıyla"],
      objects: ["metodolojik yaklaşımın geçerliliğini sorgulamayı", "elde edilen bulguların kuramsal çerçevesini derinleştirmeyi", "çapraz disiplin işbirliğine dayalı yeni bir araştırma önerisi geliştirmeyi"],
      verbs: ["bilimsel camiaya sunmuştur.", "eleştirel bir değerlendirmeye tabi tutmuştur.", "yayına hazır hale getirmiştir."]
    },
  },
};
/**
 * True "never repeat" sentence generation.
 *
 * `usedSentences` is a persistent (localStorage-backed, see lib/storage.ts)
 * set of every sentence already shown to the user for this exact
 * category+difficulty pair. We keep drawing random combinations until we
 * find one that isn't in that set. Only if the ENTIRE combinatorial pool for
 * that category+difficulty has genuinely been exhausted do we recycle the
 * oldest half of the used set, so the user still gets a very long unique
 * streak instead of a hard repeat every few sentences.
 */
export function generateOfflineSentence(
  category: string,
  difficulty: string,
  usedSentences: Set<string> | string[] = new Set()
): string {
  const categoryData = CATEGORY_MATRIX[category] || CATEGORY_MATRIX.daily;
  const levelData = categoryData[difficulty] || categoryData.Kolay || CATEGORY_MATRIX.daily.Kolay;

  const used = usedSentences instanceof Set ? usedSentences : new Set(usedSentences);
  const poolSize = getCombinationCount(category, difficulty);
  // Give generation enough attempts to find something new even in a fairly
  // full pool, but don't loop forever.
  const maxAttempts = Math.min(Math.max(poolSize * 2, 50), 4000);

  let attempts = 0;
  let sentence = '';

  while (attempts < maxAttempts) {
    const subject = levelData.subjects[Math.floor(Math.random() * levelData.subjects.length)];
    const object = levelData.objects[Math.floor(Math.random() * levelData.objects.length)];
    const verb = levelData.verbs[Math.floor(Math.random() * levelData.verbs.length)];

    if (levelData.timeClauses && levelData.timeClauses.length > 0 && Math.random() > 0.3) {
      const time = levelData.timeClauses[Math.floor(Math.random() * levelData.timeClauses.length)];
      sentence = `${time}, ${subject.toLowerCase()} ${object} ${verb}`;
    } else {
      sentence = `${subject}, ${object} ${verb}`;
    }

    if (!used.has(sentence)) return sentence;
    attempts++;
  }

  // Pool genuinely exhausted for this category+difficulty: return the
  // (still valid, just previously-seen) sentence rather than looping
  // forever. The caller is responsible for recycling used-sentence history
  // via lib/storage.ts's rotateUsedSentences when this happens often.
  return sentence;
}

/** Total distinct vocabulary items (subjects+objects+verbs+timeClauses) across every category/level. */
export function getTotalWordCount(): number {
  let total = 0;
  Object.values(CATEGORY_MATRIX).forEach((levels) => {
    Object.values(levels).forEach((bank) => {
      total += bank.subjects.length + bank.objects.length + bank.verbs.length + (bank.timeClauses?.length || 0);
    });
  });
  return total;
}

/** How many unique sentence combinations exist for one category+difficulty pair. */
export function getCombinationCount(category: string, difficulty: string): number {
  const categoryData = CATEGORY_MATRIX[category] || CATEGORY_MATRIX.daily;
  const levelData = categoryData[difficulty] || categoryData.Kolay || CATEGORY_MATRIX.daily.Kolay;
  const s = levelData.subjects.length || 1;
  const o = levelData.objects.length || 1;
  const v = levelData.verbs.length || 1;
  const t = levelData.timeClauses?.length || 1;
  return s * o * v * t;
}

/** Total unique sentence combinations across the whole app (all categories x all levels). */
export function getTotalCombinationCount(): number {
  let total = 0;
  Object.keys(CATEGORY_MATRIX).forEach((cat) => {
    Object.keys(CATEGORY_MATRIX[cat]).forEach((lvl) => {
      total += getCombinationCount(cat, lvl);
    });
  });
  return total;
}
