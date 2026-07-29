import './ContextBar.css'

interface Props { used: number; limit: number }

function fmt(n: number): string {
  return n >= 1_000_000 ? `${(n/1_000_000).toFixed(2)}M` : n >= 1000 ? `${(n/1000).toFixed(0)}K` : String(n)
}

export function ContextBar({ used, limit }: Props) {
  const pct   = Math.min((used / limit) * 100, 100)
  const color = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#22c55e'
  return (
    <div className="ctx-bar">
      <div className="ctx-bar__rail">
        <div className="ctx-bar__fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="ctx-bar__label" style={{ color }}>{fmt(used)} / {fmt(limit)}</span>
    </div>
  )
}