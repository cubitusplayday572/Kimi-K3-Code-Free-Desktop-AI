import { useState } from 'react'
import type { KimiSession } from '../types'

const KEY = 'kimi_k3_sessions'

export function useSessions() {
  const [sessions, setSessions] = useState<KimiSession[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
  })

  const persist = (s: KimiSession[]) => {
    setSessions(s)
    localStorage.setItem(KEY, JSON.stringify(s))
  }

  const add    = (s: KimiSession)    => persist([s, ...sessions])
  const remove = (id: string)        => persist(sessions.filter(s => s.id !== id))
  const update = (id: string, p: Partial<KimiSession>) =>
    persist(sessions.map(s => s.id === id ? { ...s, ...p } : s))
  const get    = (id: string | null) => sessions.find(s => s.id === id) ?? null

  return { sessions, add, remove, update, get }
}