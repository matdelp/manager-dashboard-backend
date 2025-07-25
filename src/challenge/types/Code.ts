import { CodeText } from './CodeText';
import { FunctionInputDefinition } from './FunctionInputDefinition';

export type Code = {
  function_name: string;
  code_text: CodeText[];
  inputs: FunctionInputDefinition[];
};
