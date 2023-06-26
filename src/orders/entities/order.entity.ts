import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  id: number;

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: Number, required: true })
  discount: number;

  @Prop({ type: Number, required: true })
  deliveryPrice: number;

  @Prop({ required: true })
  fullNameCustomer: string;

  @Prop({ required: true })
  state: string;

  @Prop({ type: Date })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
