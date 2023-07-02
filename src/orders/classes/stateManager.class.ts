import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderState } from '../interface/orderState.interface';
import PendingState from './pendingState.class';
import OrderEnum from '../enums/orderEnum.enum';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
class StateManager {
  private orderState: OrderState;
  private nameState: OrderEnum;
  private orderId: string;

  constructor(private orderRepository: OrderRepository) {}

  pending(): any {
    this.setState(new PendingState(this), null);
    this.nameState = OrderEnum.PENDING;
    this.orderId = '';
  }

  paymentComplete(): void {
    this.orderState.paymentComplete();
  }

  cancel(): void {
    this.orderState.cancel();
  }

  async setState(state: OrderState, orderId?: string): Promise<any> {
    let order = {};

    if (orderId !== undefined && orderId !== null) {
      order = await this.findOrderAndValidate(orderId);
    }

    this.orderState = state;
    this.nameState = this.orderState.getName();
    this.orderId = orderId;

    return order;
  }

  private async findOrderAndValidate(orderId: string): Promise<any> {
    const order = await this.orderRepository.findOneById(orderId);

    if (!order) {
      throw new BadRequestException(`La orden ${orderId} no existe`);
    }

    return order;
  }

  getNameState(): OrderEnum {
    return this.nameState;
  }

  getOrderId(): string {
    return this.orderId;
  }
}

export default StateManager;
