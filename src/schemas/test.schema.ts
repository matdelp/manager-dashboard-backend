import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type TestDocument = HydratedDocument<Test>;

@Schema({ collection: 'testCase' })
export class Test {
  @Prop({ required: true })
  weight: number;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'FunctionInputValue',
    required: true,
  })
  inputs: Types.ObjectId[];
  @Prop({ required: true })
  outputs: string;
}
export const TestSchema = SchemaFactory.createForClass(Test);
