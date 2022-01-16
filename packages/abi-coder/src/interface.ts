/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { toUtf8Bytes } from '@ethersproject/strings';

import { BooleanCoder } from '.';
import AbiCoder from './abi-coder';
import type { Fragment, JsonFragment } from './fragments/fragment';
import FunctionFragment from './fragments/function-fragment';

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

    const selector = Interface.getSighash(fragment);
    const args = this.abiCoder.encode(fragment.inputs, values);

    if (fragment.inputs.length !== 1) {
      throw new Error('For now, ABI functions must take exactly one parameter');
    }

    return hexlify(
      concat([
        selector,
        new BooleanCoder('').encode(fragment.inputs[0].type.startsWith('struct')),
        args,
      ])
    );
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
    values: ReadonlyArray<any> = []
  ): string {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    if (!fragment) {
      return '';
    }

    return this.abiCoder.encode(fragment.outputs, values);
  }
}
