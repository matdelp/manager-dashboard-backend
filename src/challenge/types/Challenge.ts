import { Test } from '@nestjs/testing';
import { Code } from './Code';
import { Submission } from './Submission';

export type Challenge = {
  title: string;
  category: string;
  description: string;
  level: 'Easy' | 'Moderate' | 'Hard';
  code: Code;
  test: Test[];
  submission: Submission[];
};

export type ChallengeFromDb = Challenge & {
  id: string;
};
