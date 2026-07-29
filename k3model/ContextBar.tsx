import React from 'react'

interface Props {
  used: number
  limit: number
}

function formatK(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n)
}

export function ContextBar({ used, limit }: Props) {
  const pct = Math.min((used / limit) * 100, 100)
  const color = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#22c55e'

  return (
    <div style={{ padding: '6px 12px', fontSize: 11, color: '#888' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span>Context used</span>
        <span style={{ color }}>{formatK(used)} / {formatK(limit)}</span>
      </div>
      <div style={{ height: 3, borderRadius: 2, background: '#2a2a2a' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 2, background: color, transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}
