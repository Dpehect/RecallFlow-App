'use client';

import Navbar from '@/components/Navbar';

export default function BadgesPage() {
  const badges = [
    { id: 'b1', title: 'Polyglot Pioneer', desc: 'Study 3 different languages in one week', icon: '🌍', unlocked: true, progress: '3 / 3' },
    { id: 'b2', title: '7-Day Warrior', desc: 'Maintain a 7-day learning streak', icon: '🔥', unlocked: true, progress: '7 / 7' },
    { id: 'b3', title: 'SM-2 Memory Titan', desc: 'Review 100 cards with SM-2 Spaced Repetition', icon: '🧠', unlocked: true, progress: '100 / 100' },
    { id: 'b4', title: 'Speech Maestro', desc: 'Achieve 90%+ pronunciation score in 10 phrases', icon: '🎙️', unlocked: false, progress: '6 / 10' },
    { id: 'b5', title: 'AI Conversation Champion', desc: 'Complete 5 interactive scenario chats with AI Tutor', icon: '🤖', unlocked: false, progress: '2 / 5' },
    { id: 'b6', title: 'Night Owl Learner', desc: 'Complete a lesson after 10 PM', icon: '🦉', unlocked: true, progress: '1 / 1' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">ACHIEVEMENTS & REWARDS</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Unlockable Master Badges</h1>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-2xl text-xs font-bold font-mono">
            4 / 6 Badges Unlocked
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {badges.map(b => (
            <div key={b.id} className={`rounded-3xl p-6 border transition space-y-4 ${b.unlocked ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md' : 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'}`}>
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${b.unlocked ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800' : 'bg-slate-200 dark:bg-slate-800'}`}>
                  {b.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{b.title}</h3>
                    {b.unlocked && <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">UNLOCKED</span>}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{b.desc}</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400">
                  <span>Progress</span>
                  <span>{b.progress}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${b.unlocked ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: b.unlocked ? '100%' : '60%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW ACHIEVEMENTS & GAMIFICATION
      </footer>
    </div>
  );
}
