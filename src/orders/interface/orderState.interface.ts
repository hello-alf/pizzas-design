export interface OrderState {
  pending(): void;
  paymentComplete(): void;
  cancel(): void;
}
