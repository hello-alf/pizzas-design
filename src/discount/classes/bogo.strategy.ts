import { Injectable } from '@nestjs/common';
import { PromoStrategy } from '../interface/promo.interface';

@Injectable()
export class BogoStrategy implements PromoStrategy {
  private promoDays = [2, 3];

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
