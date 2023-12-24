import { Injectable } from "@nestjs/common";
import { Room, User } from '../../../../shared/interfaces/talk.interface'

@Injectable()
export class RoomService {
  private roomList: Room[] = []

  async getRoomByName(roomName: string): Promise<number> {
    const roomId = this.roomList.findIndex((room) => room?.name === roomName)
    return roomId
  }

  async getAdmin(roomName: string): Promise<User> {
    const roomId = await this.getRoomByName(roomName)
    return this.roomList[roomId].admin
  }

  async createRoom(roomName: string, admin: User): Promise<void> {
    const room = await this.getRoomByName(roomName)
  	if (room === -1)
       this.roomList.push({ name: roomName, admin, users: [admin] })
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
      const host = await this.getAdmin(roomName)
    } else {
      await this.createRoom(roomName, user)
    }
  }

  async addNewAdmin(roomName: string): Promise<void | User> {
    const room = await this.getRoomByName(roomName)
    if (this.roomList[room].users.length === 0) {
      await this.removeRoom(roomName)
    } else {
      const sortUsers = [...this.roomList[room].users].sort((a, b) => parseInt(a.id) - parseInt(b.id))
      return sortUsers[0]
    }
  }

  async removeUserFromRoom(toRemoveUserName: string, roomName: string): Promise<void> {
    const room = await this.getRoomByName(roomName)
    this.roomList[room].users = this.roomList[room].users.filter((user) => user.userName !== toRemoveUserName)
    if (this.roomList[room].users.length === 0) {
      await this.removeRoom(roomName)
    } else {
      if (this.roomList[room].admin.userName === toRemoveUserName) {
        this.roomList[room].admin = (await this.addNewAdmin(roomName)) as User;
        // Will need to add an array of admins instead of only one
      }
    }
  }
}
