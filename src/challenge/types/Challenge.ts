import { Types } from 'mongoose';
import { Code } from './Code';
import { Submission } from './Submission';
import { Test } from './Test';

export type Challenge = {
  title: string;
  category: string;
  description: string;
  level: 'Easy' | 'Moderate' | 'Hard';
  code: Code | Types.ObjectId;
  test: Test[] | Types.ObjectId[];
  submission: Submission[] | Types.ObjectId[];
};

export type ChallengeFromDb = Challenge & {
  _id: Types.ObjectId;
};
