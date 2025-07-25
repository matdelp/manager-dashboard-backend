import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CoderDocument = HydratedDocument<Coder>;

@Schema({ collection: 'coder' })
export class Coder {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  avatar: string;
  @Prop({ required: false })
  description: string;
  @Prop({ required: true })
  score: string;
  @Prop({ required: true })
  is_verified: boolean;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    default: [],
  })
  submission: mongoose.Schema.Types.ObjectId[];
}

export const CoderSchema = SchemaFactory.createForClass(Coder);
