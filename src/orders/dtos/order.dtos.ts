import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateDetailDto } from './detail.dtos';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `customer's name` })
  readonly fullNameCustomer: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly discount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly state: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateDetailDto)
  @ApiProperty({
    isArray: true,
    type: CreateDetailDto,
  })
  readonly details: CreateDetailDto[];
}
