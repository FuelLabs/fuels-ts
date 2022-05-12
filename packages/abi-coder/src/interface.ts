/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { toUtf8Bytes } from '@ethersproject/strings';

import AbiCoder from './abi-coder';
import type { Values } from './coders/abstract-coder';
import BooleanCoder from './coders/boolean';
import { filterEmptyParams } from './coders/utilities';
import type { Fragment } from './fragments/fragment';
import FunctionFragment from './fragments/function-fragment';
import type { JsonAbi, JsonAbiFragment } from './json-abi';

const logger = new Logger(process.env.BUILD_VERSION || '~');

const coerceFragments = (value: ReadonlyArray<JsonAbiFragment>): Array<Fragment> => {
  const fragments: Array<Fragment> = [];

  value.forEach((v) => {
    if (v.type === 'function') {
      fragments.push(FunctionFragment.fromObject(v));
    }
  });

  return fragments;
};

export default class Interface {
  readonly fragments: Array<Fragment>;
  readonly functions: { [name: string]: FunctionFragment };
  readonly abiCoder: AbiCoder;

  constructor(jsonAbi: JsonAbi) {
    this.fragments = coerceFragments(jsonAbi);
    this.abiCoder = new AbiCoder();
    this.functions = {};
    this.fragments.forEach((fragment) => {
      let bucket: { [name: string]: Fragment } = {};
      switch (fragment.type) {
        case 'function':
          bucket = this.functions;
          break;
        default:
          return;
      }
      const signature = fragment.format();
      if (bucket[signature]) {
        logger.warn(`duplicate definition - ${signature}`);
        return;
      }
      bucket[signature] = fragment;
    });
  }

  static getSighash(fragment: FunctionFragment | string): string {
    const bytes =
      typeof fragment === 'string' ? toUtf8Bytes(fragment) : toUtf8Bytes(fragment.format());

    return hexlify(concat([new Uint8Array(4), arrayify(sha256(bytes)).slice(0, 4)]));
  }

  getFunction(nameOrSignatureOrSighash: string): FunctionFragment {
    if (this.functions[nameOrSignatureOrSighash]) {
      return this.functions[nameOrSignatureOrSighash];
    }

    const functionFragment = Object.values(this.functions).find(
      (fragment: Fragment) =>
        Interface.getSighash(fragment) === nameOrSignatureOrSighash ||
        fragment.name === nameOrSignatureOrSighash
    );

    if (functionFragment) {
      return functionFragment;
    }

    return logger.throwArgumentError(
      `function ${nameOrSignatureOrSighash} not found.`,
      'data',
      functionFragment
    );
  }

  // Decode the data for a function call (e.g. tx.data)
  decodeFunctionData(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    const bytes = arrayify(data);
    if (hexlify(bytes.slice(0, 8)) !== Interface.getSighash(fragment)) {
      logger.throwArgumentError(
        `data signature does not match function ${fragment.name}.`,
        'data',
        hexlify(bytes)
      );
    }

    return this.abiCoder.decode(fragment.inputs, bytes.slice(16));
  }

  encodeFunctionData(
    functionFragment: FunctionFragment | string,
    values: Array<Values> | Record<string, any>
  ): string {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    if (!fragment) {
      return '';
    }

    const selector = Interface.getSighash(fragment);
    const inputs = filterEmptyParams(fragment.inputs);

    if (inputs.length === 0) {
      return selector;
    }

    const isStruct = !(inputs.length === 1 && inputs[0].type === 'u64');
    const args = this.abiCoder.encode(inputs, values);
    return hexlify(concat([selector, new BooleanCoder('isStruct').encode(isStruct), args]));
  }

  // Decode the result of a function call
  decodeFunctionResult(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    const bytes = arrayify(data);

    return this.abiCoder.decode(fragment.outputs, bytes);
  }

  encodeFunctionResult(
    functionFragment: FunctionFragment | string,
    values: Array<Values> | Record<string, any>
  ): string {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    if (!fragment) {
      return '';
    }

    return this.abiCoder.encode(fragment.outputs, values);
  }
}
