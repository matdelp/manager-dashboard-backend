import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { FunctionInputDefinition } from './functionInputDefinition.schema';
import { CodeText } from './codeText.schema';

export type CodeDocument = HydratedDocument<Code>;

@Schema({ collection: 'code' })
export class Code {
  @Prop({ required: true })
  function_name: string;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'CodeText',
  })
  code_text: CodeText[];
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'FunctionInputDefinition',
  })
  inputs: FunctionInputDefinition[];
}

export const CodeSchema = SchemaFactory.createForClass(Code);
