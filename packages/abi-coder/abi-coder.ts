// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { arrayify, BytesLike, hexConcat } from '@ethersproject/bytes';

import { Logger } from '@ethersproject/logger';
import { ParamType } from '@ethersproject/abi';
import { Coder } from './coders/abstract-coder';

import B256Coder from './coders/b256';
import ByteCoder from './coders/byte';
import BooleanCoder from './coders/boolean';
import NumberCoder from './coders/number';
import ArrayCoder from './coders/array';
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
          (param.components || []).map((component) => {
            return this.getCoder(component);
          }),
          param.name
        );
      default:
    }

    return logger.throwArgumentError('Invalid type', 'type', param.type);
  }

  encode(types: ReadonlyArray<string | ParamType>, values: ReadonlyArray<any>): string {
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

  decode(types: ReadonlyArray<string | ParamType>, data: BytesLike): any[] {
    const bytes = arrayify(data);
    const coders = types.map((type) => this.getCoder(ParamType.from(type)));

    const coder = new TupleCoder(coders, '_');
    const [decoded, newOffset] = coder.decode(bytes, 0);

    if (newOffset != bytes.length) {
      logger.throwError('Types/values length mismatch', Logger.errors.INVALID_ARGUMENT, {
        count: { types: types.length, values: bytes.length },
        value: { types, bytes },
      });
    }

    return decoded;
  }
}
