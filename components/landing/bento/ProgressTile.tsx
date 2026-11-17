export default function ProgressTile() {
  return (
    <div className="mt-auto flex items-center justify-between">
      <svg viewBox="0 0 120 120" className="bt-ring size-28" style={{ ["--p" as string]: 0.5 }} role="img" aria-label="2 of 4 modules complete">
        <circle className="trk" cx="60" cy="60" r="46" />
        <circle className="val" cx="60" cy="60" r="46" />
      </svg>
      <p className="text-right">
        <span className="block text-5xl font-extrabold tabular-nums tracking-tight text-white">2<span className="text-white/35">/4</span></span>
        <span className="text-sm font-semibold text-white/55">modules done</span>
      </p>
    </div>
  );
}
