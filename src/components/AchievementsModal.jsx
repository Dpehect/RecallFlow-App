import React from 'react';
import { Trophy, Award, Flame, Zap, X, CheckCircle2 } from 'lucide-react';

const ACHIEVEMENTS = [
  { id: 1, title: 'İlk Adım', desc: 'İlk kelimeni başarıyla öğrendin!', icon: '🌟', unlocked: true },
  { id: 2, title: '7 Günlük Seri', desc: 'Arka arkaya 7 gün pratik yaptın.', icon: '🔥', unlocked: true },
  { id: 3, title: 'Süper Dinleyici', desc: '10 telaffuz ve diyalog dinledin.', icon: '🎧', unlocked: true },
  { id: 4, title: 'A1 Ustası', desc: 'A1 seviye kelimelerinin %80\'ini tamamladın.', icon: '🏆', unlocked: false },
  { id: 5, title: 'Poliglot Adayı', desc: '3 farklı dilde pratik yaptın.', icon: '🌍', unlocked: true },
];

export default function AchievementsModal({ isOpen, onClose, xpPoints, learnedCount }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg p-6 rounded-3xl glass-card border border-white/20 shadow-2xl bg-slate-900/90 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Başarılar & Rozetler</h3>
            <p className="text-xs text-slate-400">Jüri ve Öğrenci Başarı Paneli</p>
          </div>
        </div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
            <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">Toplam XP</span>
            <p className="text-xl font-black text-white">{xpPoints} XP</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Öğrenilen Kelimeler</span>
            <p className="text-xl font-black text-white">{learnedCount}</p>
          </div>
        </div>

        {/* Badges List */}
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                item.unlocked
                  ? 'bg-white/5 border-emerald-500/30 text-slate-200'
                  : 'bg-white/2 border-white/5 opacity-50 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
              </div>

              {item.unlocked ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <span className="text-[10px] text-slate-500 font-bold">Kilitli</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
