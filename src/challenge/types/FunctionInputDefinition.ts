import { Types } from 'mongoose';

export type FunctionInputDefinition = {
  _id?: Types.ObjectId;
  name: string;
  type: string;
};
