export interface WordBank {
  subjects: string[];
  verbs: string[];
  objects: string[];
  timeClauses?: string[];
  connectives?: string[];
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
      subjects: ["Ahmet", "Ayşe", "Öğrenci", "Mimar", "Doktor"],
      objects: ["sabah kahvesini", "yeni taze ekmeği", "gazeteyi", "sütü"],
      verbs: ["içiyor.", "alıyor.", "okuyor.", "hazırlıyor."]
    },
    A2: {
      subjects: ["Genç çift", "Komşumuz", "Eski arkadaşım"],
      timeClauses: ["Her hafta sonu", "Akşamları iş çıkışında", "Sabah erkenden"],
      objects: ["sahilde yürüyüş yapmayı", "pazardan taze sebze almayı", "parkta dinlenmeyi"],
      verbs: ["tercih ediyor.", "planlıyor.", "seviyor."]
    },
    B1: {
      subjects: ["Şehir merkezinde yaşayan aileler", "Üniversite öğrencileri"],
      timeClauses: ["Hafta sonu tatili boyunca", "Yoğun geçen bir haftanın ardından"],
      objects: ["toplu taşıma araçlarını kullanmayı", "yerel kütüphanede vakit geçirmeyi"],
      verbs: ["faydalı buluyor.", "kararlaştırdı.", "alışkanlık haline getirdi."]
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
      timeClauses: ["Proje tesliminden önce", "Öğleden sonra"],
      objects: ["hataları düzeltmeyi", "kodları incelemeyi", "dokümantasyonu güncellemeyi"],
      verbs: ["tamamladı.", "sürdürüyor.", "hedefliyor."]
    },
    B1: {
      subjects: ["Sistem mimarları", "Veri analistleri"],
      timeClauses: ["Siber güvenlik denetiminin ardından", "Sistem güncellemesi sırasında"],
      objects: ["bulut sunucu altyapısını optimize etmeyi", "veritabanı performansını artırmayı"],
      verbs: ["başarıyla gerçekleştirdi.", "öncelik haline getirdi."]
    }
  },
  business: {
    A1: {
      subjects: ["Müdür", "Müşteri", "Çalışan"],
      objects: ["yeni raporu", "epostayı", "faturayı"],
      verbs: ["gönderiyor.", "inceliyor.", "imzalıyor."]
    },
    B1: {
      subjects: ["Pazarlama departmanı", "Şirket yöneticileri"],
      timeClauses: ["Çeyrek yıl toplantısında", "Bütçe planlaması yaparken"],
      objects: ["yeni satış stratejilerini uygulamayı", "maliyetleri düşürmeyi"],
      verbs: ["kararlaştırdı.", "değerlendiriyor."]
    }
  }
};

export function generateOfflineSentence(category: string, level: string, history: string[] = []): string {
  const categoryData = CATEGORY_MATRIX[category] || CATEGORY_MATRIX.daily;
  const levelData = categoryData[level] || categoryData.A1 || CATEGORY_MATRIX.daily.A1;

  let attempts = 0;
  let sentence = "";

  while (attempts < 20) {
    const subject = levelData.subjects[Math.floor(Math.random() * levelData.subjects.length)];
    const object = levelData.objects[Math.floor(Math.random() * levelData.objects.length)];
    const verb = levelData.verbs[Math.floor(Math.random() * levelData.verbs.length)];

    if (levelData.timeClauses && Math.random() > 0.3) {
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
