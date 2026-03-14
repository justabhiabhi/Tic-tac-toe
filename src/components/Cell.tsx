import { CellValue } from '@/lib/gameEngine';
import clsx from 'clsx';

type CellProps = {
  value: CellValue;
  onClick: () => void;
  disabled: boolean;
  isWinningCell: boolean;
  isBestMove: boolean;
};

export default function Cell({ value, onClick, disabled, isWinningCell, isBestMove }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'relative flex h-24 w-24 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-4xl font-extrabold shadow-md transition-all duration-200 sm:h-28 sm:w-28',
        {
          'cursor-not-allowed opacity-70': disabled,
          'hover:scale-105 hover:border-cyan-400': !disabled,
          'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950': isWinningCell,
          'border-violet-400/80 shadow-violet-500/30': isBestMove && !value,
        },
      )}
      aria-label={value ? `Cell ${value}` : 'Empty cell'}
    >
      {isBestMove && !value && (
        <span className="absolute -top-2 right-2 rounded bg-violet-500 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          Best
        </span>
      )}
      {value && (
        <span className={clsx('animate-popIn', value === 'X' ? 'text-accentX' : 'text-accentO')}>{value}</span>
      )}
    </button>
  );
}
