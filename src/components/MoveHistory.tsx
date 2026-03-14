import { Player } from '@/lib/gameEngine';

type Move = {
  player: Player;
  index: number;
};

type MoveHistoryProps = {
  moves: Move[];
};

export default function MoveHistory({ moves }: MoveHistoryProps) {
  return (
    <section className="rounded-2xl bg-panel p-5 shadow-xl">
      <h2 className="text-lg font-bold text-white">Move History</h2>
      {moves.length === 0 ? (
        <p className="mt-2 text-sm text-slate-400">No moves yet.</p>
      ) : (
        <ol className="mt-3 max-h-56 space-y-1 overflow-auto pr-2 text-sm">
          {moves.map((move, moveIndex) => {
            const row = Math.floor(move.index / 3) + 1;
            const col = (move.index % 3) + 1;
            return (
              <li key={`${move.player}-${move.index}-${moveIndex}`} className="rounded bg-slate-800 px-3 py-2 text-slate-200">
                #{moveIndex + 1} — {move.player} @ row {row}, col {col}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
