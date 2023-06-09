import { DataSource, Repository } from "typeorm";
import {Injectable} from '@nestjs/common';
import { Board } from "./board.entity"; //기존에 만든 인터페이스와 구분할 수 있음.

//!!!   EntityRepository
@Injectable()
export class BoardRepository extends Repository<Board> {
    //!!!   EntityRepository
    constructor(private dataSource: DataSource)
    {
        super(Board, dataSource.createEntityManager());
    }
    //!!!
}

