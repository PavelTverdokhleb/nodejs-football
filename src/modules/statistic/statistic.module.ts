import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { MatchesService, MatchesModule } from '../matches';
import { TeamsModule, TeamsService } from '../teams';

@Module({
  imports: [MatchesModule, TeamsModule],
  controllers: [StatisticController],
  providers: [StatisticService, MatchesService, TeamsService],
  exports: [],
})
export class StatisticModule {}
