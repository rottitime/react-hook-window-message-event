# React hook: Message event

A hook to monitor messages incoming and also allow you to post out

## Install

```
npm i @rottitime/react-hook-message-event
```

## Usage

The hook `useMessageSubscribe` takes two arguments. The  first is the name of the event you want to listen to. The second is a callback once the event is recieved 

```js
import React from 'react';
import {useMessageSubscribe} from '@rottitime/react-hook-message-event'


const ExampleComponent = () => {
    
  const { history, sendMessage, origin } = useMessageSubscribe('authenticate', (payload) => {
    //use sendMessage to post back to the sender
    sendMessage({ type: 'authenticate', success: true });
  });

  return (
    <>
      <p>History of messages:</p>
      <ol>
        {history.map((l,i) => <li key={i}>{l}</li>)}
      </ol>
    </>
  );
};

export default ExampleComponent;

```