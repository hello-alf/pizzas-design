import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateDetailDto } from './detail.dtos';
import { CreateCustomizedDto } from './customized.dtos';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `customer's name` })
  readonly fullNameCustomer: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateIf((object) => !object.customized || object.customized.length === 0)
  @ValidateNested()
  @Type(() => CreateDetailDto)
  @ApiProperty({
    isArray: true,
    type: CreateDetailDto,
  })
  readonly details: CreateDetailDto[];

  @IsArray()
  @ValidateIf((object) => !object.details || object.details.length === 0)
  @IsNotEmpty()
  @ApiProperty({ description: 'customized items' })
  @Type(() => CreateCustomizedDto)
  @ApiProperty({
    isArray: true,
    type: CreateCustomizedDto,
  })
  readonly customized: CreateCustomizedDto[];
}
