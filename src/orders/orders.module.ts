import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { Detail, DetailSchema } from './entities/detail.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controller/order.controller';
import StateManager from './classes/stateManager.class';
import { OrderRepository } from './repositories/order.repository';
import { OrdersStateService } from './services/orders-state.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Detail.name,
        schema: DetailSchema,
      },
    ]),
  ],
  providers: [
    OrdersService,
    { provide: StateManager, useClass: StateManager },
    OrderRepository,
    OrdersStateService,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
