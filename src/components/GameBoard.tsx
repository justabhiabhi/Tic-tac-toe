import { Board } from '@/lib/gameEngine';
import Cell from './Cell';

type GameBoardProps = {
  board: Board;
  onCellClick: (index: number) => void;
  winningLine: number[];
  bestMove: number | null;
  disabled: boolean;
};

export default function GameBoard({ board, onCellClick, winningLine, bestMove, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 rounded-2xl bg-board p-4 shadow-2xl shadow-cyan-900/20">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          disabled={disabled || Boolean(value)}
          isWinningCell={winningLine.includes(index)}
          isBestMove={bestMove === index}
        />
      ))}
    </div>
  );
}
