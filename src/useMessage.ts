import { useCallback, useEffect, useRef, useState } from 'react'
import { IPostMessage, EventHandler } from './types'

const postMessage = (data: IPostMessage, target: MessageEvent['source'], origin = '*') =>
  target?.postMessage(data, { targetOrigin: origin })

/**
 * It listens for a specific message type, and when it receives it, it calls the event handler with the
 * message payload and a function to send a message back to the sender
 * @param {string} watch - string
 * @param {EventHandler} eventHandler - This is the function that will be called when the event is
 * triggered.
 * @returns An object with two properties: history and sendToParent.
 */
const useMessage = (watch: string, eventHandler?: EventHandler) => {
  const [history, setHistory] = useState<IPostMessage[]>([])
  const [origin, setOrigin] = useState<string>()
  const [source, setSource] = useState<MessageEvent['source'] | null>(null)

  const originRef = useRef<string>()
  const sourceRef = useRef<MessageEvent['source']>(null)

  originRef.current = origin
  sourceRef.current = source as MessageEvent['source']

  const sendToSender = (data: IPostMessage) =>
    postMessage(data, sourceRef.current, originRef.current)

  const sendToParent = (data: IPostMessage) => {
    const { opener } = window
    if (!opener) throw new Error('Parent window has closed')
    postMessage(data, opener)
  }

  const onWatchEventHandler = useCallback(
    ({ origin, source, data }: MessageEvent) => {
      const { type, payload } = data
      if (type === watch) {
        setSource(source)
        setOrigin(origin)
        setHistory((old) => [...old, payload])
        if (typeof eventHandler === 'function') eventHandler(sendToSender, payload)
      }
    },
    [watch, eventHandler, setSource, setOrigin]
  )

  useEffect(() => {
    window.addEventListener('message', onWatchEventHandler)
    return () => window.removeEventListener('message', onWatchEventHandler)
  }, [watch, source, origin, onWatchEventHandler])

  return { history, sendToParent }
}

export default useMessage
