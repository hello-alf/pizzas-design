import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Document } from 'mongoose';
import Size from '../enums/size.enum';

@Schema()
export class Pizza extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, required: true, enum: Size })
  size: string;

  @Prop({ type: Array, required: true })
  ingredients: Types.Array<string>;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
