import { renderHook, act, fireEvent } from '@testing-library/react'
import useMessage from './useMessage'
import { IPostMessage } from './types'

window.opener = jest.fn()

const message: IPostMessage = { type: 'test', payload: { messsage: 'Hello' } }
const sendersMessage: IPostMessage['payload'] = { message: 'Hello' }

describe('useMessage', () => {
  it.skip('sends a message', () => {
    jest
      .spyOn(window, 'opener')
      .mockReturnValue({ postMessage: jest.fn() } as unknown as Window & {
        postMessage: jest.Mock
      })
    const { result } = renderHook(() => useMessage('test'))
    const { sendToParent } = result.current

    act(() => {
      window.opener = { postMessage: jest.fn() }
      sendToParent(message)
    })

    expect(window.opener.postMessage).toHaveBeenCalledWith(message, {
      targetOrigin: '*'
    })
  })

  it('Recieved message is stored in history', async () => {
    jest.spyOn(window, 'opener').mockReturnValue({ postMessage: jest.fn() })
    const { result } = renderHook(() => useMessage('test'))
    const { sendToParent } = result.current

    act(() => {
      window.opener = { postMessage: jest.fn() }
      sendToParent(message)
    })

    expect(window.opener.postMessage).toHaveBeenCalledWith(message, {
      targetOrigin: '*'
    })

    fireEvent(
      window,
      new MessageEvent('message', {
        data: { type: message.type, payload: sendersMessage },
        origin: '*'
      })
    )

    expect(result.current.history).toEqual([sendersMessage])
  })

  it('should call eventHandler when receiving a matching message', () => {
    const eventHandler = jest.fn()
    const { result } = renderHook(() => useMessage('test', eventHandler))
    const { sendToParent } = result.current

    act(() => {
      window.opener = { postMessage: jest.fn() }
      sendToParent(message)
    })

    fireEvent(
      window,
      new MessageEvent('message', {
        data: { type: message.type, payload: sendersMessage },
        origin: '*'
      })
    )

    expect(eventHandler).toHaveBeenCalledWith(expect.any(Function), sendersMessage)
  })

  it('should send message back to sender when calling sendToParent', () => {
    const { result } = renderHook(() => useMessage('test'))
    const { sendToParent } = result.current

    const mockPostMessage = jest.fn()
    window.opener = { postMessage: mockPostMessage }

    act(() => {
      sendToParent(message)
    })

    expect(mockPostMessage).toHaveBeenCalledWith(
      { type: 'test', payload: message.payload },
      { targetOrigin: '*' }
    )
  })

  it.skip('should throw an error when parent window is closed', () => {
    const { result } = renderHook(() => useMessage('test'))
    const { sendToParent } = result.current

    const mockOpener = {}
    window.opener = mockOpener

    expect(() => {
      sendToParent(message)
    }).toThrow('Parent window has closed')
  })
})
