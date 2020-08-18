import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './interfaces/match.interface';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }]),
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }])]
})
export class MatchesModule {}
