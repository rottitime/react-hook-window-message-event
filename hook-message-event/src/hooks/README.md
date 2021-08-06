# React hook: Message event

A hook to monitor messages incoming and also allow you to post out

## Install

```
npm i @rottitime/react-hook-message-event
```

## Usage

### Lisening to messages from other windows

Import the hook in your component file

```js
import {useMessageSubscribe} from '@rottitime/react-hook-message-event'
```

The hook `useMessageSubscribe` takes two arguments. The  first is the name of the event you want to listen to. The second is a optional callback which can be fired once a message has been recieved

The callback provides two arguments. As per the example below

1. `send` can be used to ping a message back to the source
2. `payload` gives you the data that was sent by the source


```js
const ExampleComponent = () => {
  //Listen for the message 'authenticate' and then fire a callback
  useMessageSubscribe('authenticate', (send, payload) => {
    send({ type: 'authenticate', success: true });
  });

  return <div>Hellow world</div> 
};
```

### Send a message to parent window

```js
import {useMessageSubscribe} from '@rottitime/react-hook-message-event'
```

In the example below, we are sending the message 'Hellow world' to the parent window

```js
const ExampleComponent = () => {
  //Listen for the message 'authenticate' and then fire a callback
  const {sendToParent} = useMessageSubscribe();
  sendToParent('authenticate')
  return <div>Hellow world</div> 
};

```