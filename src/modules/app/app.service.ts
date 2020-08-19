import { HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { TeamsService } from '../teams';
import { MatchesService } from '../matches';
import { ConfigService } from '@nestjs/config';
import * as Utils from '../../utils';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private teamsService: TeamsService,
    private matchesService: MatchesService,
    private configService: ConfigService,
  ) {}

  public async seedData(): Promise<HttpStatus> {
    const data = await this.httpService
      .get(this.configService.get<string>('SEED_URI'))
      .pipe(map(response => response.data))
      .toPromise();
    let teams = [];
    const matches = data.map(
      ({ HomeTeam, AwayTeam, Date, FTHG, FTAG }) => {
        if (!teams.find(t => t.name === HomeTeam)) {
          teams.push({
            id: Utils.generateId(),
            name: HomeTeam,
          });
        }
        if (!teams.find(t => t.name === AwayTeam)) {
          teams.push({
            id: Utils.generateId(),
            name: AwayTeam,
          });
        }
        return {
          id: Utils.generateId(),
          homeTeam: teams.find(t => t.name === HomeTeam),
          awayTeam: teams.find(t => t.name === AwayTeam),
          date: Date,
          homeTeamGoals: FTHG,
          awayTeamGoals: FTAG,
        };
      },
    );
    await this.matchesService.setMatches(matches);
    await this.teamsService.setTeams(teams);
    return HttpStatus.CREATED;
  }
}
