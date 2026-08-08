export const PRACTICE_METHODS = [
 {id:"flash",number:"01",title:"Flashcard",description:"Gör, tahmin et ve cevabı çevirmeden önce zihninden üret.",meta:"TANIMA",duration:"3 dk",accent:"acid"},
 {id:"choice",number:"02",title:"Şıklı test",description:"Yakın anlamlı çeldiriciler arasından doğru karşılığı ayır.",meta:"AYIRT ETME",duration:"4 dk",accent:"violet"},
 {id:"free",number:"03",title:"Şıksız test",description:"İpucu olmadan Türkçeden hedef dile aktif hatırla.",meta:"AKTİF HATIRLAMA",duration:"5 dk",accent:"coral"},
 {id:"listen",number:"04",title:"Duyduğunu yaz",description:"Yazımı görmeden doğal sesi dinle ve kelimeyi üret.",meta:"DİKTE",duration:"4 dk",accent:"blue"},
 {id:"sentence",number:"05",title:"Cümlede kullan",description:"Kelimeyi kendi anlamlı cümlenin içine yerleştir.",meta:"ÜRETİM",duration:"6 dk",accent:"orange"},
 {id:"category",number:"06",title:"Bağlamı sınıfla",description:"Kelimeyi doğru semantik konu alanıyla eşleştir.",meta:"SEMANTİK AĞ",duration:"3 dk",accent:"mint"},
 {id:"text",number:"07",title:"Yoğun okuma",description:"Destenin tamamını 1000+ karakterlik metinde işle.",meta:"OKUMA",duration:"8 dk",accent:"ink"},
] as const;
export type PracticeMode=typeof PRACTICE_METHODS[number]["id"];
export function isPracticeMode(value:string):value is PracticeMode{return PRACTICE_METHODS.some(method=>method.id===value)}
