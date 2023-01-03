import { ChangeEvent, useEffect, useRef, useState } from "react";
import './style.css';
import axios from 'axios'
import { io } from 'socket.io-client'
// Import URLs to connections
import {
    SERVER_URL,
    WS_URL
} from '../../config'
// Import interfaces
import {
    ServerMessage,
    ChatMessage
} from '../../data/interfaces'
// Import components
import Loading from './components/Loading'
import Message from './components/Message'

// setting up axios to http connection
const httpClient = axios.create({
    baseURL: `${ SERVER_URL }`,
})

// setting up socket.io
const socket = io(WS_URL);

const Chat = () => {
    const [questionText, setQuestionText] = useState<string>("");

    // connection status states
    const [isConnected, setConnected] = useState(socket.connected);
    const [response, setResponse] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // refs
    const chatLogRef = useRef<HTMLDivElement>(null);

    // socket connection
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected: ' + socket.id)
            setConnected(true);
        });

        // Action when Server send a new Message
        socket.on('message', (...data) =>{
            data.map((item) => {
                if((item as ServerMessage).clientId){
                    getChatMessage(item.message.id)
                }
            })
        })

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

    // Initial fetching of chat history
    useEffect(() => {
        getChatHistory();
    }, [])


    // Fetch chatlog history
    const getChatHistory = () => {
        setIsLoading(true);
        httpClient.get('/messages')
            .then(response => {
                setResponse(response?.data);
                setIsLoading(false);
                chatLogRef.current?.scrollTo({ top: chatLogRef.current.scrollHeight });
            })
    };

    const getChatMessage = (msgId: string) => {
        setIsLoading(true);
        httpClient.get(`/messages/${msgId}`)
            .then(response => {
                setResponse(prevState => [...prevState, {
                    id: response?.data?.id,
                    author: response?.data?.author,
                    date: response?.data?.date,
                    text: response?.data?.text
                }])
                setIsLoading(false);
                chatLogRef.current?.scrollTo({ top: chatLogRef.current.scrollHeight, behavior: 'smooth' });
            })
    };

    const handleInputChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setQuestionText(target.value)
    };

    const prepareQuestion = (qText: string) => {
        let newText = qText.split(' ')
            .filter(e => e.trim().length)
            .join(' ')
            .toLowerCase()

        if(newText[newText.length-1] != "?")
            newText = newText + "?";

        return newText;
    };

    const onSendMessage = () => {
        setIsLoading(true);
        httpClient.post(SERVER_URL + "/messages", { "content": prepareQuestion(questionText) })
            .then((response) => {
                console.log(response)
                setIsLoading(false)
                setQuestionText("");
            })
            .catch((error) => {
                console.warn(error)
            })


    }

    return (
        <div className="chat__container">
            <div className="sidebar">
                <div className="sidebar__logo"><img src="./logo.png" alt="logo"/></div>
            </div>
            <div className="chat">
                <div className="chatlog" ref={chatLogRef}>
                    { response !== null && response.length > 0
                        ? response.map((msg) =>
                            <Message key={msg.id} message={msg} />
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
                    <button onClick={ onSendMessage }>Wyślij</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;