import { DataSource, Repository } from "typeorm";
import {Injectable} from '@nestjs/common';
import { Board } from "./board.entity"; //기존에 만든 인터페이스와 구분할 수 있음.

@Injectable()
export class BoardRepository extends Repository<Board> {
    // constructor(private dataSource: DataSource)
    // {
    //     super(Board, dataSource.createEntityManager());
    // }
}

