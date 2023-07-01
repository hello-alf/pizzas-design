import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/order.dtos';
import { OrderIdentifierDto } from '../dtos/orderIdentifier.dtos';

@Controller('order')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Post('/pay')
  pay(@Body() payload: OrderIdentifierDto) {
    return this.orderService.pay(payload);
  }

  @Post('/cancel')
  cancel(@Body() payload: OrderIdentifierDto) {
    return this.orderService.cancel(payload);
  }
}
