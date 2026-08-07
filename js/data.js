/* =========================================================
   DİL PASAPORTU — İçerik Verisi
   Her kelime: [türkçe, hedef_dil, örnek_cümle_hedef, örnek_cümle_tr]
   ========================================================= */

const CATS = {
  family: { label: "Aile & İnsanlar", icon: "family" },
  food:   { label: "Yiyecek & İçecek", icon: "food" },
  travel: { label: "Seyahat & Yerler", icon: "travel" },
  daily:  { label: "Günlük Yaşam & İş", icon: "daily" },
};

const LEVELS = ["A1", "A2", "B1"];

const LANGS = {
  de: { label: "Almanca", flag: "🇩🇪", ttsCode: "de-DE", color: "#C23B3B" },
  en: { label: "İngilizce", flag: "🇬🇧", ttsCode: "en-GB", color: "#2F5D8A" },
  fr: { label: "Fransızca", flag: "🇫🇷", ttsCode: "fr-FR", color: "#3F7C74" },
};

/* ---------- ALMANCA ---------- */
const RAW_DE = {
A1: {
family: [
["anne","Mutter","Meine Mutter kocht sehr gut.","Annem çok iyi yemek pişirir."],
["baba","Vater","Mein Vater arbeitet in der Stadt.","Babam şehirde çalışıyor."],
["kardeş","Geschwister","Ich habe zwei Geschwister.","İki kardeşim var."],
["oğul","Sohn","Ihr Sohn ist noch klein.","Onun oğlu hâlâ küçük."],
["kız (evlat)","Tochter","Seine Tochter lernt Deutsch.","Onun kızı Almanca öğreniyor."],
["büyükanne","Großmutter","Meine Großmutter wohnt auf dem Land.","Büyükannem kırsalda yaşıyor."],
["büyükbaba","Großvater","Der Großvater erzählt gern Geschichten.","Büyükbaba hikâye anlatmayı sever."],
["aile","Familie","Die Familie isst zusammen.","Aile birlikte yemek yiyor."],
],
food: [
["ekmek","Brot","Ich kaufe frisches Brot.","Taze ekmek alıyorum."],
["su","Wasser","Trinkst du gern Wasser?","Su içmeyi sever misin?"],
["süt","Milch","Das Kind trinkt Milch.","Çocuk süt içiyor."],
["elma","Apfel","Der Apfel ist rot.","Elma kırmızı."],
["et","Fleisch","Wir essen kein Fleisch.","Et yemiyoruz."],
["peynir","Käse","Der Käse schmeckt lecker.","Peynir lezzetli."],
["kahve","Kaffee","Ich trinke jeden Morgen Kaffee.","Her sabah kahve içerim."],
["çay","Tee","Möchtest du eine Tasse Tee?","Bir fincan çay ister misin?"],
],
travel: [
["tren","Zug","Der Zug kommt pünktlich.","Tren zamanında geliyor."],
["otobüs","Bus","Wir fahren mit dem Bus.","Otobüsle gidiyoruz."],
["uçak","Flugzeug","Das Flugzeug fliegt hoch.","Uçak yükseklerde uçuyor."],
["otel","Hotel","Unser Hotel ist sehr sauber.","Otelimiz çok temiz."],
["bilet","Fahrkarte","Ich kaufe eine Fahrkarte.","Bir bilet alıyorum."],
["havalimanı","Flughafen","Der Flughafen ist weit weg.","Havalimanı uzakta."],
["yol","Straße","Diese Straße ist lang.","Bu yol uzun."],
["harita","Karte","Hast du eine Karte dabei?","Yanında harita var mı?"],
],
daily: [
["ev","Haus","Das Haus ist groß.","Ev büyük."],
["okul","Schule","Die Schule beginnt um acht.","Okul sekizde başlıyor."],
["iş","Arbeit","Meine Arbeit macht Spaß.","İşim eğlenceli."],
["kitap","Buch","Ich lese ein Buch.","Bir kitap okuyorum."],
["zaman","Zeit","Ich habe keine Zeit.","Vaktim yok."],
["gün","Tag","Heute ist ein schöner Tag.","Bugün güzel bir gün."],
["para","Geld","Er hat wenig Geld.","Onun az parası var."],
["araba","Auto","Das Auto ist neu.","Araba yeni."],
],
},
A2: {
family: [
["kuzen","Cousin","Mein Cousin wohnt in Berlin.","Kuzenim Berlin'de yaşıyor."],
["teyze / hala","Tante","Meine Tante besucht uns oft.","Teyzem bizi sık ziyaret eder."],
["amca / dayı","Onkel","Der Onkel bringt Geschenke mit.","Amca hediye getiriyor."],
["yeğen","Neffe","Mein Neffe spielt Fußball.","Yeğenim futbol oynuyor."],
["eş","Ehepartner","Ihr Ehepartner arbeitet im Ausland.","Onun eşi yurt dışında çalışıyor."],
["bebek","Baby","Das Baby schläft ruhig.","Bebek sakince uyuyor."],
["ikiz","Zwilling","Sie sind Zwillinge.","Onlar ikiz."],
["komşu","Nachbar","Unser Nachbar ist sehr freundlich.","Komşumuz çok samimi."],
],
food: [
["kahvaltı","Frühstück","Das Frühstück ist fertig.","Kahvaltı hazır."],
["öğle yemeği","Mittagessen","Wir machen Pause zum Mittagessen.","Öğle yemeği için mola veriyoruz."],
["akşam yemeği","Abendessen","Das Abendessen war köstlich.","Akşam yemeği çok lezzetliydi."],
["tatlı","Nachtisch","Möchtest du einen Nachtisch?","Bir tatlı ister misin?"],
["sebze","Gemüse","Iss mehr Gemüse.","Daha fazla sebze ye."],
["meyve","Obst","Frisches Obst ist gesund.","Taze meyve sağlıklıdır."],
["tuz","Salz","Gib mir bitte das Salz.","Bana tuzu verir misin."],
["şeker","Zucker","Ohne Zucker, bitte.","Şekersiz olsun lütfen."],
],
travel: [
["rezervasyon","Reservierung","Ich habe eine Reservierung.","Bir rezervasyonum var."],
["valiz","Koffer","Mein Koffer ist schwer.","Valizim ağır."],
["pasaport","Reisepass","Vergiss deinen Reisepass nicht.","Pasaportunu unutma."],
["gümrük","Zoll","Wir warten am Zoll.","Gümrükte bekliyoruz."],
["tatil","Urlaub","Wir fahren in den Urlaub.","Tatile gidiyoruz."],
["plaj","Strand","Der Strand ist voller Menschen.","Plaj insan dolu."],
["dağ","Berg","Der Berg ist sehr hoch.","Dağ çok yüksek."],
["göl","See","Der See ist ruhig.","Göl sakin."],
],
daily: [
["randevu","Termin","Ich habe einen Termin beim Arzt.","Doktorda randevum var."],
["hastane","Krankenhaus","Das Krankenhaus ist in der Nähe.","Hastane yakında."],
["doktor","Arzt","Der Arzt untersucht den Patienten.","Doktor hastayı muayene ediyor."],
["market","Supermarkt","Ich gehe zum Supermarkt.","Markete gidiyorum."],
["hava durumu","Wetter","Das Wetter ist heute schön.","Bugün hava güzel."],
["mevsim","Jahreszeit","Der Herbst ist meine Lieblingsjahreszeit.","Sonbahar en sevdiğim mevsim."],
["telefon","Telefon","Mein Telefon ist kaputt.","Telefonum bozuk."],
["bilgisayar","Computer","Der Computer ist langsam.","Bilgisayar yavaş."],
],
},
B1: {
family: [
["nişanlı","Verlobte(r)","Sie stellte ihren Verlobten vor.","Nişanlısını tanıttı."],
["boşanma","Scheidung","Die Scheidung war schwierig.","Boşanma zordu."],
["akraba","Verwandte(r)","Wir haben viele Verwandte.","Birçok akrabamız var."],
["üvey kardeş","Stiefgeschwister","Ich habe zwei Stiefgeschwister.","İki üvey kardeşim var."],
["torun","Enkelkind","Das Enkelkind besucht die Großeltern.","Torun büyükanne ve büyükbabayı ziyaret ediyor."],
["yetişkin","Erwachsene(r)","Als Erwachsener trägt man Verantwortung.","Yetişkin olarak sorumluluk taşırsın."],
["ergen","Jugendliche(r)","Jugendliche brauchen Freiraum.","Ergenlerin özgür alana ihtiyacı var."],
["nesil","Generation","Jede Generation ist anders.","Her nesil farklıdır."],
],
food: [
["tarif","Rezept","Das Rezept ist einfach.","Tarif basit."],
["malzeme","Zutat","Diese Zutat fehlt mir.","Bu malzeme bende yok."],
["lezzet","Geschmack","Der Geschmack ist intensiv.","Lezzet yoğun."],
["beslenme","Ernährung","Gesunde Ernährung ist wichtig.","Sağlıklı beslenme önemlidir."],
["vejetaryen","Vegetarier","Er ist seit Jahren Vegetarier.","Yıllardır vejetaryen."],
["alerji","Allergie","Ich habe eine Allergie gegen Nüsse.","Fındığa karşı alerjim var."],
["porsiyon","Portion","Die Portion ist sehr groß.","Porsiyon çok büyük."],
["restoran","Restaurant","Das Restaurant ist immer voll.","Restoran hep dolu."],
],
travel: [
["varış","Ankunft","Die Ankunft verspätet sich.","Varış gecikiyor."],
["kalkış","Abflug","Der Abflug ist um sechs Uhr.","Kalkış saat altıda."],
["gecikme","Verspätung","Es gibt eine Verspätung.","Bir gecikme var."],
["sigorta","Versicherung","Reiseversicherung ist empfehlenswert.","Seyahat sigortası tavsiye edilir."],
["konaklama","Unterkunft","Wir suchen eine Unterkunft.","Konaklama arıyoruz."],
["rehber","Reiseführer","Der Reiseführer kennt die Stadt gut.","Rehber şehri iyi tanıyor."],
["macera","Abenteuer","Das war ein echtes Abenteuer.","Bu gerçek bir maceraydı."],
["kültür","Kultur","Jede Kultur ist einzigartig.","Her kültür özgündür."],
],
daily: [
["sorumluluk","Verantwortung","Das ist meine Verantwortung.","Bu benim sorumluluğum."],
["deneyim","Erfahrung","Diese Erfahrung war wertvoll.","Bu deneyim değerliydi."],
["başarı","Erfolg","Ihr Erfolg war verdient.","Onun başarısı hak edilmişti."],
["hedef","Ziel","Mein Ziel ist klar.","Hedefim net."],
["fırsat","Gelegenheit","Nutze diese Gelegenheit.","Bu fırsatı değerlendir."],
["zorluk","Herausforderung","Jede Herausforderung lehrt uns etwas.","Her zorluk bize bir şey öğretir."],
["karar","Entscheidung","Das war eine schwere Entscheidung.","Bu zor bir karardı."],
["alışkanlık","Gewohnheit","Gute Gewohnheiten brauchen Zeit.","İyi alışkanlıklar zaman ister."],
],
},
};

/* ---------- İNGİLİZCE ---------- */
const RAW_EN = {
A1: {
family: [
["anne","mother","My mother cooks very well.","Annem çok iyi yemek pişirir."],
["baba","father","My father works in the city.","Babam şehirde çalışıyor."],
["kardeş","sibling","I have two siblings.","İki kardeşim var."],
["oğul","son","Her son is still young.","Onun oğlu hâlâ küçük."],
["kız (evlat)","daughter","His daughter is learning English.","Onun kızı İngilizce öğreniyor."],
["büyükanne","grandmother","My grandmother lives in the countryside.","Büyükannem kırsalda yaşıyor."],
["büyükbaba","grandfather","Grandfather likes telling stories.","Büyükbaba hikâye anlatmayı sever."],
["aile","family","The family eats together.","Aile birlikte yemek yiyor."],
],
food: [
["ekmek","bread","I buy fresh bread.","Taze ekmek alıyorum."],
["su","water","Do you like drinking water?","Su içmeyi sever misin?"],
["süt","milk","The child drinks milk.","Çocuk süt içiyor."],
["elma","apple","The apple is red.","Elma kırmızı."],
["et","meat","We don't eat meat.","Et yemiyoruz."],
["peynir","cheese","The cheese tastes delicious.","Peynir lezzetli."],
["kahve","coffee","I drink coffee every morning.","Her sabah kahve içerim."],
["çay","tea","Would you like a cup of tea?","Bir fincan çay ister misin?"],
],
travel: [
["tren","train","The train arrives on time.","Tren zamanında geliyor."],
["otobüs","bus","We travel by bus.","Otobüsle gidiyoruz."],
["uçak","airplane","The airplane flies high.","Uçak yükseklerde uçuyor."],
["otel","hotel","Our hotel is very clean.","Otelimiz çok temiz."],
["bilet","ticket","I buy a ticket.","Bir bilet alıyorum."],
["havalimanı","airport","The airport is far away.","Havalimanı uzakta."],
["yol","road","This road is long.","Bu yol uzun."],
["harita","map","Do you have a map with you?","Yanında harita var mı?"],
],
daily: [
["ev","house","The house is big.","Ev büyük."],
["okul","school","School starts at eight.","Okul sekizde başlıyor."],
["iş","work","My work is fun.","İşim eğlenceli."],
["kitap","book","I am reading a book.","Bir kitap okuyorum."],
["zaman","time","I don't have time.","Vaktim yok."],
["gün","day","Today is a beautiful day.","Bugün güzel bir gün."],
["para","money","He has little money.","Onun az parası var."],
["araba","car","The car is new.","Araba yeni."],
],
},
A2: {
family: [
["kuzen","cousin","My cousin lives in London.","Kuzenim Londra'da yaşıyor."],
["teyze / hala","aunt","My aunt visits us often.","Teyzem bizi sık ziyaret eder."],
["amca / dayı","uncle","The uncle brings presents.","Amca hediye getiriyor."],
["yeğen (kız)","niece","My niece plays football.","Yeğenim futbol oynuyor."],
["eş","spouse","Her spouse works abroad.","Onun eşi yurt dışında çalışıyor."],
["bebek","baby","The baby is sleeping quietly.","Bebek sakince uyuyor."],
["ikiz","twin","They are twins.","Onlar ikiz."],
["komşu","neighbor","Our neighbor is very friendly.","Komşumuz çok samimi."],
],
food: [
["kahvaltı","breakfast","Breakfast is ready.","Kahvaltı hazır."],
["öğle yemeği","lunch","We take a break for lunch.","Öğle yemeği için mola veriyoruz."],
["akşam yemeği","dinner","Dinner was delicious.","Akşam yemeği çok lezzetliydi."],
["tatlı","dessert","Would you like a dessert?","Bir tatlı ister misin?"],
["sebze","vegetable","Eat more vegetables.","Daha fazla sebze ye."],
["meyve","fruit","Fresh fruit is healthy.","Taze meyve sağlıklıdır."],
["tuz","salt","Please pass me the salt.","Bana tuzu verir misin."],
["şeker","sugar","No sugar, please.","Şekersiz olsun lütfen."],
],
travel: [
["rezervasyon","reservation","I have a reservation.","Bir rezervasyonum var."],
["valiz","suitcase","My suitcase is heavy.","Valizim ağır."],
["pasaport","passport","Don't forget your passport.","Pasaportunu unutma."],
["gümrük","customs","We are waiting at customs.","Gümrükte bekliyoruz."],
["tatil","vacation","We are going on vacation.","Tatile gidiyoruz."],
["plaj","beach","The beach is crowded.","Plaj insan dolu."],
["dağ","mountain","The mountain is very high.","Dağ çok yüksek."],
["göl","lake","The lake is calm.","Göl sakin."],
],
daily: [
["randevu","appointment","I have a doctor's appointment.","Doktorda randevum var."],
["hastane","hospital","The hospital is nearby.","Hastane yakında."],
["doktor","doctor","The doctor examines the patient.","Doktor hastayı muayene ediyor."],
["market","supermarket","I'm going to the supermarket.","Markete gidiyorum."],
["hava durumu","weather","The weather is nice today.","Bugün hava güzel."],
["mevsim","season","Autumn is my favorite season.","Sonbahar en sevdiğim mevsim."],
["telefon","phone","My phone is broken.","Telefonum bozuk."],
["bilgisayar","computer","The computer is slow.","Bilgisayar yavaş."],
],
},
B1: {
family: [
["nişanlı","fiancé(e)","She introduced her fiancé.","Nişanlısını tanıttı."],
["boşanma","divorce","The divorce was difficult.","Boşanma zordu."],
["akraba","relative","We have many relatives.","Birçok akrabamız var."],
["üvey kardeş","stepsibling","I have two stepsiblings.","İki üvey kardeşim var."],
["torun","grandchild","The grandchild visits the grandparents.","Torun büyükanne ve büyükbabayı ziyaret ediyor."],
["yetişkin","adult","As an adult you carry responsibility.","Yetişkin olarak sorumluluk taşırsın."],
["ergen","teenager","Teenagers need some freedom.","Ergenlerin özgür alana ihtiyacı var."],
["nesil","generation","Every generation is different.","Her nesil farklıdır."],
],
food: [
["tarif","recipe","The recipe is simple.","Tarif basit."],
["malzeme","ingredient","I'm missing this ingredient.","Bu malzeme bende yok."],
["lezzet","flavor","The flavor is intense.","Lezzet yoğun."],
["beslenme","nutrition","Healthy nutrition matters.","Sağlıklı beslenme önemlidir."],
["vejetaryen","vegetarian","He has been a vegetarian for years.","Yıllardır vejetaryen."],
["alerji","allergy","I have an allergy to nuts.","Fındığa karşı alerjim var."],
["porsiyon","portion","The portion is very large.","Porsiyon çok büyük."],
["restoran","restaurant","The restaurant is always full.","Restoran hep dolu."],
],
travel: [
["varış","arrival","The arrival is delayed.","Varış gecikiyor."],
["kalkış","departure","The departure is at six.","Kalkış saat altıda."],
["gecikme","delay","There is a delay.","Bir gecikme var."],
["sigorta","insurance","Travel insurance is recommended.","Seyahat sigortası tavsiye edilir."],
["konaklama","accommodation","We are looking for accommodation.","Konaklama arıyoruz."],
["rehber","guide","The guide knows the city well.","Rehber şehri iyi tanıyor."],
["macera","adventure","That was a real adventure.","Bu gerçek bir maceraydı."],
["kültür","culture","Every culture is unique.","Her kültür özgündür."],
],
daily: [
["sorumluluk","responsibility","This is my responsibility.","Bu benim sorumluluğum."],
["deneyim","experience","This experience was valuable.","Bu deneyim değerliydi."],
["başarı","success","Her success was well deserved.","Onun başarısı hak edilmişti."],
["hedef","goal","My goal is clear.","Hedefim net."],
["fırsat","opportunity","Take this opportunity.","Bu fırsatı değerlendir."],
["zorluk","challenge","Every challenge teaches us something.","Her zorluk bize bir şey öğretir."],
["karar","decision","That was a hard decision.","Bu zor bir karardı."],
["alışkanlık","habit","Good habits take time.","İyi alışkanlıklar zaman ister."],
],
},
};

/* ---------- FRANSIZCA ---------- */
const RAW_FR = {
A1: {
family: [
["anne","mère","Ma mère cuisine très bien.","Annem çok iyi yemek pişirir."],
["baba","père","Mon père travaille en ville.","Babam şehirde çalışıyor."],
["kardeş","frère ou sœur","J'ai deux frères et sœurs.","İki kardeşim var."],
["oğul","fils","Son fils est encore petit.","Onun oğlu hâlâ küçük."],
["kız (evlat)","fille","Sa fille apprend le français.","Onun kızı Fransızca öğreniyor."],
["büyükanne","grand-mère","Ma grand-mère habite à la campagne.","Büyükannem kırsalda yaşıyor."],
["büyükbaba","grand-père","Grand-père aime raconter des histoires.","Büyükbaba hikâye anlatmayı sever."],
["aile","famille","La famille mange ensemble.","Aile birlikte yemek yiyor."],
],
food: [
["ekmek","pain","J'achète du pain frais.","Taze ekmek alıyorum."],
["su","eau","Aimes-tu boire de l'eau ?","Su içmeyi sever misin?"],
["süt","lait","L'enfant boit du lait.","Çocuk süt içiyor."],
["elma","pomme","La pomme est rouge.","Elma kırmızı."],
["et","viande","Nous ne mangeons pas de viande.","Et yemiyoruz."],
["peynir","fromage","Le fromage est délicieux.","Peynir lezzetli."],
["kahve","café","Je bois du café chaque matin.","Her sabah kahve içerim."],
["çay","thé","Veux-tu une tasse de thé ?","Bir fincan çay ister misin?"],
],
travel: [
["tren","train","Le train arrive à l'heure.","Tren zamanında geliyor."],
["otobüs","bus","Nous voyageons en bus.","Otobüsle gidiyoruz."],
["uçak","avion","L'avion vole très haut.","Uçak yükseklerde uçuyor."],
["otel","hôtel","Notre hôtel est très propre.","Otelimiz çok temiz."],
["bilet","billet","J'achète un billet.","Bir bilet alıyorum."],
["havalimanı","aéroport","L'aéroport est loin.","Havalimanı uzakta."],
["yol","route","Cette route est longue.","Bu yol uzun."],
["harita","carte","As-tu une carte avec toi ?","Yanında harita var mı?"],
],
daily: [
["ev","maison","La maison est grande.","Ev büyük."],
["okul","école","L'école commence à huit heures.","Okul sekizde başlıyor."],
["iş","travail","Mon travail est amusant.","İşim eğlenceli."],
["kitap","livre","Je lis un livre.","Bir kitap okuyorum."],
["zaman","temps","Je n'ai pas le temps.","Vaktim yok."],
["gün","jour","Aujourd'hui est une belle journée.","Bugün güzel bir gün."],
["para","argent","Il a peu d'argent.","Onun az parası var."],
["araba","voiture","La voiture est neuve.","Araba yeni."],
],
},
A2: {
family: [
["kuzen","cousin(e)","Mon cousin habite à Paris.","Kuzenim Paris'te yaşıyor."],
["teyze / hala","tante","Ma tante nous rend souvent visite.","Teyzem bizi sık ziyaret eder."],
["amca / dayı","oncle","L'oncle apporte des cadeaux.","Amca hediye getiriyor."],
["yeğen","neveu","Mon neveu joue au football.","Yeğenim futbol oynuyor."],
["eş","conjoint(e)","Son conjoint travaille à l'étranger.","Onun eşi yurt dışında çalışıyor."],
["bebek","bébé","Le bébé dort tranquillement.","Bebek sakince uyuyor."],
["ikiz","jumeau / jumelle","Ils sont jumeaux.","Onlar ikiz."],
["komşu","voisin(e)","Notre voisin est très sympathique.","Komşumuz çok samimi."],
],
food: [
["kahvaltı","petit-déjeuner","Le petit-déjeuner est prêt.","Kahvaltı hazır."],
["öğle yemeği","déjeuner","Nous faisons une pause déjeuner.","Öğle yemeği için mola veriyoruz."],
["akşam yemeği","dîner","Le dîner était délicieux.","Akşam yemeği çok lezzetliydi."],
["tatlı","dessert","Veux-tu un dessert ?","Bir tatlı ister misin?"],
["sebze","légume","Mange plus de légumes.","Daha fazla sebze ye."],
["meyve","fruit","Les fruits frais sont bons pour la santé.","Taze meyve sağlıklıdır."],
["tuz","sel","Passe-moi le sel, s'il te plaît.","Bana tuzu verir misin."],
["şeker","sucre","Sans sucre, s'il vous plaît.","Şekersiz olsun lütfen."],
],
travel: [
["rezervasyon","réservation","J'ai une réservation.","Bir rezervasyonum var."],
["valiz","valise","Ma valise est lourde.","Valizim ağır."],
["pasaport","passeport","N'oublie pas ton passeport.","Pasaportunu unutma."],
["gümrük","douane","Nous attendons à la douane.","Gümrükte bekliyoruz."],
["tatil","vacances","Nous partons en vacances.","Tatile gidiyoruz."],
["plaj","plage","La plage est bondée.","Plaj insan dolu."],
["dağ","montagne","La montagne est très haute.","Dağ çok yüksek."],
["göl","lac","Le lac est calme.","Göl sakin."],
],
daily: [
["randevu","rendez-vous","J'ai rendez-vous chez le médecin.","Doktorda randevum var."],
["hastane","hôpital","L'hôpital est tout près.","Hastane yakında."],
["doktor","médecin","Le médecin examine le patient.","Doktor hastayı muayene ediyor."],
["market","supermarché","Je vais au supermarché.","Markete gidiyorum."],
["hava durumu","météo","La météo est belle aujourd'hui.","Bugün hava güzel."],
["mevsim","saison","L'automne est ma saison préférée.","Sonbahar en sevdiğim mevsim."],
["telefon","téléphone","Mon téléphone est cassé.","Telefonum bozuk."],
["bilgisayar","ordinateur","L'ordinateur est lent.","Bilgisayar yavaş."],
],
},
B1: {
family: [
["nişanlı","fiancé(e)","Elle a présenté son fiancé.","Nişanlısını tanıttı."],
["boşanma","divorce","Le divorce a été difficile.","Boşanma zordu."],
["akraba","proche","Nous avons beaucoup de proches.","Birçok akrabamız var."],
["üvey kardeş","demi-frère","J'ai deux demi-frères.","İki üvey kardeşim var."],
["torun","petit-enfant","Le petit-enfant rend visite aux grands-parents.","Torun büyükanne ve büyükbabayı ziyaret ediyor."],
["yetişkin","adulte","En tant qu'adulte, on porte des responsabilités.","Yetişkin olarak sorumluluk taşırsın."],
["ergen","adolescent(e)","Les adolescents ont besoin de liberté.","Ergenlerin özgür alana ihtiyacı var."],
["nesil","génération","Chaque génération est différente.","Her nesil farklıdır."],
],
food: [
["tarif","recette","La recette est simple.","Tarif basit."],
["malzeme","ingrédient","Il me manque cet ingrédient.","Bu malzeme bende yok."],
["lezzet","goût","Le goût est intense.","Lezzet yoğun."],
["beslenme","alimentation","Une bonne alimentation est importante.","Sağlıklı beslenme önemlidir."],
["vejetaryen","végétarien(ne)","Il est végétarien depuis des années.","Yıllardır vejetaryen."],
["alerji","allergie","J'ai une allergie aux noisettes.","Fındığa karşı alerjim var."],
["porsiyon","portion","La portion est très grande.","Porsiyon çok büyük."],
["restoran","restaurant","Le restaurant est toujours plein.","Restoran hep dolu."],
],
travel: [
["varış","arrivée","L'arrivée est retardée.","Varış gecikiyor."],
["kalkış","départ","Le départ est à six heures.","Kalkış saat altıda."],
["gecikme","retard","Il y a un retard.","Bir gecikme var."],
["sigorta","assurance","Une assurance voyage est recommandée.","Seyahat sigortası tavsiye edilir."],
["konaklama","hébergement","Nous cherchons un hébergement.","Konaklama arıyoruz."],
["rehber","guide","Le guide connaît bien la ville.","Rehber şehri iyi tanıyor."],
["macera","aventure","C'était une vraie aventure.","Bu gerçek bir maceraydı."],
["kültür","culture","Chaque culture est unique.","Her kültür özgündür."],
],
daily: [
["sorumluluk","responsabilité","C'est ma responsabilité.","Bu benim sorumluluğum."],
["deneyim","expérience","Cette expérience était précieuse.","Bu deneyim değerliydi."],
["başarı","réussite","Sa réussite était méritée.","Onun başarısı hak edilmişti."],
["hedef","objectif","Mon objectif est clair.","Hedefim net."],
["fırsat","opportunité","Saisis cette opportunité.","Bu fırsatı değerlendir."],
["zorluk","défi","Chaque défi nous apprend quelque chose.","Her zorluk bize bir şey öğretir."],
["karar","décision","C'était une décision difficile.","Bu zor bir karardı."],
["alışkanlık","habitude","Les bonnes habitudes prennent du temps.","İyi alışkanlıklar zaman ister."],
],
},
};

/* Build normalized VOCAB structure with ids */
function buildVocab(raw, lang) {
  const out = {};
  let counter = 0;
  for (const level of LEVELS) {
    out[level] = {};
    for (const cat of Object.keys(CATS)) {
      out[level][cat] = raw[level][cat].map((row) => {
        counter++;
        return {
          id: `${lang}-${level}-${cat}-${counter}`,
          tr: row[0],
          word: row[1],
          example: row[2],
          exampleTr: row[3],
          category: cat,
          level,
          lang,
        };
      });
    }
  }
  return out;
}

const VOCAB = {
  de: buildVocab(RAW_DE, "de"),
  en: buildVocab(RAW_EN, "en"),
  fr: buildVocab(RAW_FR, "fr"),
};

function flatVocab(lang, level, cat) {
  let list = [];
  const levels = level ? [level] : LEVELS;
  for (const lv of levels) {
    const cats = cat ? [cat] : Object.keys(CATS);
    for (const c of cats) list = list.concat(VOCAB[lang][lv][c]);
  }
  return list;
}

/* ---------- OKUMA METİNLERİ ---------- */
const READINGS = {
  de: {
    A1: {
      title: "Ein Tag in meinem Leben",
      text: "Ich heiße Anna. Jeden Morgen stehe ich um sieben Uhr auf. Ich trinke Kaffee und esse Brot mit Käse. Danach gehe ich zur Arbeit mit dem Bus. Am Abend lese ich ein Buch oder ich telefoniere mit meiner Familie.",
      questions: [
        { q: "Was trinkt Anna am Morgen?", options: ["Tee", "Kaffee", "Milch"], answer: 1 },
        { q: "Wie fährt Anna zur Arbeit?", options: ["Mit dem Zug", "Zu Fuß", "Mit dem Bus"], answer: 2 },
        { q: "Was macht Anna am Abend?", options: ["Sie kocht", "Sie liest ein Buch", "Sie schwimmt"], answer: 1 },
      ],
    },
    A2: {
      title: "Ein Wochenende am See",
      text: "Am Wochenende sind wir zu einem See gefahren. Das Wetter war sonnig und warm. Wir haben ein Picknick gemacht und frisches Obst gegessen. Meine Schwester wollte schwimmen, aber das Wasser war zu kalt. Am Abend sind wir müde, aber glücklich nach Hause gefahren.",
      questions: [
        { q: "Wie war das Wetter?", options: ["Regnerisch", "Sonnig und warm", "Kalt und windig"], answer: 1 },
        { q: "Was wollte die Schwester tun?", options: ["Lesen", "Schwimmen", "Schlafen"], answer: 1 },
        { q: "Wie fühlten sie sich am Abend?", options: ["Traurig", "Müde, aber glücklich", "Wütend"], answer: 1 },
      ],
    },
    B1: {
      title: "Die Herausforderung einer neuen Sprache",
      text: "Eine neue Sprache zu lernen ist eine echte Herausforderung, aber auch eine wertvolle Erfahrung. Am Anfang fällt es schwer, Wörter zu behalten und Sätze zu bilden. Mit der Zeit und mit täglicher Übung wird es einfacher. Wichtig ist, keine Angst vor Fehlern zu haben, denn jeder Fehler ist eine Gelegenheit zu lernen.",
      questions: [
        { q: "Was ist am Anfang schwierig?", options: ["Essen kochen", "Wörter behalten", "Auto fahren"], answer: 1 },
        { q: "Was macht das Lernen einfacher?", options: ["Tägliche Übung", "Fernsehen", "Schlafen"], answer: 0 },
        { q: "Wie soll man Fehler sehen?", options: ["Als Problem", "Als Gelegenheit zu lernen", "Als Grund aufzugeben"], answer: 1 },
      ],
    },
  },
  en: {
    A1: {
      title: "A Day in My Life",
      text: "My name is Anna. Every morning I wake up at seven o'clock. I drink coffee and eat bread with cheese. After that, I go to work by bus. In the evening, I read a book or call my family.",
      questions: [
        { q: "What does Anna drink in the morning?", options: ["Tea", "Coffee", "Milk"], answer: 1 },
        { q: "How does Anna go to work?", options: ["By train", "On foot", "By bus"], answer: 2 },
        { q: "What does Anna do in the evening?", options: ["She cooks", "She reads a book", "She swims"], answer: 1 },
      ],
    },
    A2: {
      title: "A Weekend by the Lake",
      text: "On the weekend, we drove to a lake. The weather was sunny and warm. We had a picnic and ate fresh fruit. My sister wanted to swim, but the water was too cold. In the evening, we drove home tired but happy.",
      questions: [
        { q: "How was the weather?", options: ["Rainy", "Sunny and warm", "Cold and windy"], answer: 1 },
        { q: "What did the sister want to do?", options: ["Read", "Swim", "Sleep"], answer: 1 },
        { q: "How did they feel in the evening?", options: ["Sad", "Tired but happy", "Angry"], answer: 1 },
      ],
    },
    B1: {
      title: "The Challenge of a New Language",
      text: "Learning a new language is a real challenge, but also a valuable experience. At first, it is hard to remember words and build sentences. With time and daily practice, it becomes easier. It is important not to be afraid of mistakes, because every mistake is an opportunity to learn.",
      questions: [
        { q: "What is hard at the beginning?", options: ["Cooking food", "Remembering words", "Driving a car"], answer: 1 },
        { q: "What makes learning easier?", options: ["Daily practice", "Watching TV", "Sleeping"], answer: 0 },
        { q: "How should mistakes be seen?", options: ["As a problem", "As an opportunity to learn", "As a reason to give up"], answer: 1 },
      ],
    },
  },
  fr: {
    A1: {
      title: "Une journée dans ma vie",
      text: "Je m'appelle Anna. Chaque matin, je me réveille à sept heures. Je bois du café et je mange du pain avec du fromage. Ensuite, je vais au travail en bus. Le soir, je lis un livre ou j'appelle ma famille.",
      questions: [
        { q: "Que boit Anna le matin ?", options: ["Du thé", "Du café", "Du lait"], answer: 1 },
        { q: "Comment Anna va-t-elle au travail ?", options: ["En train", "À pied", "En bus"], answer: 2 },
        { q: "Que fait Anna le soir ?", options: ["Elle cuisine", "Elle lit un livre", "Elle nage"], answer: 1 },
      ],
    },
    A2: {
      title: "Un week-end au lac",
      text: "Le week-end, nous sommes allés à un lac. Le temps était ensoleillé et chaud. Nous avons fait un pique-nique et mangé des fruits frais. Ma sœur voulait nager, mais l'eau était trop froide. Le soir, nous sommes rentrés fatigués mais heureux.",
      questions: [
        { q: "Quel temps faisait-il ?", options: ["Pluvieux", "Ensoleillé et chaud", "Froid et venteux"], answer: 1 },
        { q: "Que voulait faire la sœur ?", options: ["Lire", "Nager", "Dormir"], answer: 1 },
        { q: "Comment se sentaient-ils le soir ?", options: ["Tristes", "Fatigués mais heureux", "En colère"], answer: 1 },
      ],
    },
    B1: {
      title: "Le défi d'une nouvelle langue",
      text: "Apprendre une nouvelle langue est un vrai défi, mais aussi une expérience précieuse. Au début, il est difficile de retenir les mots et de construire des phrases. Avec le temps et une pratique quotidienne, cela devient plus facile. Il est important de ne pas avoir peur des erreurs, car chaque erreur est une occasion d'apprendre.",
      questions: [
        { q: "Qu'est-ce qui est difficile au début ?", options: ["Cuisiner", "Retenir les mots", "Conduire une voiture"], answer: 1 },
        { q: "Qu'est-ce qui facilite l'apprentissage ?", options: ["La pratique quotidienne", "Regarder la télévision", "Dormir"], answer: 0 },
        { q: "Comment faut-il voir les erreurs ?", options: ["Comme un problème", "Comme une occasion d'apprendre", "Comme une raison d'abandonner"], answer: 1 },
      ],
    },
  },
};
