import { Controller, Get, Param } from "@nestjs/common";
import { RoomService } from "./room.service";
import { Room } from '../interfaces/talk.interface';

@Controller()
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('api/rooms')
  async getAllRooms(): Promise<Room[]> {
    return await this.roomService.getRoomList()
  }

  @Get('api/rooms/:room')
  async getRoom(@Param() params): Promise<Room> {
    const roomList = await this.roomService.getRoomList()
    const room = await this.roomService.getRoomByName(params.room)
    return roomList[room]
  }
 }