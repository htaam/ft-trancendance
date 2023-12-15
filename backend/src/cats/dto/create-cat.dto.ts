import { IsString } from 'class-validator'

export class CreateCatDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly eyes: string;

    @IsString({each: true})
    readonly color: string[];
}
