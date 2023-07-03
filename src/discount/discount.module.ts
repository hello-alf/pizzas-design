import { Module } from '@nestjs/common';
import { DeliveryService } from './services/delivery.service';
import { DeliveryStrategy } from './classes/delivery.strategy';
import { BogoStrategy } from './classes/bogo.strategy';

@Module({
  providers: [DeliveryService, DeliveryStrategy, BogoStrategy],
  exports: [DeliveryService, DeliveryStrategy, BogoStrategy],
})
export class DiscountModule {}
