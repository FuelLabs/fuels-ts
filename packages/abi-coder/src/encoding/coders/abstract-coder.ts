import type { BN } from '@fuel-ts/math';
import type { BytesLike } from 'ethers';

import type { Option } from './v0/option';

export type Primitive = string | number | boolean;

/**
 * These are configurable options to be used when encoding.
 *
 * Firstly we should consider the encoding version being used. For more info on this
 * please refer to the fuel specs (https://github.com/FuelLabs/fuel-specs);
 *
 * Encoding Version 0:
 *
 * This is the currently supported version. It offers the following configurable options
 * regarding the encoding of small bytes:
 *
 * These options relates only to:
 *  - NumberCoder (u8, u16, u32)
 *  - BooleanCoder
 *
 * 1) isSmallBytes (default=false)
 *
 * Describes how many bytes it will occupy:
 *
 * false — occupies 8 bytes (default), and should be used when underneath:
 *    • standalone
 *    • tuple
 *    • struct
 *    • enum
 *
 * true — occupies 1 byte, and should be used when underneath:
 *    • array
 *    • vector
 *
 *
 *
 * 2) isRightPadded (default=false)
 *
 * Used only when `isSmallBytes` is FALSE.
 *
 * Describes how the padding should happen:
 *
 *  false —— left padded (default), and should be used when underneath:
 *    • standalone
 *    • array
 *    • vector
 *    • enum
 *    • only one function argument
 *
 *  true —— right padded, and should be used when underneath:
 *    • struct
 *    • tuple
 *    • multiple function arguments
 *    • configurable
 *
 *
 * Encoding Version 1:
 *
 * It currently is supported only by logs, but has no specific configurable options.
 * More information on the improvements made in this version can be found in the
 * fuel specs (https://github.com/FuelLabs/fuel-specs/blob/master/src/abi/argument-encoding.md#version-1
 */
export type EncodingOptions = {
  encoding?: string;
  isSmallBytes?: boolean;
  isRightPadded?: boolean;
};

/**
 * The type of value you can provide to `Coder.encode`
 */
export type InputValue<T = void> =
  | Primitive
  | BN
  | Option<T>
  | BytesLike
  | InputValue[]
  | { [key: string]: InputValue }
  | Record<string, Primitive | BytesLike>;

/**
 * The type of value you can get from `Coder.decode`
 */
export type DecodedValue =
  | Primitive
  | BN
  | DecodedValue[]
  | { [key: string]: DecodedValue }
  | Record<string, Primitive>;

export type TypesOfCoder<TCoder> = TCoder extends Coder<infer TInput, infer TDecoded>
  ? { Input: TInput; Decoded: TDecoded }
  : never;

export abstract class Coder<TInput = unknown, TDecoded = unknown> {
  readonly name: string;
  readonly type: string;
  readonly encodedLength: number;

  constructor(name: string, type: string, encodedLength: number) {
    this.name = name;
    this.type = type;
    this.encodedLength = encodedLength;
  }

  abstract encode(value: TInput, length?: number): Uint8Array;

  abstract decode(data: Uint8Array, offset: number, length?: number): [TDecoded, number];
}
