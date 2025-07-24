import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Code } from './code.schema';
import { Test } from './test.schema';
import { Submission } from './submission.schema';

export type ChallengeDocument = HydratedDocument<Challenge>;

@Schema()
export class Challenge {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  level: ['Easy', 'Moderate', 'Hard'];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Code' })
  code: Code;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Test' })
  test: Test[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' })
  submission: Submission[];
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
