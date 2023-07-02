import OrderEnum from '../enums/orderEnum.enum';

export interface OrderState {
  pending(): void;
  paymentComplete(): void;
  cancel(): void;
  getName(): OrderEnum;
}
