// import { IChat, IMessage, IUser } from "./types";
// import { socket } from "../App";

// // USERS

// // get all users
// export async function getUserChannels(userName: string) {
//   console.log(`asking backend for the user ${userName} channels.`);
//   return await socket.send<IChat[]>("getUserChannels", userName);
// }

// export async function getUserFriends(userName: string) {
//   console.log(`asking backend for the user ${userName} friends.`);
//   return await socket.send<string[]>("getUserFriends", userName);
// }

// export async function getAllUsers() {
//   console.log(`asking backend for all users`);
//   return await socket.send<IUser[]>("getAllUsers", null);
// }

// export async function addFriend(friend: string, currentUser: string) {
//   console.log(`asking backend to add friend to user friendsList`);
//   return await socket.send<string[]>("addFriend", { currentUser, friend });
// }

// export async function removeFriend(friend: string, currentUser: string) {
//   console.log(`asking backend to remove friend from user friendsList`);
//   return await socket.send<string[]>("removeFriend", { currentUser, friend });
// }

// export async function addingMembers(type: "add" | "rmv", member: string) {
//   return await socket.send<string[]>("addingMembers", { type, member });
// }

// export async function createChannel(
//   displayName: string,
//   type: string,
//   members: string[],
//   creator: string
// ) {
//   const avatar = "no avatar";
//   console.log(`asking backend to create channel`);
//   return await socket.send<string[]>("createChannel", {
//     creator,
//     displayName,
//     avatar,
//     members,
//     type,
//   });
// }

// export async function getChannelMessages(channel: string, userName: string) {
//   return await socket.send<IMessage[]>("getChannelMessages", {
//     channel,
//     userName,
//   });
// }

// export async function sendMessage(
//   channel: string,
//   userName: string,
//   content: string
// ) {
//   return await socket.send<IMessage>("sendMessage", {
//     channel,
//     userName,
//     content,
//   });
// }
