import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { bufferFromString } from '@fuel-ts/crypto';
import { bn } from '@fuel-ts/math';
import { versions } from '@fuel-ts/versions';

import { AbiCoder } from './abi-coder';
import type { DecodedValue, InputValue } from './coders/abstract-coder';
import type { ArrayCoder } from './coders/array';
import { TupleCoder } from './coders/tuple';
import type { U64Coder } from './coders/u64';
import { VecCoder } from './coders/vec';
import { OPTION_CODER_TYPE } from './constants';
import type {
  JsonAbi,
  JsonAbiArgument,
  JsonAbiFunction,
  JsonAbiFunctionAttribute,
} from './json-abi';
import { ResolvedAbiType } from './resolved-abi-type';
import type { ObjValuesTuple } from './type-inferrer/type-utilities';
import type { Uint8ArrayWithDynamicData } from './utilities';
import { isPointerType, unpackDynamicData, findOrThrow, isHeapType } from './utilities';

const logger = new Logger(versions.FUELS);

export class FunctionFragment<
  Input extends Record<string, unknown> | never = never,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Output extends unknown | never = never
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

  constructor(jsonAbi: JsonAbi, name: string) {
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

      return heapCoder.encodedLength;
    } catch (e) {
      return 0;
    }
  }

  private mapInputObjectToArray(input: Input | ObjValuesTuple<Input>) {
    if (Array.isArray(input)) return input;
    const orderedArgNames = this.jsonFn.inputs.map((x) => x.name);
    return (
      Object.entries(input)
        // We sort the input object properties to match the ABI ordering, as their order can be arbitrary
        .sort((a, b) => orderedArgNames.indexOf(a[0]) - orderedArgNames.indexOf(b[0]))
        .map((x) => x[1])
    );
  }

  /*
    This method has overloads to ensure that code using the previous array-as-input approach doesn't break.
    It was initially accepting only arrays and `fuels typegen` was generating typesafe overloads,
    but after the introduction of compile-time ABI type inference, the preferred approach is to pass in an object
    who's keys are the parameters of the corresponding sway function.
   */
  encodeArguments(value: Input, offset?: number): Uint8Array;
  encodeArguments(value: ObjValuesTuple<Input>, offset?: number): Uint8Array;
  encodeArguments(value: Input | ObjValuesTuple<Input>, offset = 0): Uint8Array {
    const inputValuesArray = this.mapInputObjectToArray(value);

    FunctionFragment.verifyArgsAndInputsAlign(inputValuesArray, this.jsonFn.inputs, this.jsonAbi);

    const nonEmptyInputs = this.jsonFn.inputs.filter(
      (x) => findOrThrow(this.jsonAbi.types, (t) => t.typeId === x.type).type !== '()'
    );

    const coders = nonEmptyInputs.map((t) => AbiCoder.getCoder(this.jsonAbi, t));

    const coder = new TupleCoder(coders);

    const shallowCopyValues = inputValuesArray.slice();
    if (Array.isArray(inputValuesArray) && nonEmptyInputs.length !== inputValuesArray.length) {
      shallowCopyValues.length = this.jsonFn.inputs.length;
      shallowCopyValues.fill(undefined as unknown as InputValue, inputValuesArray.length);
    }

    const results: Uint8ArrayWithDynamicData = coder.encode(shallowCopyValues);

    return unpackDynamicData(results, offset, results.byteLength);
  }

  private static verifyArgsAndInputsAlign(
    args: unknown[],
    inputs: readonly JsonAbiArgument[],
    abi: JsonAbi
  ) {
    if (args.length === inputs.length) return;

    const inputTypes = inputs.map((i) => findOrThrow(abi.types, (t) => t.typeId === i.type));
    const optionalInputs = inputTypes.filter(
      (x) => x.type === OPTION_CODER_TYPE || x.type === '()'
    );
    if (optionalInputs.length === inputTypes.length) return;
    if (inputTypes.length - optionalInputs.length === args.length) return;

    throw new Error('Types/values length mismatch');
  }

  decodeArguments(data: BytesLike) {
    const bytes = arrayify(data);
    const nonEmptyInputs = this.jsonFn.inputs.filter(
      (x) => findOrThrow(this.jsonAbi.types, (t) => t.typeId === x.type).type !== '()'
    );

    if (nonEmptyInputs.length === 0) {
      // The VM is current return 0x0000000000000000, but we should treat it as undefined / void
      if (bytes.length === 0) return undefined;

      logger.throwError(
        'Types/values length mismatch during decode',
        Logger.errors.INVALID_ARGUMENT,
        {
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
        }
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
    if (outputAbiType.type === '()') return [undefined, 0];

    const bytes = arrayify(data);
    const coder = AbiCoder.getCoder(this.jsonAbi, this.jsonFn.output);

    if (outputAbiType.type === 'raw untyped slice') {
      (coder as ArrayCoder<U64Coder>).length = bytes.length / 8;
    }

    return coder.decode(bytes, 0) as [DecodedValue | undefined, number];
  }
}
