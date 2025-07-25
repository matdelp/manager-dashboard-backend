import mongoose, { Types } from 'mongoose';

export type Submission = {
  _id?: Types.ObjectId;
  status: string;
  lang: string;
  code: string;
  challenge_id: mongoose.Schema.Types.ObjectId;
  coder_id: mongoose.Schema.Types.ObjectId;
};
