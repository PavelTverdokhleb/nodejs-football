import { Controller, Get, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { IStatistic } from './interfaces/statistic.interface';

@Controller('statistic')
export class StatisticController {
  constructor(public readonly statisticService: StatisticService) {}

  @Get()
  async getStatistic(): Promise<IStatistic[]> {
    return this.statisticService.getStatistic();
  }

  @Get(':team')
  async getTeamStatistic(@Param('team') team: string): Promise<IStatistic> {
    return this.statisticService.getTeamStatistic(team);
  }
}
