import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "../user.repository";
import {User} from "../user.entity";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt')
{
    
    constructor(
        // @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private readonly configService: ConfigService)
        {
            super({
                secretOrKey: 'Secret1234',
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            })
        }
    async validate(payload : any)
    {
        const user: User = await this.userRepository.findOne({
            where: {
                id: payload.id
            }
        })
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}