export interface User {
    id: string;
    userName: string;
}

export interface Message {
    sender: User;
    date: string;
    content: string;
}

export interface ServerToClientEvents {
    talk: (e: Message) => void;
}

export interface ClientToServerEvents {
    talk:(e: Message) => void;
}