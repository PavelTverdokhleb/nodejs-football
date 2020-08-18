import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { MatchesService } from '../matches/matches.service';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [MatchesModule],
  controllers: [StatisticController],
  providers: [StatisticService, MatchesService],
  exports: [],
})
export class StatisticModule {}
