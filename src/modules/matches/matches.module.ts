import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './interfaces/match.interface';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { TeamsModule, TeamsService } from '../teams';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }]),
    TeamsModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService, TeamsService],
  exports: [
    MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }]),
  ],
})
export class MatchesModule {}
