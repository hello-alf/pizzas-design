import { OrderState } from '../interface/orderState.interface';

class CancelState implements OrderState {
  pending(): void {
    throw new Error('Method not implemented.');
  }
  paymentComplete(): void {
    throw new Error('Method not implemented.');
  }
  cancel(): void {
    throw new Error('Method not implemented.');
  }
}

export default CancelState;
