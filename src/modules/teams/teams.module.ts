import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamSchema } from './schema/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeamSchema.name, schema: TeamSchema.schema },
    ]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [
    MongooseModule.forFeature([
      { name: TeamSchema.name, schema: TeamSchema.schema },
    ]),
  ],
})
export class TeamsModule {}
