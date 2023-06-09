import { DataSource, Repository } from "typeorm";
import {Injectable} from '@nestjs/common';
import { Board } from "./board.entity"; //기존에 만든 인터페이스와 구분할 수 있음.
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { NotFoundException } from '@nestjs/common';
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

    async deleteBoard(id: number): Promise<void>
    {
        const result = await this.delete(id); //이미 throw 하므로 한 번더 throw 할 필요는 없기 때문에 구문 추가 없음.
        console.log('result : ', result);
        
        if (result.affected === 0)
        {
            throw new NotFoundException(`can't find id:${id} -nhwang`);
        }
        // this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    async getBoardById(id: number): Promise <Board> {
        // const found = await this.boardRepository.findOne(id);
        const found = await this.findOne(({
            where: {
                id: id,
            },
        }));
        if (!found)
        {
            //change default msg -> add msg as arg.
            throw new NotFoundException(`Can\'t find Board with id:${id} -nhwang`);
        }
        return found;
    }
}

