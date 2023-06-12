import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //eng, num
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: "password only accecpt eng and number"
    })
    password: string;
}
