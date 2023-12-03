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

export const userInformation = atom({
  key: "userInformation",
  default: {
      firstName: "",
      lastName: "",
      id: 0,
      picture: "",
      nickName: "",
      username: "",
      bio: "",
      isTwoFacAuthEnabled: false,
      isTwoFacAuthVerified: false,
      game: {
          stats: {
              games: 0,
              loses: 0,
              wins: 0
          },
          matchesHistory: [
              {
              opponentStatus: "",
              opponentImgUrl: "",
              opponentNickname: "",
              result: "",
              score: "",
              time: "",
              userId: 0,
              gameMode: "",
          }
      ]


      }


  }
})

export const twoFAEnabled = atom({
  key:"twoFAEnabled",
  default:false
})

export const selectedChannelAtom = atom<string>({
  key: "selectedChannelAtom",
  default: "",
});

export const channelMessagesAtom = atom<IMessage[]>({
  key: "channelMessagesAtom",
  default: [],
});

export const inviterUser = atom({
  key: "inviterUser",
  default: ""
})


export const userStatus = atom({
  key:"userStatus",
  default:true
})