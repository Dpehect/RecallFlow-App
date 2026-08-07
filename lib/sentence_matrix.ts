export interface WordBank {
  subjects: string[];
  verbs: string[];
  objects: string[];
  timeClauses?: string[];
}

export const CATEGORIES = [
  { id: 'daily', name: 'Günlük Yaşam' },
  { id: 'technology', name: 'Teknoloji & Yazılım' },
  { id: 'business', name: 'İş & Ekonomi' },
  { id: 'travel', name: 'Seyahat & Tatil' },
  { id: 'academic', name: 'Akademik & Bilim' }
];

export const DIFFICULTY_LEVELS = [
  { id: 'Kolay', name: 'Kolay (A1-A2)', cefr: 'A1' },
  { id: 'Orta', name: 'Orta (B1-B2)', cefr: 'B1' },
  { id: 'Zor', name: 'Zor (C1-C2)', cefr: 'C1' }
];

export const CATEGORY_MATRIX: Record<string, Record<string, WordBank>> = {
  daily: {
    Kolay: {
      subjects: ["Ahmet", "Ayşe", "Öğrenci", "Mimar"],
      objects: ["sabah kahvesini", "taze ekmeği", "gazeteyi", "sütü"],
      verbs: ["içiyor.", "alıyor.", "okuyor.", "hazırlıyor."]
    },
    Orta: {
      subjects: ["Genç çift", "Komşumuz", "Eski arkadaşım"],
      timeClauses: ["Her hafta sonu", "Akşamları iş çıkışında"],
      objects: ["sahilde yürüyüş yapmayı", "pazardan taze sebze almayı"],
      verbs: ["tercih ediyor.", "planlıyor."]
    },
    Zor: {
      subjects: ["Şehir merkezinde yaşayan aileler", "Üniversite araştırmacıları"],
      timeClauses: ["Kapsamlı sosyolojik incelemelerin ardından"],
      objects: ["toplu taşıma entegrasyonunu değerlendirmeyi"],
      verbs: ["kararlaştırmıştır."]
    }
  },
  technology: {
    Kolay: {
      subjects: ["Yazılımcı", "Kullanıcı", "Tekniker"],
      objects: ["yeni bilgisayarı", "mobil uygulamayı", "interneti"],
      verbs: ["kullanıyor.", "açıyor.", "test ediyor."]
    },
    Orta: {
      subjects: ["Geliştirici ekibi", "Yazılım stajyeri"],
      timeClauses: ["Proje tesliminden önce"],
      objects: ["hataları düzeltmeyi", "kodları incelemeyi"],
      verbs: ["tamamladı.", "sürdürüyor."]
    },
    Zor: {
      subjects: ["Sistem mimarları", "Siber güvenlik uzmanları"],
      timeClauses: ["Dağıtık bulut mimarisi optimizasyonu sırasında"],
      objects: ["mikroservis bağımlılıklarını yeniden yapılandırmayı"],
      verbs: ["başarıyla gerçekleştirdi."]
    }
  }
};

export function generateOfflineSentence(category: string, difficulty: string, history: string[] = []): string {
  const categoryData = CATEGORY_MATRIX[category] || CATEGORY_MATRIX.daily;
  const levelData = categoryData[difficulty] || categoryData.Kolay || CATEGORY_MATRIX.daily.Kolay;

  let attempts = 0;
  let sentence = "";

  while (attempts < 30) {
    const subject = levelData.subjects[Math.floor(Math.random() * levelData.subjects.length)];
    const object = levelData.objects[Math.floor(Math.random() * levelData.objects.length)];
    const verb = levelData.verbs[Math.floor(Math.random() * levelData.verbs.length)];

    if (levelData.timeClauses && Math.random() > 0.3) {
      const time = levelData.timeClauses[Math.floor(Math.random() * levelData.timeClauses.length)];
      sentence = `${time}, ${subject.toLowerCase()} ${object} ${verb}`;
    } else {
      sentence = `${subject}, ${object} ${verb}`;
    }

    if (!history.includes(sentence)) break;
    attempts++;
  }

  return sentence;
}
