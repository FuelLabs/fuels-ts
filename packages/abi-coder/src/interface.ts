/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { versions } from '@fuel-ts/versions';

import { AbiCoder } from './abi-coder';
import type { InputValue } from './coders/abstract-coder';
import { FunctionFragment } from './function-fragment';
import type { JsonAbi, JsonAbiConfigurable } from './json-abi';
import type { InferAbiFunctions } from './type-inferrer/abi-function-inferrer';
import { findOrThrow } from './utilities';

const logger = new Logger(versions.FUELS);

export class Interface<
  const TAbi extends JsonAbi = JsonAbi,
  InferredFns extends Record<string, { input: object; output: unknown }> = InferAbiFunctions<TAbi>
> {
  readonly functions: {
    [FnName in keyof InferredFns]: FunctionFragment<
      InferredFns[FnName]['input'],
      InferredFns[FnName]['output']
    >;
  };

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

    // @ts-expect-error it expects the generic type to be satisfied but it's clear what's going on
    this.functions = Object.fromEntries(
      jsonAbi.functions.map((x) => [x.name, new FunctionFragment(this.jsonAbi, x.name)])
    );

    this.configurables = Object.fromEntries(jsonAbi.configurables.map((x) => [x.name, x]));
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

    if (fn !== undefined) return fn;

    return logger.throwArgumentError(
      `function ${nameOrSignatureOrSelector} not found.`,
      'data',
      fn
    );
  }

  decodeFunctionData(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    if (!fragment) {
      throw new Error('Fragment not found');
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
      throw new Error('Fragment not found');
    }

    // TODO: this function as a whole should be removed when full type inference is implemented,
    // as encoding/decoding should then happen on the FunctionFragment level directly (e.g. abiInterface.functions.main.encodeArguments())
    const input = values.reduce((o, currentValue, idx) => {
      try {
        const obj: Record<string, any> = o;
        obj[fragment.jsonFn.inputs[idx].name] = currentValue;
        return obj;
      } catch {
        throw new Error('Types/values length mismatch');
      }
    }, {} as Record<string, any>);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return fragment.encodeArguments(input, offset);
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

    return AbiCoder.decode(this.jsonAbi, loggedType, arrayify(data), 0);
  }

  updateExternalLoggedTypes(id: string, loggedTypes: Interface) {
    this.externalLoggedTypes[id] = loggedTypes;
  }

  encodeConfigurable(name: string, value: InputValue) {
    const configurable = findOrThrow(
      this.jsonAbi.configurables,
      (c) => c.name === name,
      () => {
        throw new Error(`configurable '${name}' doesn't exist`);
      }
    );

    return AbiCoder.encode(this.jsonAbi, configurable.configurableType, value);
  }

  getTypeById(typeId: number) {
    return findOrThrow(
      this.jsonAbi.types,
      (t) => t.typeId === typeId,
      () => {
        throw new Error(`type with typeId '${typeId}' doesn't exist`);
      }
    );
  }
}
