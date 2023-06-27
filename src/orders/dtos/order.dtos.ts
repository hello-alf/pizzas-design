import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
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
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
