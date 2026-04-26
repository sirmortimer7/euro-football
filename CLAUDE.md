# KickOff — Claude Code Project Guide

## Project Overview
A web-based European football club geography game. Players drop a pin on a map to guess where a club is located. Closer = more points.

## Tech Stack
- React (Vite)
- Leaflet (react-leaflet) for the map
- Tailwind CSS for styling
- localStorage for leaderboard persistence
- No backend, no API dependencies

## File Structure
- src/App.jsx — root component, game state management
- src/components/ — Screen components (Landing, Game, Results) and UI pieces (HintPanel, MapView, ScoreCard, Leaderboard)
- src/data/clubs.js — hardcoded club dataset (source of truth)
- src/utils/scoring.js — proximity scoring logic
- src/utils/helpers.js — misc utilities
- CLAUDE.md — this file

## Game Rules
- 11 rounds per game
- Hints auto-reveal every 8 seconds: Club Name → Country → League → Crest → Stadium Name
- Player can click "Next Hint" to reveal early
- After all hints shown, 30-second countdown before auto-advance (0 points if no guess)
- Max 1000 points per round, 11,000 total
- Scoring curve: 0km = 1000pts, degrades to 0pts at ~2000km

## Data Conventions
Each club in clubs.js follows this schema:
{
  id, name, country, league, city,
  lat, lng,          // stadium coordinates
  stadium,           // stadium name
  primaryColor,      // hex, used for UI accents and placeholder badge
  secondaryColor     // hex
}

## Key Design Decisions
- Dark map tiles (CartoDB Dark Matter or similar)
- Club primary color accents the UI each round
- Placeholder crests use colored badge + club initials (no external image dependencies)
- Mobile-first layout: map and hint panel stack vertically on small screens

## How to Extend
- To add clubs: add entries to src/data/clubs.js following the schema above
- To add hint types: update the HINTS array in HintPanel.jsx and the auto-reveal logic in Game.jsx
- To add real crests: add an imageUrl field to club entries and update HintPanel to render it

## Out of Scope (for now)
- Backend / database
- User accounts
- Multiplayer
- Real-time API data
