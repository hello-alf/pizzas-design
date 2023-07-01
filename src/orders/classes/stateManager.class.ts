import { Injectable, Inject } from '@nestjs/common';
import { OrderState } from '../interface/orderState.interface';
import PendingState from './pendingState.class';
import PaymentCompleteState from './paymentCompleteState.class';

@Injectable()
class StateManager {
  private orderState: OrderState;

  constructor(private readonly paymentState: PaymentCompleteState) {}

  pending(): void {
    this.orderState.pending();
    this.orderState = this.paymentState;
  }

  paymentComplete(): void {
    this.orderState.paymentComplete();
  }

  cancel(): void {
    this.orderState.cancel();
  }
}

export default StateManager;
