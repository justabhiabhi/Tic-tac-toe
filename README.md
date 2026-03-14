# Tic Tac Toe Probability Analyzer

A modern Next.js + TypeScript Tic Tac Toe app that computes live outcome probabilities after every move by enumerating the full game tree from the current board state.

## Features

- Playable 3x3 Tic Tac Toe (two human players on one device)
- Live probabilities after every move:
  - X eventual win
  - O eventual win
  - Draw
- Recursive game tree search with memoization
- Best move suggestion for the current player
- Move history panel
- Winning-line highlight
- Animated piece placement and animated probability bars
- Responsive layout

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React hooks
- Fully client-side logic

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build and lint

```bash
npm run lint
npm run build
```

## Project structure

```text
.
├── package.json
├── next.config.ts
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── src
    ├── app
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── BestMoveIndicator.tsx
    │   ├── Cell.tsx
    │   ├── GameBoard.tsx
    │   ├── GameControls.tsx
    │   ├── MoveHistory.tsx
    │   ├── ProbabilityBar.tsx
    │   └── ProbabilityPanel.tsx
    └── lib
        └── gameEngine.ts
```

## Probability algorithm (high level)

1. Detect terminal states with `checkWinner` or full board draw.
2. If terminal, return a single outcome count (win/draw).
3. Otherwise, generate all available moves.
4. Recurse into each move (`simulateGame`) switching players each step.
5. Aggregate raw counts from children.
6. Convert aggregate counts into probabilities in `calculateProbabilities`.
7. Evaluate each legal next move and pick the one maximizing current player's win probability.

### Memoization

A `Map` caches `simulateGame(board, currentPlayer)` results by board+turn key. This avoids recomputing duplicate subtrees and keeps updates fast in the browser.
