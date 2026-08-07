// Gerçek kelime bankası — Kelime (flashcard) sekmesi artık AI Pratik
// Robotu'nun cümle-kalıbı parçalarını (Ahmet, Ayşe, "suluyor." vb.) yeniden
// kullanmıyor. Her giriş gerçek bir sözcük + net bir anlam/kullanım notu +
// örnek cümle içerir, isim değildir.
//
// NOT: Bu liste elle küratörlüğü yapılmış, seviyeye göre kademelenen
// (A1 -> C1) gerçek kelime dağarcığıdır. "Ahmet biliyorum" gibi placeholder
// öznelerin flashcard'da görünmesine sebep olan kök problem buydu.

export interface VocabEntry {
  id: string;
  word: string; // Türkçe sözcük / kalıp
  pos: string; // isim, fiil, sıfat, zarf, bağlaç, deyim...
  definition: string; // sade Türkçe anlam / kullanım açıklaması
  example: string; // örnek cümle
}

export type VocabBank = Record<string, Record<string, VocabEntry[]>>;

function bank(category: string, level: string, entries: [string, string, string, string][]): VocabEntry[] {
  return entries.map(([word, pos, definition, example], i) => ({
    id: `${category}-${level}-${i}`,
    word,
    pos,
    definition,
    example,
  }));
}

export const VOCAB_BANK: VocabBank = {
  daily: {
    Kolay: bank('daily', 'Kolay', [
      ['kahvaltı', 'isim', 'Sabah yapılan ilk öğün.', 'Kahvaltıda peynir ve zeytin yiyoruz.'],
      ['bulaşık', 'isim', 'Yemekten sonra yıkanması gereken tabak, tencere vb.', 'Bulaşıkları yemekten sonra yıkarım.'],
      ['market', 'isim', 'Günlük ihtiyaçların alındığı küçük dükkân.', 'Markete süt almaya gidiyorum.'],
      ['temizlemek', 'fiil', 'Bir yeri veya nesneyi kirden arındırmak.', 'Hafta sonu evi temizliyoruz.'],
      ['hazırlamak', 'fiil', 'Bir şeyi kullanıma veya sunuma uygun hale getirmek.', 'Akşam yemeğini birlikte hazırlıyoruz.'],
      ['komşu', 'isim', 'Yakında oturan kişi.', 'Komşumuz her sabah bize uğrar.'],
      ['erken', 'zarf', 'Beklenenden veya alışılandan önce.', 'Bugün erken kalktım.'],
      ['yorgun', 'sıfat', 'Enerjisi azalmış, dinlenmeye ihtiyacı olan.', 'İş çıkışı çok yorgun hissediyorum.'],
      ['alışveriş', 'isim', 'Bir şey satın alma eylemi.', 'Hafta sonu alışverişe çıkacağız.'],
      ['unutmak', 'fiil', 'Hatırlayamamak, aklından çıkarmak.', 'Anahtarı evde unuttum.'],
      ['bahçe', 'isim', 'Ev veya bina çevresindeki yeşil alan.', 'Bahçedeki çiçekleri suluyorum.'],
      ['sıkça', 'zarf', 'Sık sık, çoğu zaman.', 'Bu kafeye sıkça uğrarız.'],
      ['rahat', 'sıfat', 'Huzurlu, sıkıntısız.', 'Bu koltuk çok rahat.'],
      ['düzenli', 'sıfat', 'Belirli bir düzene göre yapılan.', 'Düzenli spor yapmaya çalışıyorum.'],
      ['gündelik', 'sıfat', 'Her gün tekrar eden, olağan.', 'Bunlar gündelik işlerimiz.'],
      ['ihtiyaç', 'isim', 'Gerek duyulan şey.', 'Bu ay birkaç ihtiyacımız var.'],
      ['paylaşmak', 'fiil', 'Bir şeyi başkalarıyla ortak kullanmak.', 'Yemeği kardeşimle paylaşıyorum.'],
      ['keyifli', 'sıfat', 'Hoş, mutluluk veren.', 'Bugün keyifli bir gündü.'],
    ]),
    Orta: bank('daily', 'Orta', [
      ['alışkanlık', 'isim', 'Sürekli tekrarlanan davranış.', 'Sabah yürüyüşü artık bir alışkanlık haline geldi.'],
      ['düzen kurmak', 'deyim', 'Belirli bir sisteme göre yaşamı organize etmek.', 'Taşındıktan sonra evde bir düzen kurduk.'],
      ['vakit geçirmek', 'deyim', 'Zaman ayırıp bir şeyle meşgul olmak.', 'Hafta sonları ailemle vakit geçiriyorum.'],
      ['sorumluluk', 'isim', 'Üstlenilmesi gereken görev veya yükümlülük.', 'Ev işleri konusunda ortak sorumluluk alıyoruz.'],
      ['ertelemek', 'fiil', 'Bir işi daha sonraya bırakmak.', 'Toplantıyı yarına erteledik.'],
      ['sıradan', 'sıfat', 'Olağan, özel olmayan.', 'Bugün oldukça sıradan bir gün geçirdim.'],
      ['tercih etmek', 'fiil', 'Birden çok seçenek arasından birini seçmek.', 'Akşamları kitap okumayı tercih ediyorum.'],
      ['gerginlik', 'isim', 'Sıkıntı veya stres hâli.', 'Sınav öncesi biraz gerginlik yaşadım.'],
      ['yeniden düzenlemek', 'fiil', 'Bir şeyi baştan, farklı biçimde organize etmek.', 'Odayı yeniden düzenlemeye karar verdik.'],
      ['komşuluk ilişkisi', 'isim', 'Komşular arasındaki sosyal bağ.', 'Bu mahallede komşuluk ilişkileri hâlâ güçlü.'],
      ['bakmakla yükümlü', 'sıfat', 'Birinin ihtiyaçlarından sorumlu olan.', 'Yaşlı annesine bakmakla yükümlü.'],
      ['sürdürmek', 'fiil', 'Bir eylemi kesintisiz devam ettirmek.', 'Bu alışkanlığı yıllardır sürdürüyor.'],
    ]),
    Zor: bank('daily', 'Zor', [
      ['toplumsal dayanışma', 'isim', 'Bir topluluk içindeki karşılıklı destek ve yardımlaşma.', 'Deprem sonrası toplumsal dayanışma öne çıktı.'],
      ['yaşam kalitesi', 'isim', 'Bireyin günlük yaşamındaki refah düzeyi.', 'Yeşil alanlar kentsel yaşam kalitesini artırır.'],
      ['kentsel dönüşüm', 'isim', 'Şehir dokusunun planlı biçimde yeniden yapılandırılması.', 'Mahallede kentsel dönüşüm çalışmaları başladı.'],
      ['bütünleşmek', 'fiil', 'Bir sisteme veya topluluğa uyum sağlayıp kaynaşmak.', 'Yeni gelen aileler mahalleye hızla bütünleşti.'],
      ['sosyoekonomik', 'sıfat', 'Toplumsal ve ekonomik etkenleri birlikte ifade eden.', 'Bölgenin sosyoekonomik yapısı araştırıldı.'],
      ['öncelik tanımak', 'deyim', 'Bir konuyu diğerlerinden daha önemli görmek.', 'Belediye toplu taşımaya öncelik tanıdı.'],
      ['saha araştırması', 'isim', 'Gerçek ortamda yapılan doğrudan gözlem ve inceleme.', 'Uzun soluklu bir saha araştırması yürütüldü.'],
    ]),
  },
  technology: {
    Kolay: bank('technology', 'Kolay', [
      ['uygulama', 'isim', 'Telefon veya bilgisayarda çalışan program.', 'Bu uygulamayı telefonuma indirdim.'],
      ['şifre', 'isim', 'Hesaba girmek için kullanılan gizli kod.', 'Şifremi unuttum, sıfırlamam gerekiyor.'],
      ['indirmek', 'fiil', 'İnternetten bir dosyayı cihaza aktarmak.', 'Yeni oyunu telefona indirdim.'],
      ['güncellemek', 'fiil', 'Bir yazılımı en son sürüme getirmek.', 'Uygulamayı güncellemem gerekiyor.'],
      ['bulut depolama', 'isim', 'Dosyaların internet üzerinde saklandığı sistem.', 'Fotoğraflarımı bulut depolamaya yüklüyorum.'],
      ['ekran', 'isim', 'Görüntünün gösterildiği yüzey.', 'Telefonumun ekranı çatladı.'],
      ['bağlanmak', 'fiil', 'Bir ağa veya cihaza erişim sağlamak.', 'Wi-Fi\'ye bağlanamıyorum.'],
      ['ayar', 'isim', 'Bir cihazın veya uygulamanın yapılandırma seçeneği.', 'Bildirim ayarlarını değiştirdim.'],
      ['dosya', 'isim', 'Bilgisayarda saklanan veri birimi.', 'Dosyayı yanlışlıkla sildim.'],
      ['yeniden başlatmak', 'fiil', 'Bir cihazı kapatıp tekrar açmak.', 'Bilgisayarı yeniden başlattım.'],
      ['bildirim', 'isim', 'Uygulamanın gönderdiği kısa uyarı mesajı.', 'Sürekli bildirim geliyor, rahatsız edici.'],
      ['kablosuz', 'sıfat', 'Kablo gerektirmeyen bağlantı türü.', 'Kablosuz kulaklık kullanıyorum.'],
      ['hata', 'isim', 'Sistemde ortaya çıkan yanlışlık veya arıza.', 'Uygulama bir hata verdi.'],
      ['yedeklemek', 'fiil', 'Verinin bir kopyasını güvenli bir yerde saklamak.', 'Dosyalarımı düzenli yedekliyorum.'],
      ['tarayıcı', 'isim', 'İnternet sitelerini görüntülemeye yarayan program.', 'Bu tarayıcı çok hızlı çalışıyor.'],
    ]),
    Orta: bank('technology', 'Orta', [
      ['performans testi', 'isim', 'Bir sistemin hızını ve verimini ölçen değerlendirme.', 'Yayın öncesi performans testleri tamamlandı.'],
      ['kod incelemesi', 'isim', 'Yazılan kodun başka biri tarafından gözden geçirilmesi.', 'Kod incelemesi sırasında birkaç hata bulundu.'],
      ['sürüm', 'isim', 'Bir yazılımın belirli bir güncelleme aşaması.', 'Uygulamanın yeni sürümü yayınlandı.'],
      ['hata ayıklamak', 'fiil', 'Bir yazılımdaki sorunları bulup düzeltmek.', 'Geliştirici saatlerce hata ayıkladı.'],
      ['geri bildirim', 'isim', 'Kullanıcıların bir ürün hakkındaki görüşü.', 'Kullanıcı geri bildirimlerini değerlendiriyoruz.'],
      ['entegrasyon', 'isim', 'Farklı sistemlerin birlikte çalışacak şekilde bağlanması.', 'Ödeme sistemiyle entegrasyon tamamlandı.'],
      ['ölçeklenebilirlik', 'isim', 'Bir sistemin artan yüke uyum sağlayabilme kapasitesi.', 'Uygulamanın ölçeklenebilirliği test edildi.'],
      ['canlıya almak', 'deyim', 'Bir yazılımı gerçek kullanıcılara açmak.', 'Yeni özelliği bu hafta canlıya alacağız.'],
      ['veri analisti', 'isim', 'Verileri inceleyip anlamlandıran uzman.', 'Veri analisti raporu hazırladı.'],
      ['sprint toplantısı', 'isim', 'Kısa dönemli çalışma planının gözden geçirildiği toplantı.', 'Haftalık sprint toplantısında görevler dağıtıldı.'],
    ]),
    Zor: bank('technology', 'Zor', [
      ['mikroservis mimarisi', 'isim', 'Uygulamanın küçük, bağımsız servislere bölünerek tasarlanması.', 'Şirket mikroservis mimarisine geçiş yaptı.'],
      ['gecikme süresi', 'isim', 'Bir isteğin gönderilip yanıtlanması arasındaki zaman.', 'Sunucu tarafında gecikme süresi azaltıldı.'],
      ['sızma testi', 'isim', 'Sistemin güvenlik açıklarını bulmak için yapılan kontrollü saldırı denemesi.', 'Yıllık sızma testi tamamlandı.'],
      ['şifreleme protokolü', 'isim', 'Verinin güvenli iletimini sağlayan teknik kural bütünü.', 'Şifreleme protokolü güncellendi.'],
      ['dağıtık sistem', 'isim', 'Birden fazla bağımsız bilgisayarın birlikte çalıştığı yapı.', 'Dağıtık sistemler yüksek erişilebilirlik sağlar.'],
      ['bağımlılık yönetimi', 'isim', 'Bir yazılımın ihtiyaç duyduğu diğer bileşenlerin takibi.', 'Bağımlılık yönetimi otomatikleştirildi.'],
    ]),
  },
  business: {
    Kolay: bank('business', 'Kolay', [
      ['fatura', 'isim', 'Satılan mal veya hizmet için düzenlenen belge.', 'Faturayı e-posta ile gönderdim.'],
      ['sipariş', 'isim', 'Bir ürün veya hizmet için yapılan talep.', 'Siparişim henüz gelmedi.'],
      ['toplantı', 'isim', 'Belirli bir konu için bir araya gelme.', 'Saat onda toplantımız var.'],
      ['onaylamak', 'fiil', 'Bir teklifi veya işlemi kabul etmek.', 'Müdür raporu onayladı.'],
      ['maaş', 'isim', 'Çalışılan iş karşılığında ödenen para.', 'Maaşlar bu ay erken yatırıldı.'],
      ['sözleşme', 'isim', 'Tarafların haklarını belirleyen resmi belge.', 'Sözleşmeyi dikkatlice okudum.'],
      ['müşteri', 'isim', 'Ürün veya hizmet satın alan kişi.', 'Müşteri memnuniyeti çok önemli.'],
      ['teslim etmek', 'fiil', 'Bir ürünü veya işi ilgili kişiye ulaştırmak.', 'Paketi zamanında teslim ettik.'],
      ['stok', 'isim', 'Depoda bulunan ürün miktarı.', 'Bu üründen stokta az kaldı.'],
      ['imzalamak', 'fiil', 'Bir belgeyi onaylamak için ad yazmak.', 'Sözleşmeyi ikimiz de imzaladık.'],
    ]),
    Orta: bank('business', 'Orta', [
      ['bütçe planlaması', 'isim', 'Gelir ve giderlerin önceden düzenlenmesi.', 'Yeni bütçe planlaması bu hafta yapılacak.'],
      ['performans değerlendirmesi', 'isim', 'Çalışan başarısının ölçüldüğü süreç.', 'Yıllık performans değerlendirmesi yaklaştı.'],
      ['pazarlama stratejisi', 'isim', 'Ürünün tanıtımı için izlenen yol.', 'Yeni bir pazarlama stratejisi geliştirdik.'],
      ['tedarikçi', 'isim', 'Mal veya hizmet sağlayan firma.', 'Tedarikçiyle fiyat konusunda görüştük.'],
      ['gündeme almak', 'deyim', 'Bir konuyu tartışmaya açmak.', 'Bu teklifi bir sonraki toplantıda gündeme aldık.'],
      ['çeyrek dönem', 'isim', 'Yılın dört bölümünden biri (3 aylık dönem).', 'Çeyrek dönem sonuçları açıklandı.'],
      ['satış hedefi', 'isim', 'Belirli bir sürede ulaşılması planlanan satış miktarı.', 'Bu ay satış hedefini aştık.'],
    ]),
    Zor: bank('business', 'Zor', [
      ['sermaye yapısı', 'isim', 'Bir şirketin borç ve öz kaynak dengesi.', 'Şirket sermaye yapısını yeniden düzenledi.'],
      ['birleşme ve satın alma', 'isim', 'İki şirketin bir araya gelmesi veya birinin diğerini alması süreci.', 'Birleşme ve satın alma süreci tamamlandı.'],
      ['operasyonel verimlilik', 'isim', 'Kaynakların en az kayıpla, en etkili şekilde kullanılması.', 'Operasyonel verimliliği artıracak önlemler alındı.'],
      ['yatırım komitesi', 'isim', 'Yatırım kararlarını değerlendiren kurul.', 'Yatırım komitesi teklifi onayladı.'],
      ['stratejik öncelik', 'isim', 'Uzun vadeli planlamada en önemli görülen hedef.', 'Uluslararası büyüme stratejik öncelik haline geldi.'],
    ]),
  },
  travel: {
    Kolay: bank('travel', 'Kolay', [
      ['bilet', 'isim', 'Seyahat için satın alınan giriş belgesi.', 'Uçak biletini internetten aldım.'],
      ['valiz', 'isim', 'Seyahatte eşya taşımak için kullanılan çanta.', 'Valizimi henüz hazırlamadım.'],
      ['pasaport', 'isim', 'Yurt dışına çıkmak için gereken kimlik belgesi.', 'Pasaportumun süresi dolmuş.'],
      ['rezervasyon yapmak', 'fiil', 'Bir yer veya hizmeti önceden ayırtmak.', 'Otelde rezervasyon yaptım.'],
      ['harita', 'isim', 'Bir bölgeyi gösteren çizim.', 'Haritadan en kısa yolu buldum.'],
      ['gecikme', 'isim', 'Planlanan zamandan sonraya kalma durumu.', 'Uçuşumuzda iki saatlik gecikme oldu.'],
      ['konaklamak', 'fiil', 'Bir yerde geceleyerek kalmak.', 'Bu otelde üç gece konaklayacağız.'],
      ['rehber', 'isim', 'Turistlere yol gösteren kişi.', 'Rehberimiz şehri çok iyi anlattı.'],
    ]),
    Orta: bank('travel', 'Orta', [
      ['yerel lezzet', 'isim', 'Bir bölgeye özgü yemek.', 'Şehirde yerel lezzetleri denemek istiyoruz.'],
      ['rota değişikliği', 'isim', 'Planlanan güzergâhın değiştirilmesi.', 'Hava koşulları nedeniyle rota değişikliği yapıldı.'],
      ['alternatif ulaşım', 'isim', 'Standart dışında başka bir ulaşım seçeneği.', 'Alternatif ulaşım seçeneklerini araştırdık.'],
      ['sırt çantalı gezi', 'isim', 'Az eşyayla, ekonomik biçimde yapılan seyahat türü.', 'Sırt çantalı gezi bizim için yeni bir deneyimdi.'],
      ['tarihi mekân', 'isim', 'Tarihsel önemi olan yer.', 'Şehrin tarihi mekânlarını ziyaret ettik.'],
    ]),
    Zor: bank('travel', 'Zor', [
      ['sürdürülebilir turizm', 'isim', 'Çevreye ve yerel kültüre zarar vermeden yapılan turizm.', 'Bölge sürdürülebilir turizme yatırım yapıyor.'],
      ['kültürel miras', 'isim', 'Bir topluma ait tarihi ve kültürel değerler bütünü.', 'Kültürel mirasın korunması öncelik haline geldi.'],
      ['aşırı turizm', 'isim', 'Bir bölgenin taşıyabileceğinden fazla turist alması.', 'Aşırı turizm yerel halkı olumsuz etkiliyor.'],
      ['turizm politikası', 'isim', 'Devletin veya kurumun turizme yönelik uygulama planı.', 'Yeni turizm politikası önümüzdeki yıl yürürlüğe girecek.'],
    ]),
  },
  academic: {
    Kolay: bank('academic', 'Kolay', [
      ['ödev', 'isim', 'Öğrenciye verilen çalışma görevi.', 'Ödevimi akşam yapacağım.'],
      ['sınav', 'isim', 'Öğrenilenlerin ölçüldüğü değerlendirme.', 'Yarın matematik sınavımız var.'],
      ['not almak', 'fiil', 'Önemli bilgileri yazıya geçirmek.', 'Derste sürekli not alıyorum.'],
      ['kütüphane', 'isim', 'Kitapların bulunduğu ve okunduğu yer.', 'Öğleden sonra kütüphaneye gideceğim.'],
      ['teslim etmek', 'fiil', 'Bir çalışmayı ilgili kişiye ulaştırmak.', 'Ödevi zamanında teslim ettim.'],
      ['gözden geçirmek', 'fiil', 'Bir şeyi tekrar inceleyip kontrol etmek.', 'Sınavdan önce notlarımı gözden geçirdim.'],
    ]),
    Orta: bank('academic', 'Orta', [
      ['literatür taraması', 'isim', 'Bir konudaki mevcut kaynakların sistematik incelenmesi.', 'Tez için geniş bir literatür taraması yaptım.'],
      ['araştırma yöntemi', 'isim', 'Bir çalışmada veri toplamak için izlenen yol.', 'Araştırma yöntemini danışmanımla gözden geçirdik.'],
      ['tez savunması', 'isim', 'Bir tezin jüri önünde sözlü olarak savunulması.', 'Tez savunmam gelecek ay.'],
      ['kaynakça', 'isim', 'Bir çalışmada kullanılan kaynakların listesi.', 'Kaynakçayı APA formatına göre düzenledim.'],
      ['bulgu', 'isim', 'Bir araştırma sonucunda elde edilen sonuç.', 'Bulgularımızı konferansta sunacağız.'],
    ]),
    Zor: bank('academic', 'Zor', [
      ['meta-analiz', 'isim', 'Birçok çalışmanın istatistiksel olarak birleştirilip incelenmesi.', 'Kapsamlı bir meta-analiz gerçekleştirildi.'],
      ['metodolojik geçerlilik', 'isim', 'Kullanılan yöntemin doğru sonuç üretme gücü.', 'Metodolojik geçerlilik hakem tarafından sorgulandı.'],
      ['longitudinal çalışma', 'isim', 'Aynı grubun uzun süre boyunca izlendiği araştırma türü.', 'Longitudinal çalışma on yıl sürdü.'],
      ['disiplinlerarası işbirliği', 'isim', 'Farklı bilim dallarının ortak çalışması.', 'Proje disiplinlerarası işbirliğiyle yürütüldü.'],
      ['hakem değerlendirmesi', 'isim', 'Bir makalenin uzmanlarca incelenip onaylanması süreci.', 'Makale hakem değerlendirmesinden geçti.'],
    ]),
  },
};

export function getVocabList(category: string, difficulty: string): VocabEntry[] {
  const cat = VOCAB_BANK[category] || VOCAB_BANK.daily;
  return cat[difficulty] || cat.Kolay || VOCAB_BANK.daily.Kolay;
}

export function getTotalVocabCount(): number {
  let total = 0;
  Object.values(VOCAB_BANK).forEach((levels) => {
    Object.values(levels).forEach((list) => {
      total += list.length;
    });
  });
  return total;
}
