import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateDetailDto } from './detail.dtos';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `customer's name` })
  readonly fullNameCustomer: string;

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
