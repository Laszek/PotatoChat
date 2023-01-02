import { ChangeEvent, useEffect, useState } from "react";
import './style.css';
import { SERVER_URL, WS_URL } from '../../config'
import axios from 'axios'
import { io } from 'socket.io-client'

import Loading from './components/Loading'

// Injecting chat message interface
interface ChatMessage {
    id: number,
    author: string,
    date: string,
    text: string
}

// setting up axios to http connection
const httpClient = axios.create({
    baseURL: `${ SERVER_URL }`,
})

// setting up socket.io
const socket = io(WS_URL);

const Chat = () => {
    const [response, setResponse] = useState<ChatMessage[]>([]);
    const [isConnected, setConnected] = useState(socket.connected);
    const [questionText, setQuestionText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Initial fetching of chat history
    useEffect(() => {
        httpClient.get('/answers').then(response => {
            console.log(response.data)
        })
    }, [])

    // socket connection
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected: ' + socket.id)
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
    }, [socket])

    useEffect(() => {
        getChatHistory();
    }, [])

    const getChatHistory = () => {
        setIsLoading(true);
        httpClient.get('/messages')
            .then(response => {
                setResponse(response.data);
                console.log(response.data);
                setIsLoading(false);
            })
    }

    const handleInputChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setQuestionText(target.value)
    }

    const sendMessage = () => {
        if (response !== null)
            setResponse(prevState => [...prevState, {
                id: 1,
                author: "Anonymous",
                date: new Date().toISOString(),
                text: questionText
            }])
        else
            setResponse([{ id: 1, author: "Anonymous", date: new Date().toISOString(), text: questionText }])

        httpClient.post(SERVER_URL + "/messages", { "content": questionText })
            .then((response) => {
                console.log(response)
                getChatHistory();
            })
    }

    return (
        <div className="chat__container">
            <div className="sidebar">
                <div className="sidebar__logo"><img src="./logo.png" alt="logo"/></div>
            </div>
            <div className="chat">
                <div className="chatlog">
                    { response !== null && response.length > 0
                        ? response.map((message) =>
                            <div
                                key={ message?.id }
                                className={ message?.author == "PotatoChat" ? "chat__message--answer" : "chat__message" }
                            >
                                <div>
                                    <p className="author">{ message?.author }</p>
                                    <p>{ message?.text }</p>
                                </div>
                                <p className="date">
                                    { new Date(message?.date).toLocaleDateString() } { new Date(message?.date).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }) }
                                </p>
                            </div>
                        )
                        : <p className="chat__info">Write first question...</p> }
                    { isLoading && <Loading/> }
                </div>
                <div className="chat__input">
                    <input
                        type="text"
                        placeholder="Ask something..."
                        onChange={ (e) => handleInputChange(e) }
                        value={ questionText }
                    />
                    <button onClick={ sendMessage }>Wyślij</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;