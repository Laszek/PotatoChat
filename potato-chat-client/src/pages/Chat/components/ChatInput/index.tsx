import './style.css'
import { ChangeEvent, KeyboardEvent } from "react";

interface Props {
    questionText: string,
    onInputChange: (e: ChangeEvent)=>void,
    onSendMessage: ()=>void,
    onEnterKeyDown: (e: KeyboardEvent<HTMLInputElement>)=>void
}

const ChatInput: React.FC<Props> = (
    { questionText,
        onInputChange,
        onSendMessage,
        onEnterKeyDown }
) => {
    return (
        <div className="chat__input">
            <input
                type="text"
                placeholder="Ask something..."
                onChange={ (e) => onInputChange(e) }
                value={ questionText }
                onKeyDown={onEnterKeyDown}
            />
            <button onClick={ onSendMessage } className="send-button">
                <img src="./icons/send-icon.png" alt="send" />
            </button>
        </div>
    )
}

export default ChatInput;