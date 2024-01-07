import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

class CodeDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    code: string;
}
export default CodeDto;