export interface User {
    id: string
    userName: string
    socketId: string
}

export interface Room {
    name: string
    admin: User
    users: User[]
    // Probably will need to create an array of admins
}

export interface Message {
    sender: User
    date: string
    content: string
    channelName: string
}

export interface ServerToClientEvents {
    talk: (e: Message) => void
}

export interface ClientToServerEvents {
    talk: (e: Message) => void
    joinChannel: (e: { user: User; channelName: string }) => void
}