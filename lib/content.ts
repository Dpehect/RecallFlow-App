import type { Lexeme,Ritual } from "@/types/studio";
export const lexemes:Lexeme[]=[
 {id:"trace",word:"iz",translation:"trace · Spur · trace",note:"Bir kelime, hatırlandığı her bağlamda biçim değiştirir.",tone:"blue"},
 {id:"threshold",word:"eşik",translation:"threshold · Schwelle · seuil",note:"Anlam, doğru cevaptan hemen önceki duraktır.",tone:"red"},
 {id:"voice",word:"ses",translation:"voice · Stimme · voix",note:"Dili görmeden önce onun mesafesini duyarsın.",tone:"ink"},
 {id:"drift",word:"sapma",translation:"drift · Abweichung · écart",note:"Hata, geri çağırmanın kanıtıdır.",tone:"blue"},
 {id:"near",word:"yakın",translation:"near · nah · proche",note:"Öğrenmek, tekrar değil yakınlık kurmaktır.",tone:"red"}
];
export const rituals:Ritual[]=[
 {id:"dawn",time:"07:20",title:"Sesle açıl",note:"On dakika. Ekranı kapat; kulağı açık tut.",language:"fr"},
 {id:"noon",time:"13:40",title:"Metnin içinde kal",note:"Bir paragrafı bitirme. Bir cümlede oyalan.",language:"de"},
 {id:"night",time:"22:15",title:"Cevabı geciktir",note:"İpucu olmadan çağır. Sonra kontrol et.",language:"en"}
];
