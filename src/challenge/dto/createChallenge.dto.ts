import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CodeDto } from './nestedDto/code.dto';
import { TestDto } from './nestedDto/test.dto';

enum Levels {
  EASY = 'Easy',
  MODERATE = 'Moderate',
  HARD = 'Hard',
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
  @Type(() => CodeDto)
  @IsNotEmpty()
  code: CodeDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestDto)
  @IsNotEmpty()
  test: TestDto[];
}
