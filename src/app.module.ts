import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
import { OwnerService } from './owner/owner.service';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [
    // UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_URL'),
        autoLoadEntities: true,
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'), //'root',
        password: configService.get<string>('MYSQL_PASSWORD'), //'test',
        database: configService.get<string>('MYSQL_DATABASE'),

        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // true,
        // ssl:
        //   configService.get<string>('NODE_ENV') === 'production'
        //     ? { rejectUnauthorized: false }
        //     : false,
      }),
      inject: [ConfigService],
    }),
    OwnerModule,
  ],
  controllers: [AppController],
  providers: [AppService, OwnerService],
})
export class AppModule {}