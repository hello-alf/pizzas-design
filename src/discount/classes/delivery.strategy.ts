import { Injectable } from '@nestjs/common';
import { DiscountStrategy } from '../interface/discount.interface';

@Injectable()
export class DeliveryStrategy implements DiscountStrategy {
  getRandomNumber(): number {
    const min = 10;
    const max = 40;
    const randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber);
  }

  applyPromo(): number {
    return this.getRandomNumber();
  }
}
