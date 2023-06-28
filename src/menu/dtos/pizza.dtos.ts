import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsArray,
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
}

export class UpdatePizzaDto extends PartialType(CreatePizzaDto) {}
