import { OrderState } from '../interface/orderState.interface';
import OrderEnum from '../enums/orderEnum.enum';
import StateManager from './stateManager.class';
import PaymentCompleteState from './paymentCompleteState.class';
import CancelState from './cancelState.class';

class PendingState implements OrderState {
  constructor(private stateManager: StateManager) {}

  getName(): OrderEnum {
    return OrderEnum.PENDING;
  }

  pending(): void {
    throw new Error('El pedido ya esta pendiente');
  }

  paymentComplete(): void {
    this.stateManager.setState(new PaymentCompleteState(this.stateManager));
  }

  cancel(): void {
    this.stateManager.setState(new CancelState(this.stateManager));
  }
}

export default PendingState;
