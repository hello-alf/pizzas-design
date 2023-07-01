import { OrderState } from '../interface/orderState.interface';
import OrderEnum from '../enums/orderEnum.enum';

class PendingState implements OrderState {
  pending(): OrderEnum {
    return OrderEnum.PENDING;
  }
  paymentComplete(): void {
    throw new Error('No se puede completar un proceso pendiente');
  }
  cancel(): OrderEnum {
    throw new Error('Se puede cancelar');
  }
}

export default PendingState;
