export default function HintPanel({
  club,
  revealedCount,
  onNextHint,
  countdown,
  accentColor,
  showResult,
}) {
  if (!club) return null;

  const hints = [
    { label: "Club Name", value: club.name },
    { label: "Stadium", value: club.stadium },
    { label: "League", value: club.league },
    { label: "Country", value: club.country },
  ];

  const allRevealed = revealedCount >= hints.length;

  return (
    <div className="flex flex-col gap-3">
      {/* Hint cards */}
      <div className="flex flex-col gap-2">
        {hints.map((hint, i) => {
          const isRevealed = i < revealedCount;
          return (
            <div
              key={hint.label}
              className={`rounded-lg px-4 py-3 transition-all duration-500 ${
                isRevealed
                  ? "bg-slate-800/80 border border-slate-600/50"
                  : "bg-slate-800/30 border border-slate-700/30"
              }`}
            >
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                {hint.label}
              </div>
              {isRevealed ? (
                <div className="text-lg font-semibold text-white">{hint.value}</div>
              ) : (
                <div className="text-lg font-semibold text-slate-600">???</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      {!showResult && (
        <div className="flex items-center gap-3">
          {!allRevealed && (
            <button
              onClick={onNextHint}
              className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ background: accentColor, color: "#0f172a" }}
            >
              Next Hint
            </button>
          )}
          {allRevealed && countdown !== null && (
            <div className="flex-1 text-center">
              <span className="text-slate-400 text-sm">Auto-advance in </span>
              <span className="text-white font-bold text-lg">{countdown}s</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
