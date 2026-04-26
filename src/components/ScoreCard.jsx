import { formatDistance } from "../utils/helpers";

export default function ScoreCard({ score, distance, onNext, isLastRound }) {
  return (
    <div className="bg-slate-800/90 backdrop-blur rounded-xl p-5 border border-slate-600/50 text-center">
      <div className="text-4xl font-bold text-white mb-1">+{score.toFixed(1)}</div>
      <div className="text-slate-400 text-sm mb-4">
        {distance !== null ? `${formatDistance(distance)} away` : "No guess — 0 points"}
      </div>
      <button
        onClick={onNext}
        className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg transition-all active:scale-[0.98]"
      >
        {isLastRound ? "See Results" : "Next Round"}
      </button>
    </div>
  );
}
