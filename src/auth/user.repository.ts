import { Entity } from "typeorm";
import {Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import { DataSource, Repository } from "typeorm";
import {AuthCredentialDto} from "./dto/auth-credential.dto";

@Injectable()
export class UserRepository extends Repository<User>
{
    constructor(private dataSource: DataSource)
    {
        super(User, dataSource.createEntityManager());
    }
    async createUser(authCredentialDto : AuthCredentialDto) : Promise<void>
    {
        const {username, password} = authCredentialDto;
        const user = this.create({username, password});
        console.log(username, password);
        console.log(user);
        
        await this.save(user);
    }
}

