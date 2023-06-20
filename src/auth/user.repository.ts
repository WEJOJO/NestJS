import { Entity } from "typeorm";
import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {User} from "./user.entity";
import { DataSource, Repository } from "typeorm";
import {AuthCredentialDto} from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';


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

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({username, password : hashedPassword});
        
        try {
            await this.save(user);
        } catch(error)
        {
            if (error.code == 23505)
            {
                throw new ConflictException('Existing username');
            }
            else
            {
                throw new InternalServerErrorException();
            }
        }
    }
    async setCurrentRefreshToken(refreshToken: string, id: number) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.update(id, { currentHashedRefreshToken });
      }
    
    async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
        // const user = await bcrypt.getById(id);
        const user = await this.findOne({
          where: {
            id: id
          }
        })
        const isRefreshTokenMatching = await bcrypt.compare(
          refreshToken,
          user.currentHashedRefreshToken,
        );
    
        if (isRefreshTokenMatching) {
          return user;
        }
      }
    
    //   async removeRefreshToken(id: number) {
    //     return this.usersRepository.update(id, {
    //       currentHashedRefreshToken: null,
    //     });
    //   }
}

