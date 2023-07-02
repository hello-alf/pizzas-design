import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/order.dtos';
import { OrderIdentifierDto } from '../dtos/orderIdentifier.dtos';
import StateManager from '../classes/stateManager.class';
import PaymentCompleteState from '../classes/paymentCompleteState.class';
import OrderEnum from '../enums/orderEnum.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private stateManager: StateManager,
  ) {}

  findAll() {
    return this.orderModel.find().exec();
  }

  create(data: CreateOrderDto) {
    const deliveryPrice = 15;
    const discount = 0;

    this.stateManager.pending();
    const state = this.stateManager.getNameState();
    console.log('state pending', state);

    // this.stateManager.paymentComplete();
    // state = this.stateManager.getNameState();
    // console.log('state', state);

    // this.stateManager.cancel();
    // state = this.stateManager.getNameState();
    // console.log('state', state);

    // this.stateManager.cancel();

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

    const orderToPay = await this.orderModel.findOne({ _id: order }).exec();

    if (!orderToPay) {
      throw new NotFoundException(`La orden ${order} no existe`);
    }

    const payload = this.markOrderAsPaid(orderToPay.id);

    const orderUpdated = await this.orderModel
      .findOneAndUpdate(
        { _id: order, state: OrderEnum.PENDING },
        { $set: payload },
        { new: true },
      )
      .exec();

    if (orderUpdated === null) {
      throw new NotFoundException(
        `La orden ${order} ya fue pagada, o no existe`,
      );
    }

    return orderUpdated;
  }

  async cancel(data: OrderIdentifierDto) {
    const { order } = data;

    const payload = { state: 'CANCEL' };

    const orderToCancel = await this.orderModel
      .findOneAndUpdate(
        {
          _id: order,
          state: { $in: [OrderEnum.PENDING, OrderEnum.PAYMENT_COMPLETE] },
        },
        { $set: payload },
        { new: true },
      )
      .exec();

    if (orderToCancel === null) {
      throw new NotFoundException(
        `La orden ${order} ya fue cancelada, o no existe`,
      );
    }

    return orderToCancel;
  }

  markOrderAsPaid(orderId: string) {
    this.stateManager.setState(
      new PaymentCompleteState(this.stateManager),
      orderId,
    );

    const state = this.stateManager.getNameState();

    return { state };
  }
}
