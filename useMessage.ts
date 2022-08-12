import { useCallback, useEffect, useRef, useState } from "react";

const postMessage = (
  data: unknown,
  target?: Window,
  origin: string | WindowPostMessageOptions = "*"
) => {
  if (typeof origin === "string") target?.postMessage(data, origin);
  else target?.postMessage(data, origin);
};

export interface SendToParent {
  (data: unknown): void;
}

export type BaseMessageData<D> = { type: string; payload: D };
const useMessage = <D, T extends BaseMessageData<D>>(
  watch: string,
  eventHandler: (cb: SendToParent, d: D) => void
): { history: D[]; sendToParent: SendToParent } => {
  const [history, setHistory] = useState<D[]>([]);
  const [origin, setOrigin] = useState<string | WindowPostMessageOptions>();
  const [source, setSource] = useState<Window>();

  const originRef = useRef<string | WindowPostMessageOptions>();
  const sourceRef = useRef<Window>();

  originRef.current = origin;
  sourceRef.current = source;

  const sendToSender = (data: unknown) =>
    postMessage(data, sourceRef.current, originRef.current);

  const sendToParent = (data: unknown) => {
    const { opener } = window;
    if (!opener) throw new Error("Parent window has closed");
    postMessage(data, opener);
  };

  const onWatchEventHandler = useCallback(
    (event: MessageEvent<T>) => {
      const { type, payload } = event.data;
      if (type === watch) {
        setSource(source);
        setOrigin(origin);
        setHistory((old) => [...old, payload]);
        eventHandler(sendToSender, payload);
      }
    },
    [watch, eventHandler, setSource, setOrigin]
  );

  useEffect(() => {
    window.addEventListener("message", onWatchEventHandler);
    return () => window.removeEventListener("message", onWatchEventHandler);
  }, [watch, source, origin, onWatchEventHandler]);

  return { history, sendToParent };
};

export default useMessage;
