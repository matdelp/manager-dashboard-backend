import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CodeText {
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
class FunctionInputDefinition {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class Code {
  @IsString()
  @IsNotEmpty()
  function_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CodeText)
  @IsNotEmpty()
  code_text: CodeText[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FunctionInputDefinition)
  @IsNotEmpty()
  inputs: FunctionInputDefinition[];
}

class FunctionInputValue {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class Test {
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsArray()
  @ValidateNested()
  @Type(() => FunctionInputValue)
  @IsNotEmpty()
  inputs: FunctionInputValue[];

  @IsString()
  @IsNotEmpty()
  outputs: string;
}

export class Submission {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  lang: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  challenge_id: string;

  @IsString()
  @IsNotEmpty()
  coder_id: string;
}
