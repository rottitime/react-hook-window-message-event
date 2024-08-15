export type IPostMessage = { type: string; payload: Record<string, unknown> }
export type EventHandler = (
  callback: (data: IPostMessage) => unknown,
  payload: IPostMessage['payload']
) => unknown
