/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify, BytesLike, concat, hexlify } from '@ethersproject/bytes';
import { toUtf8Bytes } from '@ethersproject/strings';

import { sha256 } from '@ethersproject/sha2';
import { Logger } from '@ethersproject/logger';

import FunctionFragment from './fragments/function-fragment';
import { Fragment, JsonFragment } from './fragments/fragment';
import AbiCoder from './abi-coder';

const logger = new Logger('0.0.1');

const coerceFragments = (value: ReadonlyArray<JsonFragment>): Array<Fragment> => {
  const fragments: Array<Fragment> = [];

  value.forEach((v) => {
    if (v.type === 'function') {
      fragments.push(FunctionFragment.fromObject(v));
    }
  });

  return fragments;
};

export default class Interface {
  // Keyable
  [key: string]: any;
  readonly fragments: Array<Fragment>;
  readonly functions: { [name: string]: FunctionFragment };
  readonly abiCoder: AbiCoder;

  constructor(fragments: ReadonlyArray<JsonFragment>) {
    this.fragments = coerceFragments(fragments);
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
      Object.defineProperty(this, fragment.name, {
        value: (...args: any[]) => this.encodeFunctionData(fragment, args),
        writable: false,
      });
      Object.defineProperty(this, `decode_${fragment.name}`, {
        value: (arg: string) => this.decodeFunctionData(fragment, arg),
        writable: false,
      });
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

    return this.abiCoder.decode(fragment.inputs, bytes.slice(8));
  }

  encodeFunctionData(
    functionFragment: FunctionFragment | string,
    values: ReadonlyArray<any> = []
  ): string {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    if (!fragment) {
      return '';
    }

    return hexlify(
      concat([Interface.getSighash(fragment), this.abiCoder.encode(fragment.inputs, values)])
    );
  }
}
