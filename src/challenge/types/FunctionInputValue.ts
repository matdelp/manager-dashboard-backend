import { Types } from 'mongoose';

export type FunctionInputValue = {
  _id?: Types.ObjectId;
  name: string;
  value: string;
};
