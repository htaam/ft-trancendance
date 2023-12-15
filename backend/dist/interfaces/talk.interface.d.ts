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
    chat: (e: Message) => void;
}
export interface ClientToServerEvents {
    chat: (e: Message) => void;
}
