import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'
import { SERVER_URL } from './config'
import { io } from 'socket.io-client'

interface ChatMessage {
  content: string
}

const httpClient = axios.create({
  baseURL: `${SERVER_URL}`,
})

const socket = io(SERVER_URL)

function App() {
  const [response, setResponse] = useState<ChatMessage[] | null>(null);
  const [isConnected, setConnected] = useState(socket.connected)

  useEffect(() => {
    httpClient.get('/messages')
    console.log(socket.id)
    socket.on('connect', () => {
      console.log('connected')
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('disconnected')
      setConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" className="App-logo" alt="logo" />
        { response ? response.map((message) => <p key={message.content}>{message.content}</p>) : <p>Loading...</p> }
      </header>
    </div>
  );
}

export default App;
