type BestMoveIndicatorProps = {
  bestMove: number | null;
  currentPlayer: 'X' | 'O';
  disabled: boolean;
};

export default function BestMoveIndicator({ bestMove, currentPlayer, disabled }: BestMoveIndicatorProps) {
  if (disabled) {
    return <p className="text-sm text-slate-400">Game finished. No best move suggestion available.</p>;
  }

  if (bestMove === null) {
    return <p className="text-sm text-slate-400">No best move available.</p>;
  }

  const row = Math.floor(bestMove / 3) + 1;
  const col = (bestMove % 3) + 1;

  return (
    <p className="text-sm text-violet-300">
      Suggested move for <span className="font-bold">{currentPlayer}</span>: row {row}, col {col}
    </p>
  );
}
