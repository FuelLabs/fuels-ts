/* eslint-disable @typescript-eslint/no-explicit-any */

import type { JsonAbiFragment } from '../json-abi';

import { Fragment } from './fragment';
import { ParamType } from './param-type';

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

  getInputsSignature(): string {
    const inputsSignatures = this.inputs.map((input) => input.getSighashSignature());
    return `${this.name}(${inputsSignatures.join(',')})`;
  }
}
