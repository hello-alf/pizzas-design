import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/order.dtos';
import { OrderIdentifierDto } from '../dtos/orderIdentifier.dtos';
import StateManager from '../classes/stateManager.class';
import OrderEnum from '../enums/orderEnum.enum';
import { OrderRepository } from '../repositories/order.repository';
import { OrdersStateService } from './orders-state.service';
import { DeliveryService } from '../../discount/services/delivery.service';
import { PromoService } from '../../discount/services/promo.service';
import { DeliveryStrategy } from '../../discount/classes/delivery.strategy';
import { BogoStrategy } from '../../discount/classes/bogo.strategy';
import { RegularPizza } from '../classes/regularPizza.class';
import { PersonalizedPizza } from '../classes/personalizedPizza.class';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DeliveryService) private deliveryService: DeliveryService,
    @Inject(PromoService) private promoService: PromoService,
    @Inject(OrderRepository) private orderRepository: OrderRepository,
    private stateManager: StateManager,
    private ordersStateService: OrdersStateService,
    private regularPizza: RegularPizza,
    private personalizedPizza: PersonalizedPizza,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  async create(data: CreateOrderDto) {
    this.stateManager.pending();

    const deliveryPrice = this.applyDeliveryStrategy();

    const total = await this.calculatePrice(data.customized, data.details);

    const details = await this.applyPromoStrategy(
      data.details,
      data.customized,
    );

    const newOrder = await this.orderRepository.save({
      ...data,
      details: details.modifiedProducts,
      customized: details.customizedProducts,
      deliveryPrice,
      discount: 0,
      state: this.stateManager.getNameState(),
      totalPrice: total,
    });

    return newOrder;
  }

  async pay(data: OrderIdentifierDto) {
    const { order } = data;

    const payload = await this.ordersStateService.markOrderAsPaid(order);

    const orderUpdated = await this.orderRepository.findAndUpdate(
      { _id: order, state: OrderEnum.PENDING },
      payload,
    );

    return orderUpdated;
  }

  async cancel(data: OrderIdentifierDto) {
    const { order } = data;

    const payload = await this.ordersStateService.markOrderAsCancelled(order);

    const orderCancelled = await this.orderRepository.findAndUpdate(
      {
        _id: order,
        state: { $in: [OrderEnum.PENDING, OrderEnum.PAYMENT_COMPLETE] },
      },
      payload,
    );

    return orderCancelled;
  }

  async calculatePrice(customized, details) {
    const customizedTotalPrice = await this.personalizedPizza.calculatePrice(
      customized,
    );

    const totalMenuPrice = await this.regularPizza.calculatePrice(details);

    return customizedTotalPrice + totalMenuPrice;
  }

  applyPromoStrategy(details, customized) {
    this.promoService.setStrategy(new BogoStrategy());

    return this.promoService.modifyProducts(details, customized);
  }

  applyDeliveryStrategy() {
    this.deliveryService.setStrategy(new DeliveryStrategy());

    return this.deliveryService.applyPromo();
  }
}
