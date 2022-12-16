/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { toUtf8Bytes } from '@ethersproject/strings';
import { versions } from '@fuel-ts/versions';

import AbiCoder from './abi-coder';
import type { InputValue } from './coders/abstract-coder';
import BooleanCoder from './coders/boolean';
import type { Fragment } from './fragments/fragment';
import FunctionFragment from './fragments/function-fragment';
import type {
  JsonAbiFragment,
  JsonFlatAbi,
  JsonFlatAbiFragmentType,
  JsonAbi,
  JsonAbiLogFragment,
} from './json-abi';
import { isFlatJsonAbi, ABI, isReferenceType } from './json-abi';
import { filterEmptyParams } from './utilities';

const logger = new Logger(versions.FUELS);

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
  readonly abi: ABI | null;
  readonly types: ReadonlyArray<JsonFlatAbiFragmentType>;
  readonly loggedTypes: ReadonlyArray<JsonAbiLogFragment>;

  constructor(jsonAbi: JsonAbi | JsonFlatAbi) {
    this.abi = isFlatJsonAbi(jsonAbi) ? new ABI(jsonAbi) : null;
    this.fragments = coerceFragments(ABI.unflatten(jsonAbi));

    this.types = this.abi ? this.abi.types : [];
    this.loggedTypes = this.abi ? this.abi.unflattenLoggedTypes() : [];

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
      const signature = fragment.getInputsSighash();
      if (bucket[signature]) {
        logger.warn(`duplicate definition - ${signature}`);
        return;
      }
      bucket[signature] = fragment;
    });
  }

  static getSighash(fragment: FunctionFragment | string): Uint8Array {
    const bytes =
      typeof fragment === 'string'
        ? toUtf8Bytes(fragment)
        : toUtf8Bytes(fragment.getInputsSighash());

    return concat([new Uint8Array(4), arrayify(sha256(bytes)).slice(0, 4)]);
  }

  getFunction(nameOrSignatureOrSighash: string): FunctionFragment {
    if (this.functions[nameOrSignatureOrSighash]) {
      return this.functions[nameOrSignatureOrSighash];
    }

    const functionFragment = Object.values(this.functions).find(
      (fragment: Fragment) =>
        hexlify(Interface.getSighash(fragment)) === nameOrSignatureOrSighash ||
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
    if (hexlify(bytes.slice(0, 8)) !== hexlify(Interface.getSighash(fragment))) {
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
    values: Array<InputValue>,
    offset = 0
  ): Uint8Array {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    if (!fragment) {
      throw new Error('Fragment not found');
    }

    const selector = Interface.getSighash(fragment);
    const inputs = filterEmptyParams(fragment.inputs);

    if (inputs.length === 0) {
      return selector;
    }

    const isRef = inputs.length > 1 || isReferenceType(inputs[0].type);
    const args = this.abiCoder.encode(inputs, values, offset);
    return concat([selector, new BooleanCoder().encode(isRef), args]);
  }

  // Decode the result of a function call
  decodeFunctionResult(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    const bytes = arrayify(data);

    return this.abiCoder.decode(fragment.outputs, bytes);
  }

  decodeLog(data: BytesLike, logId: number): any {
    const logType = this.loggedTypes.find((type) => type.logId === logId);
    if (!logType?.abiFragmentType) {
      throw new Error(`Log ID - ${logId} unknown`);
    }
    return this.abiCoder.decode(logType.abiFragmentType, data);
  }

  encodeFunctionResult(
    functionFragment: FunctionFragment | string,
    values: Array<InputValue>
  ): Uint8Array {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    if (!fragment) {
      throw new Error('Fragment not found');
    }

    return this.abiCoder.encode(fragment.outputs, values);
  }
}
