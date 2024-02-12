import { bn } from '@fuel-ts/math';
import { toUtf8Bytes, toUtf8String } from 'ethers';

import {
  DYNAMIC_LEN,
  STD_STRING_CODER_TYPE,
  U64_CODER_TYPE,
  WORD_SIZE,
} from '../../../utils/constants';
import type { DecodedValue, ICoder, InputValue } from '../../types/ICoder';

import { LiteralCoder } from './LiteralCoder';

type DynamicConfig = {
  matcher: string;
  name: string;
  type: string;
  encodedTransformer: (value: InputValue) => Uint8Array;
  decodedTransformer: (data: Uint8Array) => DecodedValue;
};

const config: DynamicConfig[] = [
  {
    matcher: STD_STRING_CODER_TYPE,
    name: STD_STRING_CODER_TYPE,
    type: STD_STRING_CODER_TYPE,
    encodedTransformer: (value: InputValue): Uint8Array => toUtf8Bytes(value as string),
    decodedTransformer: (data: Uint8Array): string => toUtf8String(data),
  },
];

const findConfigOrThrow = (name: string) => {
  const found = config.find((c) => c.matcher === name);
  if (!found) {
    throw new Error(`Config not found for ${name}`);
  }
  return found;
};

export class DynamicCoder implements ICoder<InputValue, DecodedValue> {
  name: string;
  type: string;
  encodedLength: number;

  matcher: string;

  encodedTransformer: (value: InputValue) => Uint8Array;
  decodedTransformer: (data: Uint8Array) => DecodedValue;

  constructor(resolvedTypeName: string) {
    const { name, type, encodedTransformer, decodedTransformer } =
      findConfigOrThrow(resolvedTypeName);

    this.name = name;
    this.type = type;
    this.encodedLength = WORD_SIZE;

    this.matcher = resolvedTypeName;

    this.encodedTransformer = encodedTransformer;
    this.decodedTransformer = decodedTransformer;
  }

  encode(value: InputValue): Uint8Array {
    const encodedBytes = this.encodedTransformer(value);
    const lengthBytes = new LiteralCoder(U64_CODER_TYPE).encode(encodedBytes.length);
    this.encodedLength += encodedBytes.length;
    return new Uint8Array([...lengthBytes, ...encodedBytes]);
  }

  decode(data: Uint8Array, offset: number): [DecodedValue, number] {
    const lengthBytes = data.slice(offset, offset + DYNAMIC_LEN);
    const length = bn(
      new LiteralCoder(U64_CODER_TYPE).decode(lengthBytes, 0)[0] as number
    ).toNumber();
    const dataBytes = data.slice(offset + DYNAMIC_LEN, offset + DYNAMIC_LEN + length);
    this.encodedLength += length;

    return [this.decodedTransformer(dataBytes), offset + this.encodedLength];
  }
}
