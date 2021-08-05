import { useState, useEffect, useCallback, useRef } from 'react';

export const useMessageSubscribe = (watch, eventHandler) => {
  const [history, setHistory] = useState([]);
  const [origin, setOrigin] = useState();
  const [source, setSource] = useState()

  const originRef = useRef();
  const sourceRef = useRef();

  originRef.current = origin 
  sourceRef.current = source;
  
  const sendMessage = data => sourceRef.current.postMessage(data, originRef.current);

  const onWatchEventHandler = useCallback(({ origin, source, data }) => {
    const { type, payload } = JSON.parse(data);
    if (type === watch) {
      setSource(source);
      setOrigin(origin);
      setHistory(old => [...old, payload]);
      eventHandler(payload);
    }
    
  }, [watch, eventHandler, setSource, setOrigin]);

  useEffect(() => {
    window.addEventListener('message', onWatchEventHandler);
    return () => window.removeEventListener('message', onWatchEventHandler);
  }, [watch, source, origin, onWatchEventHandler]);
  
  return { history, sendMessage, origin };

};
