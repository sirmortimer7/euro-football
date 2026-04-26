import { useState } from "react";
import Leaderboard from "./Leaderboard";
import { saveToLeaderboard } from "../utils/helpers";

export default function Results({ scores, onPlayAgain }) {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const totalScore = Math.round(scores.reduce((a, b) => a + b, 0) * 10) / 10;
  const maxScore = scores.length * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getMessage = () => {
    if (percentage >= 90) return "Legendary! You know your grounds!";
    if (percentage >= 70) return "Impressive knowledge!";
    if (percentage >= 50) return "Solid effort!";
    if (percentage >= 30) return "Room for improvement!";
    return "Better luck next time!";
  };

  const handleSave = () => {
    if (!name.trim()) return;
    saveToLeaderboard(name.trim(), totalScore);
    setSaved(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-4">🏟️</div>
        <h2 className="text-3xl font-black text-white mb-2">Game Over</h2>
        <p className="text-slate-400 text-lg mb-6">{getMessage()}</p>

        {/* Score display */}
        <div className="bg-slate-800/60 rounded-xl p-6 mb-6 border border-slate-700/40">
          <div className="text-6xl font-black text-emerald-400 mb-1">
            {totalScore.toLocaleString()}
          </div>
          <div className="text-slate-400">
            out of {maxScore.toLocaleString()} points
          </div>

          {/* Round breakdown */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {scores.map((s, i) => (
              <div
                key={i}
                className="bg-slate-700/50 rounded-lg px-3 py-1.5 text-xs"
              >
                <span className="text-slate-400">R{i + 1}: </span>
                <span className="text-white font-semibold">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save to leaderboard */}
        {!saved ? (
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder="Enter your name"
              maxLength={20}
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              onClick={handleSave}
              disabled={!name.trim()}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-bold rounded-lg transition-all"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="text-emerald-400 text-sm mb-6">Score saved!</div>
        )}

        {/* Play again */}
        <button
          onClick={onPlayAgain}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-lg rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20 mb-8"
        >
          Play Again
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
