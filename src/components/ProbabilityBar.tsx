type ProbabilityBarProps = {
  label: string;
  probability: number;
  colorClass: string;
};

export default function ProbabilityBar({ label, probability, colorClass }: ProbabilityBarProps) {
  const percentage = Math.round(probability * 100);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm text-slate-200">
        <span>{label}</span>
        <span className="font-semibold">{percentage}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-700">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
