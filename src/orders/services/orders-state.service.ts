import { BadRequestException, Injectable } from '@nestjs/common';
import PaymentCompleteState from '../classes/paymentCompleteState.class';
import CancelState from '../classes/cancelState.class';
import OrderEnum from '../enums/orderEnum.enum';
import StateManager from '../classes/stateManager.class';

@Injectable()
export class OrdersStateService {
  constructor(private stateManager: StateManager) {}

  async markOrderAsPaid(orderId: string) {
    const order = await this.stateManager.setState(
      new PaymentCompleteState(this.stateManager),
      orderId,
    );

    if (order.state !== OrderEnum.PENDING) {
      throw new BadRequestException('La orden ya fue pagada');
    }

    return { state: this.stateManager.getNameState() };
  }

  async markOrderAsCancelled(orderId: string) {
    const order = await this.stateManager.setState(
      new CancelState(this.stateManager),
      orderId,
    );

    if (order.state === OrderEnum.CANCELLED) {
      throw new BadRequestException('La orden ya fue cancelada');
    }

    return { state: this.stateManager.getNameState() };
  }
}
