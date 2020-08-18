import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamSchema } from './interfaces/team.interface';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }])],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }])]
})
export class TeamsModule {}
