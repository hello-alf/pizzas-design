import { Injectable } from '@nestjs/common';
import { DiscountStrategy } from '../interface/discount.interface';

@Injectable()
export class BogoStrategy implements DiscountStrategy {
  applyPromo(): number {
    return 0.1; // 10% de descuento
  }
}
