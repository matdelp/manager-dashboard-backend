import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Code, Submission, Test } from './extraClasses';

enum Levels {
  EASY = 'easy',
  MODERATE = 'moderate',
  HARD = 'hard',
}
export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Levels)
  level: Levels;

  @ValidateNested()
  @Type(() => Code)
  @IsNotEmpty()
  code: Code;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Test)
  @IsNotEmpty()
  test: Test[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Submission)
  @IsNotEmpty()
  submission: Submission[];
}
