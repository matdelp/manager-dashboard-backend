import { Injectable, NotFoundException } from '@nestjs/common';
import { Challenge } from './types/Challenge';

@Injectable()
export class ChallengesService {
  private readonly challenges: Challenge[] = [];

  create(challenge: Challenge) {
    this.challenges.push(challenge);
  }

  findAll(): Challenge[] {
    return this.challenges;
  }

  findOne(id: string): Challenge {
    const challenge = this.challenges.find((ch) => ch.id === id);
    if (!challenge) {
      throw new NotFoundException(`Challenge not found`);
    }
    return challenge;
  }
}
