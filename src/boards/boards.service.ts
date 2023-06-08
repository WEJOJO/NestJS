import { Injectable } from '@nestjs/common';
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
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void
    {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id : string, status: BoardStatus) : Board 
    {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
