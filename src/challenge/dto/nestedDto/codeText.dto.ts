import { IsNotEmpty, IsString } from 'class-validator';

export class CodeTextDto {
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
