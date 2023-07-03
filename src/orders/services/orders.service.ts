import { Injectable, Inject } from '@nestjs/common';

import { CreateOrderDto } from '../dtos/order.dtos';
import { OrderIdentifierDto } from '../dtos/orderIdentifier.dtos';
import StateManager from '../classes/stateManager.class';
import OrderEnum from '../enums/orderEnum.enum';
import { OrderRepository } from '../repositories/order.repository';
import { OrdersStateService } from './orders-state.service';
import { DeliveryService } from '../../discount/services/delivery.service';
import { DeliveryStrategy } from '../../discount/classes/delivery.strategy';
import { BogoStrategy } from '../../discount/classes/bogo.strategy';
import { PizzaRepository } from '../../menu/repositories/pizza.repository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DeliveryService) private deliveryService: DeliveryService,
    @Inject(OrderRepository) private orderRepository: OrderRepository,
    private pizzaRepository: PizzaRepository,
    private stateManager: StateManager,
    private ordersStateService: OrdersStateService,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  async create(data: CreateOrderDto) {
    this.deliveryService.setStrategy(new DeliveryStrategy());

    const discount = 0;

    const deliveryPrice = this.deliveryService.applyPromo();

    this.stateManager.pending();

    const state = this.stateManager.getNameState();

    const totalPrice = await this.calculateOrderTotal(data.details);

    this.deliveryService.setStrategy(new BogoStrategy());

    const details = this.deliveryService.modifyProducts(data.details);

    const newOrder = await this.orderRepository.save({
      ...data,
      details,
      deliveryPrice,
      discount,
      state,
      totalPrice,
    });

    return newOrder;
  }

  async pay(data: OrderIdentifierDto) {
    const { order } = data;

    const payload = await this.ordersStateService.markOrderAsPaid(order);

    const orderUpdated = await this.orderRepository.findAndUpdate(
      { _id: order, state: OrderEnum.PENDING },
      payload,
    );

    return orderUpdated;
  }

  async cancel(data: OrderIdentifierDto) {
    const { order } = data;

    const payload = await this.ordersStateService.markOrderAsCancelled(order);

    const orderCancelled = await this.orderRepository.findAndUpdate(
      {
        _id: order,
        state: { $in: [OrderEnum.PENDING, OrderEnum.PAYMENT_COMPLETE] },
      },
      payload,
    );

    return orderCancelled;
  }

  async calculateOrderTotal(items: any[]) {
    const totalPrice = await items.reduce(async (accumulator, item) => {
      const itemBD = await this.pizzaRepository.findOneById(item.pizza);

      const itemPrice = itemBD.unitPrice * item.quantity;

      const accumulatedTotal = await accumulator;

      return accumulatedTotal + itemPrice;
    }, 0);
    return totalPrice;
  }
}
