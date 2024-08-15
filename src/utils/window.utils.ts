import { IPostMessage } from '../types'

export const postMessage = (
  data: IPostMessage,
  target: MessageEvent['source'],
  origin = '*'
) => {
  console.log('postMessage', data, target, origin)
  return target?.postMessage(data, { targetOrigin: origin })
}
