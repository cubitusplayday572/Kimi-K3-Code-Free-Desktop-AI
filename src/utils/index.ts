export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
  return String(n)
}

export function truncate(s: string, max = 60): string {
  return s.length > max ? s.slice(0, max) + '…' : s
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

export function formatDate(d: Date): string {
  const diff = Date.now() - d.getTime()
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  return d.toLocaleDateString()
}