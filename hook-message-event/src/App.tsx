import React from 'react';
import Message from './Message'

const App: React.FC = () => <div className="App">
<Message eventName='jatest' />
<Message eventName='hello' />
<button onClick={():void=>{
  window.open('https://example.com/', 'window1');
}}>
  https://example.com/
</button>
</div>

export default App;
