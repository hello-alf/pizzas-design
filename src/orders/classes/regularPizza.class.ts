import { Injectable } from '@nestjs/common';
import { OrderPrice } from '../interface/orderPrice.interface';
import { PizzaRepository } from '../../menu/repositories/pizza.repository';

@Injectable()
export class RegularPizza implements OrderPrice {
  constructor(private pizzaRepository: PizzaRepository) {}

  async calculatePrice(items: any) {
    const totalPrice = await items.reduce(async (accumulator, item) => {
      const itemBD = await this.pizzaRepository.findOneById(item.pizza);

      const itemPrice = itemBD.unitPrice * item.quantity;

      const accumulatedTotal = await accumulator;

      return accumulatedTotal + itemPrice;
    }, 0);
    return totalPrice;
  }
}
