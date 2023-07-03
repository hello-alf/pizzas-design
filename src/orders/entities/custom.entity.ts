import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import Size from '../../menu/enums/size.enum';

@Schema()
export class Custom extends Document {
  @Prop({ type: String, required: true, enum: Size })
  size: string;

  @Prop({ type: Array, required: true })
  ingredients: Types.Array<string>;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const CustomSchema = SchemaFactory.createForClass(Custom);
