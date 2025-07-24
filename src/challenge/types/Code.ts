import { FunctionInputDefinition } from './FunctionInputDefinition';

export type Code = {
  function_name: string;
  code_text: string;
  inputs: FunctionInputDefinition;
};
