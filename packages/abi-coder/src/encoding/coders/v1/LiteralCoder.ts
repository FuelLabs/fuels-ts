import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { bn, toBytes, toNumber } from '@fuel-ts/math';
import type { BytesLike } from 'ethers';
import { getBytesCopy } from 'ethers';

import {
  B256_CODER_TYPE,
  B512_CODER_TYPE,
  BOOL_CODER_TYPE,
  BYTES_32,
  BYTES_64,
  RAW_PTR_CODER_TYPE,
  U16_CODER_TYPE,
  U32_CODER_TYPE,
  U64_CODER_TYPE,
  U8_CODER_TYPE,
  WORD_SIZE,
} from '../../../utils/constants';
import type { InputValue, ICoder, DecodedValue } from '../../types/ICoder';

type LiteralConfig = {
  matcher: string;
  name: string;
  type: string;
  encodedLength: number;
  encodedTransformer: (value: InputValue) => Uint8Array;
  decodedTransformer: (data: Uint8Array) => DecodedValue;
};

const config: LiteralConfig[] = [
  {
    matcher: BOOL_CODER_TYPE,
    name: 'boolean',
    type: 'boolean',
    encodedLength: 1,
    encodedTransformer: (value: InputValue): Uint8Array => toBytes(value ? 1 : 0, 1) as Uint8Array,
    decodedTransformer: (data: Uint8Array): boolean => Boolean(bn(data).toNumber()).valueOf(),
  },
  {
    matcher: U8_CODER_TYPE,
    name: U8_CODER_TYPE,
    type: U8_CODER_TYPE,
    encodedLength: 1,
    encodedTransformer: (value: InputValue): Uint8Array =>
      toBytes(value as number, 1) as Uint8Array,
    decodedTransformer: (data: Uint8Array): number => toNumber(data),
  },
  {
    matcher: U16_CODER_TYPE,
    name: U16_CODER_TYPE,
    type: U16_CODER_TYPE,
    encodedLength: 2,
    encodedTransformer: (value: InputValue): Uint8Array =>
      toBytes(value as number, 2) as Uint8Array,
    decodedTransformer: (data: Uint8Array): number => toNumber(data),
  },
  {
    matcher: U32_CODER_TYPE,
    name: U32_CODER_TYPE,
    type: U32_CODER_TYPE,
    encodedLength: 4,
    encodedTransformer: (value: InputValue): Uint8Array =>
      toBytes(value as number, 4) as Uint8Array,
    decodedTransformer: (data: Uint8Array): number => toNumber(data),
  },
  {
    matcher: U64_CODER_TYPE,
    name: U64_CODER_TYPE,
    type: U64_CODER_TYPE,
    encodedLength: WORD_SIZE,
    encodedTransformer: (value: InputValue): Uint8Array =>
      toBytes(value as BN, WORD_SIZE) as Uint8Array,
    decodedTransformer: (data: Uint8Array): BN => bn(data),
  },
  {
    matcher: RAW_PTR_CODER_TYPE,
    name: RAW_PTR_CODER_TYPE,
    type: RAW_PTR_CODER_TYPE,
    encodedLength: WORD_SIZE,
    encodedTransformer: (value: InputValue): Uint8Array =>
      toBytes(value as BN, WORD_SIZE) as Uint8Array,
    decodedTransformer: (data: Uint8Array): BN => bn(data),
  },
  {
    matcher: B256_CODER_TYPE,
    name: B256_CODER_TYPE,
    type: B256_CODER_TYPE,
    encodedLength: BYTES_32,
    encodedTransformer: (value: InputValue): Uint8Array => getBytesCopy(value as BytesLike),
    decodedTransformer: (data: Uint8Array): string => bn(data).toHex(BYTES_32),
  },
  {
    matcher: B512_CODER_TYPE,
    name: 'b512',
    type: B512_CODER_TYPE,
    encodedLength: BYTES_64,
    encodedTransformer: (value: InputValue): Uint8Array => getBytesCopy(value as BytesLike),
    decodedTransformer: (data: Uint8Array): string => bn(data).toHex(BYTES_64),
  },
];

const findConfigOrThrow = (name: string) => {
  const found = config.find((c) => c.matcher === name);
  if (!found) {
    throw new Error(`Config not found for ${name}`);
  }
  return found;
};

export class LiteralCoder implements ICoder<InputValue, DecodedValue>, LiteralConfig {
  name: string;
  type: string;
  encodedLength: number;

  matcher: string;

  encodedTransformer: (value: InputValue) => Uint8Array;
  decodedTransformer: (data: Uint8Array) => DecodedValue;

  constructor(resolvedTypeName: string) {
    const { name, type, encodedLength, encodedTransformer, decodedTransformer } =
      findConfigOrThrow(resolvedTypeName);

    this.name = name;
    this.type = type;
    this.encodedLength = encodedLength;

    this.matcher = resolvedTypeName;
    this.encodedTransformer = encodedTransformer;
    this.decodedTransformer = decodedTransformer;
  }

  encode(value: InputValue): Uint8Array {
    return this.encodedTransformer(value);
  }

  decode(data: Uint8Array, offset: number): [DecodedValue, number] {
    const dataBytes = data.slice(offset, offset + this.encodedLength);

    return [this.decodedTransformer(dataBytes), offset + this.encodedLength];
  }
}
