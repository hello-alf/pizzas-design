import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { Detail, DetailSchema } from './entities/detail.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controller/orders.controller';

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
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
