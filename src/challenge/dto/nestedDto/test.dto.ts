import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  FunctionInputValueDto,
  FunctionInputValueUpdateDto,
} from './functionInputValue.dto';

export class TestDto {
  @IsString()
  @IsOptional()
  _id?: string;

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

export class TestUpdateDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsNumber()
  @IsOptional()
  weight: number;

  @IsArray()
  @ValidateNested()
  @Type(() => FunctionInputValueUpdateDto)
  @IsOptional()
  inputs: FunctionInputValueUpdateDto[];

  @IsString()
  @IsOptional()
  outputs: string;
}
