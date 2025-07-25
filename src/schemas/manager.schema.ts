import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ManagerDocument = HydratedDocument<Manager>;

@Schema({ collection: 'manager' })
export class Manager {
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
  @Prop({ required: true })
  is_verified: boolean;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    default: [],
  })
  challenges: mongoose.Schema.Types.ObjectId[];
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
