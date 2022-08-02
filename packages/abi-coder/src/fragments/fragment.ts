import type { ParamType } from './param-type';

interface FragmentParams {
  readonly type: string;
  readonly name: string;
  readonly inputs: Array<ParamType>;
  readonly outputs: Array<ParamType>;
}

export abstract class Fragment {
  readonly type: string;
  readonly name: string;
  readonly inputs: Array<ParamType> = [];
  readonly outputs: Array<ParamType> = [];

  constructor(params: FragmentParams) {
    this.type = params.type;
    this.name = params.name;
    this.inputs = params.inputs;
    this.outputs = params.outputs;
  }

  abstract getInputsSighash(format?: string): string;
}
