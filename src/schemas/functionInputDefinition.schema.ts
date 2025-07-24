import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FunctionInputDefinitionDocument =
  HydratedDocument<FunctionInputDefinition>;

@Schema()
export class FunctionInputDefinition {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  type: string;
}

export const FunctionInputDefinitionSchema = SchemaFactory.createForClass(
  FunctionInputDefinition,
);
