import { Injectable } from '@nestjs/common';
import { OrderPrice } from '../interface/orderPrice.interface';
import Size from '../../menu/enums/size.enum';

@Injectable()
export class PersonalizedPizza implements OrderPrice {
  getRandomPrice(size: Size): number {
    let minPrice: number;
    let maxPrice: number;

    switch (size) {
      case Size.SMALL:
        minPrice = 20;
        maxPrice = 30;
        break;
      case Size.MEDIUM:
        minPrice = 50;
        maxPrice = 70;
        break;
      case Size.BIG:
        minPrice = 90;
        maxPrice = 120;
        break;
      default:
        throw new Error('Invalid size');
    }

    return Math.floor(Math.random() * (maxPrice - minPrice + 1) + minPrice);
  }

  calculatePrice(items: any) {
    const totalPrice = items.reduce((accumulator, item) => {
      const unitPrice = this.getRandomPrice(item.size);

      const itemPrice = unitPrice * item.quantity;

      const accumulatedTotal = accumulator;

      return accumulatedTotal + itemPrice;
    }, 0);
    return totalPrice;
  }
}
