import OrderEnum from '../enums/orderEnum.enum';
import { OrderState } from '../interface/orderState.interface';
import StateManager from './stateManager.class';

class CancelState implements OrderState {
  constructor(private stateManager: StateManager) {}

  getName(): OrderEnum {
    return OrderEnum.CANCELLED;
  }

  pending(): void {
    throw new Error('No se puede pagar un pedido cancelado');
  }

  paymentComplete(): void {
    throw new Error('Method not implemented 5');
  }

  cancel(): void {
    throw new Error('No se puede cancelar un pedido cancelado');
  }
}

export default CancelState;
