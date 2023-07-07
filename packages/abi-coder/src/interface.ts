/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { versions } from '@fuel-ts/versions';

import AbiCoder from './abi-coder';
import type { InputValue } from './coders/abstract-coder';
import FunctionFragment from './fragments/function-fragment';
import type {
  JsonFlatAbi,
  JsonFlatAbiFragmentType,
  ConfigurableFragment,
  JsonFlatAbiFragmentConfigurable,
} from './json-abi';
import { isFlatJsonAbi, ABI } from './json-abi';

const logger = new Logger(versions.FUELS);

export const convertConfigurablesToDict = (value: ReadonlyArray<ConfigurableFragment>) => {
  const configurables: { [name: string]: ConfigurableFragment } = {};

  value.forEach((v) => {
    configurables[v.name] = {
      ...v,
    };
  });

  return configurables;
};

export default class Interface<TAbi extends JsonFlatAbi = JsonFlatAbi> {
  readonly functions!: {
    [Name in TAbi['functions'][number]['name']]: FunctionFragment<TAbi, Name>;
  };

  readonly configurables: {
    [K in TAbi['configurables'][number]['name']]: JsonFlatAbiFragmentConfigurable;
  };

  readonly abiCoder: AbiCoder;
  readonly abi: ABI | null;
  readonly types: ReadonlyArray<JsonFlatAbiFragmentType>;
  /*
      TODO: Refactor so that there's no need for externalLoggedTypes
       
          This is dedicated to external contracts added via `<base-invocation-scope.ts>.addContracts()` method. 
          This is used to decode logs from contracts other than the main contract
          we're interacting with.
        */
  private externalLoggedTypes: { [id: string]: Interface };
  jsonAbi: JsonFlatAbi;

  constructor(jsonAbi: JsonFlatAbi) {
    this.jsonAbi = jsonAbi;
    this.abi = isFlatJsonAbi(jsonAbi) ? new ABI(jsonAbi) : null;

    this.types = this.abi ? this.abi.types : [];
    this.externalLoggedTypes = {};

    this.abiCoder = new AbiCoder();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.functions = Object.fromEntries(
      jsonAbi.functions.map((x) => [x.name, new FunctionFragment(jsonAbi, x.name)])
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.configurables = Object.fromEntries(jsonAbi.configurables.map((x) => [x.name, x]));
  }

  /**
   * Returns function fragment for a dynamic input.
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   */
  getFunction(nameOrSignatureOrSelector: string): FunctionFragment {
    const fn = Object.values<FunctionFragment<TAbi, string>>(this.functions).find(
      (f) =>
        f.name === nameOrSignatureOrSelector ||
        f.signature === nameOrSignatureOrSelector ||
        f.selector === nameOrSignatureOrSelector
    );

    if (fn !== undefined) return fn;

    return logger.throwArgumentError(
      `function ${nameOrSignatureOrSelector} not found.`,
      'data',
      fn
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

    return fragment.decodeOutput(data);
  }

  decodeLog(data: BytesLike, logId: number, receiptId: string): any {
    const isExternalLoggedType = this.externalLoggedTypes[receiptId];
    if (isExternalLoggedType) {
      const externalAbi = this.externalLoggedTypes[receiptId];
      return externalAbi.decodeLog(data, logId, receiptId);
    }

    const { loggedType } = this.jsonAbi.loggedTypes.find((type) => type.logId === logId)!;

    return AbiCoder.decode(this.jsonAbi, loggedType, arrayify(data), 0);
  }

  updateExternalLoggedTypes(id: string, loggedTypes: Interface) {
    this.externalLoggedTypes[id] = loggedTypes;
  }
}
