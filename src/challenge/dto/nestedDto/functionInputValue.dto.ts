import { IsNotEmpty, IsString } from 'class-validator';

export class FunctionInputValueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
