import type { BN } from '@fuel-ts/math';
import { bn, toBytes, toNumber } from '@fuel-ts/math';

import {
  BOOL_CODER_TYPE,
  U16_CODER_TYPE,
  U32_CODER_TYPE,
  U64_CODER_TYPE,
  U8_CODER_TYPE,
  WORD_SIZE,
} from '../../utils/constants';
import { Coder } from '../AbstractCoder';
import type { DecodedValue, InputValue } from '../AbstractCoder';

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
    // Fix encode input type
    encodedTransformer: (value: InputValue): Uint8Array => toBytes(value ? 1 : 0, 1) as Uint8Array,
    decodedTransformer: (data: Uint8Array): boolean => Boolean(bn(data).toNumber()).valueOf(),
  },
  {
    matcher: U8_CODER_TYPE,
    name: U8_CODER_TYPE,
    type: U8_CODER_TYPE,
    encodedLength: 1,
    // Fix encode input type
    encodedTransformer: (value: InputValue): Uint8Array =>
      toBytes(value as number, 1) as Uint8Array,
    decodedTransformer: (data: Uint8Array): number => toNumber(data),
  },
  {
    matcher: U16_CODER_TYPE,
    name: U16_CODER_TYPE,
    type: U16_CODER_TYPE,
    encodedLength: 2,
    // Fix encode input type
    encodedTransformer: (value: InputValue): Uint8Array =>
      toBytes(value as number, 2) as Uint8Array,
    decodedTransformer: (data: Uint8Array): number => toNumber(data),
  },
  {
    matcher: U32_CODER_TYPE,
    name: U32_CODER_TYPE,
    type: U32_CODER_TYPE,
    encodedLength: 4,
    // Fix encode input type
    encodedTransformer: (value: InputValue): Uint8Array =>
      toBytes(value as number, 4) as Uint8Array,
    decodedTransformer: (data: Uint8Array): number => toNumber(data),
  },
  {
    matcher: U64_CODER_TYPE,
    name: U64_CODER_TYPE,
    type: U64_CODER_TYPE,
    encodedLength: WORD_SIZE,
    // Fix encode input type
    encodedTransformer: (value: InputValue): Uint8Array =>
      toBytes(value as number, WORD_SIZE) as Uint8Array,
    decodedTransformer: (data: Uint8Array): BN => bn(data),
  },
];

const findConfigOrThrow = (name: string) => {
  const found = config.find((c) => c.matcher === name);
  if (!found) {
    throw new Error(`Config not found for ${name}`);
  }
  return found;
};

export class LiteralCoder extends Coder implements LiteralConfig {
  matcher: string;

  encodedTransformer: (value: InputValue) => Uint8Array;
  decodedTransformer: (data: Uint8Array) => DecodedValue;

  constructor(resolvedTypeName: string) {
    const { name, type, encodedLength, encodedTransformer, decodedTransformer } =
      findConfigOrThrow(resolvedTypeName);

    super(name, type, encodedLength);
    this.matcher = resolvedTypeName;
    this.encodedTransformer = encodedTransformer;
    this.decodedTransformer = decodedTransformer;
  }

  encode(value: InputValue): Uint8Array {
    return this.encodedTransformer(value);
  }

  decode(data: Uint8Array, offset: number): [DecodedValue, number] {
    const byteData = data.slice(offset, offset + this.encodedLength);
    return [this.decodedTransformer(byteData), offset + this.encodedLength];
  }
}
