import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable() //다른 nestjs 어디서든 사용할 수 있게 해주는 키워드
export class BoardsService {
    private boards: Board[] = [];


    getAllBoards(): Board[]
    {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) :Board//
    {
        ////////
        // const title = createBoardDto.title;
        // const description = createBoardDto.description;
        // 위와 아래는 같은 문장
        const {title, description} = createBoardDto;
        ////////
        const board: Board = {
            id: uuid(),
            ////////
            // title: title,
            // description: description,
            // 아래와 동일한 문법
            title,
            description,
            ////////
            status: BoardStatus.PUBLIC,
        }
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);
        if (!found)
        {
            //change default msg -> add msg as arg.
            throw new NotFoundException('Can\'t find Board with id -nhwang');
        }
        return found;
    }

    deleteBoard(id: string): void
    {
        const found = this.getBoardById(id); //이미 throw 하므로 한 번더 throw 할 필요는 없기 때문에 구문 추가 없음.
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id : string, status: BoardStatus) : Board 
    {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
