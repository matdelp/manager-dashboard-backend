import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CodeTextDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CodeTextUpdateDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsString()
  @IsOptional()
  content: string;
}
