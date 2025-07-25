import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CodeTextDto, CodeTextUpdateDto } from './codeText.dto';
import {
  FunctionInputDefinitionDto,
  FunctionInputDefinitionUpdateDto,
} from './functionInputDefinition.dto';

export class CodeDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  function_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CodeTextDto)
  @IsNotEmpty()
  code_text: CodeTextDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FunctionInputDefinitionDto)
  @IsNotEmpty()
  inputs: FunctionInputDefinitionDto[];
}

export class CodeUpdateDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  function_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CodeTextUpdateDto)
  @IsOptional()
  code_text: CodeTextUpdateDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FunctionInputDefinitionUpdateDto)
  @IsOptional()
  inputs: FunctionInputDefinitionUpdateDto[];
}
