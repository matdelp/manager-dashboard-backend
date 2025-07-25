import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FunctionInputDefinitionDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class FunctionInputDefinitionUpdateDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  type: string;
}
