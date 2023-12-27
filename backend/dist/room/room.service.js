"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
let RoomService = class RoomService {
    constructor() {
        this.roomList = [];
    }
    async getRoomList() {
        return this.roomList;
    }
    async getRoomByName(roomName) {
        const roomId = this.roomList.findIndex((room) => room?.name === roomName);
        return roomId;
    }
    async getRoomByUserName(userName) {
        const rooms = this.roomList.filter((room) => {
            const found = room.users.find((user) => user.userName === userName);
            if (found) {
                return found;
            }
        });
        return rooms;
    }
    async getHost(roomName) {
        const roomId = await this.getRoomByName(roomName);
        return this.roomList[roomId].host;
    }
    async createRoom(roomName, host, admins) {
        const room = await this.getRoomByName(roomName);
        if (room === -1)
            this.roomList.push({ name: roomName, host, users: [host], admins: [host] });
    }
    async removeRoom(roomName) {
        const room = await this.getRoomByName(roomName);
        if (room !== -1)
            this.roomList = this.roomList.filter((room) => room.name !== roomName);
    }
    async addUserToRoom(roomName, user) {
        const roomId = await this.getRoomByName(roomName);
        if (roomId !== -1) {
            this.roomList[roomId].users.push(user);
            const host = await this.getHost(roomName);
            if (host.id === user.id) {
                this.roomList[roomId].host.socketId = user.socketId;
            }
        }
        else {
            await this.createRoom(roomName, user, user);
        }
    }
    async addNewHost(roomName) {
        const room = await this.getRoomByName(roomName);
        if (this.roomList[room].users.length === 0) {
            await this.removeRoom(roomName);
        }
        else if (this.roomList[room].admins.length !== 0) {
            this.roomList[room].host = this.roomList[room].admins[0];
        }
        else {
            this.roomList[room].host = this.roomList[room].users[0];
            this.roomList[room].host.socketId = this.roomList[room].users[0].socketId;
        }
    }
    async removeFromAdmins(userToRemove, roomName) {
        const room = await this.getRoomByName(roomName);
        this.roomList[room].admins = this.roomList[room].admins.filter((admins) => admins.userName !== userToRemove);
    }
    async removeUserFromRoom(socketId, roomName) {
        const room = await this.getRoomByName(roomName);
        if (this.roomList[room].host.socketId === socketId) {
            await this.addNewHost(roomName);
            this.removeFromAdmins(socketId, roomName);
        }
        this.roomList[room].users = this.roomList[room].users.filter((user) => user.socketId !== socketId);
        if (this.roomList[room].users.length === 0) {
            await this.removeRoom(roomName);
        }
    }
    async removeUserFromAllRooms(socketId) {
        const roomList = await this.getRoomByUserName(socketId);
        for (const room of roomList)
            await this.removeUserFromRoom(socketId, room.name);
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)()
], RoomService);
//# sourceMappingURL=room.service.js.map