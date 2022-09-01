// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';

import type { DecodedValue, InputValue } from './coders/abstract-coder';
import type Coder from './coders/abstract-coder';
import ArrayCoder from './coders/array';
import B256Coder from './coders/b256';
import BooleanCoder from './coders/boolean';
import ByteCoder from './coders/byte';
import EnumCoder from './coders/enum';
import NumberCoder from './coders/number';
import OptionCoder from './coders/option';
import StringCoder from './coders/string';
import StructCoder from './coders/struct';
import TupleCoder from './coders/tuple';
import U64Coder from './coders/u64';
import {
  arrayRegEx,
  enumRegEx,
  stringRegEx,
  structRegEx,
  tupleRegEx,
  OPTION_CODER_TYPE,
} from './constants';
import type { JsonAbiFragmentType } from './json-abi';
import { filterEmptyParams, hasOptionTypes } from './utilities';

const logger = new Logger(process.env.BUILD_VERSION || '~');

export default class AbiCoder {
  constructor() {
    logger.checkNew(new.target, AbiCoder);
  }

  getCoder(param: JsonAbiFragmentType): Coder {
    switch (param.type) {
      case 'u8':
      case 'u16':
      case 'u32':
        return new NumberCoder(param.type);
      case 'u64':
        return new U64Coder();
      case 'bool':
        return new BooleanCoder();
      case 'byte':
        return new ByteCoder();
      case 'b256':
        return new B256Coder();
      default:
    }

    const arrayMatch = arrayRegEx.exec(param.type)?.groups;
    if (arrayMatch) {
      const length = parseInt(arrayMatch.length, 10);
      const itemComponent = param.components?.[0];
      if (!itemComponent) {
        throw new Error('Expected array type to have an item component');
      }
      const itemCoder = this.getCoder(itemComponent);
      return new ArrayCoder(itemCoder, length);
    }

    const stringMatch = stringRegEx.exec(param.type)?.groups;
    if (stringMatch) {
      const length = parseInt(stringMatch.length, 10);

      return new StringCoder(length);
    }

    const structMatch = structRegEx.exec(param.type)?.groups;
    if (structMatch && Array.isArray(param.components)) {
      const coders = param.components.reduce((obj, component) => {
        // eslint-disable-next-line no-param-reassign
        obj[component.name] = this.getCoder(component);
        return obj;
      }, {});
      return new StructCoder(structMatch.name, coders);
    }

    const enumMatch = enumRegEx.exec(param.type)?.groups;
    if (enumMatch && Array.isArray(param.components)) {
      const coders = param.components.reduce((obj, component) => {
        // eslint-disable-next-line no-param-reassign
        obj[component.name] = this.getCoder(component);
        return obj;
      }, {});

      const isOptionEnum = param.type === OPTION_CODER_TYPE;
      if (isOptionEnum) {
        return new OptionCoder(enumMatch.name, coders);
      }
      return new EnumCoder(enumMatch.name, coders);
    }

    const tupleMatch = tupleRegEx.exec(param.type)?.groups;
    if (tupleMatch && Array.isArray(param.components)) {
      const coders = param.components.map((component) => this.getCoder(component));
      return new TupleCoder(coders);
    }

    return logger.throwArgumentError('Invalid type', 'type', param.type);
  }

  encode(types: ReadonlyArray<JsonAbiFragmentType>, values: InputValue[]): Uint8Array {
    const nonEmptyTypes = filterEmptyParams(types);
    const shallowCopyValues = values.slice();

    if (Array.isArray(values) && nonEmptyTypes.length !== values.length) {
      if (!hasOptionTypes(types)) {
        logger.throwError('Types/values length mismatch', Logger.errors.INVALID_ARGUMENT, {
          count: { types: nonEmptyTypes.length, values: values.length },
          value: { types, values },
        });
      } else {
        shallowCopyValues.length = types.length;
        shallowCopyValues.fill(undefined as unknown as InputValue, values.length);
      }
    }

    const coders = nonEmptyTypes.map((type) => this.getCoder(type));
    const coder = new TupleCoder(coders);
    return coder.encode(shallowCopyValues);
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
    const coder = new TupleCoder(coders);
    const [decoded, newOffset] = coder.decode(bytes, 0);

    assertParamsMatch(newOffset);

    return decoded as DecodedValue[];
  }
}
