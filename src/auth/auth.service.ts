import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    //async 
    async signUp(authCredentialDto : AuthCredentialDto) : Promise<void>
    {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto : AuthCredentialDto) : Promise<{accessToken: string}>
    {
        const {username , password} = authCredentialDto;
        const user = await this.userRepository.findOne({
            where: {
                username: username,
            },
        });

        if (user && (await bcrypt.compare(password, user.password)))
        {
            //user token create (secret + payload)
            const payload = {username};
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken }; // return obj
        }
        else
        {
            throw new UnauthorizedException('login failed');
        }
    }

    /////////////
    getCookieWithJwtAccessToken(id: number) {
        const payload = { id };
        const token = this.jwtService.sign(payload, {
          secret: 'Secret1234',
          expiresIn: 60*60,
        });
        return {
          accessToken: token,
          domain: '127.0.0.1',
        //   path: '/',
          httpOnly: true,
          maxAge: 60 * 60 // expiresIn과 동일
        };
      }
    
    getCookieWithJwtRefreshToken(id: number) {
        const payload = { id };
        const token = this.jwtService.sign(payload, {
          secret: 'Secret1234',
          expiresIn: 10000,
        });
    
        return {
          refreshToken: token,
          domain: '127.0.0.1',
        //   path: '/',
          httpOnly: true,
          maxAge: 10000
        };
      }
    
    //   getCookiesForLogOut() {
    //     return {
    //       accessOption: {
    //         domain: 'localhost',
    //         path: '/',
    //         httpOnly: true,
    //         maxAge: 0,
    //       },
    //       refreshOption: {
    //         domain: 'localhost',
    //         path: '/',
    //         httpOnly: true,
    //         maxAge: 0,
    //       },
    //     };
    //   }
}
