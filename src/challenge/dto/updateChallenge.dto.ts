import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Code, Submission, Test } from './extraClasses';

enum Levels {
  EASY = 'easy',
  MODERATE = 'moderate',
  HARD = 'hard',
}
export class UpdateChallengeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Levels)
  level?: Levels;

  @ValidateNested()
  @Type(() => Code)
  @IsOptional()
  code?: Code;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Test)
  @IsOptional()
  test?: Test[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Submission)
  @IsOptional()
  submission?: Submission[];
}
