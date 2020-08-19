import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IEnvironmentVariables } from '../../env.interface';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule, TeamsService } from '../teams';
import { MatchesModule, MatchesService } from '../matches';
import { StatisticModule } from '../statistic';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<IEnvironmentVariables>,
      ) => ({
        dbName: configService.get<string>('DB_NAME'),
        uri: configService.get<string>('DB_CONNECTION'),
        useCreateIndex: true,
      }),
    }),
    HttpModule,
    TeamsModule,
    MatchesModule,
    StatisticModule,
  ],
  controllers: [AppController],
  providers: [AppService, TeamsService, MatchesService],
})
export class AppModule {}
