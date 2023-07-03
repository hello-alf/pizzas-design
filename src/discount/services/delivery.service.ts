import { Injectable } from '@nestjs/common';
import { DiscountStrategy } from '../interface/discount.interface';

@Injectable()
export class DeliveryService {
  private strategy: DiscountStrategy;

  public setStrategy(strategy: DiscountStrategy) {
    this.strategy = strategy;
  }

  public applyPromo() {
    return this.strategy.applyPromo();
  }

  public modifyProducts(items) {
    return this.strategy.modifyProducts(items);
  }
}
