import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FunctionInputValueDto } from './functionInputValue.dto';

export class TestDto {
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsArray()
  @ValidateNested()
  @Type(() => FunctionInputValueDto)
  @IsNotEmpty()
  inputs: FunctionInputValueDto[];

  @IsString()
  @IsNotEmpty()
  outputs: string;
}
