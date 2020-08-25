import { Controller, Get, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { IStatistic } from './interfaces/statistic.interface';
import { routes } from '../../constants';
import { ParseObjectIdPipe } from '../../pipes';

@Controller(routes.statistic)
export class StatisticController {
  constructor(public readonly statisticService: StatisticService) {}

  @Get()
  async getStatistic(): Promise<IStatistic[]> {
    return this.statisticService.getStatistic();
  }

  @Get(':id')
  async getTeamStatistic(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<IStatistic> {
    return this.statisticService.getTeamStatistic(id);
  }
}
