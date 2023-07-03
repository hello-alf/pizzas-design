import { Injectable } from '@nestjs/common';
import { PromoStrategy } from '../interface/promo.interface';

@Injectable()
export class BogoStrategy implements PromoStrategy {
  private promoDays = [2, 3];

  applyBogo(items) {
    return items.map((item) => ({
      ...item,
      quantity: item.quantity * 2,
    }));
  }

  modifyProducts(items, customized): any {
    let modifiedProducts = items;
    let customizedProducts = customized;

    const today = new Date().getDay();

    if (this.promoDays.includes(today)) {
      modifiedProducts = this.applyBogo(items);

      customizedProducts = this.applyBogo(customized);
    }

    return { modifiedProducts, customizedProducts };
  }
}
