import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { now, Document } from 'mongoose';
import { Detail } from './detail.entity';
import { Custom } from './custom.entity';

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

  @Prop({ type: Types.ObjectId, ref: Detail.name })
  details: Detail[];

  @Prop({ required: true })
  customized: Custom[];

  @Prop({ required: true })
  state: string;

  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
