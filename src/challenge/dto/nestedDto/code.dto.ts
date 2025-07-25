import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CodeTextDto } from './codeText.dto';
import { FunctionInputDefinitionDto } from './functionInputDefinition.dto';

export class CodeDto {
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
