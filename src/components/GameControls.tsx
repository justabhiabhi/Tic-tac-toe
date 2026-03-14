type GameControlsProps = {
  onReset: () => void;
};

export default function GameControls({ onReset }: GameControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onReset}
        className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-cyan-400"
      >
        Reset Game
      </button>
    </div>
  );
}
