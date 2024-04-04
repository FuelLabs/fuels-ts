/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import { AbiCoder } from './AbiCoder';
import { FunctionFragment } from './FunctionFragment';
import type { InputValue } from './encoding/coders/AbstractCoder';
import type { JsonAbi, JsonAbiConfigurable } from './types/JsonAbi';
import { findOrThrow } from './utils/utilities';

export class Interface<TAbi extends JsonAbi = JsonAbi> {
  readonly functions!: Record<string, FunctionFragment>;

  readonly configurables: Record<string, JsonAbiConfigurable>;

  readonly jsonAbi: TAbi;

  constructor(jsonAbi: TAbi) {
    this.jsonAbi = jsonAbi;

    this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((x) => [x.name, new FunctionFragment(this.jsonAbi, x.name)])
    );

    this.configurables = Object.fromEntries(this.jsonAbi.configurables.map((x) => [x.name, x]));
  }

  /**
   * Returns function fragment for a dynamic input.
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   */
  getFunction(nameOrSignatureOrSelector: string): FunctionFragment {
    const fn = Object.values<FunctionFragment>(this.functions).find(
      (f) =>
        f.name === nameOrSignatureOrSelector ||
        f.signature === nameOrSignatureOrSelector ||
        f.selector === nameOrSignatureOrSelector
    );

    if (fn !== undefined) {
      return fn;
    }

    throw new FuelError(
      ErrorCode.FUNCTION_NOT_FOUND,
      `function ${nameOrSignatureOrSelector} not found: ${JSON.stringify(fn)}.`
    );
  }

  decodeFunctionData(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    return fragment.decodeArguments(data);
  }

  encodeFunctionData(
    functionFragment: FunctionFragment | string,
    values: Array<InputValue>,
    offset = 0
  ): Uint8Array {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    return fragment.encodeArguments(values, offset);
  }

  // Decode the result of a function call
  decodeFunctionResult(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    return fragment.decodeOutput(data);
  }

  decodeLog(data: BytesLike, logId: number): any {
    const { loggedType } = findOrThrow(this.jsonAbi.loggedTypes, (type) => type.logId === logId);

    return AbiCoder.decode(this.jsonAbi, loggedType, arrayify(data), 0, {
      encoding: this.jsonAbi.encoding,
    });
  }

  encodeConfigurable(name: string, value: InputValue) {
    const configurable = findOrThrow(
      this.jsonAbi.configurables,
      (c) => c.name === name,
      () => {
        throw new FuelError(
          ErrorCode.CONFIGURABLE_NOT_FOUND,
          `A configurable with the '${name}' was not found in the ABI.`
        );
      }
    );

    return AbiCoder.encode(this.jsonAbi, configurable.configurableType, value, {
      isRightPadded: true,
      encoding: this.jsonAbi.encoding,
    });
  }

  getTypeById(typeId: number) {
    return findOrThrow(
      this.jsonAbi.types,
      (t) => t.typeId === typeId,
      () => {
        throw new FuelError(
          ErrorCode.TYPE_NOT_FOUND,
          `Type with typeId '${typeId}' doesn't exist in the ABI.`
        );
      }
    );
  }
}
