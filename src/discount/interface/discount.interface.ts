export const DISCOUNT_INTERFACE = 'DISCOUNT_INTERFACE';

export interface DiscountStrategy {
  applyPromo(): number;
}