import { Controller, Get, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { IStatistic } from './interfaces/statistic.interface';
import { routes } from '../../constants';
import { ParseObjectIdPipe } from '../../pipes';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatisticDto } from './dto/statistic.dto';

@ApiTags(routes.statistic.title)
@Controller(routes.statistic.url)
export class StatisticController {
  constructor(public readonly statisticService: StatisticService) {}

  @Get()
  @ApiOkResponse({
    description: 'Teams statistic.',
    type: [StatisticDto],
  })
  async getStatistic(): Promise<IStatistic[]> {
    return this.statisticService.getStatistic();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Team statistic.',
    type: StatisticDto,
  })
  async getTeamStatistic(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<IStatistic> {
    return this.statisticService.getTeamStatistic(id);
  }
}
