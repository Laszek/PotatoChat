import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from "react";
import './style.css';
import axios from 'axios'
import { io } from 'socket.io-client'
// Import URLs to connections
import {
    SERVER_URL,
    WS_URL
} from '../../data/config'
// Import interfaces
import {
    ServerMessage,
    ChatMessage
} from '../../data/interfaces'
// Import components
import Loading from './components/Loading'
import Message from './components/Message'
import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";
import {
    KeyboardEventHandler
} from "../../../../../../../../Programy/JetBrains/WebStorm 2022.1.1/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";

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
                //selecting response data that fits to ServerMessage type,
                // then getting message from endpoint
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
            socket.off('message');
            socket.off('disconnect');
            socket.disconnect();
        };
    }, [])

    // Initial fetching of chat history and events
    useEffect(() => {
        getChatHistory();

    }, [])


    // Fetch chatlog history
    const getChatHistory = () => {
        setIsLoading(true);
        httpClient.get('/messages')
            .then(response => {
                setResponse(response?.data);
                chatLogRef.current?.scrollTo({ top: chatLogRef.current.scrollHeight });
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    // getting message with specified id
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
                chatLogRef.current?.scrollTo({ top: chatLogRef.current.scrollHeight, behavior: 'smooth' });
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    // Saving changes from input in state
    const handleInputChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setQuestionText(target.value)
    };

    // Sending message on Enter clicked and when Input is focused
    const handleEnterKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter")
            handleSendMessage();
    }

    const prepareQuestion = (qText: string) => {
        let newText = qText.split(' ')
            .filter(e => e.trim().length)
            .join(' ')
            .toLowerCase()

        if(newText[newText.length-1] != "?")
            newText = newText + "?";

        return newText;
    };

    const handleSendMessage = () => {
        setIsLoading(true);
        httpClient.post(SERVER_URL + "/messages", { "content": prepareQuestion(questionText) })
            .then((response) => {
                setQuestionText("");
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="chat__container">
            <Sidebar />
            <div className="chat">
                <div
                    className="chatlog"
                    ref={chatLogRef}
                >
                    { response !== null && response.length > 0
                        ? response.map((msg) =>
                            <Message key={msg.id} message={msg} />
                        )
                        : <p className="chat__info">Write first question...</p>
                    }
                    { isLoading && <Loading/> }
                </div>
                <ChatInput
                    questionText={questionText}
                    onInputChange={handleInputChange}
                    onSendMessage={handleSendMessage}
                    onEnterKeyDown={handleEnterKeyDown}
                />
            </div>
        </div>
    )
}

export default Chat;