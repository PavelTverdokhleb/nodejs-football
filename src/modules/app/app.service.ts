import { HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { TeamsService } from '../teams';
import { MatchesService } from '../matches';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private teamsService: TeamsService,
    private matchesService: MatchesService,
  ) {}

  public async seedData(): Promise<HttpStatus> {
    const data = await this.httpService
      .get(this.configService.get<string>('SEED_URI'))
      .pipe(map(response => response.data))
      .toPromise();
    const teams = [];
    const matches = data.map(
      ({ HomeTeam, AwayTeam, Date, FTHG, FTAG, Div }) => {
        if (!teams.find(t => t.name === HomeTeam)) {
          teams.push({
            name: HomeTeam,
            division: Div,
          });
        }
        if (!teams.find(t => t.name === AwayTeam)) {
          teams.push({
            name: AwayTeam,
            division: Div,
          });
        }
        const date = Date.split('/')
          .reverse()
          .join('-');
        return {
          homeTeam: HomeTeam,
          awayTeam: AwayTeam,
          date,
          homeTeamGoals: FTHG,
          awayTeamGoals: FTAG,
        };
      },
    );
    await this.teamsService.setTeams(teams);
    await this.matchesService.setMatches(matches);
    return HttpStatus.CREATED;
  }
}
