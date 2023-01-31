# React hook: Message event

React hook to monitor messages incoming and also allow you to post out.
Utilising and simplifing the WebAPI for [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) and [Window: message event](https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event)

## Demo

View the full working demo: https://react-hook-window-message-event-nrpcttmwv-rottitime.vercel.app/

Full source code for the above exanmple is also available at:

- Parent: https://github.com/rottitime/react-hook-window-message-event/blob/main/example/src/pages/index.tsx
- Child: https://github.com/rottitime/react-hook-window-message-event/blob/main/example/src/pages/child.tsx

## Installation

```
npm i @rottitime/react-hook-message-event
```

## Usage

The two functionalities of this this hook.

1. Listening for messages from other windows or frames
2. Send a message to parent window/iframe

Just ensure you first import your hook into your component.

```js
import useMessage from '@rottitime/react-hook-message-event'
```

### Listening for messages

The hook takes usage of the [Window: message event](https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event) to allow a component to listen for messages from other windows, iframes or tabs

The hook `useMessage` takes two arguments. The first is the name of the event you want to listen to. The second is a optional callback which can be fired once a message has been recieved

The callback provides two arguments. As per the example below

1. `send` can be used to ping a message back to the source
2. `payload` gives you the data that was sent by the source

```js
const ExampleComponent = () => {
  //Listen for the message 'authenticate' and then fire a callback
  useMessage('authenticate', (send, payload) => {
    console.log('I just received : ', payload)
    //send back to sender a boolean payload
    send({ type: 'authenticate', payload: { success: true } })
  })

  return <div>Hellow world</div>
}
```

### Send a message to parent window/iframe

The hook also takes usage of the [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to allow you to post messages to the parent window/tab/iframe.

In the example below, we are sending the message 'Hellow world' to the parent window

```js
const ExampleComponent = () => {
  //Listen for the message 'authenticate' and then fire a callback
  const { sendToParent } = useMessage('authenticate')
  sendToParent({ type: 'authenticate', payload: { message: 'hello world' } })
  return <div>Hello world</div>
}
```
