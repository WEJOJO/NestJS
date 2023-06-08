import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';



@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}
    @Get()
    getAllBoard(): Board[]
    {
        return this.boardsService.getAllBoards();
    }

    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Board ///요청의 Body를 받아온다고 이해함.
    {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id : string) : Board ///변경된 url을 기준으로 받아온다고 일단은 이해하였음.
    {
        return this.boardsService.getBoardById(id);
    }
    
    @Delete('/:id')
    deleteBoard(@Param('id') id : string) : void
    {
        this.boardsService.deleteBoard(id);
    }
    
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id:string,
        @Body('status') status:BoardStatus
    )
    {
        this.boardsService.updateBoardStatus(id, status);
    }
}
