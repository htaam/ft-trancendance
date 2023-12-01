export interface IMessage {
  id: number;
  date: Date;
  sender: IUser;
  content: string;
  channel: IChat;
}

export interface IUser {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  avatar: string;
  friends: string[];
  channels: IChat[];
  msgHist: string;
  gameNumber: number;
  gameWin: number;
  gameLose: number;
  winLoseRate: string;
  totalPointGet: number;
  totalPointTake: number;
  pointGetTakeRate: string;
  winStreak: number;
  gameHist: string;
  xp: number;
  totalGame: number;
  isActive: boolean;
}

export interface IChat {
  id: number;
  displayName: string;
  type: "personal" | "private" | "public";
  avatar: string;
  members: IUser[];
  creator: string;
  admins: string[];
  blocked: string[];
  history: IMessage[];
}
