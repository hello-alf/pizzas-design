import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { Detail, DetailSchema } from './entities/detail.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controller/order.controller';
import StateManager from './classes/stateManager.class';
import { OrderRepository } from './repositories/order.repository';
import { OrdersStateService } from './services/orders-state.service';
import { DiscountModule } from 'src/discount/discount.module';
import { MenuModule } from 'src/menu/menu.module';
import { RegularPizza } from './classes/regularPizza.class';
import { PersonalizedPizza } from './classes/personalizedPizza.class';

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
    DiscountModule,
    MenuModule,
  ],
  providers: [
    OrdersService,
    { provide: StateManager, useClass: StateManager },
    OrderRepository,
    OrdersStateService,
    RegularPizza,
    PersonalizedPizza,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
