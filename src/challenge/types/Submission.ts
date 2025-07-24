import mongoose from 'mongoose';

export type Submission = {
  status: string;
  lang: string;
  code: string;
  challenge_id: mongoose.Schema.Types.ObjectId;
  coder_id: mongoose.Schema.Types.ObjectId;
};
