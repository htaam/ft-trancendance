import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

//the dtos objects are used just to map the received information in the requests.

export class ChangeDisplayNameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  displayName: string;
}

export class ChangeDisplayName {
  @IsNotEmpty()
  @MaxLength(10)
  displayName: string;
}

export class UserId {
  @IsNotEmpty()
  id: string;
}
export class socketId {
  @IsNotEmpty()
  id: string;
}
