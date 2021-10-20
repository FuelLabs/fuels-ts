// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { ParamType } from '@ethersproject/abi';
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

const logger = new Logger('0.0.1');

export default class AbiCoder {
  constructor() {
    logger.checkNew(new.target, AbiCoder);
  }

  getCoder(param: ParamType): Coder {
    switch (param.baseType) {
      case 'u8':
      case 'u16':
      case 'u32':
      case 'u64':
        return new NumberCoder(param.name, param.baseType);
      case 'bool':
        return new BooleanCoder(param.name);
      case 'byte':
        return new ByteCoder(param.name);
      case 'address':
        return new B256Coder(param.name, 'address');
      case 'b256':
        return new B256Coder(param.name, 'b256');
      case 'array':
        return new ArrayCoder(this.getCoder(param.arrayChildren), param.arrayLength, param.name);
      case 'str':
        return new StringCoder(param.name);
      case 'tuple':
        return new TupleCoder(
          (param.components || []).map((component) => this.getCoder(component)),
          param.name
        );
      default:
    }

    return logger.throwArgumentError('Invalid type', 'type', param.type);
  }

  encode(types: ReadonlyArray<string | ParamType>, values: ReadonlyArray<Values>): string {
    if (types.length !== values.length) {
      logger.throwError('Types/values length mismatch', Logger.errors.INVALID_ARGUMENT, {
        count: { types: types.length, values: values.length },
        value: { types, values },
      });
    }

    const coders = types.map((type) => this.getCoder(ParamType.from(type)));
    const coder = new TupleCoder(coders, '_');
    return hexConcat(coder.encode(values));
  }

  decode(types: ReadonlyArray<string | ParamType>, data: BytesLike): DecodedValue {
    const bytes = arrayify(data);
    const coders = types.map((type) => this.getCoder(ParamType.from(type)));

    const coder = new TupleCoder(coders, '_');
    const [decoded, newOffset] = coder.decode(bytes, 0);

    if (newOffset !== bytes.length) {
      logger.throwError('Types/values length mismatch', Logger.errors.INVALID_ARGUMENT, {
        count: { types: types.length, values: bytes.length },
        value: { types, bytes },
      });
    }

    return decoded;
  }
}
