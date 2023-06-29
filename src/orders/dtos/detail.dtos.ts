import { IsNumber, IsNotEmpty, IsPositive, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetailDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  readonly pizza: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly quantity: number;
}
