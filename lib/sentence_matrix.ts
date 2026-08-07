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

export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const CATEGORY_MATRIX: Record<string, Record<string, WordBank>> = {
  daily: {
    A1: {
      subjects: ["Ahmet", "Ayşe", "Öğrenci", "Mimar"],
      objects: ["sabah kahvesini", "taze ekmeği", "gazeteyi", "sütü"],
      verbs: ["içiyor.", "alıyor.", "okuyor.", "hazırlıyor."]
    },
    A2: {
      subjects: ["Genç çift", "Komşumuz", "Eski arkadaşım"],
      timeClauses: ["Her Hafta sonu", "Akşamları iş çıkışında"],
      objects: ["sahilde yürüyüş yapmayı", "pazardan taze sebze almayı"],
      verbs: ["tercih ediyor.", "planlıyor."]
    },
    B1: {
      subjects: ["Şehir merkezinde yaşayan aileler", "Üniversite öğrencileri"],
      timeClauses: ["Yoğun geçen bir haftanın ardından"],
      objects: ["toplu taşıma araçlarını kullanmayı", "yerel kütüphanede vakit geçirmeyi"],
      verbs: ["faydalı buluyor.", "kararlaştırdı."]
    }
  },
  technology: {
    A1: {
      subjects: ["Yazılımcı", "Kullanıcı", "Tekniker"],
      objects: ["yeni bilgisayarı", "mobil uygulamayı", "interneti"],
      verbs: ["kullanıyor.", "açıyor.", "test ediyor."]
    },
    A2: {
      subjects: ["Geliştirici ekibi", "Yazılım stajyeri"],
      timeClauses: ["Proje tesliminden önce"],
      objects: ["hataları düzeltmeyi", "kodları incelemeyi"],
      verbs: ["tamamladı.", "sürdürüyor."]
    },
    B1: {
      subjects: ["Sistem mimarları", "Veri analistleri"],
      timeClauses: ["Siber güvenlik denetiminin ardından"],
      objects: ["bulut sunucu altyapısını optimize etmeyi"],
      verbs: ["başarıyla gerçekleştirdi."]
    }
  }
};

export function generateOfflineSentence(category: string, level: string, history: string[] = []): string {
  const categoryData = CATEGORY_MATRIX[category] || CATEGORY_MATRIX.daily;
  const levelData = categoryData[level] || categoryData.A1 || CATEGORY_MATRIX.daily.A1;

  let attempts = 0;
  let sentence = "";

  while (attempts < 30) {
    const subject = levelData.subjects[Math.floor(Math.random() * levelData.subjects.length)];
    const object = levelData.objects[Math.floor(Math.random() * levelData.objects.length)];
    const verb = levelData.verbs[Math.floor(Math.random() * levelData.verbs.length)];

    if (levelData.timeClauses && Math.random() > 0.4) {
      const time = levelData.timeClauses[Math.floor(Math.random() * levelData.timeClauses.length)];
      sentence = `${time}, ${subject.toLowerCase()} ${object} ${verb}`;
    } else {
      sentence = `${subject}, ${object} ${verb}`;
    }

    if (!history.includes(sentence)) {
      break;
    }
    attempts++;
  }

  return sentence;
}
