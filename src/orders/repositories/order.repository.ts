import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  private populateOptions: any = {
    path: 'details.pizza',
    model: 'Pizza',
    select: { _id: 1, name: 1, size: 1, ingredients: 1 },
  };

  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async save(payload): Promise<Order> {
    const newOrder = new this.orderModel(payload);
    newOrder.save();
    return newOrder.populate(this.populateOptions);
  }

  async find(): Promise<Order[]> {
    return this.orderModel.find().populate(this.populateOptions).exec();
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
