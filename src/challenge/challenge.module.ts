import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengesService } from './challenge.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from 'src/schemas/manager.schema';
import { Challenge, ChallengeSchema } from 'src/schemas/challenge.schema';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengesService],
  exports: [],
  imports: [
    MongooseModule.forFeature([
      { name: Manager.name, schema: ManagerSchema },
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
  ],
})
export class ChallengeModule {}
