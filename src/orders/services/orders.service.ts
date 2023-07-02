import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/order.dtos';
import { OrderIdentifierDto } from '../dtos/orderIdentifier.dtos';
import StateManager from '../classes/stateManager.class';
import OrderEnum from '../enums/orderEnum.enum';
import { OrderRepository } from '../repositories/order.repository';
import { OrdersStateService } from './orders-state.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private orderRepository: OrderRepository,
    private stateManager: StateManager,
    private ordersStateService: OrdersStateService,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  create(data: CreateOrderDto) {
    const deliveryPrice = 15;
    const discount = 0;

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

    if (orderCancelled === null) {
      throw new NotFoundException(
        `La orden ${order} ya fue cancelada, o no existe`,
      );
    }

    return orderCancelled;
  }
}
