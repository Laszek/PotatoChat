export interface ChatMessage {
    id: number,
    author: string,
    date: string,
    text: string
}

export interface ServerMessage {
    clientId: string,
    message: {type: string, id: string}
}

