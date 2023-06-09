import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';


@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}
    // constructor(private boardsService: BoardsService) {}
    // @Get()
    // getAllBoard(): Board[]
    // {
    //     return this.boardsService.getAllBoards();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> ///요청의 Body를 받아온다고 이해함.
    {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id') //  -> 동적인 값이 들어오겠다는 뜻으로 일단은 이해...
    getBoardById(@Param('id') id : number) : Promise<Board> ///변경된 url을 기준으로 받아온다고 일단은 이해하였음.
    {
        return this.boardsService.getBoardById(id);
    }
    
    // @Delete('/:id')
    // deleteBoard(@Param('id') id : string) : void
    // {
    //     this.boardsService.deleteBoard(id);
    // }
    
    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id:string,
    //     @Body('status', BoardStatusValidationPipe) status:BoardStatus
    // )
    // {
    //     this.boardsService.updateBoardStatus(id, status);
    // }
}




///////////////////////////////////////////////////////////////////////////
////////////////////////////// before DB add //////////////////////////////
///////////////////////////////////////////////////////////////////////////
// import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
// import { BoardsService } from './boards.service';
// import { BoardStatus } from './board-status.enum';
// import { CreateBoardDto } from './dto/create-board.dto';
// import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';


// @Controller('boards')
// export class BoardsController {
//     constructor(private boardsService: BoardsService) {}
//     @Get()
//     getAllBoard(): Board[]
//     {
//         return this.boardsService.getAllBoards();
//     }

//     @Post()
//     @UsePipes(ValidationPipe)
//     createBoard(@Body() createBoardDto: CreateBoardDto): Board ///요청의 Body를 받아온다고 이해함.
//     {
//         return this.boardsService.createBoard(createBoardDto);
//     }

//     @Get('/:id') //  -> 동적인 값이 들어오겠다는 뜻으로 일단은 이해...
//     getBoardById(@Param('id') id : string) : Board ///변경된 url을 기준으로 받아온다고 일단은 이해하였음.
//     {
//         return this.boardsService.getBoardById(id);
//     }
    
//     @Delete('/:id')
//     deleteBoard(@Param('id') id : string) : void
//     {
//         this.boardsService.deleteBoard(id);
//     }
    
//     @Patch('/:id/status')
//     updateBoardStatus(
//         @Param('id') id:string,
//         @Body('status', BoardStatusValidationPipe) status:BoardStatus
//     )
//     {
//         this.boardsService.updateBoardStatus(id, status);
//     }
// }
