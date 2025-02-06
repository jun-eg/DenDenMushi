import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  body: string;
}
