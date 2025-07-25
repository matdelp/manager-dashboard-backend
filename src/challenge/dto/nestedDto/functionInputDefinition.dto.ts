import { IsNotEmpty, IsString } from 'class-validator';

export class FunctionInputDefinitionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
