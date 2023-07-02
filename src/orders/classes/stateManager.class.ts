import { Injectable } from '@nestjs/common';
import { OrderState } from '../interface/orderState.interface';
import PendingState from './pendingState.class';
// import PaymentCompleteState from './paymentCompleteState.class';
import OrderEnum from '../enums/orderEnum.enum';
import PaymentCompleteState from './paymentCompleteState.class';
import CancelState from './cancelState.class';

@Injectable()
class StateManager {
  private orderState: OrderState;
  private nameState: OrderEnum;
  private orderId: string;

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

  setState(state: OrderState, orderId?: string): void {
    console.log('orderId', orderId);
    this.orderState = state;
    this.nameState = this.orderState.getName();
    this.orderId = orderId;
  }

  getNameState(): OrderEnum {
    return this.nameState;
  }

  getOrderId(): string {
    return this.orderId;
  }
}

export default StateManager;
