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

      <hr />

      <h2>Child window</h2>

      <iframe
        style={{ border: '1px solid #ccc' }}
        src="/iframe/child"
        height="500"
        width="300"
        title="Iframe Example"
      ></iframe>
    </>
  )
}
