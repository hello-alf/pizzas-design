import { IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderIdentifierDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  readonly order: string;
}
