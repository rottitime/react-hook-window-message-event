export type IPostMessage = { type: string; payload: Record<string, any> }
export type EventHandler = (
  callback: (data: IPostMessage) => unknown,
  payload: IPostMessage['payload']
) => unknown
