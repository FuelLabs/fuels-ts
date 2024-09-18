/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import { AbiCoder } from './AbiCoder';
import { FunctionFragment } from './FunctionFragment';
import type { DecodedValue, InputValue } from './encoding/coders/AbstractCoder';
import type { JsonAbiArgument, JsonAbiOld } from './types/JsonAbi';
import type { Configurable, JsonAbi } from './types/JsonAbiNew';
import { type EncodingVersion } from './utils/constants';
import { getEncodingVersion } from './utils/json-abi';
import { parseConcreteType, transpileAbi } from './utils/transpile-abi';

export class Interface {
  readonly functions!: Record<string, FunctionFragment>;
  readonly configurables: Record<string, Configurable>;
  readonly jsonAbi: JsonAbi;
  readonly encoding: EncodingVersion;
  private readonly jsonAbiOld: JsonAbiOld;

  constructor(jsonAbi: JsonAbi) {
    this.jsonAbi = jsonAbi;
    this.encoding = getEncodingVersion(jsonAbi.encodingVersion);
    this.jsonAbiOld = transpileAbi(jsonAbi) as JsonAbiOld;
    this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((fn) => [fn.name, new FunctionFragment(this.jsonAbiOld, fn)])
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

  // Decode the result of a function call
  decodeFunctionResult(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    return fragment.decodeOutput(data);
  }

  decodeLog(data: BytesLike, logId: string): any {
    const loggedType = this.jsonAbiOld.loggedTypes.find((type) => type.logId === logId);
    if (!loggedType) {
      throw new FuelError(
        ErrorCode.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${logId}' doesn't exist in the ABI.`
      );
    }

    return AbiCoder.decode(this.jsonAbiOld, loggedType.loggedType, arrayify(data), 0, {
      encoding: this.encoding,
    });
  }

  encodeConfigurable(name: string, value: InputValue) {
    const configurable = this.jsonAbiOld.configurables.find((c) => c.name === name);
    if (!configurable) {
      throw new FuelError(
        ErrorCode.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${name}' was not found in the ABI.`
      );
    }

    return AbiCoder.encode(this.jsonAbiOld, configurable.configurableType, value, {
      encoding: this.encoding,
    });
  }

  encodeType(concreteTypeId: string, value: InputValue): Uint8Array {
    const typeArg = parseConcreteType(
      this.jsonAbi,
      this.jsonAbiOld.types,
      concreteTypeId,
      ''
    ) as JsonAbiArgument;
    return AbiCoder.encode(this.jsonAbiOld, typeArg, value, {
      encoding: this.encoding,
    });
  }

  decodeType(concreteTypeId: string, data: Uint8Array): [DecodedValue | undefined, number] {
    const typeArg = parseConcreteType(
      this.jsonAbi,
      this.jsonAbiOld.types,
      concreteTypeId,
      ''
    ) as JsonAbiArgument;

    return AbiCoder.decode(this.jsonAbiOld, typeArg, data, 0, { encoding: this.encoding });
  }
}
