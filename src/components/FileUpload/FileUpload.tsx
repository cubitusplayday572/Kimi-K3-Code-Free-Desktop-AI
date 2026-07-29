interface Props {
  files: import('../../types').UploadedFile[]
  onAdd: (files: import('../../types').UploadedFile[]) => void
  onRemove: (name: string) => void
}

export function FileUpload({ files, onAdd, onRemove }: Props) {
  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? [])
    const loaded = await Promise.all(list.map(f =>
      new Promise<import('../../types').UploadedFile>(res => {
        const r = new FileReader()
        r.onload = () => res({ name: f.name, size: f.size, type: f.type, content: r.result as string })
        r.readAsText(f)
      })
    ))
    onAdd(loaded)
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '6px 20px', borderBottom: '1px solid #334155' }}>
      {files.map(f => (
        <span key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 6, background: '#1e3a5f', fontSize: 12, color: '#7dd3fc' }}>
          {f.name}
          <button onClick={() => onRemove(f.name)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>×</button>
        </span>
      ))}
      <label>
        <input type="file" multiple style={{ display: 'none' }} onChange={handle} />
        <span style={{ padding: '2px 10px', borderRadius: 6, background: '#0f172a', border: '1px dashed #334155', color: '#94a3b8', fontSize: 12, cursor: 'pointer' }}>
          + Attach files
        </span>
      </label>
    </div>
  )
}