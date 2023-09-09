import { ErrorCode, FuelError } from '@fuel-ts/errors';
import BnJs from 'bn.js';

import { DECIMAL_UNITS, DEFAULT_MIN_PRECISION, DEFAULT_PRECISION } from './configs';
import { toFixed } from './decimal';
import type { FormatConfig } from './types';

type CompareResult = -1 | 0 | 1;
export type BNInput = number | string | number[] | Uint8Array | Buffer | BnJs;
interface BNHelper {
  caller(v: BNInput, methodName: string): BN | boolean | CompareResult;
  toHex: (bytesPadding?: number) => string;
  toBytes: (bytesPadding?: number) => Uint8Array;
  toJSON: () => string;
}
interface BNInputOverrides {
  add: (v: BNInput) => BN;
  pow: (v: BNInput) => BN;
  sub: (v: BNInput) => BN;
  div: (v: BNInput) => BN;
  mul: (v: BNInput) => BN;
  mod: (v: BNInput) => BN;
  divRound: (v: BNInput) => BN;
  lt: (v: BNInput) => boolean;
  lte: (v: BNInput) => boolean;
  gt: (v: BNInput) => boolean;
  gte: (v: BNInput) => boolean;
  eq: (v: BNInput) => boolean;
  cmp: (v: BNInput) => CompareResult;
}
interface BNOverrides {
  sqr: () => BN;
  neg: () => BN;
  abs: () => BN;
  toTwos: (width: number) => BN;
  fromTwos: (width: number) => BN;
}
interface BNHiddenTypes {
  mulTo: (num: BN, out: BN) => BN;
  divmod: (num: BNInput, mode?: string, positive?: boolean) => { mod: BN; div: BN };
}
type BNInputOverridesKeys = keyof BNInputOverrides;

export class BN extends BnJs implements BNInputOverrides, BNHiddenTypes, BNHelper, BNOverrides {
  constructor(value?: BNInput | null, base?: number | 'hex', endian?: BnJs.Endianness) {
    if (BN.isBN(value)) {
      super(value.toArray(), base, endian);
      return;
    }
    // trim '0x' from hex strings as BN doesn't support it - https://github.com/ChainSafe/web3.js/issues/3847
    if (typeof value === 'string' && value.slice(0, 2) === '0x') {
      super(value.substring(2), base || 'hex', endian);
      return;
    }
    const defaultValue = value == null ? 0 : value;
    super(defaultValue, base, endian);
  }

  // ANCHOR: HELPERS
  // make sure we always include `0x` in hex strings
  toString(base?: number | 'hex', length?: number) {
    const output = super.toString(base, length);

    if (base === 16 || base === 'hex') return `0x${output}`;

    return output;
  }

  toHex(bytesPadding?: number): string {
    const bytes = bytesPadding || 0;
    const bytesLength = bytes * 2;

    if (this.isNeg()) {
      throw new FuelError(ErrorCode.CONVERTING_FAILED, 'Cannot convert negative value to hex.');
    }
    if (bytesPadding && this.byteLength() > bytesPadding) {
      throw new FuelError(
        ErrorCode.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${bytesPadding} bytes.`
      );
    }

    return this.toString(16, bytesLength);
  }

  toBytes(bytesPadding?: number): Uint8Array {
    if (this.isNeg()) {
      throw new FuelError(ErrorCode.CONVERTING_FAILED, 'Cannot convert negative value to bytes.');
    }

    return Uint8Array.from(this.toArray(undefined, bytesPadding));
  }

  toJSON(): string {
    return this.toString(16);
  }

  valueOf(): string {
    return this.toString();
  }

  format(options?: FormatConfig): string {
    const {
      units = DECIMAL_UNITS,
      precision = DEFAULT_PRECISION,
      minPrecision = DEFAULT_MIN_PRECISION,
    } = options || {};

    const formattedUnits = this.formatUnits(units);
    const formattedFixed = toFixed(formattedUnits, { precision, minPrecision });

    // increase precision if formatted is zero, but has more numbers out of precision
    if (!parseFloat(formattedFixed)) {
      const [, originalDecimals = '0'] = formattedUnits.split('.');
      const firstNonZero = originalDecimals.match(/[1-9]/);

      if (firstNonZero && firstNonZero.index && firstNonZero.index + 1 > precision) {
        const [valueUnits = '0'] = formattedFixed.split('.');
        return `${valueUnits}.${originalDecimals.slice(0, firstNonZero.index + 1)}`;
      }
    }

    return formattedFixed;
  }

  formatUnits(units: number = DECIMAL_UNITS): string {
    const valueUnits = this.toString().slice(0, units * -1);
    const valueDecimals = this.toString().slice(units * -1);
    const length = valueDecimals.length;
    const defaultDecimals = Array.from({ length: units - length })
      .fill('0')
      .join('');
    const integerPortion = valueUnits ? `${valueUnits}.` : '0.';

    return `${integerPortion}${defaultDecimals}${valueDecimals}`;
  }
  // END ANCHOR: HELPERS

  // ANCHOR: OVERRIDES to accept better inputs
  add(v: BNInput): BN {
    return this.caller(v, 'add') as BN;
  }

  pow(v: BNInput): BN {
    return this.caller(v, 'pow') as BN;
  }

  sub(v: BNInput): BN {
    return this.caller(v, 'sub') as BN;
  }

  div(v: BNInput): BN {
    return this.caller(v, 'div') as BN;
  }

  mul(v: BNInput): BN {
    return this.caller(v, 'mul') as BN;
  }

  mod(v: BNInput): BN {
    return this.caller(v, 'mod') as BN;
  }

  divRound(v: BNInput): BN {
    return this.caller(v, 'divRound') as BN;
  }

  lt(v: BNInput): boolean {
    return this.caller(v, 'lt') as boolean;
  }

  lte(v: BNInput): boolean {
    return this.caller(v, 'lte') as boolean;
  }

  gt(v: BNInput): boolean {
    return this.caller(v, 'gt') as boolean;
  }

  gte(v: BNInput): boolean {
    return this.caller(v, 'gte') as boolean;
  }

  eq(v: BNInput): boolean {
    return this.caller(v, 'eq') as boolean;
  }

  cmp(v: BNInput): CompareResult {
    return this.caller(v, 'cmp') as CompareResult;
  }
  // END ANCHOR: OVERRIDES to accept better inputs

  // ANCHOR: OVERRIDES to output our BN type
  sqr(): BN {
    return new BN(super.sqr().toArray());
  }

  neg(): BN {
    return new BN(super.neg().toArray());
  }

  abs(): BN {
    return new BN(super.abs().toArray());
  }

  toTwos(width: number): BN {
    return new BN(super.toTwos(width).toArray());
  }

  fromTwos(width: number): BN {
    return new BN(super.fromTwos(width).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type

  // ANCHOR: OVERRIDES to avoid losing references
  caller(v: BNInput, methodName: BNInputOverridesKeys): BN | boolean | CompareResult {
    const output = super[methodName](new BN(v));

    if (BN.isBN(output)) {
      return new BN(output.toArray());
    }

    if (typeof output === 'boolean') {
      return output as boolean;
    }

    return output as CompareResult;
  }

  clone() {
    return new BN(this.toArray());
  }

  mulTo(num: BN, out: BN) {
    const output: BnJs = (new BnJs(this.toArray()) as BN).mulTo(num, out);

    return new BN(output.toArray());
  }

  egcd(p: BnJs) {
    const { a, b, gcd } = new BnJs(this.toArray()).egcd(p);

    return {
      a: new BN(a.toArray()),
      b: new BN(b.toArray()),
      gcd: new BN(gcd.toArray()),
    };
  }

  divmod(num: BNInput, mode?: string, positive?: boolean): { mod: BN; div: BN } {
    const { div, mod } = (new BnJs(this.toArray()) as BN).divmod(new BN(num), mode, positive);

    return {
      div: new BN(div?.toArray()),
      mod: new BN(mod?.toArray()),
    };
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}

// functional shortcut to create BN
export const bn = (value?: BNInput | null, base?: number | 'hex', endian?: BnJs.Endianness) =>
  new BN(value, base, endian);

bn.parseUnits = (value: string, units: number = DECIMAL_UNITS): BN => {
  const valueToParse = value === '.' ? '0.' : value;
  const [valueUnits = '0', valueDecimals = '0'] = valueToParse.split('.');
  const length = valueDecimals.length;

  if (length > units) {
    throw new FuelError(
      ErrorCode.CONVERTING_FAILED,
      `Decimal can't have more than ${units} digits.`
    );
  }

  const decimals = Array.from({ length: units }).fill('0');
  decimals.splice(0, length, valueDecimals);
  const amount = `${valueUnits.replaceAll(',', '')}${decimals.join('')}`;
  return bn(amount);
};
