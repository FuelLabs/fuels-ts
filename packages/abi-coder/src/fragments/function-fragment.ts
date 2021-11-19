import { ParamType } from '@ethersproject/abi';

import type { JsonFragment } from './fragment';
import { Fragment } from './fragment';

export default class FunctionFragment extends Fragment {
  static fromObject(value: JsonFragment): FunctionFragment {
    const { inputs = [], outputs = [] } = value;
    const params = {
      type: 'function',
      name: value.name,
      inputs: inputs.map(ParamType.fromObject),
      outputs: outputs.map(ParamType.fromObject),
    };

    return new FunctionFragment(params);
  }

  format(): string {
    const inputFormat = this.inputs.map((input) => input.format());
    return `${this.name}(u64,u64,b256,${inputFormat.join(',')})`;
  }
}
