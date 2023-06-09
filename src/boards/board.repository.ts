import { DataSource, Repository } from "typeorm";
import {Injectable} from '@nestjs/common';
import { Board } from "./board.entity"; //기존에 만든 인터페이스와 구분할 수 있음.
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

//!!!   EntityRepository
@Injectable()
export class BoardRepository extends Repository<Board> {
    //!!!   EntityRepository
    constructor(private dataSource: DataSource)
    {
        super(Board, dataSource.createEntityManager());
    }
    //!!!
    async createBoard(createBoardDto: CreateBoardDto) : Promise<Board>//
    {
        const {title, description} = createBoardDto;
        const board = this.create ({
            title,
            description,
            status: BoardStatus.PUBLIC,
        })
        await this.save(board);
        return board;
    }
}

