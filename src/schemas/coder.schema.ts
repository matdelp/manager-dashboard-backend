import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CoderDocument = HydratedDocument<Coder>;

@Schema()
export class Coder {
  @Prop({ required: true })
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  avatar: string;
  @Prop()
  description: string;
  @Prop()
  score: string;
  @Prop()
  is_verified: boolean;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
  })
  submission: mongoose.Schema.Types.ObjectId[];
}

export const CoderSchema = SchemaFactory.createForClass(Coder);
