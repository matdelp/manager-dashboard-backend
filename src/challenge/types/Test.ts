import { Types } from 'mongoose';
import { FunctionInputValue } from './FunctionInputValue';

export type Test = {
  _id?: Types.ObjectId;
  weight: number;
  inputs: FunctionInputValue[] | Types.ObjectId[];
  outputs: string;
};
