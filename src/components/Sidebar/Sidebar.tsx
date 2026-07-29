import React, { useState } from 'react'
import type { KimiSession } from '../../types'

interface Props {
  sessions: KimiSession[]
  activeId: string | null
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
}

export function Sidebar({ sessions, activeId, onSelect, onNew, onDelete }: Props) {
  const [search, setSearch] = useState('')
  const filtered = sessions.filter(s => s.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ width: 240, background: '#0a0f1e', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '14px 12px' }}>
        <button onClick={onNew} style={{ width: '100%', padding: '8px 0', borderRadius: 8, background: '#0284c7', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
          + New chat
        </button>
      </div>
      <div style={{ padding: '0 12px 8px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sessions…"
          style={{ width: '100%', padding: '6px 10px', borderRadius: 8, background: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', fontSize: 12, outline: 'none' }} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
        {filtered.map(s => (
          <div key={s.id} onClick={() => onSelect(s.id)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 10px', borderRadius: 8, marginBottom: 2, cursor: 'pointer',
            background: s.id === activeId ? '#1e293b' : 'transparent',
          }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, color: '#e2e8f0', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{s.title}</div>
              <div style={{ fontSize: 10, color: '#475569' }}>{(s.totalTokens / 1000).toFixed(0)}K tokens</div>
            </div>
            <span onClick={e => { e.stopPropagation(); onDelete(s.id) }} style={{ color: '#475569', fontSize: 16, paddingLeft: 6, cursor: 'pointer' }}>×</span>
          </div>
        ))}
      </div>
    </div>
  )
}