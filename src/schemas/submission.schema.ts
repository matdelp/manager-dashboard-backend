import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SubmissionDocument = HydratedDocument<Submission>;

@Schema()
export class Submission {
  @Prop({ required: true })
  status: string;
  @Prop({ required: true })
  lang: string;
  @Prop({ required: true })
  code: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
  })
  challenge_id: mongoose.Schema.Types.ObjectId;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coder',
  })
  coder_id: mongoose.Schema.Types.ObjectId;
}
export const SubmissionSchema = SchemaFactory.createForClass(Submission);
