import { Room, User } from '../interfaces/talk.interface';
export declare class RoomService {
    private roomList;
    getRoomList(): Promise<Room[]>;
    getRoomByName(roomName: string): Promise<number>;
    getRoomByUserName(userName: string): Promise<Room[]>;
    getHost(roomName: string): Promise<User>;
    createRoom(roomName: string, host: User, admins: User): Promise<void>;
    removeRoom(roomName: string): Promise<void>;
    addUserToRoom(roomName: string, user: User): Promise<void>;
    addNewHost(roomName: string): Promise<void | User>;
    removeFromAdmins(userToRemove: string, roomName: string): Promise<void>;
    removeUserFromRoom(socketId: string, roomName: string): Promise<void>;
    removeUserFromAllRooms(socketId: string): Promise<void>;
}
