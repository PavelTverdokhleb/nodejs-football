import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './schema/match.schema';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { TeamsModule } from '../teams';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MatchSchema.name, schema: MatchSchema.schema },
    ]),
    forwardRef(() => TeamsModule)
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [
    MongooseModule.forFeature([
      { name: MatchSchema.name, schema: MatchSchema.schema },
    ]),
    MatchesService,
  ],
})
export class MatchesModule {}
