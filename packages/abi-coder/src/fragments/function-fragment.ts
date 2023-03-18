/* eslint-disable @typescript-eslint/no-explicit-any */

import { sha256 } from '@ethersproject/sha2';
import { bufferFromString } from '@fuel-ts/keystore';
import { bn } from '@fuel-ts/math';

import type { JsonAbiFragment } from '../json-abi';

import { Fragment } from './fragment';
import { ParamType } from './param-type';

/*
  example of input usage
  functionSignature = 'transfer(address,uint256)'
*/
export function parseFunctionSelector(functionSignature: string) {
  // hash the function signature
  const hashedFunctionSignature = sha256(bufferFromString(functionSignature, 'utf-8'));
  // get first 4 bytes of signature + 0x prefix. then left-pad it to 8 bytes using toHex(8)
  return bn(hashedFunctionSignature.slice(0, 10)).toHex(8);
}

export default class FunctionFragment extends Fragment {
  static fromObject(value: JsonAbiFragment): FunctionFragment {
    const { inputs = [], outputs = [], attributes = [] } = value;

    const params = {
      type: 'function',
      name: value.name,
      // TODO: Remove `as any`s when forc doesn't output nulls (https://github.com/FuelLabs/sway/issues/926)
      inputs: (inputs as any).map(ParamType.fromObject),
      outputs: (outputs as any).map(ParamType.fromObject),
      attributes,
    };

    return new FunctionFragment(params);
  }

  getFunctionSignature(): string {
    const inputsSignatures = this.inputs.map((input) => input.getSighash());
    return `${this.name}(${inputsSignatures.join(',')})`;
  }

  // ref: https://specs.fuel.network/master/protocol/abi/fn_selector_encoding.html
  getFunctionSelector(): string {
    return parseFunctionSelector(this.getFunctionSignature());
  }
}
