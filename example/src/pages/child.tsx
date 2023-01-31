import useMessage from '@rottitime/react-hook-message-event'
import { useState } from 'react'

export default function ChildPage() {
  const [text, setText] = useState('')
  const { sendToParent } = useMessage('authenticate', (_send, payload) => {
    setText((p) => p + '\n' + JSON.stringify(payload))
  })

  return (
    <div className="App">
      <h1>Child page</h1>

      <p>Output from parent</p>
      <code
        style={{
          width: '80%',
          height: 350,
          display: 'block',
          border: '1px solid #ccc',
          whiteSpace: 'pre'
        }}
      >
        {text || 'Awaiting message...'}
      </code>

      <button
        onClick={() =>
          sendToParent({
            type: 'authenticate',
            payload: { message: 'hello world', date: new Date().toLocaleString() }
          })
        }
      >
        Send message to parent
      </button>
    </div>
  )
}
