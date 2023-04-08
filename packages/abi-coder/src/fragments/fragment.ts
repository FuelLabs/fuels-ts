import type { ParamType } from './param-type';

interface AttributeType {
  readonly name: string;
  readonly arguments: ReadonlyArray<string>;
}

interface FragmentParams {
  readonly type: string;
  readonly name: string;
  readonly inputs: Array<ParamType>;
  readonly outputs: Array<ParamType>;
  readonly attributes: ReadonlyArray<AttributeType>;
}

export abstract class Fragment {
  readonly type: string;
  readonly name: string;
  readonly inputs: Array<ParamType> = [];
  readonly outputs: Array<ParamType> = [];
  readonly attributes: ReadonlyArray<AttributeType> = [];

  constructor(params: FragmentParams) {
    this.type = params.type;
    this.name = params.name;
    this.inputs = params.inputs;
    this.outputs = params.outputs;
    this.attributes = params.attributes;
  }
}
