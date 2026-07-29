import { useState } from 'react'
import type { KimiMessage, KimiModel, UploadedFile } from './types'

export function useKimiChat(model: KimiModel = 'kimi-k3') {
  const [messages, setMessages] = useState<KimiMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [totalTokens, setTotalTokens] = useState(0)

  const send = async (content: string, files: UploadedFile[] = []) => {
    const msg: KimiMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      files,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, msg])
    setLoading(true)

    try {
      const res = await fetch('/api/kimi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages: [...messages, msg], files }),
      })
      const data = await res.json()
      setTotalTokens(t => t + (data.tokens ?? 0))
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant' as const,
        content: data.content,
        tokens: data.tokens,
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  return {
    messages,
    loading,
    totalTokens,
    send,
    clear: () => { setMessages([]); setTotalTokens(0) },
  }
}