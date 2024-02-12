import { bufferFromString } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import type { BytesLike } from 'ethers';
import { sha256, getBytesCopy } from 'ethers';

import { AbiCoder } from './AbiCoder';
import { ResolvedAbiType } from './ResolvedAbiType';
import type { DecodedValue, InputValue } from './encoding/coders/AbstractCoder';
import { ByteCoder } from './encoding/coders/v0/ByteCoder';
import { TupleCoder } from './encoding/coders/v0/TupleCoder';
import { VecCoder } from './encoding/coders/v0/VecCoder';
import type {
  JsonAbi,
  JsonAbiArgument,
  JsonAbiFunction,
  JsonAbiFunctionAttribute,
} from './encoding/types/JsonAbi';
import { OPTION_CODER_TYPE } from './encoding/utils/constants';
import type { Uint8ArrayWithDynamicData } from './encoding/utils/utilities';
import {
  isPointerType,
  unpackDynamicData,
  findOrThrow,
  isHeapType,
} from './encoding/utils/utilities';

export class FunctionFragment<
  TAbi extends JsonAbi = JsonAbi,
  FnName extends TAbi['functions'][number]['name'] = string,
> {
  readonly signature: string;
  readonly selector: string;
  readonly name: string;
  readonly jsonFn: JsonAbiFunction;
  readonly attributes: readonly JsonAbiFunctionAttribute[];
  readonly isInputDataPointer: boolean;
  readonly outputMetadata: {
    isHeapType: boolean;
    encodedLength: number;
  };

  private readonly jsonAbi: JsonAbi;

  constructor(jsonAbi: JsonAbi, name: FnName) {
    this.jsonAbi = jsonAbi;
    this.jsonFn = findOrThrow(this.jsonAbi.functions, (f) => f.name === name);
    this.name = name;
    this.signature = FunctionFragment.getSignature(this.jsonAbi, this.jsonFn);
    this.selector = FunctionFragment.getFunctionSelector(this.signature);
    this.isInputDataPointer = this.#isInputDataPointer();
    this.outputMetadata = {
      isHeapType: this.#isOutputDataHeap(),
      encodedLength: this.#getOutputEncodedLength(),
    };

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

  #isInputDataPointer(): boolean {
    const inputTypes = this.jsonFn.inputs.map((i) =>
      this.jsonAbi.types.find((t) => t.typeId === i.type)
    );

    return this.jsonFn.inputs.length > 1 || isPointerType(inputTypes[0]?.type || '');
  }

  #isOutputDataHeap(): boolean {
    const outputType = findOrThrow(this.jsonAbi.types, (t) => t.typeId === this.jsonFn.output.type);

    return isHeapType(outputType?.type || '');
  }

  #getOutputEncodedLength(): number {
    try {
      const heapCoder = AbiCoder.getCoder(this.jsonAbi, this.jsonFn.output);
      if (heapCoder instanceof VecCoder) {
        return heapCoder.coder.encodedLength;
      }
      if (heapCoder instanceof ByteCoder) {
        return ByteCoder.memorySize;
      }

      return heapCoder.encodedLength;
    } catch (e) {
      return 0;
    }
  }

  encodeArguments(values: InputValue[], offset = 0): Uint8Array {
    FunctionFragment.verifyArgsAndInputsAlign(values, this.jsonFn.inputs, this.jsonAbi);

    const shallowCopyValues = values.slice();

    const nonEmptyInputs = this.jsonFn.inputs.filter(
      (x) => findOrThrow(this.jsonAbi.types, (t) => t.typeId === x.type).type !== '()'
    );

    if (Array.isArray(values) && nonEmptyInputs.length !== values.length) {
      shallowCopyValues.length = this.jsonFn.inputs.length;
      shallowCopyValues.fill(undefined as unknown as InputValue, values.length);
    }

    const coders = nonEmptyInputs.map((t) =>
      AbiCoder.getCoder(this.jsonAbi, t, {
        isRightPadded: nonEmptyInputs.length > 1,
      })
    );

    const coder = new TupleCoder(coders);
    const results: Uint8ArrayWithDynamicData = coder.encode(shallowCopyValues);

    return unpackDynamicData(results, offset, results.byteLength);
  }

  private static verifyArgsAndInputsAlign(
    args: InputValue[],
    inputs: readonly JsonAbiArgument[],
    abi: JsonAbi
  ) {
    if (args.length === inputs.length) {
      return;
    }

    const inputTypes = inputs.map((i) => findOrThrow(abi.types, (t) => t.typeId === i.type));
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
    const bytes = getBytesCopy(data);
    const nonEmptyInputs = this.jsonFn.inputs.filter(
      (x) => findOrThrow(this.jsonAbi.types, (t) => t.typeId === x.type).type !== '()'
    );

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
        const coder = AbiCoder.getCoder(this.jsonAbi, input);
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
    const outputAbiType = findOrThrow(
      this.jsonAbi.types,
      (t) => t.typeId === this.jsonFn.output.type
    );
    if (outputAbiType.type === '()') {
      return [undefined, 0];
    }

    const bytes = getBytesCopy(data);
    const coder = AbiCoder.getCoder(this.jsonAbi, this.jsonFn.output);

    return coder.decode(bytes, 0) as [DecodedValue | undefined, number];
  }
}
