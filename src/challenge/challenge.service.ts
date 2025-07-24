import { Injectable } from '@nestjs/common';
// import { Dog } from './interfaces/dogs.interface';

@Injectable()
export class ChallengesService {
  private readonly Challenges: Challenge[] = [];
  create(challenge: Challenge) {
    this.Challenges.push(challenge);
  }
  findAll(): Challenge[] {
    return this.Challenges;
  }
}
