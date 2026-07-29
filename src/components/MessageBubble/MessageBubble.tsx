import type { KimiMessage } from '../../types'
import './MessageBubble.css'

interface Props { message: KimiMessage }

export function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'
  return (
    <div className={`msg msg--${message.role}`}>
      <div className="msg__bubble">
        {message.files?.length ? (
          <div className="msg__files">
            {message.files.map(f => <span key={f.name} className="msg__file">{f.name}</span>)}
          </div>
        ) : null}
        <div className="msg__text">{message.content}</div>
        {!isUser && message.tokens && (
          <span className="msg__tokens">{(message.tokens / 1000).toFixed(1)}K tokens</span>
        )}
      </div>
    </div>
  )
}