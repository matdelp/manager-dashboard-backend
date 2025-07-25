import { Types } from 'mongoose';

export type CodeText = {
  _id?: Types.ObjectId;
  language: string;
  content: string;
};
