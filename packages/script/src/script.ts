/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { AbiCoder, Interface } from '@fuel-ts/abi-coder';
import type { InferAbiFunctions, InputValue, JsonAbi, JsonFlatAbi } from '@fuel-ts/abi-coder';
import { AbstractScript } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import type { ScriptRequest } from '@fuel-ts/program';
import type { Provider } from '@fuel-ts/providers';
import type { Account } from '@fuel-ts/wallet';

import { ScriptInvocationScope } from './script-invocation-scope';

type Result<T> = {
  value: T | BN | undefined;
  logs: unknown[];
};

type InvokeMain<TArgs extends Array<any> = Array<any>, TReturn = any> = (
  ...args: TArgs
) => ScriptInvocationScope<TArgs, TReturn>;

export class Script<
  TInput extends Array<any> = [],
  TOutput = unknown,
  TAbi extends JsonFlatAbi | unknown = unknown,
  InferredFns extends Record<
    string,
    { input: never | object; output: unknown }
  > = TAbi extends JsonFlatAbi ? InferAbiFunctions<TAbi> : never
> extends AbstractScript {
  bytes: Uint8Array;
  interface: Interface;
  account: Account;
  script!: ScriptRequest<InputValue[], Result<TOutput>>;
  provider: Provider;
  functions: TAbi extends JsonFlatAbi
    ? {
        [Name in keyof InferredFns]: InferredFns[Name]['input'] extends never
          ? () => ScriptInvocationScope<never, InferredFns[Name]['output']>
          : (
              input: InferredFns[Name]['input']
            ) => ScriptInvocationScope<InferredFns[Name]['input'], InferredFns[Name]['output']>;
      }
    : { main: InvokeMain<TInput, TOutput> };

  constructor(
    bytecode: BytesLike,
    abi: JsonAbi,
    account: Account,
    isBuiltByFuelFactory: boolean = false
  ) {
    super();
    this.bytes = arrayify(bytecode);
    this.interface = new Interface(abi);

    this.provider = account.provider;
    this.account = account;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.functions = {
      main: isBuiltByFuelFactory
        ? (arg: object) => new ScriptInvocationScope(this, this.interface.getFunction('main'), arg)
        : (...args: unknown[]) =>
            new ScriptInvocationScope(this, this.interface.getFunction('main'), args),
    };
  }

  setConfigurableConstants(configurables: { [name: string]: unknown }) {
    try {
      if (!Object.keys(this.interface.configurables).length) {
        throw new Error('Script has no configurable constants to be set');
      }

      Object.entries(configurables).forEach(([key, value]) => {
        if (!this.interface.configurables[key]) {
          throw new Error(`Script has no configurable constant named: ${key}`);
        }

        const { fragmentType, offset } = this.interface.configurables[key];

        const encoded = new AbiCoder().getCoder(fragmentType).encode(value);

        this.bytes.set(encoded, offset);
      });
    } catch (err) {
      throw new Error(`Error setting configurable: ${err}`);
    }

    return this;
  }
}
