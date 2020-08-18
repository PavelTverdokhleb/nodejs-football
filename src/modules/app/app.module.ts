import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from '../teams';
import { MatchesModule } from '../matches';
import { StatisticModule } from '../statistic';
import { TeamsService } from '../teams';
import { MatchesService } from '../matches';
import { IEnvironmentVariables } from '../../env.interface';

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
      }),
    }),
    HttpModule,
    MatchesModule,
    TeamsModule,
    StatisticModule,
  ],
  controllers: [AppController],
  providers: [AppService, TeamsService, MatchesService],
})
export class AppModule {}
