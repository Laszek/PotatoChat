import { useEffect, useState } from "react";
import { SERVER_URL, WS_URL } from '../../config'
import axios from 'axios'
import { io } from 'socket.io-client'

// Injecting chat message interface
interface ChatMessage {
    content: string
}

// setting up axios to http connection
const httpClient = axios.create({
    baseURL: `${SERVER_URL}`,
})

// setting up socket.io
const socket = io(WS_URL);

const Chat = () => {
    const [response, setResponse] = useState<ChatMessage[] | null>(null);
    const [isConnected, setConnected] = useState(socket.connected)

    useEffect(() => {
        console.log(socket.id)
        socket.on('connect', () => {
            console.log('connected: ' + socket.id)
            setConnected(true);
        });

        httpClient.get('/messages').then(response => console.log(response))

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
        <div className="chat">
            <header className="App-header">
                <img src="/logo.png" className="App-logo" alt="logo" />
                { response ? response.map((message) => <p key={message.content}>{message.content}</p>) : <p>Loading...</p> }
            </header>
            <h1>Witaj w Potato Chat!</h1>
        </div>
    )
}

export default Chat;