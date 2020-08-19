import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './schema/match.schema';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { TeamsModule, TeamsService } from '../teams';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MatchSchema.name, schema: MatchSchema.schema },
    ]),
    TeamsModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService, TeamsService],
  exports: [
    MongooseModule.forFeature([
      { name: MatchSchema.name, schema: MatchSchema.schema },
    ]),
  ],
})
export class MatchesModule {}
