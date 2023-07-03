import { Injectable, Inject } from '@nestjs/common';

import { CreateOrderDto } from '../dtos/order.dtos';
import { OrderIdentifierDto } from '../dtos/orderIdentifier.dtos';
import StateManager from '../classes/stateManager.class';
import OrderEnum from '../enums/orderEnum.enum';
import { OrderRepository } from '../repositories/order.repository';
import { OrdersStateService } from './orders-state.service';
import { DeliveryService } from '../../discount/services/delivery.service';
import { PromoService } from '../../discount/services/promo.service';
import { DeliveryStrategy } from '../../discount/classes/delivery.strategy';
import { BogoStrategy } from '../../discount/classes/bogo.strategy';
import { PizzaRepository } from '../../menu/repositories/pizza.repository';
import Size from '../../menu/enums/size.enum';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DeliveryService) private deliveryService: DeliveryService,
    @Inject(PromoService) private promoService: PromoService,
    @Inject(OrderRepository) private orderRepository: OrderRepository,
    private pizzaRepository: PizzaRepository,
    private stateManager: StateManager,
    private ordersStateService: OrdersStateService,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  async create(data: CreateOrderDto) {
    this.stateManager.pending();

    const deliveryPrice = this.applyDeliveryStrategy();

    const customizedTotalPrice = await this.calculateCustomizedOrderTotal(
      data.customized,
    );

    const totalMenuPrice = await this.calculateOrderTotal(data.details);

    const details = this.applyPromoStrategy(data.details);

    const newOrder = await this.orderRepository.save({
      ...data,
      details,
      deliveryPrice,
      discount: 0,
      state: this.stateManager.getNameState(),
      totalPrice: totalMenuPrice + customizedTotalPrice,
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

  async calculateCustomizedOrderTotal(items: any[]) {
    const totalPrice = items.reduce((accumulator, item) => {
      const unitPrice = this.getRandomPrice(item.size);

      const itemPrice = unitPrice * item.quantity;

      const accumulatedTotal = accumulator;

      return accumulatedTotal + itemPrice;
    }, 0);
    return totalPrice;
  }

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

  applyPromoStrategy(details) {
    this.promoService.setStrategy(new BogoStrategy());

    return this.promoService.modifyProducts(details);
  }

  applyDeliveryStrategy() {
    this.deliveryService.setStrategy(new DeliveryStrategy());

    return this.deliveryService.applyPromo();
  }
}
