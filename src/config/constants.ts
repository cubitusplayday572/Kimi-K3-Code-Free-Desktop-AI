export const APP_CONFIG = {
  name: 'Kimi K3 Code Free Desktop AI',
  version: '1.0.0',
  defaultModel: 'kimi-k3' as const,
  apiEndpoint: '/api/kimi',
  contextLimit: 1_000_000,
  streamEnabled: true,
}

export const STORAGE_KEYS = {
  sessions: 'kimi_k3_sessions',
  settings: 'kimi_k3_settings',
}

export const MODEL_INFO = {
  'kimi-k3':   { label: 'Kimi K3',   note: 'Latest — best coding, SWE-bench 72.1%' },
  'kimi-k2.7': { label: 'Kimi K2.7', note: 'Previous — stable' },
  'kimi-k2.6': { label: 'Kimi K2.6', note: 'API-compatible baseline' },
}