# Node.js football application

The final task of Node.js course provided by [DigiCode](https://mydigicode.com/) company. Made and maintained by Pavel Tverdokhleb.

## Technologies stack

- Nest.js 7.4.2
- Typescript 3.7.4
- mongoose 5.10
- MongoDB 4.2

## Documentation

*Parse [data](https://api.jsonbin.io/b/5ebb0cf58284f36af7ba1779/1)*

```bash
POST {domain}/seed
```

### Teams

*Get list of teams*

```bash
GET {domain}/teams?team={team_name}
```

*Get team entity*

```bash
GET {domain}/teams/{team_id}
```

*Create team entity*

```bash
POST {domain}/teams

body {
  name: string;
  division: string;
}
```

*Delete team entity*

```bash
DELETE {domain}/teams/{team_id}
```

### Matches

*Get matches list*

```bash
GET {domain}/matches?teams={team_name},{team_name}&date={match_date}
```

*Get match entity*

```bash
GET {domain}/matches/{match_id}
```

*Create match entity*

```bash
POST {domain}/matches

body {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
```

*Update match entity*

```bash
POST {domain}/matches/{match_id}

body {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
```

*Delete match entity*

```bash
DELETE {domain}/matches{match_id}
```

### Statistic

*Get teams statistic*

```bash
GET {domain}/statistic
```

*Get team statistic*

```bash
GET {domain}/statistic/{team_id}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
