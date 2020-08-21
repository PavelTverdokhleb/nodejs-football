import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamSchema } from './schema/team.schema';
import { MatchesModule } from '../matches';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamSchema.name, schema: TeamSchema.schema },
    ]),
    forwardRef(() => MatchesModule),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [
    MongooseModule.forFeature([
      { name: TeamSchema.name, schema: TeamSchema.schema },
    ]),
    TeamsService,
  ],
})
export class TeamsModule {}
