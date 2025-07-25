import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Levels } from './createChallenge.dto';
import { CodeUpdateDto } from './nestedDto/code.dto';
import { TestUpdateDto } from './nestedDto/test.dto';

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
  @Type(() => CodeUpdateDto)
  @IsOptional()
  code?: CodeUpdateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestUpdateDto)
  @IsOptional()
  test?: TestUpdateDto[];
}
