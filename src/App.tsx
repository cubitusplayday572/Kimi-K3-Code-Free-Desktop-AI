import { useState, useRef, useEffect } from 'react'
import { useKimiChat } from './hooks/useKimiChat'
import { ContextBar } from './components/ContextBar/ContextBar'
import { FileUpload } from './components/FileUpload/FileUpload'
import { MessageBubble } from './components/MessageBubble/MessageBubble'
import type { KimiModel, UploadedFile } from './types'
import { MODEL_INFO, APP_CONFIG } from './config/constants'
import './styles/global.css'

export default function App() {
  const [model, setModel]   = useState<KimiModel>('kimi-k3')
  const [input, setInput]   = useState('')
  const [files, setFiles]   = useState<UploadedFile[]>([])
  const endRef              = useRef<HTMLDivElement>(null)
  const { messages, loading, totalTokens, send, clear } = useKimiChat(model)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const submit = () => {
    if (!input.trim() || loading) return
    send(input.trim(), files)
    setInput('')
    setFiles([])
  }

  return (
    <div className="app">
      <header className="app__header">
        <span className="app__title">{APP_CONFIG.name}</span>
        <select
          className="app__model"
          value={model}
          onChange={e => setModel(e.target.value as KimiModel)}
        >
          {Object.entries(MODEL_INFO).map(([id, info]) => (
            <option key={id} value={id}>{info.label} — {info.note}</option>
          ))}
        </select>
        <span className="app__ctx">{(totalTokens / 1000).toFixed(0)}K / 1M</span>
      </header>

      <ContextBar used={totalTokens} limit={APP_CONFIG.contextLimit} />

      <main className="app__messages">
        {messages.length === 0 && (
          <p className="app__empty">
            Paste code, upload files, or describe your task. Kimi K3 handles the full 1M token context.
          </p>
        )}
        {messages.map(m => <MessageBubble key={m.id} message={m} />)}
        {loading && <p className="app__typing">Kimi K3 is thinking…</p>}
        <div ref={endRef} />
      </main>

      <FileUpload
        files={files}
        onAdd={f => setFiles(p => [...p, ...f])}
        onRemove={n => setFiles(p => p.filter(f => f.name !== n))}
      />

      <footer className="app__input">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
          rows={1}
          placeholder="Message Kimi K3…"
          className="app__textarea"
        />
        <button onClick={submit} disabled={loading || !input.trim()} className="btn btn--primary">Send</button>
        {messages.length > 0 && <button onClick={clear} className="btn btn--ghost">Clear</button>}
      </footer>
    </div>
  )
}