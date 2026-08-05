'use client';

import Navbar from '@/components/Navbar';

export default function LeaderboardPage() {
  const leagueUsers = [
    { rank: 1, name: 'Elena Rostova', xp: 2450, avatar: '👩‍💻', league: 'Diamond', streak: 14, flag: '🇩🇪' },
    { rank: 2, name: 'Yunus Emre', xp: 2120, avatar: '🚀', league: 'Diamond', streak: 7, flag: '🇹🇷', isUser: true },
    { rank: 3, name: 'Carlos Mendez', xp: 1980, avatar: '⚽', league: 'Diamond', streak: 12, flag: '🇪🇸' },
    { rank: 4, name: 'Sophie Laurent', xp: 1750, avatar: '🎨', league: 'Diamond', streak: 9, flag: '🇫🇷' },
    { rank: 5, name: 'Alex Johnson', xp: 1620, avatar: '🎧', league: 'Diamond', streak: 5, flag: '🇬🇧' },
    { rank: 6, name: 'Marco Silva', xp: 1490, avatar: '🏄', league: 'Gold', streak: 4, flag: '🇵🇹' },
    { rank: 7, name: 'Anya Ivanov', xp: 1310, avatar: '📚', league: 'Gold', streak: 6, flag: '🇩🇪' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">DIAMOND LEAGUE RANKINGS</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Global Competitive Leaderboard</h1>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-4 py-2 rounded-2xl text-xs shadow-md">
            <span>💎 Diamond League</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full font-mono text-[10px]">Top 5 Advance</span>
          </div>
        </div>

        {/* Podium Top 3 */}
        <div className="grid grid-cols-3 gap-4 pt-4 items-end max-w-2xl mx-auto">
          {/* Rank 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-lg order-1">
            <div className="text-3xl">🥈</div>
            <div className="text-2xl">{leagueUsers[1].avatar}</div>
            <div className="font-extrabold text-sm text-slate-900 dark:text-white">{leagueUsers[1].name}</div>
            <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{leagueUsers[1].xp} XP</div>
          </div>

          {/* Rank 1 */}
          <div className="bg-gradient-to-b from-amber-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:to-yellow-500/20 bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-amber-400 text-center space-y-3 shadow-xl order-2 scale-105 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">CHAMPION</div>
            <div className="text-4xl">👑</div>
            <div className="text-3xl">{leagueUsers[0].avatar}</div>
            <div className="font-extrabold text-base text-slate-900 dark:text-white">{leagueUsers[0].name}</div>
            <div className="text-sm font-mono font-black text-amber-500">{leagueUsers[0].xp} XP</div>
          </div>

          {/* Rank 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-lg order-3">
            <div className="text-3xl">🥉</div>
            <div className="text-2xl">{leagueUsers[2].avatar}</div>
            <div className="font-extrabold text-sm text-slate-900 dark:text-white">{leagueUsers[2].name}</div>
            <div className="text-xs font-mono font-bold text-amber-600">{leagueUsers[2].xp} XP</div>
          </div>
        </div>

        {/* Full League Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {leagueUsers.map(user => (
            <div key={user.rank} className={`p-4 flex items-center justify-between transition ${user.isUser ? 'bg-blue-50/80 dark:bg-blue-950/40 font-bold border-l-4 border-l-blue-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
              <div className="flex items-center space-x-4">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs ${user.rank <= 3 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300' : 'text-slate-400'}`}>
                  #{user.rank}
                </span>
                <span className="text-xl">{user.avatar}</span>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
                    <span>{user.name}</span>
                    <span className="text-xs">{user.flag}</span>
                    {user.isUser && <span className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-full uppercase">YOU</span>}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">🔥 {user.streak} day streak</div>
                </div>
              </div>

              <div className="text-sm font-mono font-black text-blue-600 dark:text-blue-400">
                {user.xp} XP
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        RECALLFLOW LEAGUE COMPETITION ENGINE
      </footer>
    </div>
  );
}
