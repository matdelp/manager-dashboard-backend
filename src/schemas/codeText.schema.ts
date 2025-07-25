import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CodeTextDocument = HydratedDocument<CodeText>;

@Schema({ collection: 'codetext' })
export class CodeText {
  @Prop({ required: true })
  language: string;
  @Prop({ required: true })
  content: string;
}

export const CodeTextSchema = SchemaFactory.createForClass(CodeText);
