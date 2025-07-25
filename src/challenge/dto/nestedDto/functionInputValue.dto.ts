import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FunctionInputValueDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class FunctionInputValueUpdateDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  value: string;
}
