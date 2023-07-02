import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/order.dtos';
import { OrderIdentifierDto } from '../dtos/orderIdentifier.dtos';
import StateManager from '../classes/stateManager.class';
import OrderEnum from '../enums/orderEnum.enum';
import { OrderRepository } from '../repositories/order.repository';
import { OrdersStateService } from './orders-state.service';
import { DeliveryService } from '../../discount/services/delivery.service';
import { DeliveryStrategy } from 'src/discount/classes/delivery.strategy';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject(DeliveryService) private deliveryService: DeliveryService,
    private orderRepository: OrderRepository,
    private stateManager: StateManager,
    private ordersStateService: OrdersStateService,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  create(data: CreateOrderDto) {
    this.deliveryService.setStrategy(new DeliveryStrategy());

    const discount = 0;

    const deliveryPrice = this.deliveryService.applyPromo();

    this.stateManager.pending();
    const state = this.stateManager.getNameState();

    const totalPrice = 120;

    const newOrder = new this.orderModel({
      ...data,
      deliveryPrice,
      discount,
      state,
      totalPrice,
    });

    return newOrder.save();
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

  calculateOrderTotal(): number {
    return 0;
  }
}
