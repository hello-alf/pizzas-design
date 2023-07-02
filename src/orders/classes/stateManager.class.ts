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

  // constructor(private readonly paymentState: PaymentCompleteState) {}

  pending(): any {
    this.setState(new PendingState(this));
    // this.orderState = new PendingState(this);
    this.nameState = OrderEnum.PENDING;
  }

  paymentComplete(): void {
    this.orderState.paymentComplete();
  }

  cancel(): void {
    this.orderState.cancel();
  }

  setState(state: OrderState): void {
    this.orderState = state;
    this.nameState = this.orderState.getName();
  }

  getNameState(): OrderEnum {
    return this.nameState;
  }
}

export default StateManager;
