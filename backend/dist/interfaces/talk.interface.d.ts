export interface User {
    id: string;
    userName: string;
    socketId: string;
}
export interface Room {
    name: string;
    host: User;
    users: User[];
    admins: User[];
}
export interface Message {
    sender: User;
    date: string;
    content: string;
    roomName: string;
}
export interface ServerToClientEvents {
    talk: (e: Message) => void;
}
export interface ClientToServerEvents {
    talk: (e: Message) => void;
    joinRoom: (e: {
        user: User;
        roomName: string;
    }) => void;
}
