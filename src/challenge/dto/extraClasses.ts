import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsString()
  @IsNotEmpty()
  code_text: string;

  @ValidateNested()
  @Type(() => FunctionInputDefinition)
  @IsNotEmpty()
  inputs: FunctionInputDefinition;
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

  @ValidateNested()
  @Type(() => FunctionInputValue)
  @IsNotEmpty()
  inputs: FunctionInputValue;
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
