import { Probabilities } from '@/lib/gameEngine';
import ProbabilityBar from './ProbabilityBar';

type ProbabilityPanelProps = {
  probabilities: Probabilities;
  totalGames: number;
};

export default function ProbabilityPanel({ probabilities, totalGames }: ProbabilityPanelProps) {
  return (
    <section className="rounded-2xl bg-panel p-5 shadow-xl">
      <h2 className="text-lg font-bold text-white">Outcome Probabilities</h2>
      <p className="mt-1 text-xs text-slate-400">Enumerated game continuations: {totalGames.toLocaleString()}</p>
      <div className="mt-4 space-y-3">
        <ProbabilityBar label="X win" probability={probabilities.xWin} colorClass="bg-sky-400" />
        <ProbabilityBar label="O win" probability={probabilities.oWin} colorClass="bg-orange-400" />
        <ProbabilityBar label="Draw" probability={probabilities.draw} colorClass="bg-emerald-400" />
      </div>
    </section>
  );
}
