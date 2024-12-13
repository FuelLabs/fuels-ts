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
import type { JsonAbiOld, JsonAbiFunction } from './types/JsonAbi';
import type { AbiFunction, AbiFunctionAttribute } from './types/JsonAbiNew';
import type { EncodingVersion } from './utils/constants';
import { getFunctionInputs } from './utils/getFunctionInputs';
import { findNonVoidInputs, getEncodingVersion } from './utils/json-abi';
import { padValuesWithUndefined } from './utils/padValuesWithUndefined';

export class FunctionFragment {
  readonly signature: string;
  readonly selector: string;
  readonly selectorBytes: Uint8Array;
  readonly encoding: EncodingVersion;
  readonly name: string;
  readonly jsonFn: AbiFunction;
  readonly attributes: readonly AbiFunctionAttribute[];

  private readonly jsonAbiOld: JsonAbiOld;
  private readonly jsonFnOld: JsonAbiFunction;

  constructor(jsonAbi: JsonAbiOld, fn: AbiFunction) {
    this.jsonFn = fn;
    this.jsonAbiOld = jsonAbi;
    this.jsonFnOld = jsonAbi.functions.find((f) => f.name === fn.name) as JsonAbiFunction;
    this.name = fn.name;
    this.signature = FunctionFragment.getSignature(this.jsonAbiOld, this.jsonFnOld);
    this.selector = FunctionFragment.getFunctionSelector(this.signature);
    this.selectorBytes = new StdStringCoder().encode(this.name);
    this.encoding = getEncodingVersion(jsonAbi.encoding);

    this.attributes = this.jsonFn.attributes ?? [];
  }

  private static getSignature(abi: JsonAbiOld, fn: JsonAbiFunction): string {
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
    const inputs = getFunctionInputs({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs });
    const mandatoryInputLength = inputs.filter((i) => !i.isOptional).length;
    if (values.length < mandatoryInputLength) {
      throw new FuelError(
        ErrorCode.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${mandatoryInputLength} arguments, received ${values.length}`
      );
    }

    const coders = this.jsonFnOld.inputs.map((t) =>
      AbiCoder.getCoder(this.jsonAbiOld, t, {
        encoding: this.encoding,
      })
    );

    const argumentValues = padValuesWithUndefined(values, this.jsonFn.inputs);
    return new TupleCoder(coders).encode(argumentValues);
  }

  decodeArguments(data: BytesLike): unknown[] | undefined {
    const bytes = arrayify(data);
    const nonVoidInputs = findNonVoidInputs(this.jsonAbiOld, this.jsonFnOld.inputs);

    if (nonVoidInputs.length === 0) {
      // The VM is current return 0x0000000000000000, but we should treat it as undefined / void
      if (bytes.length === 0) {
        return undefined;
      }

      throw new FuelError(
        ErrorCode.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonVoidInputs: nonVoidInputs.length,
            values: bytes.length,
          },
          value: {
            args: this.jsonFn.inputs,
            nonVoidInputs,
            values: bytes,
          },
        })}`
      );
    }

    const result = this.jsonFnOld.inputs.reduce(
      (obj: { decoded: unknown[]; offset: number }, input) => {
        const coder = AbiCoder.getCoder(this.jsonAbiOld, input, { encoding: this.encoding });
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
    const bytes = arrayify(data);
    const coder = AbiCoder.getCoder(this.jsonAbiOld, this.jsonFnOld.output, {
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
    return !storageAttribute?.arguments?.includes('write');
  }
}
