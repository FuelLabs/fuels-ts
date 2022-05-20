import type { BytesLike } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';

const logger = new Logger(process.env.BUILD_VERSION || '~');

type Primitive = string | number | boolean | bigint;

/**
 * The type of value you can provide to `Coder.encode`
 */
export type InputValue =
  | Primitive
  | BytesLike
  | InputValue[]
  | { [key: string]: InputValue }
  | Record<string, Primitive | BytesLike>;

/**
 * The type of value you can get from `Coder.decode`
 */
export type DecodedValue =
  | Primitive
  | DecodedValue[]
  | { [key: string]: DecodedValue }
  | Record<string, Primitive>;

export type TypesOfCoder<TCoder> = TCoder extends Coder<infer TInput, infer TDecoded>
  ? { Input: TInput; Decoded: TDecoded }
  : never;

export default abstract class Coder<TInput = unknown, TDecoded = unknown> {
  // The coder name:
  //   - address, uint256, tuple, array, etc.
  readonly name: string;

  // The fully expanded type, including composite types:
  //   - address, u16, tuple(address,bytes)
  readonly type: string;

  constructor(name: string, type: string) {
    // @TODO: defineReadOnly these
    this.name = name;
    this.type = type;
  }

  throwError(message: string, value: unknown): never {
    logger.throwArgumentError(message, this.name, value);
    // `logger.throwArgumentError` throws, but TS doesn't know it
    // so we throw here to make sure our `never` works
    throw new Error('unreachable');
  }

  abstract encode(value: TInput, length?: number): Uint8Array;

  abstract decode(data: Uint8Array, offset: number, length?: number): [TDecoded, number];
}
