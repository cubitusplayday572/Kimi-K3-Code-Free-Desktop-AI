import { useState } from 'react'
import type { UploadedFile } from './types'

interface Props {
  files: UploadedFile[]
  onAdd: (files: UploadedFile[]) => void
  onRemove: (name: string) => void
}

export function FilePanel({ files, onAdd, onRemove }: Props) {
  const [dragging, setDragging] = useState(false)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? [])
    const loaded: UploadedFile[] = await Promise.all(
      list.map(f => new Promise<UploadedFile>(resolve => {
        const reader = new FileReader()
        reader.onload = () => resolve({
          name: f.name,
          size: f.size,
          type: f.type,
          content: reader.result as string,
        })
        reader.readAsText(f)
      }))
    )
    onAdd(loaded)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dt = e.dataTransfer
    if (!dt.files.length) return
    const fakeEvent = { target: { files: dt.files } } as unknown as React.ChangeEvent<HTMLInputElement>
    handleChange(fakeEvent)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        padding: '6px 12px',
        borderBottom: '1px solid #2a2a3a',
        minHeight: 38,
        background: dragging ? '#1a1a3a' : 'transparent',
      }}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      {files.map(f => (
        <div key={f.name} style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '2px 8px', borderRadius: 6,
          background: '#1e3a5f', fontSize: 12, color: '#7dd3fc',
        }}>
          {f.name}
          <span
            onClick={() => onRemove(f.name)}
            style={{ cursor: 'pointer', color: '#94a3b8', marginLeft: 2 }}
          >×</span>
        </div>
      ))}
      <label style={{ cursor: 'pointer' }}>
        <input type="file" multiple style={{ display: 'none' }} onChange={handleChange} />
        <span style={{
          padding: '2px 10px', borderRadius: 6,
          background: '#0f172a', border: '1px dashed #334155',
          color: '#94a3b8', fontSize: 12, cursor: 'pointer',
        }}>
          {dragging ? 'Drop files here' : '+ Attach files'}
        </span>
      </label>
    </div>
  )
}