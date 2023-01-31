import useMessage from '@rottitime/react-hook-message-event'
import { useState } from 'react'

export default function ParentPage() {
  const [text, setText] = useState('')

  useMessage('authenticate', (send, payload) => {
    setText((p) => p + '\n' + JSON.stringify(payload))
    //send back to sender a boolean payload
    send({ type: 'authenticate', payload: { success: true } })
  })

  return (
    <>
      <h1>Parent</h1>

      <label htmlFor="output">Output from child</label>
      <textarea
        id="output"
        value={text || 'Awaiting message...'}
        style={{ width: '80%', height: 350, display: 'block' }}
      />

      <hr />

      <h2>Child window</h2>

      <button
        onClick={() => {
          window.open('/child', 'newwindow')
        }}
      >
        Open child window
      </button>
    </>
  )
}
