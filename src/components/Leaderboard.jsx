import { loadLeaderboard } from "../utils/helpers";

export default function Leaderboard() {
  const entries = loadLeaderboard();

  if (entries.length === 0) {
    return (
      <div className="text-slate-500 text-center py-6 text-sm">
        No scores yet. Be the first!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-slate-800/60 rounded-lg px-4 py-3 border border-slate-700/40"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              i === 0
                ? "bg-amber-500 text-slate-900"
                : i === 1
                ? "bg-slate-300 text-slate-900"
                : i === 2
                ? "bg-amber-700 text-white"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            {i + 1}
          </div>
          <div className="flex-1 font-medium text-white">{entry.name}</div>
          <div className="font-bold text-emerald-400">{entry.score.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
