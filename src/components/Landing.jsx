import Leaderboard from "./Leaderboard";

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
        {/* Logo / Title */}
        <div className="mb-8">
          <div className="text-6xl mb-4">⚽</div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-2">
            Kick<span className="text-emerald-400">Off</span>
          </h1>
          <p className="text-slate-400 text-lg">
            How well do you know European football grounds?
          </p>
        </div>

        {/* Rules */}
        <div className="bg-slate-800/50 rounded-xl p-5 mb-6 text-left border border-slate-700/40">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
            How to play
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              Hints reveal every 8 seconds — or tap "Next Hint"
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              Drop a pin on the map to guess the stadium location
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold">3.</span>
              Closer & faster = more points (max 10 per round)
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-400 font-bold">4.</span>
              10 rounds, 100 possible points — good luck!
            </li>
          </ul>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-lg rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20 mb-8"
        >
          Start Game
        </button>

        {/* Leaderboard */}
        <div>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
            Leaderboard
          </h3>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
