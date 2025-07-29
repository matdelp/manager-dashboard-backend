import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type ChallengeDocument = HydratedDocument<Challenge>;

@Schema({ collection: 'challenge' })
export class Challenge {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  level: 'Easy' | 'Moderate' | 'Hard';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Code' })
  code: Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Test' })
  test: Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Submission' })
  submission: Types.ObjectId[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
