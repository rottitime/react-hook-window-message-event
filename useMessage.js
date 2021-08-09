import { useState, useEffect, useCallback, useRef } from 'react';

const postMessage = (data, target, origin = '*') => target.postMessage(data, origin);
const useMessage = (watch, eventHandler) => {
  const [history, setHistory] = useState([]);
  const [origin, setOrigin] = useState();
  const [source, setSource] = useState();

  const originRef = useRef();
  const sourceRef = useRef();

  originRef.current = origin; 
  sourceRef.current = source;
  
  const sendToSender = data => postMessage(data, sourceRef.current, originRef.current);

  const sendToParent = data => {
    const { opener } = window;
    if (!opener) throw new Error('Parent window has closed');
    postMessage(data, opener);
  };

  const onWatchEventHandler = useCallback(({ origin, source, data }) => {
    const { type, payload } = data;
    if (type === watch) {
      setSource(source);
      setOrigin(origin);
      setHistory(old => [...old, payload]);
      eventHandler(sendToSender, payload);
    }
    
  }, [watch, eventHandler, setSource, setOrigin]);

  useEffect(() => {
    window.addEventListener('message', onWatchEventHandler);
    return () => window.removeEventListener('message', onWatchEventHandler);
  }, [watch, source, origin, onWatchEventHandler]);
  
  return { history, sendToParent };

};

export default useMessage;