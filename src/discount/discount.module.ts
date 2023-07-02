import { Module } from '@nestjs/common';
// import { DISCOUNT_INTERFACE } from './interface/discount.interface';
import { DeliveryService } from './services/delivery.service';
import { DeliveryStrategy } from './classes/delivery.strategy';
import { BogoStrategy } from './classes/bogo.strategy';

// {
//   provide: 'DiscountStrategy', // Puedes utilizar cualquier nombre único aquí
//   useValue: DISCOUNT_INTERFACE,
// },

@Module({
  providers: [DeliveryService, DeliveryStrategy, BogoStrategy],
  exports: [DeliveryService, DeliveryStrategy, BogoStrategy],
})
export class DiscountModule {}
