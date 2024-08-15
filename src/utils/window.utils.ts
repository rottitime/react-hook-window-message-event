import { IPostMessage } from '../types'

export const postMessage = (
  data: IPostMessage,
  target: MessageEvent['source'],
  origin = '*'
) => target?.postMessage(data, { targetOrigin: origin })
