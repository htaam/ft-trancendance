import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import Channel from 'src/entitys/channel.entity';
import User from 'src/entitys/user.entity';
import { Column } from 'typeorm';

//the dtos objects are used just to map the received information in the requests.
class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  email: string;

  avatar: string;

  @IsNotEmpty()
  passwordRepeat: string;

  is2FOn: boolean;

  secret2F: string;

  elo: number;

  displayName: string;

  friends: string[];

  blocked: string[];

  chat: Channel[];

  msgHist: string;

  idWebSocket: string;

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

  socketID: string;

  slot: number;

  isActive: boolean;
}

export default UserRegisterDto;

// {
// 	"password":1234567,
// 	"userName": "amaria-m",
// 	"email":"amaria-m@gmail.com",
// 	"avatar":"bla",
// 	"passwordRepeat":"1234567",
// 	"is2FOn":"false",
// 	"secret2F",
// 	"elo":"0",
// 	"displayName":"antonio",
// 	"friends",
// 	"blocked",
// 	"chat",
// 	"msgHist",
// 	"idWebSocket",
// 	"gameNumber":"0",
// 	"gameWin":"0",
// 	"gameLose":"0",
// 	"winLoseRate":"",
// 	"totalPointGet":"0",
// 	"totalPointTake":"0",
// 	"pointGetTakeRate",
// 	"winStreak":"0",
// 	"gameHist",
// 	"xp":"0",
// 	"totalGame":"0",
// 	"socketID&slot
// }
