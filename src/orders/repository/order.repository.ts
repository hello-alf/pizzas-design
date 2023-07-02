import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async find(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOneById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId).exec();
  }

  async findAndUpdate(where: any, payload: any): Promise<Order> {
    return this.orderModel
      .findOneAndUpdate(where, { $set: payload }, { new: true })
      .exec();
  }
}
