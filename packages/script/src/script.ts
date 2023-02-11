import type { BytesLike } from '@ethersproject/bytes';
import type { InputValue, Interface } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';
import type { Provider } from '@fuel-ts/providers';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import { FunctionInvocationScope } from './functions/invocation-scope';
import type { ScriptRequest } from './script-request';

type Result<T> = {
  value: T | BN | undefined;
  logs: unknown[];
};

type InvokeMain<TArgs extends Array<any> = Array<any>, TReturn = any> = (
  ...args: TArgs
) => FunctionInvocationScope<TArgs, TReturn>;

export class Script<TInput extends Array<any>, TOutput> {
  bytecode: BytesLike;
  interface: Interface;
  wallet: BaseWalletLocked | null;
  script!: ScriptRequest<InputValue<void>[], Result<TOutput>>;
  provider: Provider;
  functions: { main: InvokeMain<TInput, TOutput> };

  constructor(
    bytecode: BytesLike,
    scriptInterface: Interface,
    provider: Provider,
    wallet: BaseWalletLocked | null
  ) {
    this.bytecode = bytecode;
    this.interface = scriptInterface;

    this.provider = provider;
    this.wallet = wallet;

    this.functions = {
      main: (...args: TInput) =>
        new FunctionInvocationScope(this, this.interface.getFunction('main'), args),
    };
  }
}
