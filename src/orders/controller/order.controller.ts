import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/order.dtos';

@Controller('order')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }
}
