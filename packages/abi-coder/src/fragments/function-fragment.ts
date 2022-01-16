import { FormatTypes, ParamType } from '@ethersproject/abi';

import type { JsonFragment } from './fragment';
import { Fragment } from './fragment';

function formatOverride(this: ParamType, format?: string): string {
  if ((!format || format === FormatTypes.sighash) && this.type.startsWith('struct ')) {
    return `s${this.format(format)}`;
  }

  return this.format(format);
}

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
    const inputFormat = this.inputs.map((input) => formatOverride.call(input));
    return `${this.name}(${['u64', 'u64', 'b256', ...inputFormat].join(',')})`;
  }
}
