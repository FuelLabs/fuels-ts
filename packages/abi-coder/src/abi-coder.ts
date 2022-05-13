// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexConcat } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';

import type { DecodedValue, Values } from './coders/abstract-coder';
import type Coder from './coders/abstract-coder';
import ArrayCoder from './coders/array';
import B256Coder from './coders/b256';
import BooleanCoder from './coders/boolean';
import ByteCoder from './coders/byte';
import NumberCoder from './coders/number';
import StringCoder from './coders/string';
import TupleCoder from './coders/tuple';
import { filterEmptyParams } from './coders/utilities';
import type { JsonAbiFragmentType } from './json-abi';

const stringRegEx = /str\[([0-9]+)\]/;
const arrayRegEx = /\[(\w+);\s*([0-9]+)\]/;
/**
 * Used to check if type is a custom struct or enum
 */
const structRegEx = /^(struct|enum)/;
const tuppleRegEx = /^\((.*)\)$/;

const logger = new Logger('0.0.1');

export default class AbiCoder {
  constructor() {
    logger.checkNew(new.target, AbiCoder);
  }

  getCoder(param: JsonAbiFragmentType): Coder {
    const name = param.name || '';

    switch (param.type) {
      case 'u8':
      case 'u16':
      case 'u32':
      case 'u64':
        return new NumberCoder(name, param.type);
      case 'bool':
        return new BooleanCoder(name);
      case 'byte':
        return new ByteCoder(name);
      case 'address':
        return new B256Coder('address', name);
      case 'b256':
        return new B256Coder('address', name);
      // NOTE: this is ethers tuple - should be replaced and refactored
      case 'tuple':
        return new TupleCoder(
          (param.components || []).map((component) => this.getCoder(component)),
          param.type
        );
      default:
    }

    const stringMatch = param.type.match(stringRegEx);
    if (stringMatch !== null) {
      const length = stringMatch[1];

      return new StringCoder(name, parseInt(length, 10));
    }

    const arrayMatch = param.type.match(arrayRegEx);
    if (arrayMatch !== null) {
      const type = arrayMatch[1];
      const length = arrayMatch[2];
      return new ArrayCoder(this.getCoder({ type, name: type }), parseInt(length, 10), name);
    }

    // If type starts with struct/enum we can use the TupleCoder to process it.
    if (structRegEx.test(param.type) && Array.isArray(param.components)) {
      return new TupleCoder(
        param.components.map((component) => this.getCoder(component)),
        param.type
      );
    }

    const tupleMatch = param.type.match(tuppleRegEx);
    if (tupleMatch !== null) {
      const tupleContent = tupleMatch[1];

      return new TupleCoder(
        tupleContent.split(',').map((t) => this.getCoder({ type: t.trim() })),
        param.type
      );
    }

    return logger.throwArgumentError('Invalid type', 'type', param.type);
  }

  encode(
    types: ReadonlyArray<JsonAbiFragmentType>,
    values: Values[] | Record<string, Values>
  ): string {
    const nonEmptyTypes = filterEmptyParams(types);

    if (Array.isArray(values) && nonEmptyTypes.length !== values.length) {
      logger.throwError('Types/values length mismatch', Logger.errors.INVALID_ARGUMENT, {
        count: { types: nonEmptyTypes.length, values: values.length },
        value: { types, values },
      });
    }

    const coders = nonEmptyTypes.map((type) => this.getCoder(type));
    const coder = new TupleCoder(coders, '_');
    return hexConcat(coder.encode(values));
  }

  decode(types: ReadonlyArray<JsonAbiFragmentType>, data: BytesLike): DecodedValue[] | undefined {
    const bytes = arrayify(data);
    const nonEmptyTypes = filterEmptyParams(types);
    const assertParamsMatch = (newOffset: number) => {
      if (newOffset !== bytes.length) {
        logger.throwError('Types/values length mismatch', Logger.errors.INVALID_ARGUMENT, {
          count: { types: nonEmptyTypes.length, values: bytes.length },
          value: { types: nonEmptyTypes, bytes },
        });
      }
    };

    if (types.length === 0 || nonEmptyTypes.length === 0) {
      // The VM is current return 0x0000000000000000, but we should treat it as undefined / void
      assertParamsMatch(bytes.length ? 8 : 0);
      return undefined;
    }

    const coders = nonEmptyTypes.map((type) => this.getCoder(type));
    const coder = new TupleCoder(coders, '_');
    const [decoded, newOffset] = coder.decode(bytes, 0);

    assertParamsMatch(newOffset);

    return decoded;
  }
}
