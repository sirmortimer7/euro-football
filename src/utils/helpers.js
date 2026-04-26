/**
 * Shuffle an array using Fisher-Yates algorithm.
 * Returns a new array.
 */
export function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get initials from a club name (up to 3 characters).
 */
export function getInitials(name) {
  return name
    .replace(/^(FC|CF|SC|SK|SL|SS|AS|AC|RB)\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

/**
 * Load leaderboard from localStorage.
 */
export function loadLeaderboard() {
  try {
    const data = localStorage.getItem("kickoff-leaderboard");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Save a score to the leaderboard. Keeps top 10.
 */
export function saveToLeaderboard(name, score) {
  const board = loadLeaderboard();
  board.push({ name, score, date: new Date().toISOString() });
  board.sort((a, b) => b.score - a.score);
  const top10 = board.slice(0, 10);
  localStorage.setItem("kickoff-leaderboard", JSON.stringify(top10));
  return top10;
}

/**
 * Format distance for display.
 */
export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  if (km < 100) return `${km.toFixed(1)}km`;
  return `${Math.round(km)}km`;
}
