import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeModule } from './challenge/challenge.module';
import { ChallengeController } from './challenge/challenge.controller';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI!), ChallengeModule],
  controllers: [AppController, ChallengeController],
  providers: [AppService],
})
export class AppModule {}
