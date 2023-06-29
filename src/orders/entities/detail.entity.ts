import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Pizza } from '../../menu/entities/pizza.entity';

@Schema()
export class Detail extends Document {
  @Prop({ type: Types.ObjectId, ref: Pizza.name })
  pizza: Pizza | Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);
