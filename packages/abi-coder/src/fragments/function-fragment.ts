/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormatTypes } from '@ethersproject/abi';

import { arrayRegEx, structRegEx } from '../abi-coder';
import type { JsonAbiFragment } from '../json-abi';

import { Fragment } from './fragment';
import { ParamType } from './param-type';

/**
 * An override for the `format` method of Ethers' ParamType to handle Fuel/Ethereum ABI incompatibilities
 */
function formatOverride(this: ParamType, format?: string): string {
  if (!format || format === FormatTypes.sighash) {
    const structMatch = structRegEx.exec(this.type)?.groups;
    if (structMatch) {
      return `s${this.format(format)}`;
    }

    const arrayMatch = arrayRegEx.exec(this.type)?.groups;
    if (arrayMatch) {
      return `[${arrayMatch.item}; ${arrayMatch.length}]`;
    }
  }

  return this.format(format);
}

export default class FunctionFragment extends Fragment {
  static fromObject(value: JsonAbiFragment): FunctionFragment {
    const { inputs = [], outputs = [] } = value;

    const params = {
      type: 'function',
      name: value.name,
      // TODO: Remove `as any`s when forc doesn't output nulls (https://github.com/FuelLabs/sway/issues/926)
      inputs: (inputs as any).map(ParamType.fromObject),
      outputs: (outputs as any).map(ParamType.fromObject),
    };

    return new FunctionFragment(params);
  }

  format(): string {
    const inputFormat = this.inputs.map((input) => formatOverride.call(input));
    return `${this.name}(${inputFormat.join(',')})`;
  }
}
