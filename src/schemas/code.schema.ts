import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CodeDocument = HydratedDocument<Code>;

@Schema({ collection: 'code' })
export class Code {
  @Prop({ required: true })
  function_name: string;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'CodeText',
  })
  code_text: Types.ObjectId[];
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'FunctionInputDefinition',
  })
  inputs: Types.ObjectId[];
}

export const CodeSchema = SchemaFactory.createForClass(Code);
