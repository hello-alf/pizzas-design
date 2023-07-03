import { Injectable } from '@nestjs/common';
import { DiscountStrategy } from '../interface/discount.interface';

@Injectable()
export class DeliveryStrategy implements DiscountStrategy {
  private promoDays = [4];

  getRandomNumber(): number {
    const min = 10;
    const max = 40;
    const randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber);
  }

  applyPromo(): number {
    const today = new Date().getDay();

    if (this.promoDays.includes(today)) {
      return 0;
    }

    return this.getRandomNumber();
  }

  modifyProducts(items): any {
    return items;
  }
}
