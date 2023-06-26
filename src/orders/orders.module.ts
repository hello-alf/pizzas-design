import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { Detail, DetailSchema } from './entities/detail.entity';

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
})
export class OrdersModule {}
