import { Types } from 'mongoose';
import { CodeText } from './CodeText';
import { FunctionInputDefinition } from './FunctionInputDefinition';

export type Code = {
  _id?: Types.ObjectId;
  function_name: string;
  code_text: CodeText[] | Types.ObjectId[];
  inputs: FunctionInputDefinition[] | Types.ObjectId[];
};
