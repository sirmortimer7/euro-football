import { useState, useEffect, useRef, useCallback } from "react";
import MapView from "./MapView";
import HintPanel from "./HintPanel";
import ScoreCard from "./ScoreCard";
import { haversineDistance, calculateScore } from "../utils/scoring";

const HINT_INTERVAL = 8000;
const TOTAL_HINTS = 4;
const COUNTDOWN_SECONDS = 15;
const ROUNDS = 10;

export default function Game({ clubs, onFinish }) {
  const [round, setRound] = useState(0);
  const [scores, setScores] = useState([]);
  const [guess, setGuess] = useState(null);
  const [revealedHints, setRevealedHints] = useState(1); // Club name revealed first
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [roundScore, setRoundScore] = useState(0);
  const [roundDistance, setRoundDistance] = useState(null);

  const hintTimerRef = useRef(null);
  const countdownRef = useRef(null);
  const roundStartTimeRef = useRef(Date.now());

  const currentClub = clubs[round];
  const accentColor = currentClub?.primaryColor || "#22c55e";

  // Clear all timers
  const clearTimers = useCallback(() => {
    if (hintTimerRef.current) clearInterval(hintTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    hintTimerRef.current = null;
    countdownRef.current = null;
  }, []);

  // Reset round start time when round changes
  useEffect(() => {
    roundStartTimeRef.current = Date.now();
  }, [round]);

  // Auto-reveal hints every 8 seconds
  useEffect(() => {
    if (showResult) return;

    hintTimerRef.current = setInterval(() => {
      setRevealedHints((prev) => {
        if (prev >= TOTAL_HINTS) {
          clearInterval(hintTimerRef.current);
          hintTimerRef.current = null;
          return prev;
        }
        return prev + 1;
      });
    }, HINT_INTERVAL);

    return () => {
      if (hintTimerRef.current) clearInterval(hintTimerRef.current);
    };
  }, [round, showResult]);

  // Start countdown when all hints revealed and no guess yet
  useEffect(() => {
    if (revealedHints >= TOTAL_HINTS && !showResult && !guess) {
      setCountdown(COUNTDOWN_SECONDS);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
            // Auto-advance with 0 points
            handleSubmitGuess(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [revealedHints, showResult, guess]);

  const handleSubmitGuess = useCallback(
    (guessPos) => {
      clearTimers();
      setCountdown(null);

      const elapsedSeconds = (Date.now() - roundStartTimeRef.current) / 1000;
      let dist = null;
      let score = 0;

      if (guessPos) {
        dist = haversineDistance(
          guessPos.lat,
          guessPos.lng,
          currentClub.lat,
          currentClub.lng
        );
        score = calculateScore(dist, elapsedSeconds);
      }

      setRoundScore(score);
      setRoundDistance(dist);
      setShowResult(true);
      setRevealedHints(TOTAL_HINTS); // Reveal all hints on submit
    },
    [currentClub, clearTimers]
  );

  const handleMapClick = useCallback(
    (latlng) => {
      if (showResult) return;
      const newGuess = { lat: latlng.lat, lng: latlng.lng };
      setGuess(newGuess);
      handleSubmitGuess(newGuess);
    },
    [showResult, handleSubmitGuess]
  );

  const handleNextRound = useCallback(() => {
    const newScores = [...scores, roundScore];
    setScores(newScores);

    if (round + 1 >= ROUNDS) {
      onFinish(newScores);
    } else {
      setRound((r) => r + 1);
      setGuess(null);
      setRevealedHints(1);
      setShowResult(false);
      setCountdown(null);
      setRoundScore(0);
      setRoundDistance(null);
    }
  }, [round, scores, roundScore, onFinish]);

  const handleNextHint = useCallback(() => {
    setRevealedHints((prev) => Math.min(prev + 1, TOTAL_HINTS));
  }, []);

  const totalScore = scores.reduce((a, b) => a + b, 0);

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: `${accentColor}30` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-400">
            Round <span className="text-white">{round + 1}</span>
            <span className="text-slate-600">/{ROUNDS}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Score:</span>
          <span className="text-lg font-bold text-emerald-400">
            {totalScore}
          </span>
        </div>
      </div>

      {/* Main content — responsive layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 min-h-0">
        {/* Map */}
        <div className="flex-1 min-h-[300px] lg:min-h-0">
          <MapView
            key={round}
            guess={guess}
            onGuess={handleMapClick}
            actualLocation={showResult ? { lat: currentClub.lat, lng: currentClub.lng } : null}
            showResult={showResult}
            accentColor={accentColor}
          />
        </div>

        {/* Side panel */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <HintPanel
            club={currentClub}
            revealedCount={revealedHints}
            onNextHint={handleNextHint}
            countdown={countdown}
            accentColor={accentColor}
            showResult={showResult}
          />
          {showResult && (
            <ScoreCard
              score={roundScore}
              distance={roundDistance}
              onNext={handleNextRound}
              isLastRound={round + 1 >= ROUNDS}
            />
          )}
        </div>
      </div>
    </div>
  );
}
