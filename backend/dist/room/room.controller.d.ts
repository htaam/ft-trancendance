import { RoomService } from "./room.service";
import { Room } from '../interfaces/talk.interface';
export declare class RoomController {
    private roomService;
    constructor(roomService: RoomService);
    getAllRooms(): Promise<Room[]>;
    getRoom(params: any): Promise<Room>;
}
