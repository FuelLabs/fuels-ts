import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import type { InputValue, Interface } from '@fuel-ts/abi-coder';
import { AbstractScript } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import type { ScriptRequest } from '@fuel-ts/program';
import type { Provider } from '@fuel-ts/providers';
import type { BaseWalletLocked } from '@fuel-ts/wallet';

import { ScriptInvocationScope } from './script-invocation-scope';

type Result<T> = {
  value: T | BN | undefined;
  logs: unknown[];
};

type InvokeMain<TArgs extends Array<any> = Array<any>, TReturn = any> = (
  ...args: TArgs
) => ScriptInvocationScope<TArgs, TReturn>;

export class Script<TInput extends Array<any>, TOutput> extends AbstractScript {
  bytes: Uint8Array;
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
    super();
    this.bytes = arrayify(bytecode);
    this.interface = scriptInterface;

    this.provider = provider;
    this.wallet = wallet;

    this.functions = {
      main: (...args: TInput) =>
        new ScriptInvocationScope(this, this.interface.getFunction('main'), args),
    };
  }
}
