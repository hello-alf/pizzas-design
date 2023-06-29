import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/order.dtos';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  create(data: CreateOrderDto) {
    console.log('first', data);
    const deliveryPrice = 15;
    const discount = 0;
    const state = 'PENDING';
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
}
