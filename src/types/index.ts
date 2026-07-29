export interface KimiMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  files?: UploadedFile[]
  tokens?: number
  timestamp: Date
}

export interface UploadedFile {
  name: string
  size: number
  type: string
  content: string
}

export interface KimiSession {
  id: string
  title: string
  messages: KimiMessage[]
  totalTokens: number
  contextLimit: number
}

export type KimiModel = 'kimi-k3' | 'kimi-k2.7' | 'kimi-k2.6'