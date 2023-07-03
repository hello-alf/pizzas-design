import { Injectable } from '@nestjs/common';
import { PromoStrategy } from '../interface/promo.interface';

@Injectable()
export class PromoService {
  private strategy: PromoStrategy;

  public setStrategy(strategy: PromoStrategy) {
    this.strategy = strategy;
  }

  public modifyProducts(items, customized) {
    return this.strategy.modifyProducts(items, customized);
  }
}
