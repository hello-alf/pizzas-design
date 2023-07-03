import { Module } from '@nestjs/common';
import { DeliveryService } from './services/delivery.service';
import { PromoService } from './services/promo.service';
import { DeliveryStrategy } from './classes/delivery.strategy';
import { BogoStrategy } from './classes/bogo.strategy';

@Module({
  providers: [DeliveryService, DeliveryStrategy, BogoStrategy, PromoService],
  exports: [DeliveryService, DeliveryStrategy, BogoStrategy, PromoService],
})
export class DiscountModule {}
