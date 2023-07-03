import {
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Size from '../../menu/enums/size.enum';

export class CreateCustomizedDto {
  @IsEnum(Size)
  @IsNotEmpty()
  @ApiProperty()
  readonly size: Size;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly ingredients: string[];

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly quantity: number;
}
