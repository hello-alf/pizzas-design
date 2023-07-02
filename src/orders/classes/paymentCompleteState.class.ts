import OrderEnum from '../enums/orderEnum.enum';
import { OrderState } from '../interface/orderState.interface';
import CancelState from './cancelState.class';
import StateManager from './stateManager.class';

class PaymentCompleteState implements OrderState {
  constructor(private stateManager: StateManager) {}

  getName(): OrderEnum {
    return OrderEnum.PAYMENT_COMPLETE;
  }

  pending(): void {
    throw new Error(
      'No se puede cambiar a estado pendiente un pedido previamente pagado',
    );
  }

  paymentComplete(): void {
    throw new Error('El pedido ya esta pagado');
  }

  cancel(): void {
    this.stateManager.setState(new CancelState(this.stateManager));
  }
}

export default PaymentCompleteState;
