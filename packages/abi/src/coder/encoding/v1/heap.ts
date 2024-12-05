import { FuelError } from '@fuel-ts/errors';
import { concat, toUtf8Bytes, toUtf8String } from '@fuel-ts/utils';

import { MAX_BYTES } from '../../constants';
import {
  BYTE_TYPE,
  RAW_SLICE_TYPE,
  STD_STRING_TYPE,
  STR_SLICE_TYPE,
  VECTOR_TYPE,
} from '../encoding-constants';
import type { Coder, CoderType, GetCoderFn, GetCoderParams } from '../encoding-types';
import { assertEncodedLengthEquals } from '../validation';

import { u64 } from './fixed';

const createHeapType = <TEncoded extends { length: number }, TDecoded>({
  type,
  encode,
  decode,
}: Coder<TEncoded, TDecoded>): Coder<TEncoded, TDecoded> => ({
  type,
  encode: (value: TEncoded) => {
    try {
      // Encode the length of the bytes
      const dataLengthBytes = u64.encode(value.length);

      // Encode the value
      const valueBytes = encode(value);

      // Concatenate the encoded length with the bytes
      return concat([dataLengthBytes, valueBytes]);
    } catch (error) {
      throw new FuelError(FuelError.CODES.ENCODE_ERROR, `Invalid ${type} value.`, {
        value,
      });
    }
  },
  decode: (data: Uint8Array, initialOffset = 0): [TDecoded, number] => {
    try {
      // Obtain the length of the bytes
      const [dataLengthBn, dataLowerOffset] = u64.decode(data, initialOffset);
      const dataLength = dataLengthBn.toNumber();

      // Obtain the data bytes
      const dataUpperOffset = dataLowerOffset + dataLength;
      const dataBytes = data.slice(dataLowerOffset, dataUpperOffset);
      assertEncodedLengthEquals(dataBytes, dataLength, type);

      return decode(dataBytes, dataUpperOffset);
    } catch (error) {
      throw new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid ${type} data - malformed bytes.`, {
        data,
      });
    }
  },
});

/**
 * Byte
 */
const byteTransformer: Coder<Uint8Array | number[], Uint8Array> = {
  type: BYTE_TYPE,
  encode: (value: Uint8Array | number[]) => (Array.isArray(value) ? new Uint8Array(value) : value),
  decode: (data: Uint8Array, offset: number): [Uint8Array, number] => [data, offset],
};
export const byte: Coder<Uint8Array | number[], Uint8Array> = createHeapType(byteTransformer);

/**
 * Raw slice
 */
const rawSliceTransformer: Coder<number[]> = {
  type: RAW_SLICE_TYPE,
  encode: (value: number[]) => new Uint8Array(value),
  decode: (data: Uint8Array, offset: number): [number[], number] => [Array.from(data), offset],
};
export const rawSlice: Coder<number[]> = createHeapType(rawSliceTransformer);

/**
 * String based coders
 */
const createStringCoder = (type: CoderType): Coder<string, string> =>
  createHeapType({
    type,
    encode: (value: string) => toUtf8Bytes(value),
    decode: (data: Uint8Array, offset: number): [string, number] => [toUtf8String(data), offset],
  });

export const stdString = createStringCoder(STD_STRING_TYPE);
export const str = createStringCoder(STR_SLICE_TYPE);

/**
 * Vec
 */
type VecEncodedValue<TCoder extends Coder = Coder> =
  | Array<ReturnType<TCoder['encode']>[0]>
  | Uint8Array;
type VecDecodedValue<TCoder extends Coder = Coder> =
  | Array<ReturnType<TCoder['decode']>[0]>
  | Uint8Array;

const isUint8Array = (value: unknown): value is Uint8Array => value instanceof Uint8Array;

export const vector = <TCoder extends Coder>(coder: TCoder): Coder<VecDecodedValue<TCoder>> => ({
  type: VECTOR_TYPE,
  encode: (value: VecEncodedValue<TCoder>): Uint8Array => {
    if (!Array.isArray(value) && !isUint8Array(value)) {
      throw new FuelError(
        FuelError.CODES.ENCODE_ERROR,
        `Invalid ${VECTOR_TYPE} value - expected array value, or a Uint8Array.`,
        { value }
      );
    }

    try {
      const valueArray = Array.isArray(value) ? value : Array.from(value);

      // Encode the length of the bytes
      const dataLengthBytes = u64.encode(valueArray.length);

      // Encode the value
      const valueBytes = valueArray.map((elementValue) => coder.encode(elementValue));

      // Concatenate the encoded length with the bytes
      return concat([dataLengthBytes, ...valueBytes]);
    } catch (error) {
      throw new FuelError(
        FuelError.CODES.ENCODE_ERROR,
        `Invalid ${VECTOR_TYPE} value - cannot encode element.`,
        { value }
      );
    }
  },
  decode: (data: Uint8Array, initialOffset = 0): [VecDecodedValue<TCoder>, number] => {
    if (data.length > MAX_BYTES) {
      throw new FuelError(
        FuelError.CODES.DECODE_ERROR,
        `Invalid ${VECTOR_TYPE} data - exceeds maximum bytes.`,
        {
          data,
          length: data.length,
          maxLength: MAX_BYTES,
        }
      );
    }

    try {
      // Obtain the length of the bytes
      const [dataLengthBn, dataLowerOffset] = u64.decode(data, initialOffset);
      const dataLength = dataLengthBn.toNumber();

      // Obtain the data bytes
      const elements: unknown[] = [];
      let offset = dataLowerOffset;
      for (let i = 0; i < dataLength; i++) {
        const [decodedElement, elementOffset] = coder.decode(data, offset);
        offset = elementOffset;
        elements.push(decodedElement);
      }

      return [elements as VecDecodedValue<TCoder>, offset];
    } catch (error) {
      throw new FuelError(
        FuelError.CODES.DECODE_ERROR,
        `Invalid ${VECTOR_TYPE} data - malformed bytes.`,
        {
          data,
        }
      );
    }
  },
});

vector.fromAbi = ({ name, type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Vec type is missing an item of 'components'.`);
  }

  const bufferComponent = components.find((component) => component.name === 'buf');
  if (!bufferComponent) {
    throw new Error(`The Vec type provided is missing or has a malformed 'buf' component.`);
  }

  const vecElementCoder = getCoder(bufferComponent);
  return vector(vecElementCoder);
};
