import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { bufferFromString } from '@fuel-ts/keystore';
import { bn } from '@fuel-ts/math';

import AbiCoder from '../abi-coder';
import type { InputValue } from '../coders/abstract-coder';
import type { JsonAbiFragment } from '../json-abi';
import { isPointerType } from '../json-abi';
import { mapArgsIntoArray } from '../utilities';

import { Fragment } from './fragment';
import { ParamType } from './param-type';

/**
 * Parses a function signature and returns the function selector.
 * ref: https://specs.fuel.network/master/protocol/abi/fn_selector_encoding.html
 * @param functionSignature - the signature to be parsed. e.g.: 'sum(u64,u8,bool)'
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
      inputs: (inputs as JsonAbiFragment[]).map(ParamType.fromObject),
      outputs: (outputs as JsonAbiFragment[]).map(ParamType.fromObject),
      attributes: attributes ?? [],
    };

    return new FunctionFragment(params);
  }

  getSignature(): string {
    const inputsSignatures = this.inputs.map((input) => input.getSignature());
    return `${this.name}(${inputsSignatures.join(',')})`;
  }

  getSelector(): string {
    return parseFunctionSelector(this.getSignature());
  }

  isInputDataPointer(): boolean {
    return this.inputs.length > 1 || isPointerType(this.inputs[0]?.type || '');
  }

  encodeArguments(args: InputValue[] | object, offset = 0): Uint8Array {
    const argsToEncode = Array.isArray(args)
      ? args
      : (mapArgsIntoArray(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.inputs.map((x) => x.name!),
          args
        ) as InputValue[]);

    return new AbiCoder().encode(this.inputs, argsToEncode, offset);
  }

  decodeArguments(data: BytesLike) {
    return new AbiCoder().decode(this.inputs, arrayify(data));
  }
}
