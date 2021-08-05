import React, { useState } from 'react';
import {useMessageSubscribe} from './hooks/MessageSubscriber'

type Props = {
    eventName: string
}

const Message:React.FC<Props> = ({ eventName }) => {

  const [status, setStatus] = useState<string>();
    
  const { history, sendMessage, origin } = useMessageSubscribe(eventName, (payload: any) => {
    setStatus('triggered update');
    sendMessage({ type: 'reply-back from ' + eventName, payload: 1 });
  });

  return (
    <div>
      <h1>Listening to : {eventName}</h1>
      <p>Origin: {origin}</p>
      <p>Message: {status}</p>
      <p>List:</p>
      <ol>
        {history.map((l,i) => <li key={i}>{l}</li>)}
      </ol>
    </div>
  );
};

export default Message;
