import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { FunctionInputValue } from './functionInputValue.schema';

export type TestDocument = HydratedDocument<Test>;

@Schema({ collection: 'testCase' })
export class Test {
  @Prop({ required: true })
  weight: number;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FunctionInputValue',
    required: true,
  })
  inputs: FunctionInputValue[];
  @Prop({ required: true })
  outputs: string;
}
export const TestSchema = SchemaFactory.createForClass(Test);
