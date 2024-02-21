/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { getBytesCopy, type BytesLike } from 'ethers';

import { AbiCoder } from './abi-coder';
import type { InputValue } from './coders/abstract-coder';
import { FunctionFragment } from './function-fragment';
import type { JsonAbi, JsonAbiConfigurable } from './json-abi';
import { findOrThrow } from './utilities';

export class Interface<TAbi extends JsonAbi = JsonAbi> {
  readonly functions!: Record<string, FunctionFragment>;

  readonly configurables: Record<string, JsonAbiConfigurable>;
  /*
  TODO: Refactor so that there's no need for externalLoggedTypes

  This is dedicated to external contracts added via `<base-invocation-scope.ts>.addContracts()` method.
  This is used to decode logs from contracts other than the main contract
  we're interacting with.
  */
  private externalLoggedTypes: Record<string, Interface>;
  readonly jsonAbi: TAbi;

  constructor(jsonAbi: TAbi) {
    this.jsonAbi = jsonAbi;

    this.externalLoggedTypes = {};

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

    if (!fragment) {
      throw new FuelError(ErrorCode.FRAGMENT_NOT_FOUND, 'Fragment not found.');
    }

    return fragment.decodeArguments(data);
  }

  encodeFunctionData(
    functionFragment: FunctionFragment | string,
    values: Array<InputValue>,
    offset = 0
  ): Uint8Array {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    if (!fragment) {
      throw new FuelError(ErrorCode.FRAGMENT_NOT_FOUND, 'Fragment not found.');
    }

    return fragment.encodeArguments(values, offset);
  }

  // Decode the result of a function call
  decodeFunctionResult(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    return fragment.decodeOutput(data);
  }

  decodeLog(data: BytesLike, logId: number, receiptId: string): any {
    const isExternalLoggedType = this.externalLoggedTypes[receiptId];
    if (isExternalLoggedType) {
      const externalInterface = this.externalLoggedTypes[receiptId];
      return externalInterface.decodeLog(data, logId, receiptId);
    }

    const { loggedType } = findOrThrow(this.jsonAbi.loggedTypes, (type) => type.logId === logId);

    return AbiCoder.decode(this.jsonAbi, loggedType, getBytesCopy(data), 0, {
      version: this.jsonAbi.encoding,
    });
  }

  updateExternalLoggedTypes(id: string, loggedTypes: Interface) {
    this.externalLoggedTypes[id] = loggedTypes;
  }

  /**
   * Encode a configurable value.
   * 
   * @param name - the name of the configurable
   * @param value - the value to encode
   * @returns {Uint8Array}
   * 
   * @throws {FuelError} {@link ErrorCode.CONFIGURABLE_NOT_FOUND}
   * When the configurable with the given name is not found in the ABI.
   */
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
