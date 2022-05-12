import type { ParamType } from '@ethersproject/abi';

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

  abstract format(format?: string): string;
}
