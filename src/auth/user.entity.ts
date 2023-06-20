import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Board } from "src/boards/board.entity";
import { Exclude } from "class-transformer";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    password : string;

    @OneToMany(type=>Board, board=>board.user, {eager:true})
    boards: Board[]

    @Column({ nullable: true })
    @Exclude()
    currentHashedRefreshToken?: string;
    //currentHashedRefreshToken?: string; > 물음표 존재
}