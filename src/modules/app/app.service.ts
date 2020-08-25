import { HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { TeamDto, TeamsService } from '../teams';
import { MatchesService } from '../matches';
import { ConfigService } from '@nestjs/config';
import { MatchDto } from '../matches/dto/match.dto';
import { IBEMatch } from './interfaces/be-match.interface';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private teamsService: TeamsService,
    private matchesService: MatchesService,
  ) {}

    /**
     * Gets data from api and insert new entities into db
     */
  public async seedData(): Promise<HttpStatus> {
    const data = await this.httpService
      .get(this.configService.get<string>('SEED_URI'))
      .pipe(map(response => response.data))
      .toPromise();
    const [matches, teams] = this.parseTeamsAndMatches(data);
    await this.teamsService.setTeams(teams);
    await this.matchesService.setMatches(matches);
    return HttpStatus.CREATED;
  }

    /**
     * Parse teams and matches from api response
     * @data data to parse
     */
  private parseTeamsAndMatches(data: IBEMatch[]): [MatchDto[], TeamDto[]] {
    const teams: TeamDto[] = [];
    const matches: MatchDto[] = data.map(
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
    return [matches, teams];
  }
}
