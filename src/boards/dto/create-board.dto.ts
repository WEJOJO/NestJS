import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    /// Pipe in Handler Lv
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}