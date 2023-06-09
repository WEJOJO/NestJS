import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : '127.0.0.1', //127.0.0.1 ''' , localhost
    port : 5432,
    username : 'nhwang',
    password : 'postgres',
    database: 'board_app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}