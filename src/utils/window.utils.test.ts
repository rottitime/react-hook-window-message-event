import { IPostMessage } from '../types'
import { postMessage } from './window.utils'

const data: IPostMessage = { type: 'message', payload: { message: 'Hello' } }

const target: MessageEvent['source'] = {
  onstatechange: jest.fn(),
  scriptURL: '',
  state: 'activated',
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  onerror: jest.fn(),
  addEventListener: jest.fn(),
  postMessage: jest.fn()
}

test('postMessage sends message to target', () => {
  postMessage(data, target)
  expect(target.postMessage).toHaveBeenCalledWith(data, { targetOrigin: '*' })
})

test('postMessage sends message with specified origin', () => {
  const origin = 'https://example.com'
  postMessage(data, target, origin)
  expect(target.postMessage).toHaveBeenCalledWith(data, { targetOrigin: origin })
})
