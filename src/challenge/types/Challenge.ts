import { Test } from '@nestjs/testing';
import { Code } from './Code';
import { Submission } from './Submission';

export type Challenge = {
  id: string;
  title: string;
  category: string;
  description: number;
  level: 'Easy' | 'Moderate' | 'Hard';
  code: Code;
  test: Test[];
  submission: Submission[];
};
