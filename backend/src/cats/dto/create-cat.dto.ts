import { IsString } from 'class-validator'

export class CreateCatDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly eyes: string;

    @IsString()
    readonly color: string[];
}
