import type { JsonFragmentType } from '@ethersproject/abi';
import { FormatTypes, ParamType } from '@ethersproject/abi';

import type { JsonFragment } from './fragment';
import { Fragment } from './fragment';

/**
 * An override for the `format` method of Ethers' ParamType to handle Fuel/Ethereum ABI incompatibilities
 */
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
      inputs: FunctionFragment.allowOnlyArguments(inputs).map(ParamType.fromObject),
      strictInputs: FunctionFragment.strictArguments(inputs),
      outputs: outputs.map(ParamType.fromObject),
    };

    return new FunctionFragment(params);
  }

  static strictArguments(fragment: readonly JsonFragmentType[]): boolean {
    return !(
      fragment.length === 4 &&
      fragment[0].type === 'u64' &&
      fragment[1].type === 'u64' &&
      fragment[2].type === 'b256'
    );
  }

  static allowOnlyArguments(inputs: readonly JsonFragmentType[]): readonly JsonFragmentType[] {
    return FunctionFragment.strictArguments(inputs) ? inputs : inputs.slice(3);
  }

  format(): string {
    const inputFormat = this.inputs.map((input) => formatOverride.call(input));
    return `${this.name}(${[...inputFormat].join(',')})`;
  }
}
