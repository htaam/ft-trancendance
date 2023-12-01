import { atom } from "recoil";
import { IChat, IMessage, IUser } from "./types";

export const userChatsAtom = atom<IChat[]>({
  key: "userChatsAtom",
  default: [],
});

export const userFriendsAtom = atom<string[]>({
  key: "userFriendsAtom",
  default: [],
});

export const allUsersAtom = atom<IUser[]>({
  key: "allUsersAtom",
  default: [],
});

export const selectedChannelAtom = atom<string>({
  key: "selectedChannelAtom",
  default: "",
});

export const channelMessagesAtom = atom<IMessage[]>({
  key: "channelMessagesAtom",
  default: [],
});
