import { Injectable } from '@nestjs/common';
import { DiscountStrategy } from '../interface/discount.interface';

@Injectable()
export class BogoStrategy implements DiscountStrategy {
  private promoDays = [2, 3];

  applyPromo(): number {
    return 0;
  }

  modifyProducts(items): any {
    let modifiedProducts = items;

    const today = new Date().getDay();

    if (this.promoDays.includes(today)) {
      modifiedProducts = items.map((item) => ({
        ...item,
        quantity: item.quantity * 2,
      }));
    }

    return modifiedProducts;
  }
}
