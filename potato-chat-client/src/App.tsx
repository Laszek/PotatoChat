import React, { useEffect, useState } from 'react'
import './App.css';

import Home from './pages/Home'
import Chat from './pages/Chat'

function App() {
  const [isChatOpened, setIsChatOpened] = useState<boolean>(false);

  return (
    <div className="App">
      {isChatOpened ? <Chat /> : <Home onJoinToChat={()=> setIsChatOpened(true)} />}
    </div>
  );
}

export default App;
