import { Injectable } from "@nestjs/common";
import { Room, User } from '../interfaces/talk.interface';

@Injectable()
export class RoomService {
  private roomList: Room[] = []

  async getRoomList(): Promise<Room[]> {
    return this.roomList
  }

  async getRoomByName(roomName: string): Promise<number> {
    const roomId = this.roomList.findIndex((room) => room?.name === roomName)
    return roomId
  }

  async getRoomByUserName(userName: string): Promise<Room[]> {
    const rooms = this.roomList.filter((room) => {
      const found = room.users.find((user) => user.userName === userName)
      if (found) {
        return found
      }
    })
    return rooms
  }

  async getHost(roomName: string): Promise<User> {
    const roomId = await this.getRoomByName(roomName)
    return this.roomList[roomId].host
  }

  async createRoom(roomName: string, host: User, admins: User): Promise<void> {
    const room = await this.getRoomByName(roomName)
  	if (room === -1)
       this.roomList.push({ name: roomName, host, users: [host], admins: [host] })
	}

  async removeRoom(roomName: string): Promise<void> {
    const room = await this.getRoomByName(roomName)
    if (room !== -1)
      this.roomList = this.roomList.filter((room) => room.name !== roomName)
	}

  async addUserToRoom(roomName: string, user: User): Promise<void> {
    const roomId = await this.getRoomByName(roomName)
    if (roomId !== -1) {
      this.roomList[roomId].users.push(user)
      const host = await this.getHost(roomName)
      if (host.id === user.id) {
        this.roomList[roomId].host.socketId = user.socketId
      }
    } else {
      await this.createRoom(roomName, user, user)
    }
  }

  async addNewHost(roomName: string): Promise<void | User> {
    const room = await this.getRoomByName(roomName)
    if (this.roomList[room].users.length === 0) {
      await this.removeRoom(roomName)
    } else if (this.roomList[room].admins.length !== 0) {
      this.roomList[room].host = this.roomList[room].admins[0]
    } else {
      this.roomList[room].host = this.roomList[room].users[0]
      this.roomList[room].host.socketId = this.roomList[room].users[0].socketId
    }
      
  }
  
  async removeFromAdmins(userToRemove: string, roomName: string) : Promise<void> {
    const room = await this.getRoomByName(roomName) 
    this.roomList[room].admins = this.roomList[room].admins.filter((admins) => admins.userName !== userToRemove)
  }

  async removeUserFromRoom(socketId: string, roomName: string): Promise<void> {
    const room = await this.getRoomByName(roomName)
    if (this.roomList[room].host.socketId === socketId) { //if user to remove is the channel host
      await this.addNewHost(roomName); // choose another host
      this.removeFromAdmins(socketId, roomName); // delete from admins list
    }
    this.roomList[room].users = this.roomList[room].users.filter((user) => user.socketId !== socketId)
    if (this.roomList[room].users.length === 0) {
      await this.removeRoom(roomName)
    }
  }

  async removeUserFromAllRooms(socketId: string): Promise<void> {
    const roomList = await this.getRoomByUserName(socketId)
    for(const room of roomList)
      await this.removeUserFromRoom(socketId, room.name)
  }
}


