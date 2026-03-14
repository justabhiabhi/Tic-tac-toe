'use client';

import { useMemo, useState } from 'react';
import BestMoveIndicator from '@/components/BestMoveIndicator';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import MoveHistory from '@/components/MoveHistory';
import ProbabilityPanel from '@/components/ProbabilityPanel';
import {
  Board,
  Player,
  calculateProbabilities,
  checkWinner,
  getNextPlayer,
} from '@/lib/gameEngine';

type Move = {
  player: Player;
  index: number;
};

const emptyBoard: Board = Array(9).fill(null);

export default function HomePage() {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [history, setHistory] = useState<Move[]>([]);

  const winnerInfo = useMemo(() => checkWinner(board), [board]);
  const isDraw = !winnerInfo && board.every((cell) => cell !== null);
  const gameFinished = Boolean(winnerInfo) || isDraw;
  const currentPlayer = getNextPlayer(board);

  const analysis = useMemo(() => calculateProbabilities(board), [board]);

  const handleCellClick = (index: number) => {
    if (board[index] || gameFinished) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;

    setBoard(nextBoard);
    setHistory((previous) => [...previous, { player: currentPlayer, index }]);
  };

  const handleReset = () => {
    setBoard(emptyBoard);
    setHistory([]);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-8">
      <header className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Tic Tac Toe Probability Analyzer</h1>
        <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
          Two-player Tic Tac Toe with full game-tree analytics. After every move, the app explores all possible
          continuations and updates the probability of X winning, O winning, or a draw.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[auto_320px]">
        <div className="space-y-4">
          <div className="rounded-2xl bg-panel p-4 shadow-xl">
            <p className="text-sm text-slate-300">
              {winnerInfo
                ? `Winner: ${winnerInfo.winner}`
                : isDraw
                  ? 'Game ended in a draw.'
                  : `Current turn: ${currentPlayer}`}
            </p>
            <div className="mt-2">
              <BestMoveIndicator
                bestMove={analysis.bestMove}
                currentPlayer={currentPlayer}
                disabled={gameFinished}
              />
            </div>
          </div>

          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            winningLine={winnerInfo?.line ?? []}
            bestMove={analysis.bestMove}
            disabled={gameFinished}
          />
        </div>

        <ProbabilityPanel probabilities={analysis.probabilities} totalGames={analysis.counts.total} />
      </section>

      <section className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        <MoveHistory moves={history} />
        <GameControls onReset={handleReset} />
      </section>
    </main>
  );
}
