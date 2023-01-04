import './style.css'
import { ChatMessage } from '../../../../data/interfaces'

interface Props {
    message: ChatMessage;
}

const Message: React.FC<Props> = ({ message }) => {
    return (
        <div
            key={ message?.id }
            className={ message?.author == "PotatoChat" ? "message__container--answer" : "message__container" }
        >
            <div className={ message?.author == "PotatoChat" ? "chat__message--answer" : "chat__message" }>
                <p className="author">{ message?.author }</p>
                <p>{ message?.text }</p>
            </div>
            <p className="date">
                {
                    new Date(message?.date).toLocaleDateString()
                } {
                    new Date(message?.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                }
            </p>
        </div>
    )
}

export default Message;