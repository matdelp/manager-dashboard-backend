import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FunctionInputValueDocument = HydratedDocument<FunctionInputValue>;

@Schema({ collection: 'functionInputValue' })
export class FunctionInputValue {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;
}
export const FunctionInputValueSchema =
  SchemaFactory.createForClass(FunctionInputValue);
