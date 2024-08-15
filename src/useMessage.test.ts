import { renderHook, act, fireEvent } from '@testing-library/react'
import useMessage from './useMessage'
import { IPostMessage } from './types'

window.opener = jest.fn()

const message: IPostMessage = { type: 'test', payload: { messsage: 'Hello' } }

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
    const payload = { message: 'sent from friend' }

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
        data: { type: message.type, payload },
        origin: '*'
      })
    )

    expect(result.current.history).toEqual([payload])
  })

  it.skip('should call eventHandler when receiving a matching message', () => {
    const eventHandler = jest.fn()
    const { result } = renderHook(() => useMessage('test', eventHandler))
    const { sendToParent } = result.current

    act(() => {
      sendToParent(message)
    })

    expect(eventHandler).toHaveBeenCalledWith(
      expect.any(Function),
      message.payload.messsage
    )
  })

  it.skip('should send message back to sender when calling sendToParent', () => {
    const { result } = renderHook(() => useMessage('test'))
    const { sendToParent } = result.current

    const mockPostMessage = jest.fn()
    window.opener = { postMessage: mockPostMessage }

    act(() => {
      sendToParent(message)
    })

    expect(mockPostMessage).toHaveBeenCalledWith(
      { type: 'test', payload: 'Hello' },
      window.opener
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
