import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { FunctionInputDefinition } from './functionInputDefinition.schema';

export type CodeDocument = HydratedDocument<Code>;

@Schema()
export class Code {
  @Prop({ required: true })
  function_name: string;
  @Prop()
  code_text: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FunctionInputDefinition',
  })
  inputs: FunctionInputDefinition;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
