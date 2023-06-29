import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import Size from '../enums/size.enum';

export class CreatePizzaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `pizza's name` })
  readonly name: string;

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
  readonly unitPrice: number;
}

export class UpdatePizzaDto extends PartialType(CreatePizzaDto) {}
