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
   * Attempts to find a function fragment by name, signature or selector.
   * 
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   * @returns the function fragment
   * 
   * @throws {FuelError} {@link ErrorCode.FUNCTION_NOT_FOUND}
   * When the function with the given name, signature or selector is not found in the ABI.
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

    const validFunctionNames = Object.values(this.functions).map(({ name }) => `"${name}"`).join(', ');
    throw new FuelError(
      ErrorCode.FUNCTION_NOT_FOUND,
      `The function "${nameOrSignatureOrSelector}" not found within the ABI.
      The ABI has the following functions defined: ${validFunctionNames}`
    );
  }

  /**
   * Decodes the input data for a FunctionFragment.
   * 
   * @param functionFragment - the function fragment to decode or a string (name, signature or selector)
   * @param data - the input data to decode
   * @returns an array of decoded values or undefined if the data is empty
   * 
   * @throws {FuelError} {@link ErrorCode.FRAGMENT_NOT_FOUND}
   * When the function fragment is not found in the ABI.
   */
  decodeFunctionData(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;
    return fragment.decodeArguments(data);
  }

  /**
   * Encodes the input arguments with a FunctionFragment.
   * 
   * @param functionFragment - the function fragment to encode or a string (name, signature or selector)
   * @param values - the input values to encode
   * @param offset - the offset to start encoding from
   * @returns the encoded input data
   * 
   * @throws {FuelError} {@link ErrorCode.FRAGMENT_NOT_FOUND}
   * When the function fragment is not found in the ABI.
   */
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

  /**
   * For a given function fragment, decodes the output data.
   * 
   * @param functionFragment - the function fragment to decode or a string (name, signature or selector)
   * @param data - the output data to decode
   * @returns an array of decoded values or undefined if the data is empty
   */
  decodeFunctionResult(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    return fragment.decodeOutput(data);
  }

  /**
   * @throws {FuelError} {@link ErrorCode.LOG_TYPE_NOT_FOUND}
   * When the log type with the given log ID is not found in the ABI logged types {@link JsonAbi#loggedTypes}.
   */
  decodeLog(data: BytesLike, logId: number, receiptId: string): any {
    const isExternalLoggedType = this.externalLoggedTypes[receiptId];
    if (isExternalLoggedType) {
      const externalInterface = this.externalLoggedTypes[receiptId];
      return externalInterface.decodeLog(data, logId, receiptId);
    }

    const { loggedType } = findOrThrow(
      this.jsonAbi.loggedTypes,
      (type) => type.logId === logId,
      () => {
        throw new FuelError(
          ErrorCode.LOG_TYPE_NOT_FOUND,
          `Log type with logId '${logId}' doesn't exist in the ABI.`
        );
      }
    );

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
          `A configurable with the "${name}" was not found in the ABI.`
        );
      }
    );

    return AbiCoder.encode(this.jsonAbi, configurable.configurableType, value, {
      isRightPadded: true,
    });
  }

  /**
   * Get the type by its type ID.
   * 
   * @param typeId - the type ID
   * @returns the type from the abi
   * 
   * @throws {FuelError} {@link ErrorCode.TYPE_NOT_FOUND}
   * When the type with the given type ID is not found in the ABI.
   */
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
