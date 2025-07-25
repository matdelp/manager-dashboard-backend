import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CodeDto } from './nestedDto/code.dto';
import { TestDto } from './nestedDto/test.dto';

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
  @Type(() => CodeDto)
  @IsOptional()
  code?: CodeDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestDto)
  @IsOptional()
  test?: TestDto[];
}
