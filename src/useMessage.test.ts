import { act, renderHook } from '@testing-library/react'
import { IPostMessage } from './types'
import useMessage from './useMessage'

describe('useMessage', () => {
  const mockEvent = new MessageEvent('message', {
    data: { type: 'test-message', payload: { value: 'hello world' } }
  })

  it('should add payload to history when message with matching type is received', () => {
    const { result } = renderHook(() => useMessage('test-message'))

    expect(result.current.history).toHaveLength(0)

    act(() => {
      window.dispatchEvent(mockEvent)
    })

    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0]).toEqual({
      type: 'test-message',
      payload: { value: 'hello world' }
    })
  })

  it('should call the event handler with the correct arguments when a message is received', () => {
    const mockHandler = jest.fn()
    const { result } = renderHook(() => useMessage('test-message', mockHandler))

    window.dispatchEvent(mockEvent)

    expect(mockHandler).toHaveBeenCalledWith(expect.any(Function), {
      value: 'hello world'
    })
  })

  it('should throw an error if parent window has closed', () => {
    const { result } = renderHook(() => useMessage('test-message'))

    expect(() =>
      result.current.sendToParent({ type: 'test-message', payload: {} })
    ).toThrow('Parent window has closed')
  })

  //   it.skip('should send a message to the sender with the correct arguments', () => {
  //     const { result } = renderHook(() => useMessage('test-message'))
  //     const mockTarget = { postMessage: jest.fn() }
  //     const mockData: IPostMessage = { type: 'test-message', payload: {} }

  //     result.current.sendToSender(mockData, mockTarget)

  //     expect(mockTarget.postMessage).toHaveBeenCalledWith(mockData, expect.any(Object))
  //   })
})
