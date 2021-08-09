# React hook: Message event

A hook to monitor messages incoming and also allow you to post out.
Utilising and simplifing the WebAPI for [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) and [Window: message event](https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event)

## Install

```
npm i @rottitime/react-hook-message-event
```

## Usage

The two main ways to use this hook is to listen to incoming messages or post out your own messages.

### Lisening to messages from other windows

Import the hook in your component file

```js
import useMessage from "@rottitime/react-hook-message-event";
```

The hook `useMessage` takes two arguments. The first is the name of the event you want to listen to. The second is a optional callback which can be fired once a message has been recieved

The callback provides two arguments. As per the example below

1. `send` can be used to ping a message back to the source
2. `payload` gives you the data that was sent by the source

```js
const ExampleComponent = () => {
  //Listen for the message 'authenticate' and then fire a callback
  useMessage("authenticate", (send, payload) => {
    send({ type: "authenticate", success: true });
  });

  return <div>Hellow world</div>;
};
```

### Send a message to parent window

```js
import useMessage from "@rottitime/react-hook-message-event";
```

In the example below, we are sending the message 'Hellow world' to the parent window

```js
const ExampleComponent = () => {
  //Listen for the message 'authenticate' and then fire a callback
  const { sendToParent } = useMessage();
  sendToParent("authenticate");
  return <div>Hellow world</div>;
};
```
