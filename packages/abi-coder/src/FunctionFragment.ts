import { bufferFromString } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { sha256 } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/interfaces';
import { bn } from '@fuel-ts/math';
import { arrayify } from '@fuel-ts/utils';

import { AbiCoder } from './AbiCoder';
import { ResolvedAbiType } from './ResolvedAbiType';
import type { DecodedValue, InputValue } from './encoding/coders/AbstractCoder';
import { StdStringCoder } from './encoding/coders/StdStringCoder';
import { TupleCoder } from './encoding/coders/TupleCoder';
import type {
  JsonAbi,
  JsonAbiArgument,
  JsonAbiFunction,
  JsonAbiFunctionAttribute,
} from './types/JsonAbi';
import type { EncodingVersion } from './utils/constants';
import { OPTION_CODER_TYPE } from './utils/constants';
import {
  findFunctionByName,
  findNonEmptyInputs,
  findTypeById,
  getEncodingVersion,
} from './utils/json-abi';

export class FunctionFragment<
  TAbi extends JsonAbi = JsonAbi,
  FnName extends TAbi['functions'][number]['name'] = string,
> {
  readonly signature: string;
  readonly selector: string;
  readonly selectorBytes: Uint8Array;
  readonly encoding: EncodingVersion;
  readonly name: string;
  readonly jsonFn: JsonAbiFunction;
  readonly attributes: readonly JsonAbiFunctionAttribute[];

  private readonly jsonAbi: JsonAbi;

  constructor(jsonAbi: JsonAbi, name: FnName) {
    this.jsonAbi = jsonAbi;
    this.jsonFn = findFunctionByName(this.jsonAbi, name);

    this.name = name;
    this.signature = FunctionFragment.getSignature(this.jsonAbi, this.jsonFn);
    this.selector = FunctionFragment.getFunctionSelector(this.signature);
    this.selectorBytes = new StdStringCoder().encode(name);
    this.encoding = getEncodingVersion(jsonAbi.encoding);

    this.attributes = this.jsonFn.attributes ?? [];
  }

  private static getSignature(abi: JsonAbi, fn: JsonAbiFunction): string {
    const inputsSignatures = fn.inputs.map((input) =>
      new ResolvedAbiType(abi, input).getSignature()
    );
    return `${fn.name}(${inputsSignatures.join(',')})`;
  }

  private static getFunctionSelector(functionSignature: string) {
    const hashedFunctionSignature = sha256(bufferFromString(functionSignature, 'utf-8'));
    // get first 4 bytes of signature + 0x prefix. then left-pad it to 8 bytes using toHex(8)
    return bn(hashedFunctionSignature.slice(0, 10)).toHex(8);
  }

  encodeArguments(values: InputValue[]): Uint8Array {
    FunctionFragment.verifyArgsAndInputsAlign(values, this.jsonFn.inputs, this.jsonAbi);

    const shallowCopyValues = values.slice();
    const nonEmptyInputs = findNonEmptyInputs(this.jsonAbi, this.jsonFn.inputs);

    if (Array.isArray(values) && nonEmptyInputs.length !== values.length) {
      shallowCopyValues.length = this.jsonFn.inputs.length;
      shallowCopyValues.fill(undefined as unknown as InputValue, values.length);
    }

    const coders = nonEmptyInputs.map((t) =>
      AbiCoder.getCoder(this.jsonAbi, t, {
        encoding: this.encoding,
      })
    );

    return new TupleCoder(coders).encode(shallowCopyValues);
  }

  private static verifyArgsAndInputsAlign(
    args: InputValue[],
    inputs: readonly JsonAbiArgument[],
    abi: JsonAbi
  ) {
    if (args.length === inputs.length) {
      return;
    }

    const inputTypes = inputs.map((input) => findTypeById(abi, input.type));
    const optionalInputs = inputTypes.filter(
      (x) => x.type === OPTION_CODER_TYPE || x.type === '()'
    );
    if (optionalInputs.length === inputTypes.length) {
      return;
    }
    if (inputTypes.length - optionalInputs.length === args.length) {
      return;
    }

    const errorMsg = `Mismatch between provided arguments and expected ABI inputs. Provided ${
      args.length
    } arguments, but expected ${inputs.length - optionalInputs.length} (excluding ${
      optionalInputs.length
    } optional inputs).`;

    throw new FuelError(ErrorCode.ABI_TYPES_AND_VALUES_MISMATCH, errorMsg);
  }

  decodeArguments(data: BytesLike) {
    const bytes = arrayify(data);
    const nonEmptyInputs = findNonEmptyInputs(this.jsonAbi, this.jsonFn.inputs);

    if (nonEmptyInputs.length === 0) {
      // The VM is current return 0x0000000000000000, but we should treat it as undefined / void
      if (bytes.length === 0) {
        return undefined;
      }

      throw new FuelError(
        ErrorCode.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonEmptyInputs: nonEmptyInputs.length,
            values: bytes.length,
          },
          value: {
            args: this.jsonFn.inputs,
            nonEmptyInputs,
            values: bytes,
          },
        })}`
      );
    }

    const result = nonEmptyInputs.reduce(
      (obj: { decoded: unknown[]; offset: number }, input) => {
        const coder = AbiCoder.getCoder(this.jsonAbi, input, { encoding: this.encoding });
        const [decodedValue, decodedValueByteSize] = coder.decode(bytes, obj.offset);

        return {
          decoded: [...obj.decoded, decodedValue],
          offset: obj.offset + decodedValueByteSize,
        };
      },
      { decoded: [], offset: 0 }
    );

    return result.decoded;
  }

  decodeOutput(data: BytesLike): [DecodedValue | undefined, number] {
    const outputAbiType = findTypeById(this.jsonAbi, this.jsonFn.output.type);
    if (outputAbiType.type === '()') {
      return [undefined, 0];
    }

    const bytes = arrayify(data);
    const coder = AbiCoder.getCoder(this.jsonAbi, this.jsonFn.output, {
      encoding: this.encoding,
    });

    return coder.decode(bytes, 0) as [DecodedValue | undefined, number];
  }

  /**
   * Checks if the function is read-only i.e. it only reads from storage, does not write to it.
   *
   * @returns True if the function is read-only or pure, false otherwise.
   */
  isReadOnly(): boolean {
    const storageAttribute = this.attributes.find((attr) => attr.name === 'storage');
    return !storageAttribute?.arguments.includes('write');
  }
}
