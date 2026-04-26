import { useState, useCallback } from "react";
import Landing from "./components/Landing";
import Game from "./components/Game";
import Results from "./components/Results";
import clubs from "./data/clubs";
import { shuffleArray } from "./utils/helpers";

const ROUNDS = 10;

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | game | results
  const [gameClubs, setGameClubs] = useState([]);
  const [finalScores, setFinalScores] = useState([]);

  const startGame = useCallback(() => {
    const shuffled = shuffleArray(clubs).slice(0, ROUNDS);
    setGameClubs(shuffled);
    setFinalScores([]);
    setScreen("game");
  }, []);

  const handleFinish = useCallback((scores) => {
    setFinalScores(scores);
    setScreen("results");
  }, []);

  const handlePlayAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  return (
    <>
      {screen === "landing" && <Landing onStart={startGame} />}
      {screen === "game" && (
        <Game clubs={gameClubs} onFinish={handleFinish} />
      )}
      {screen === "results" && (
        <Results scores={finalScores} onPlayAgain={handlePlayAgain} />
      )}
    </>
  );
}
