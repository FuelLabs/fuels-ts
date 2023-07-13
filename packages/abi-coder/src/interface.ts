/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { versions } from '@fuel-ts/versions';

import AbiCoder from './abi-coder';
import type { InputValue } from './coders/abstract-coder';
import type { Fragment } from './fragments/fragment';
import FunctionFragment from './fragments/function-fragment';
import type {
  JsonAbiFragment,
  JsonFlatAbi,
  JsonFlatAbiFragmentType,
  JsonAbi,
  JsonAbiLogFragment,
  ConfigurableFragment,
} from './json-abi';
import { isFlatJsonAbi, ABI } from './json-abi';

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

export const convertConfigurablesToDict = (value: ReadonlyArray<ConfigurableFragment>) => {
  const configurables: { [name: string]: ConfigurableFragment } = {};

  value.forEach((v) => {
    configurables[v.name] = {
      ...v,
    };
  });

  return configurables;
};

export default class Interface {
  readonly fragments: Array<Fragment>;
  readonly functions: { [name: string]: FunctionFragment };
  readonly configurables: { [name: string]: ConfigurableFragment };
  readonly abiCoder: AbiCoder;
  readonly abi: ABI | null;
  readonly types: ReadonlyArray<JsonFlatAbiFragmentType>;
  readonly loggedTypes: ReadonlyArray<JsonAbiLogFragment>;
  /*
  Same as the `loggedTypes` above, but dedicated to external contracts
  added via `<base-invocation-scope.ts>.addContracts()` method. This is
  used to decode logs from contracts other than the main contract
  we're interacting with.
*/
  private externalLoggedTypes: { [id: string]: ReadonlyArray<JsonAbiLogFragment> };

  constructor(jsonAbi: JsonAbi | JsonFlatAbi) {
    this.abi = isFlatJsonAbi(jsonAbi) ? new ABI(jsonAbi) : null;
    this.fragments = coerceFragments(ABI.unflatten(jsonAbi));

    this.types = this.abi ? this.abi.types : [];
    this.loggedTypes = this.abi ? this.abi.unflattenLoggedTypes() : [];
    this.externalLoggedTypes = {};

    this.abiCoder = new AbiCoder();
    this.functions = {};

    this.configurables = convertConfigurablesToDict(this.abi?.unflattenConfigurables() || []);

    this.fragments.forEach((fragment) => {
      if (fragment instanceof FunctionFragment) {
        const signature = fragment.getSignature();
        if (this.functions[signature]) {
          logger.warn(`duplicate definition - ${signature}`);
          return;
        }
        this.functions[signature] = fragment;
      }
    });
  }

  /**
   * Returns function fragment for a dynamic input.
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   */
  getFunction(nameOrSignatureOrSelector: string): FunctionFragment {
    if (this.functions[nameOrSignatureOrSelector]) {
      return this.functions[nameOrSignatureOrSelector];
    }

    const functionFragment = Object.values(this.functions).find(
      (fragment: FunctionFragment) =>
        fragment.getSelector() === nameOrSignatureOrSelector ||
        fragment.name === nameOrSignatureOrSelector
    );

    if (functionFragment) {
      return functionFragment;
    }

    return logger.throwArgumentError(
      `function ${nameOrSignatureOrSelector} not found.`,
      'data',
      functionFragment
    );
  }

  decodeFunctionData(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    if (!fragment) {
      throw new Error('Fragment not found');
    }

    return fragment.decodeArguments(data);
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

    return fragment.encodeArguments(values, offset);
  }

  // Decode the result of a function call
  decodeFunctionResult(functionFragment: FunctionFragment | string, data: BytesLike): any {
    const fragment =
      typeof functionFragment === 'string' ? this.getFunction(functionFragment) : functionFragment;

    const bytes = arrayify(data);

    return this.abiCoder.decode(fragment.outputs, bytes);
  }

  decodeLog(data: BytesLike, logId: number, receiptId: string): any {
    const loggedTypes = this.externalLoggedTypes[receiptId] || this.loggedTypes;

    const logType = loggedTypes.find((type) => type.logId === logId);
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

  updateExternalLoggedTypes(id: string, loggedTypes: JsonAbiLogFragment[]) {
    this.externalLoggedTypes[id] = loggedTypes;
  }
}
